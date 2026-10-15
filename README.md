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

This downloads the NASA A–Z mission list, checks linked NASA mission pages for their labeled launch fields, and writes available launch years into `missions.json`. The browser builds its decade filters dynamically from years it finds. Python 3.9+ is recommended; the app itself uses only the standard library.

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
- NASA's A–Z index does not contain dates. The catalog refresh extracts launch dates where linked mission pages publish a clear launch field; entries without a found date are put in “Date not listed.” Mission periods, launch vehicles, and crew status remain populated for selected, researched missions.
- Google Analytics uses measurement ID `G-GK8YG8H802`, matching the `move-explorer` site, and is loaded only on GitHub Pages after visitor consent. The footer provides a way to reopen cookie settings.
- Trajectories are simplified, labeled schematics and are not navigation/ephemeris data.
- NASA's catalog includes more than spacecraft missions (for example experiments, programs, aircraft and expeditions). Entries without individually checked launch details show those fields as unavailable; do not infer that every catalog item launched from Earth.

NASA content and links remain the property of their respective owners. This is an independent educational project and is not an official NASA product.
