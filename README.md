# NASA Space Explorer

A small, dependency-free Python website for browsing NASA missions. It combines a locally curated set of mission and trajectory details with NASA's A–Z mission index. Curated mission entries include launch date, mission period, launch vehicle, crew status, and source links. The catalog can be browsed by launch decade. The interface is static HTML/CSS/JavaScript, so it runs with Python locally and can also be hosted on GitHub Pages.

## Run locally

```bash
cd ~/space-explorer
python3 app.py
```

Open <http://127.0.0.1:8000>. Stop the server with `Ctrl+C`.

## Refresh the NASA mission index

```bash
python3 build_catalog.py
```

This downloads the NASA A–Z mission list, reads the facts block (Type / Launch / Target) on each linked NASA mission page, applies the hand-checked corrections in `mission_overrides.json`, and writes `missions.json`. Each entry gets a normalized `launchDate`, a `dateLabel` (Launch, Campaigns, Planned launch…), and a `routeType` used for the schematic trajectory. The script prints a warning if an override no longer matches a catalog entry. Python 3.9+ is supported; everything uses only the standard library.

## Publish with GitHub Pages

GitHub Pages serves static websites; it does not run Python applications or `app.py`. This project is designed so the same frontend can be hosted there:

1. Create a repository named `space-explorer` under `kevocrowley` and push the project files.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. GitHub will publish the site at `https://kevocrowley.github.io/space-explorer/`.

`app.py` remains useful for local preview. `index.html`, `styles.css`, `app.js`, and `missions.json` are the Pages-hosted frontend and data.

## Sources and data notes

- [NASA A–Z missions](https://www.nasa.gov/a-to-z-of-nasa-missions/) — broad catalog index.
- Each curated mission links to its NASA mission page. The launch-origin field has its own NASA source link.
- NASA's A–Z index does not contain dates. Dates come from each mission page's facts block. Where NASA's page is wrong or missing a date, `mission_overrides.json` holds the correction with a `dateSource` link (Wikidata, ESA, DLR or NASA NTRS) and a short note shown in the detail panel. Future or TBD launches are grouped under **Upcoming**; entries with no applicable date (for example aeronautics research) are under **Date not listed**.
- Routes (`routeType`) are assigned from NASA's Target/Type fields, with `mission_overrides.json` covering missions those fields don't describe (Lagrange points, heliocentric orbits, airborne campaigns, ground facilities).
- Google Analytics uses measurement ID `G-GK8YG8H802`, matching the `move-explorer` site, and is loaded only on GitHub Pages after visitor consent. The footer provides a way to reopen cookie settings.
- Trajectories are simplified, labeled schematics and are not navigation/ephemeris data.
- NASA's catalog includes more than spacecraft missions (for example experiments, programs, aircraft and expeditions). Entries without individually checked launch details show those fields as unavailable; do not infer that every catalog item launched from Earth.

NASA content and links remain the property of their respective owners. This is an independent educational project and is not an official NASA product.
