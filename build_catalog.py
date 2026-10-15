#!/usr/bin/env python3
"""Refresh the NASA A–Z mission list into a GitHub Pages-friendly JSON file."""

from html.parser import HTMLParser
from urllib.request import Request, urlopen
from concurrent.futures import ThreadPoolExecutor, as_completed
import json
from pathlib import Path
import re


SOURCE_URL = "https://www.nasa.gov/a-to-z-of-nasa-missions/"
OUTPUT = Path(__file__).resolve().parent / "missions.json"


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


class VisibleText(HTMLParser):
    """Extract readable text so we can find NASA's labeled Launch field."""

    BLOCKS = {"address", "article", "br", "dd", "div", "dt", "h1", "h2", "h3", "li", "p", "section", "td", "th", "tr"}

    def __init__(self) -> None:
        super().__init__()
        self.parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag in self.BLOCKS:
            self.parts.append("\n")

    def handle_data(self, data: str) -> None:
        self.parts.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag in self.BLOCKS:
            self.parts.append("\n")


LAUNCH_PATTERN = re.compile(
    r"\bLaunch(?:\s{0,3}Date(?:\s{0,3}and\s{0,3}Time)?)?\s{0,4}[:\-]?\s{0,40}"
    r"((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|"
    r"Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|"
    r"Dec(?:ember)?)\.?\s+\d{1,2},?\s+\d{4}|\d{4})\b",
    re.IGNORECASE,
)


def fetch_launch_date(mission: dict[str, str]) -> tuple[str, str | None]:
    """Read the launch label from one NASA page; return the source URL and date."""
    url = mission["source"]
    try:
        request = Request(url, headers={"User-Agent": "NASA-Space-Explorer/1.0 (educational catalog index)"})
        with urlopen(request, timeout=18) as response:
            html = response.read().decode("utf-8", errors="replace")
        text_parser = VisibleText()
        text_parser.feed(html)
        visible_text = " ".join(" ".join(text_parser.parts).split())
        match = LAUNCH_PATTERN.search(visible_text)
        return url, match.group(1) if match else None
    except Exception as error:  # a missing/temporarily unavailable page shouldn't block catalog refresh
        print(f"Could not read launch date for {mission['name']}: {error}")
        return url, None


def main() -> None:
    request = Request(SOURCE_URL, headers={"User-Agent": "NASA-Space-Explorer/1.0 (educational project)"})
    with urlopen(request, timeout=30) as response:
        html = response.read().decode("utf-8", errors="replace")
    parser = MissionLinks()
    parser.feed(html)
    unique: dict[str, dict[str, str]] = {}
    for mission in parser.items:
        unique.setdefault(mission["source"], mission)
    missions = sorted(unique.values(), key=lambda mission: mission["name"].casefold())
    if not missions:
        raise SystemExit("NASA mission list was empty; existing missions.json was left unchanged.")

    # NASA's A–Z index itself contains no dates. Many linked mission pages have a
    # labeled Launch field, so collect those pages in parallel at a restrained rate.
    print(f"Looking up launch dates on {len(missions)} linked NASA mission pages…")
    dates_by_source: dict[str, str] = {}
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = [executor.submit(fetch_launch_date, mission) for mission in missions]
        for future in as_completed(futures):
            url, launch_date = future.result()
            if launch_date:
                dates_by_source[url] = launch_date
    for mission in missions:
        launch_date = dates_by_source.get(mission["source"])
        if not launch_date:
            continue
        year_match = re.search(r"(19|20)\d{2}", launch_date)
        if year_match:
            mission["launch_date"] = launch_date
            mission["year"] = int(year_match.group(0))

    OUTPUT.write_text(json.dumps({"source": SOURCE_URL, "missions": missions}, indent=2) + "\n", encoding="utf-8")
    print(f"Saved {len(missions)} NASA A–Z entries, including {len(dates_by_source)} linked launch dates, to {OUTPUT}")


if __name__ == "__main__":
    main()
