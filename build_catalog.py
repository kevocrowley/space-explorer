#!/usr/bin/env python3
"""Refresh the NASA A–Z mission list into a GitHub Pages-friendly JSON file."""

from html.parser import HTMLParser
from urllib.request import Request, urlopen
import json
from pathlib import Path


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
    OUTPUT.write_text(json.dumps({"source": SOURCE_URL, "missions": missions}, indent=2) + "\n", encoding="utf-8")
    print(f"Saved {len(missions)} NASA A–Z entries to {OUTPUT}")


if __name__ == "__main__":
    main()
