#!/usr/bin/env python3
"""Refresh the NASA A–Z mission list into a GitHub Pages-friendly JSON file."""

from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor
from datetime import date
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen
import json
import re
import time


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


def fetch_page(mission: dict[str, object]) -> dict[str, str] | None:
    """Return the page's facts block, or None when the page can't be read (e.g. a dead link)."""
    try:
        request = Request(str(mission["source"]), headers={"User-Agent": USER_AGENT})
        with urlopen(request, timeout=30) as response:
            return page_facts(response.read().decode("utf-8", errors="replace"))
    except Exception as error:  # a missing/temporarily unavailable page shouldn't block catalog refresh
        print(f"Could not read facts for {mission['name']}: {error}")
        return None


def page_extras(facts: dict[str, str], route: str | None) -> dict[str, object]:
    """Crew, vehicle, end milestone and duration from NASA's facts block."""
    extras: dict[str, object] = {}
    crew = fact(facts, r"^(meet the crew|crew|astronauts)$")
    if crew:
        extras["crew"] = [name.strip() for name in re.split(r",\s*|\s+and\s+", crew) if name.strip()]
        extras["crewSource"] = "NASA"
    orbiter = fact(facts, r"^(orbiter|space shuttle)$")
    vehicle = fact(facts, r"^launch vehicle$")
    if vehicle or orbiter:
        extras["vehicle"] = vehicle or f"Space Shuttle {orbiter}"
        extras["vehicleSource"] = "NASA"
    for pattern, label in [(r"^splashdown$", "Splashdown"), (r"^mission end$", "Mission end"), (r"^decommissioned$", "Decommissioned"),
                           (r"^operations ceased$", "Operations ceased"), (r"^sample delivered$", "Sample delivered"), (r"^landing$", "Landing")]:
        value = fact(facts, pattern)
        if value:
            # A "Landing" on Earth ends a crewed or Shuttle flight; elsewhere it's arrival (e.g. on Mars).
            ends = label != "Landing" or route in ("earth", "station", "suborbital")
            extras["milestone"] = {"label": label, "text": value, "date": to_iso(value), "ends": ends}
            break
    duration = fact(facts, r"^mission duration$")
    if duration:
        extras["duration"] = duration
    results = fact(facts, r"^results$")
    if results:
        extras["result"] = results
    return extras


# --- NASA Science mission index (science.nasa.gov/science-missions) ---------------------------
SCIENCE_URL = "https://science.nasa.gov/science-missions/"
SCIENCE_API = "https://science.nasa.gov/wp-json/smd/v1/content-list"
SCIENCE_SKIP = re.compile(r"program|project|exploration|3d model|information site|constellation|^voyager$|^landsat$|^sage ", re.I)


def get_json(url: str, headers: dict[str, str] | None = None, attempts: int = 4) -> object:
    for attempt in range(attempts):
        try:
            with urlopen(Request(url, headers=headers or {"User-Agent": USER_AGENT}), timeout=60) as response:
                return json.load(response)
        except Exception:
            if attempt == attempts - 1:
                raise
            time.sleep(3 * (attempt + 1))
    return None


def science_missions() -> dict[str, dict[str, object]]:
    """Status, program, summary and image for every NASA Science mission, keyed by page URL."""
    html = urlopen(Request(SCIENCE_URL, headers={"User-Agent": USER_AGENT}), timeout=60).read().decode("utf-8", errors="replace")
    query = json.loads(unescape(re.search(r'data-starting-query="([^"]+)"', html).group(1)))
    query.update(response_format="json", number_of_items=100)
    filters = {group: re.findall(r'data-filter-group="%s".{0,600}?data-filter-value="(\d+)".{0,400}?>\s*([^<]+?)\s*<' % group, html, re.S)
               for group in ("mission-status", "mission-programs")}

    def fetch(group: str, term: str) -> list[dict[str, object]]:
        items, page = [], 1
        while True:
            params = {**query, group.replace("-", "_"): term, "current_page": page}
            encoded = urlencode({key: json.dumps(value) if isinstance(value, (list, dict, bool)) else value for key, value in params.items()})
            batch = get_json(f"{SCIENCE_API}?{encoded}")["type"]["content"]
            items += [item for item in batch if item.get("postType") == "mission"]
            if len(batch) < query["number_of_items"] or page >= 20:
                return items
            page += 1

    jobs = [(group, term, label) for group, terms in filters.items() for term, label in terms]
    with ThreadPoolExecutor(max_workers=4) as executor:
        results = list(executor.map(lambda job: (job, fetch(job[0], job[1])), jobs))
    missions: dict[str, dict[str, object]] = {}
    for (group, _term, label), items in results:
        for item in items:
            entry = missions.setdefault(item["permalink"], {"title": " ".join(unescape(item["title"]).split()), "programs": []})
            if group == "mission-status":
                entry["status"] = label
            else:
                entry["programs"].append(label)
            summary = " ".join(unescape(re.sub(r"<[^>]+>", " ", item.get("excerpt") or "")).split())
            if summary:
                entry["summary"] = summary
            image = item.get("thumbnailImg") or {}
            if image.get("url"):
                url = re.sub(r"([?&])h=\d+&?", r"\1", re.sub(r"([?&])w=\d+", r"\1w=640", image["url"]))
                entry["image"] = {key: value for key, value in {"url": url, "alt": image.get("alt"), "credit": image.get("credits")}.items() if value}
    print(f"NASA Science index: {len(missions)} missions")
    return missions


# --- Wikidata: launch vehicle, launch site and crew, only where the launch date agrees ----------
WIKIDATA_API = "https://www.wikidata.org/w/api.php"
WIKIDATA_HEADERS = {"User-Agent": "NASA-Space-Explorer/1.0 (https://github.com/kevocrowley/space-explorer; educational)"}
WIKIDATA_PROPS = {"P619": "launch", "P375": "vehicle", "P1427": "site", "P1029": "crew"}


def wikidata(params: dict[str, object]) -> dict:
    try:
        return get_json(f"{WIKIDATA_API}?{urlencode({**params, 'format': 'json'})}", WIKIDATA_HEADERS)
    except Exception:
        return {}


def search_terms(name: str) -> list[str]:
    terms = [name] + re.findall(r"\(([^()]*)\)", name) + [part for part in re.split(r"\s*[/(]\s*", name) if part]
    return list(dict.fromkeys(term.strip(" )") for term in terms if term.strip(" )")))


def wikidata_enrichment(missions: list[dict[str, object]]) -> dict[str, dict[str, object]]:
    """Match each dated mission to a Wikidata item whose launch date is within a day of ours."""
    dated = [mission for mission in missions if len(str(mission.get("launchDate") or "")) == 10]

    def candidates(mission: dict[str, object]) -> list[str]:
        found: list[str] = []
        for term in search_terms(str(mission["name"])):
            found += [hit["id"] for hit in wikidata({"action": "wbsearchentities", "search": term, "language": "en", "limit": 7, "type": "item"}).get("search", [])]
        return list(dict.fromkeys(found))

    with ThreadPoolExecutor(max_workers=4) as executor:
        found = list(executor.map(candidates, dated))
    entities = fetch_entities(sorted({qid for qids in found for qid in qids}))

    def launch_matches(qid: str, iso: str) -> bool:
        for claim in entities.get(qid, {}).get("claims", {}).get("P619", []):
            value = claim.get("mainsnak", {}).get("datavalue", {}).get("value", {})
            if value.get("precision", 0) >= 11:
                try:
                    if abs((date.fromisoformat(value["time"][1:11]) - date.fromisoformat(iso)).days) <= 1:
                        return True
                except ValueError:
                    pass
        return False

    matches = {}
    for mission, qids in zip(dated, found):
        qid = next((qid for qid in qids if launch_matches(qid, str(mission["launchDate"]))), None)
        if qid:
            matches[str(mission["source"])] = qid
    linked = {claim["mainsnak"]["datavalue"]["value"]["id"] for qid in matches.values() for prop in ("P375", "P1427", "P1029")
              for claim in entities[qid].get("claims", {}).get(prop, []) if claim.get("mainsnak", {}).get("datavalue")}
    linked_entities = fetch_entities(sorted(linked))
    label = lambda qid: linked_entities.get(qid, {}).get("labels", {}).get("en", {}).get("value")
    is_human = lambda qid: any(claim.get("mainsnak", {}).get("datavalue", {}).get("value", {}).get("id") == "Q5"
                               for claim in linked_entities.get(qid, {}).get("claims", {}).get("P31", []))
    enrichment = {}
    for source, qid in matches.items():
        claims = entities[qid].get("claims", {})
        values = lambda prop: [claim["mainsnak"]["datavalue"]["value"]["id"] for claim in claims.get(prop, []) if claim.get("mainsnak", {}).get("datavalue")]
        crew = values("P1029")
        enrichment[source] = {key: value for key, value in {
            "qid": qid,
            "vehicle": ", ".join(dict.fromkeys(filter(None, map(label, values("P375"))))),
            "site": ", ".join(dict.fromkeys(filter(None, map(label, values("P1427"))))),
            "crew": [label(member) for member in crew if is_human(member) and label(member)],
            "passengers": [label(member) for member in crew if not is_human(member) and label(member)],
        }.items() if value}
    print(f"Wikidata: {len(matches)} of {len(dated)} dated missions matched on launch date")
    return enrichment


def fetch_entities(qids: list[str]) -> dict[str, dict]:
    entities: dict[str, dict] = {}
    for start in range(0, len(qids), 50):
        response = wikidata({"action": "wbgetentities", "ids": "|".join(qids[start:start + 50]), "props": "labels|claims", "languages": "en"})
        entities.update(response.get("entities", {}))
    return entities


def same_mission(title: str, names: set[str]) -> bool:
    key = lambda text: re.sub(r"[^a-z0-9]", "", text.lower())
    parts = [title] + re.findall(r"\(([^()]*)\)", title) + re.split(r"\s*[/(:]\s*", title)
    return any(len(key(part)) > 3 and (key(part) in names or any(len(key(part)) > 6 and name.startswith(key(part)) for name in names)) for part in parts)


def name_keys(name: str) -> set[str]:
    key = lambda text: re.sub(r"[^a-z0-9]", "", text.lower())
    parts = [name] + re.findall(r"\(([^()]*)\)", name) + re.split(r"\s*[/(]\s*", name)
    return {key(part) for part in parts if len(key(part)) > 3}


def main() -> None:
    request = Request(SOURCE_URL, headers={"User-Agent": USER_AGENT})
    with urlopen(request, timeout=30) as response:
        html = response.read().decode("utf-8", errors="replace")
    parser = MissionLinks()
    parser.feed(html)
    unique: dict[str, dict[str, str]] = {}
    for mission in parser.items:
        unique.setdefault(mission["source"], mission)
    missions: list[dict[str, object]] = list(unique.values())
    if not missions:
        raise SystemExit("NASA mission list was empty; existing missions.json was left unchanged.")

    # Add NASA Science missions missing from the A–Z list (skipping program pages and duplicates).
    science = science_missions()
    url_key = lambda url: str(url).replace("https://", "").split("#")[0].rstrip("/")
    science_by_url = {url_key(url): entry for url, entry in science.items()}
    known_urls = {url_key(mission["source"]) for mission in missions}
    known_names = set().union(*(name_keys(str(mission["name"])) for mission in missions))
    science_by_name = {}
    for url, entry in science.items():
        title = str(entry["title"])
        if url_key(url) in known_urls:
            continue
        if SCIENCE_SKIP.search(title) or same_mission(title, known_names):
            science_by_name.setdefault(re.sub(r"[^a-z0-9]", "", title.lower()), url)
            continue
        missions.append({"name": title, "source": url})
    missions.sort(key=lambda mission: str(mission["name"]).casefold())

    print(f"Reading the facts block on {len(missions)} linked NASA mission pages…")
    with ThreadPoolExecutor(max_workers=5) as executor:
        all_facts = list(executor.map(fetch_page, missions))
    # A dead A–Z link is swapped for the matching NASA Science page when one exists.
    for index, (mission, facts) in enumerate(zip(missions, all_facts)):
        if facts is None:
            replacement = science_by_name.get(re.sub(r"[^a-z0-9]", "", str(mission["name"]).lower()))
            if replacement:
                mission["source"] = replacement
                all_facts[index] = fetch_page(mission)
                print(f"Replaced dead link for {mission['name']} with {replacement}")

    overrides = json.loads(OVERRIDES.read_text(encoding="utf-8"))
    route_overrides = {name: route for route, names in overrides["routes"].items() for name in names}
    known = {mission["name"] for mission in missions}
    for name in sorted((set(overrides["launch"]) | set(route_overrides)) - known):
        print(f"Warning: override for {name!r} matches no catalog entry")

    for mission, facts in zip(missions, all_facts):
        facts = facts or {}
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
        entry = science_by_url.get(url_key(mission["source"]), {})
        status = entry.get("status") or fact(facts, r"^status$").title() or None
        if status:
            mission["status"] = status
            launched = str(mission.get("launchDate") or "9999") < date.today().isoformat()
            if status == "Future" and not launched:
                mission["planned"] = True
                mission.setdefault("dateLabel", "Planned launch")
        for key in ("programs", "summary", "image"):
            if entry.get(key):
                mission[key] = entry[key]
        launch_date = mission.get("launchDate")
        if launch_date:
            mission["year"] = int(str(launch_date)[:4])
        # Entries with no destination information (mostly CubeSats) default to Earth orbit.
        route = route_overrides.get(name) or classify_route(name, facts) or "earth"
        mission["routeType"] = route
        mission.update(page_extras(facts, route))

    print("Matching dated missions against Wikidata for launch vehicle, site and crew…")
    enrichment = wikidata_enrichment(missions)
    for mission in missions:
        extra = enrichment.get(str(mission["source"]))
        if not extra:
            continue
        mission["wikidata"] = extra["qid"]
        for field in ("vehicle", "site"):
            if extra.get(field) and not mission.get(field):
                mission[field] = extra[field]
                mission[f"{field}Source"] = "Wikidata"
        if extra.get("crew") and not mission.get("crew"):
            mission["crew"] = extra["crew"]
            mission["crewSource"] = "Wikidata"
        if extra.get("passengers"):
            mission["passengers"] = extra["passengers"]  # e.g. instrumented test mannequins

    for mission in missions:
        for key in [key for key, value in mission.items() if value in (None, False, "", [])]:
            del mission[key]
    OUTPUT.write_text(json.dumps({"source": SOURCE_URL, "scienceSource": SCIENCE_URL, "missions": missions}, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    count = lambda field: sum(1 for mission in missions if mission.get(field))
    print(f"Saved {len(missions)} missions to {OUTPUT}: {count('year')} dated, {count('status')} with status, "
          f"{count('vehicle')} with vehicle, {count('site')} with launch site, {count('crew')} with crew, {count('summary')} with summaries")


if __name__ == "__main__":
    main()
