#!/usr/bin/env python3
"""Refresh the NASA A–Z mission list into a GitHub Pages-friendly JSON file."""

from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor
from datetime import date
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import Request, urlopen
import json
import re


SOURCE_URL = "https://www.nasa.gov/a-to-z-of-nasa-missions/"
ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "missions.json"
OVERRIDES = ROOT / "mission_overrides.json"
USER_AGENT = "NASA-Space-Explorer/1.0 (educational catalog index)"


class MissionLinks(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.items: list[dict[str, str]] = []
        self.current_href: str | None = None
        self.current_text: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag == "a":
            attributes = dict(attrs)
            self.current_href = attributes.get("href")
            self.current_text = []

    def handle_data(self, data: str) -> None:
        if self.current_href:
            self.current_text.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag != "a" or not self.current_href:
            return
        name = " ".join("".join(self.current_text).split())
        href = self.current_href
        if name and ("science.nasa.gov/mission/" in href or "/mission/" in href):
            if href.startswith("/"):
                href = "https://www.nasa.gov" + href
            if href.startswith("http") and "nasa.gov" in href:
                self.items.append({"name": name, "source": href})
        self.current_href = None
        self.current_text = []


# NASA mission pages show a facts block of label/value pairs (Type, Launch, Target…).
FACT_PAIR = re.compile(
    r'<p class="label[^"]*"[^>]*>([^<]*)</p>\s*</div>\s*<div class="p-lg[^"]*"[^>]*>(.*?)</div>',
    re.S,
)
MONTHS = {name: number for number, name in enumerate("jan feb mar apr may jun jul aug sep oct nov dec".split(), 1)}
# NASA label → how the explorer labels that date. Order matters: first matching fact wins.
DATE_LABELS = [
    (r"^scheduled to launch", "Scheduled launch"),
    (r"^first launch", "First launch"),
    (r"^launch(ed)?\b(?!\s*vehicle)", "Launch"),
    (r"^(airborne campaigns?|campaign dates|dates)$", "Campaigns"),
    (r"^years active$", "Active"),
    (r"^first flight$", "First flight"),
    (r"^start$", "Start"),
    (r"^dedicated$", "Dedicated"),
]
PLANNED = re.compile(r"\b(TBD|NET|no earlier than|planned|mid-\d{4}s|\d{4}[’']?s)\b", re.I)


def clean(fragment: str) -> str:
    return " ".join(unescape(re.sub(r"<[^>]+>", " ", fragment)).split())


def page_facts(html: str) -> dict[str, str]:
    return {clean(label): clean(value) for label, value in FACT_PAIR.findall(html) if clean(label)}


def fact(facts: dict[str, str], pattern: str) -> str:
    return next((value for label, value in facts.items() if re.match(pattern, label, re.I)), "")


def to_iso(text: str) -> str | None:
    """Return the first date in NASA's text as YYYY-MM-DD, YYYY-MM or YYYY."""
    match = re.search(r"([A-Za-z]{3,9})\.?\s+(\d{1,2}),?\s*(\d{4})", text)
    if match and match.group(1)[:3].lower() in MONTHS:
        return f"{match.group(3)}-{MONTHS[match.group(1)[:3].lower()]:02d}-{int(match.group(2)):02d}"
    match = re.search(r"([A-Za-z]{3,9})\.?\s+(\d{4})", text)
    if match and match.group(1)[:3].lower() in MONTHS:
        return f"{match.group(2)}-{MONTHS[match.group(1)[:3].lower()]:02d}"
    match = re.search(r"\b(19[5-9]\d|20[0-4]\d)", text)
    return match.group(1) if match else None


def launch_fields(facts: dict[str, str]) -> dict[str, object]:
    for pattern, label in DATE_LABELS:
        for key, value in facts.items():
            if re.match(pattern, key.strip(), re.I):
                iso = to_iso(value)
                planned = bool(PLANNED.search(value)) or bool(iso and iso > date.today().isoformat())
                if not iso and not planned:
                    return {}
                if " / " in key:
                    label = key.strip().title()  # "Launch / Landing" values hold both dates
                if planned:
                    label = "Planned launch"
                elif label == "Launch" and re.search(r"\d{4}\s*[-–]\s*(\d{4}|present)", value, re.I):
                    label = "Active"  # e.g. ground telescopes list "2003-2012" as their launch
                # A plain single date is formatted by the browser; keep NASA's wording for anything else.
                plain = iso and re.fullmatch(r"[A-Za-z]{3,9}\.?\s+\d{1,2},?\s*\d{4}", value.strip())
                return {"launchDate": iso, "launchText": None if plain else value, "dateLabel": label, "planned": planned}
    return {}


# Route families for the schematic trajectory drawing. NASA's Target/Location field is checked
# first, then the mission type, then the name; mission_overrides.json corrects the leftovers.
ROUTE_RULES = [
    (r"airborne|balloon|aerial|campaign|aeronautic|supersonic", "airborne"),
    (r"analog|ground-based|mauna kea", "ground"),
    (r"international space station|\biss\b|space station|expedition", "station"),
    (r"mercury", "mercury"),
    (r"venus", "venus"),
    (r"europa|jupiter", "jupiter"),
    (r"saturn|titan", "saturn"),
    (r"uranus|neptune|pluto|kuiper belt|interstellar|outer edge", "outer"),
    (r"comet", "comet"),
    (r"asteroid|didymos|bennu|ryugu|itokawa|eros\b|psyche|vesta|ceres|braille", "asteroid"),
    (r"phobos|deimos|mars", "mars"),
    (r"moon|lunar|apollo|artemis|surveyor|ranger", "moon"),
    (r"^sun$|heliocentric", "sun"),
    (r"earth|orbit|shuttle|sts-|landsat|weather|ocean|atmospher|climate|ozone|satellite|universe|exoplanet|milky way|telescope|observatory|x-ray|gamma|cosmic|astrophysics|solar system|space environment", "earth"),
]


def classify_route(name: str, facts: dict[str, str]) -> str | None:
    target = fact(facts, r"^(target|destinations?|location)$")
    kind = fact(facts, r"^(mission )?type$")
    for text in (kind if re.search(r"airborne|balloon|aerial|aeronautic|analog", kind, re.I) else "", target, f"{kind} {target}", f"{name} {kind} {target}"):
        for pattern, route in ROUTE_RULES:
            if text and re.search(pattern, text, re.I):
                return route
    return None


def fetch_page(mission: dict[str, str]) -> dict[str, str]:
    try:
        request = Request(mission["source"], headers={"User-Agent": USER_AGENT})
        with urlopen(request, timeout=30) as response:
            return page_facts(response.read().decode("utf-8", errors="replace"))
    except Exception as error:  # a missing/temporarily unavailable page shouldn't block catalog refresh
        print(f"Could not read facts for {mission['name']}: {error}")
        return {}


def main() -> None:
    request = Request(SOURCE_URL, headers={"User-Agent": USER_AGENT})
    with urlopen(request, timeout=30) as response:
        html = response.read().decode("utf-8", errors="replace")
    parser = MissionLinks()
    parser.feed(html)
    unique: dict[str, dict[str, str]] = {}
    for mission in parser.items:
        unique.setdefault(mission["source"], mission)
    missions: list[dict[str, object]] = sorted(unique.values(), key=lambda mission: mission["name"].casefold())
    if not missions:
        raise SystemExit("NASA mission list was empty; existing missions.json was left unchanged.")

    print(f"Reading the facts block on {len(missions)} linked NASA mission pages…")
    with ThreadPoolExecutor(max_workers=5) as executor:
        all_facts = list(executor.map(fetch_page, missions))

    overrides = json.loads(OVERRIDES.read_text(encoding="utf-8"))
    route_overrides = {name: route for route, names in overrides["routes"].items() for name in names}
    known = {mission["name"] for mission in missions}
    for name in sorted((set(overrides["launch"]) | set(route_overrides)) - known):
        print(f"Warning: override for {name!r} matches no catalog entry")

    for mission, facts in zip(missions, all_facts):
        name = mission["name"]
        kind = fact(facts, r"^(mission )?type$")
        target = fact(facts, r"^(target|destinations?|location)$")
        if kind:
            mission["type"] = kind
        if target:
            mission["target"] = target
        mission.update(launch_fields(facts))
        if name in overrides["launch"]:
            correction = overrides["launch"][name]
            mission.update(correction)
            if "launchText" not in correction and correction.get("launchDate"):
                mission["launchText"] = None  # the browser formats launchDate itself
            if correction.get("planned") and "dateLabel" not in correction:
                mission["dateLabel"] = "Planned launch"
            mission.setdefault("dateLabel", "Launch")
        launch_date = mission.get("launchDate")
        if launch_date:
            mission["year"] = int(str(launch_date)[:4])
        route = route_overrides.get(name) or classify_route(name, facts)
        if route:
            mission["routeType"] = route
        for key in [key for key, value in mission.items() if value in (None, False, "")]:
            del mission[key]

    OUTPUT.write_text(json.dumps({"source": SOURCE_URL, "missions": missions}, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    dated = sum(1 for mission in missions if mission.get("year"))
    routed = sum(1 for mission in missions if mission.get("routeType"))
    print(f"Saved {len(missions)} NASA A–Z entries ({dated} with dates, {routed} with routes) to {OUTPUT}")


if __name__ == "__main__":
    main()
