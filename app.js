const CURATED = [
  {name:"Apollo 11",year:1969,target:"Moon",origin:"Kennedy Space Center, Florida, USA",launch:"1969-07-16",status:"Completed",source:"https://www.nasa.gov/mission/apollo-11/",launchSource:"https://www.nasa.gov/mission/apollo-11/",route:"Earth → lunar orbit → Moon",routeType:"moon"},
  {name:"Artemis I",year:2022,target:"Moon",origin:"Kennedy Space Center, Florida, USA",launch:"2022-11-16",status:"Completed",source:"https://www.nasa.gov/mission/artemis-i/",launchSource:"https://www.nasa.gov/mission/artemis-i/",route:"Earth → lunar distant retrograde orbit → Earth",routeType:"moon"},
  {name:"Artemis II",year:2026,target:"Moon",origin:"Kennedy Space Center, Florida, USA",launch:"2026-04-01",status:"Completed",source:"https://www.nasa.gov/mission/artemis-ii/",launchSource:"https://www.nasa.gov/mission/artemis-ii/",route:"Earth → lunar flyby → Earth",routeType:"moon"},
  {name:"Cassini-Huygens",year:1997,target:"Saturn",origin:"Cape Canaveral Space Force Station, Florida, USA",launch:"1997-10-15",status:"Completed",source:"https://science.nasa.gov/mission/cassini/",launchSource:"https://science.nasa.gov/mission/cassini/",route:"Earth → Venus flybys → Jupiter flyby → Saturn",routeType:"outer"},
  {name:"Curiosity (MSL)",year:2011,target:"Mars",origin:"Cape Canaveral Space Force Station, Florida, USA",launch:"2011-11-26",status:"Active",source:"https://science.nasa.gov/mission/msl-curiosity/",launchSource:"https://science.nasa.gov/mission/msl-curiosity/",route:"Earth → Mars transfer → Gale Crater",routeType:"mars"},
  {name:"DART",year:2021,target:"Asteroid Dimorphos",origin:"Vandenberg Space Force Base, California, USA",launch:"2021-11-24",status:"Completed",source:"https://science.nasa.gov/mission/dart/",launchSource:"https://science.nasa.gov/mission/dart/",route:"Earth → Didymos system → Dimorphos impact",routeType:"asteroid"},
  {name:"Dawn",year:2007,target:"Vesta and Ceres",origin:"Cape Canaveral Space Force Station, Florida, USA",launch:"2007-09-27",status:"Completed",source:"https://science.nasa.gov/mission/dawn/",launchSource:"https://science.nasa.gov/mission/dawn/",route:"Earth → Vesta orbit → Ceres orbit",routeType:"asteroid"},
  {name:"Europa Clipper",year:2024,target:"Jupiter / Europa",origin:"Kennedy Space Center, Florida, USA",launch:"2024-10-14",status:"En route",source:"https://science.nasa.gov/mission/europa-clipper/",launchSource:"https://science.nasa.gov/mission/europa-clipper/",route:"Earth → Mars gravity assist → Earth → Jupiter",routeType:"outer"},
  {name:"Hubble Space Telescope",year:1990,target:"Low Earth orbit",origin:"Kennedy Space Center, Florida, USA",launch:"1990-04-24",status:"Active",source:"https://science.nasa.gov/mission/hubble/",launchSource:"https://science.nasa.gov/mission/hubble/",route:"Earth launch → low Earth orbit",routeType:"earth"},
  {name:"James Webb Space Telescope",year:2021,target:"Sun–Earth L₂",origin:"Guiana Space Centre, Kourou, French Guiana",launch:"2021-12-25",status:"Active",source:"https://science.nasa.gov/mission/webb/",launchSource:"https://science.nasa.gov/mission/webb/",route:"Earth → Sun–Earth L₂ halo orbit",routeType:"l2"},
  {name:"Juno",year:2011,target:"Jupiter",origin:"Cape Canaveral Space Force Station, Florida, USA",launch:"2011-08-05",status:"Active",source:"https://science.nasa.gov/mission/juno/",launchSource:"https://science.nasa.gov/mission/juno/",route:"Earth → Jupiter polar orbit",routeType:"outer"},
  {name:"Lunar Reconnaissance Orbiter",year:2009,target:"Moon",origin:"Cape Canaveral Space Force Station, Florida, USA",launch:"2009-06-18",status:"Active",source:"https://science.nasa.gov/mission/lro/",launchSource:"https://science.nasa.gov/mission/lro/",route:"Earth → lunar transfer → low lunar orbit",routeType:"moon"},
  {name:"Mars 2020 / Perseverance",year:2020,target:"Mars",origin:"Cape Canaveral Space Force Station, Florida, USA",launch:"2020-07-30",status:"Active",source:"https://science.nasa.gov/mission/mars-2020/",launchSource:"https://science.nasa.gov/mission/mars-2020/",route:"Earth → Mars transfer → Jezero Crater",routeType:"mars"},
  {name:"Mariner 2",year:1962,target:"Venus",origin:"Cape Canaveral, Florida, USA",launch:"1962-08-27",status:"Completed",source:"https://science.nasa.gov/mission/mariner-2/",launchSource:"https://science.nasa.gov/mission/mariner-2/",route:"Earth → Venus flyby",routeType:"inner"},
  {name:"New Horizons",year:2006,target:"Pluto and Kuiper Belt",origin:"Cape Canaveral Space Force Station, Florida, USA",launch:"2006-01-19",status:"Active",source:"https://science.nasa.gov/mission/new-horizons/",launchSource:"https://science.nasa.gov/mission/new-horizons/",route:"Earth → Jupiter gravity assist → Pluto → Arrokoth",routeType:"outer"},
  {name:"OSIRIS-REx",year:2016,target:"Asteroid Bennu",origin:"Cape Canaveral Space Force Station, Florida, USA",launch:"2016-09-08",status:"Completed",source:"https://science.nasa.gov/mission/osiris-rex/",launchSource:"https://science.nasa.gov/mission/osiris-rex/",route:"Earth → Bennu rendezvous → sample return to Earth",routeType:"asteroid"},
  {name:"Parker Solar Probe",year:2018,target:"The Sun",origin:"Cape Canaveral Space Force Station, Florida, USA",launch:"2018-08-12",status:"Active",source:"https://science.nasa.gov/mission/parker-solar-probe/",launchSource:"https://science.nasa.gov/mission/parker-solar-probe/",route:"Earth → repeated Venus gravity assists → solar orbit",routeType:"inner"},
  {name:"Pioneer 10",year:1972,target:"Jupiter / interstellar space",origin:"Cape Canaveral, Florida, USA",launch:"1972-03-03",status:"Completed",source:"https://science.nasa.gov/mission/pioneer-10/",launchSource:"https://science.nasa.gov/mission/pioneer-10/",route:"Earth → Jupiter flyby → escape trajectory",routeType:"outer"},
  {name:"Voyager 1",year:1977,target:"Interstellar space",origin:"Cape Canaveral, Florida, USA",launch:"1977-09-05",status:"Active",source:"https://science.nasa.gov/mission/voyager/",launchSource:"https://science.nasa.gov/mission/voyager/",route:"Earth → Jupiter flyby → Saturn flyby → interstellar space",routeType:"outer"},
  {name:"Voyager 2",year:1977,target:"Uranus, Neptune / interstellar space",origin:"Cape Canaveral, Florida, USA",launch:"1977-08-20",status:"Active",source:"https://science.nasa.gov/mission/voyager/",launchSource:"https://science.nasa.gov/mission/voyager/",route:"Earth → Jupiter → Saturn → Uranus → Neptune",routeType:"outer"}
];

// Mission-specific facts link back to the NASA page on each curated entry.
// Unknown facts stay blank instead of being inferred from the catalog title.
const VERIFIED_DETAILS = {
  "Apollo 11": {period:"July 16–24, 1969", vehicle:"Saturn V; Apollo Command/Service Module and Lunar Module", crewed:true},
  "Artemis I": {period:"November 16–December 11, 2022", vehicle:"Space Launch System (SLS) Block 1 and Orion spacecraft", crewed:false},
  "Artemis II": {period:"April 1–11, 2026", vehicle:"Space Launch System (SLS) and Orion spacecraft", crewed:true},
  "Cassini-Huygens": {period:"October 15, 1997–September 15, 2017", vehicle:"Titan IVB/Centaur launch vehicle; Cassini orbiter and Huygens probe", crewed:false},
  "Curiosity (MSL)": {period:"November 26, 2011–present", vehicle:"Atlas V 541; Mars Science Laboratory rover and sky crane", crewed:false},
  "DART": {period:"November 24, 2021–September 26, 2022", vehicle:"Falcon 9; Double Asteroid Redirection Test spacecraft", crewed:false},
  "Dawn": {period:"September 27, 2007–November 1, 2018", vehicle:"Delta II 7925H; Dawn ion-propelled spacecraft", crewed:false},
  "Europa Clipper": {period:"October 14, 2024–arrival at Jupiter planned for 2030", vehicle:"Falcon Heavy; Europa Clipper spacecraft", crewed:false},
  "Hubble Space Telescope": {period:"April 24, 1990–present", vehicle:"Space Shuttle Discovery (STS-31) deployment; Hubble space telescope", crewed:false, crewNote:"Uncrewed observatory; astronauts visited on servicing missions"},
  "James Webb Space Telescope": {period:"December 25, 2021–present", vehicle:"Ariane 5 ECA; James Webb Space Telescope", crewed:false},
  "Juno": {period:"August 5, 2011–present", vehicle:"Atlas V 551; Juno spacecraft", crewed:false},
  "Lunar Reconnaissance Orbiter": {period:"June 18, 2009–present", vehicle:"Atlas V 401; Lunar Reconnaissance Orbiter", crewed:false},
  "Mars 2020 / Perseverance": {period:"July 30, 2020–present", vehicle:"Atlas V 541; Perseverance rover and Ingenuity helicopter", crewed:false},
  "Mariner 2": {period:"August 27, 1962–January 3, 1963", vehicle:"Atlas-Agena B; Mariner 2 robotic flyby spacecraft", crewed:false},
  "New Horizons": {period:"January 19, 2006–present", vehicle:"Atlas V 551 with Star 48B upper stage; New Horizons spacecraft", crewed:false},
  "OSIRIS-REx": {period:"September 8, 2016–September 24, 2023 (sample return); OSIRIS-APEX extended mission ongoing", vehicle:"Atlas V 411; OSIRIS-REx spacecraft", crewed:false},
  "Parker Solar Probe": {period:"August 12, 2018–present", vehicle:"Delta IV Heavy with Star 48BV upper stage; Parker Solar Probe", crewed:false},
  "Pioneer 10": {period:"March 3, 1972–January 23, 2003 (last signal received)", vehicle:"Atlas-Centaur with TE364-4 upper stage; Pioneer 10 spacecraft", crewed:false},
  "Voyager 1": {period:"September 5, 1977–present", vehicle:"Titan IIIE-Centaur; Voyager 1 spacecraft", crewed:false},
  "Voyager 2": {period:"August 20, 1977–present", vehicle:"Titan IIIE-Centaur; Voyager 2 spacecraft", crewed:false}
};

const state = { missions: [], visible: 60, selected: null, decade: "all" };
const $ = (selector) => document.querySelector(selector);
const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
const safeText = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));

// Match move-explorer: don't load Google Analytics before consent or on local previews.
const GA_ID = "G-GK8YG8H802";
const ANALYTICS_HOST = location.hostname.endsWith("github.io");
let gaLoaded = false;

function getAnalyticsConsent() {
  try { return localStorage.getItem("space-explorer-ga-consent"); } catch (error) { return null; }
}

function setAnalyticsConsent(value) {
  try { localStorage.setItem("space-explorer-ga-consent", value); } catch (error) { /* storage may be disabled */ }
}

function loadAnalytics() {
  if (gaLoaded || !ANALYTICS_HOST) return;
  gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

function setupAnalyticsConsent() {
  const banner = $("#analytics-consent");
  const choose = (value) => {
    setAnalyticsConsent(value);
    banner.hidden = true;
    if (value === "granted") loadAnalytics();
  };
  $("#consent-accept").addEventListener("click", () => choose("granted"));
  $("#consent-decline").addEventListener("click", () => choose("denied"));
  $("#cookie-settings").addEventListener("click", (event) => {
    event.preventDefault();
    banner.hidden = false;
  });
  const saved = getAnalyticsConsent();
  if (saved === "granted") loadAnalytics();
  else if (!saved && ANALYTICS_HOST) banner.hidden = false;
}

setupAnalyticsConsent();

function getMissionData(name) {
  const exact = CURATED.find((mission) => normalize(mission.name) === normalize(name));
  if (exact) return {...exact, ...VERIFIED_DETAILS[exact.name]};
  return null;
}

function classifyTarget(name) {
  const data = getMissionData(name);
  if (data) return data.target;
  if (/moon|lunar|artemis|apollo|survey|lro/i.test(name)) return "Moon";
  if (/mars|viking|curiosity|perseverance|insight/i.test(name)) return "Mars";
  if (/earth|landsat|aqua|aura|hubble|iss|station|goes|weather|cloudsat/i.test(name)) return "Earth";
  if (/jupiter|saturn|uranus|neptune|pluto|voyager|cassini|juno|new horizons/i.test(name)) return "Outer solar system";
  return "Other";
}

function combinedMissions(catalog) {
  const map = new Map();
  (catalog || []).forEach((item) => map.set(normalize(item.name), {...item, name:item.name, source:item.source, target:classifyTarget(item.name)}));
  CURATED.forEach((mission) => {
    const key = normalize(mission.name);
    const existing = map.get(key);
    map.set(key, {...existing, ...mission});
  });
  return [...map.values()].sort((a,b) => a.name.localeCompare(b.name));
}

function currentMissions() {
  const query = $("#search").value.trim().toLowerCase();
  return state.missions.filter((mission) => {
    const data = getMissionData(mission.name) || mission;
    const text = `${mission.name} ${data.target || ""} ${data.origin || ""}`.toLowerCase();
    const matchesQuery = !query || text.includes(query);
    const decade = data.year ? Math.floor(data.year / 10) * 10 : null;
    const matchesDecade = state.decade === "all" || (state.decade === "unknown" ? decade === null : decade === Number(state.decade));
    return matchesQuery && matchesDecade;
  });
}

function renderDecadeFilters() {
  const decadeCounts = new Map();
  state.missions.forEach((mission) => {
    const year = Number(mission.year);
    if (year) {
      const decade = Math.floor(year / 10) * 10;
      decadeCounts.set(decade, (decadeCounts.get(decade) || 0) + 1);
    }
  });
  const decadeButtons = [...decadeCounts.keys()].sort((a, b) => a - b).map((decade) =>
    `<button class="filter-chip${state.decade === String(decade) ? " active" : ""}" data-decade="${decade}">${decade}s <span class="decade-count">${decadeCounts.get(decade)}</span></button>`
  ).join("");
  const unknownCount = state.missions.length - [...decadeCounts.values()].reduce((sum, count) => sum + count, 0);
  const unknownButton = unknownCount ? `<button class="filter-chip${state.decade === "unknown" ? " active" : ""}" data-decade="unknown">Date not listed <span class="decade-count">${unknownCount}</span></button>` : "";
  $("#decade-filters").innerHTML = `<button class="filter-chip${state.decade === "all" ? " active" : ""}" data-decade="all">All decades <span class="decade-count">${state.missions.length}</span></button>${decadeButtons}${unknownButton}`;
  document.querySelectorAll("#decade-filters .filter-chip").forEach((button) => button.addEventListener("click", () => {
    state.decade = button.dataset.decade;
    state.visible = 60;
    document.querySelectorAll("#decade-filters .filter-chip").forEach((chip) => chip.classList.toggle("active", chip === button));
    renderList();
  }));
}

function renderList() {
  const filtered = currentMissions();
  const selectedName = state.selected?.name;
  const page = filtered.slice(0, state.visible);
  $("#mission-list").innerHTML = page.length ? page.map((mission, index) => {
    const data = getMissionData(mission.name) || mission;
    const isSelected = selectedName === mission.name;
    const statusClass = data.status === "Active" ? "active" : data.status === "En route" ? "enroute" : "";
    return `<button class="mission-card${isSelected ? " selected" : ""}" data-name="${safeText(mission.name)}"><span class="mission-year">${data.year || "NASA"}</span><span><span class="mission-name">${safeText(mission.name)}</span><span class="mission-target">${safeText(data.target || classifyTarget(mission.name))}</span></span><span class="status-dot ${statusClass}" title="${safeText(data.status || "Details unavailable")}"></span></button>`;
  }).join("") : `<div class="no-results">No missions match these filters.<br><a href="#" id="reset-filters">Reset filters</a></div>`;
  $("#results-count").textContent = `${filtered.length} ENTRIES`;
  $("#results-label").textContent = state.decade === "all" ? "ALL MISSIONS" : state.decade === "unknown" ? "DATE NOT LISTED" : `${state.decade}S MISSIONS`;
  $("#load-more").hidden = filtered.length <= state.visible;
  $("#mission-count").textContent = state.missions.length.toLocaleString();
  $("#launch-count").textContent = state.missions.filter((mission) => Boolean((getMissionData(mission.name) || {}).origin)).length.toLocaleString();
  document.querySelectorAll(".mission-card").forEach((button) => button.addEventListener("click", () => selectMission(button.dataset.name)));
  const reset = $("#reset-filters");
  if (reset) reset.addEventListener("click", (event) => { event.preventDefault(); resetFilters(); });
}

function routeSvg(type, title) {
  if (!type) return `<div class="orbit-graphic"><div class="empty-detail"><div class="empty-orbit"><span></span><i></i></div><p>Trajectory visualization is not available for this catalog entry.</p></div></div>`;
  const target = type === "moon" ? {x:270,y:70,label:"MOON"} : type === "mars" ? {x:269,y:68,label:"MARS"} : type === "earth" ? {x:269,y:72,label:"ORBIT"} : type === "l2" ? {x:275,y:65,label:"L₂"} : type === "inner" ? {x:272,y:63,label:"SUN"} : type === "asteroid" ? {x:270,y:65,label:"TARGET"} : {x:275,y:61,label:"DEEP SPACE"};
  const path = type === "moon" ? "M68 130 C105 35 220 32 270 70 C231 112 183 143 68 130" : type === "mars" ? "M68 130 C106 42 188 25 270 68" : type === "earth" ? "M68 130 C119 45 219 43 270 72 C218 115 122 114 68 130" : type === "l2" ? "M68 130 C124 31 231 25 275 65 C309 96 249 122 215 97" : type === "inner" ? "M68 130 C90 34 221 32 272 63 C239 109 121 120 68 130" : type === "asteroid" ? "M68 130 C112 35 191 44 270 65 C222 117 151 145 68 130" : "M68 130 C94 46 180 28 275 61 C315 93 259 122 221 93";
  return `<div class="orbit-graphic"><svg viewBox="0 0 340 180" role="img" aria-label="Schematic route for ${safeText(title)}"><defs><radialGradient id="earthGradient"><stop stop-color="#6dc3c8"/><stop offset="1" stop-color="#174558"/></radialGradient><filter id="routeGlow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><ellipse cx="72" cy="130" rx="29" ry="14" fill="none" stroke="#37667a" stroke-dasharray="2 4"/><ellipse cx="72" cy="130" rx="40" ry="19" fill="none" stroke="#223e52" stroke-dasharray="2 5"/><path d="${path}" fill="none" stroke="#56d3d1" stroke-width="1.5" stroke-dasharray="3 4"/><circle cx="72" cy="130" r="9" fill="url(#earthGradient)"/><circle cx="72" cy="130" r="15" fill="none" stroke="#4db6c2" stroke-opacity=".35"/><circle cx="${target.x}" cy="${target.y}" r="8" fill="${type === "mars" ? "#c87856" : type === "moon" ? "#b9c7d5" : "#e5bc7a"}" filter="url(#routeGlow)"/><circle cx="${target.x}" cy="${target.y}" r="14" fill="none" stroke="#aec2d1" stroke-opacity=".2"/><circle cx="163" cy="65" r="2.5" fill="#d9e7eb"/><path d="M164 66 155 57" stroke="#8094a3" stroke-width=".7"/><text x="139" y="53" fill="#728798" font-size="7" font-family="DM Mono">TRANSFER</text><text x="45" y="159" fill="#a9bbc4" font-size="7" font-family="DM Mono">EARTH</text><text x="${target.x - 13}" y="${target.y - 15}" fill="#a9bbc4" font-size="7" font-family="DM Mono">${target.label}</text><circle cx="25" cy="43" r="1" fill="#e7edf1"/><circle cx="188" cy="145" r="1.2" fill="#e7edf1"/><circle cx="305" cy="116" r="1" fill="#e7edf1"/><circle cx="227" cy="34" r="1" fill="#e7edf1"/></svg></div>`;
}

function selectMission(name) {
  const mission = state.missions.find((item) => item.name === name);
  if (!mission) return;
  state.selected = {...mission, ...(getMissionData(name) || {})};
  renderList();
  const data = state.selected;
  const origin = data.origin ? `<a href="${safeText(data.launchSource || data.source)}" target="_blank" rel="noreferrer">${safeText(data.origin)}</a>` : "Not listed in this explorer";
  const launchDate = data.launch ? new Date(`${data.launch}T12:00:00Z`).toLocaleDateString("en-US", {month:"short", day:"numeric", year:"numeric", timeZone:"UTC"}) : data.launch_date || "Not available";
  const source = data.source ? `<a href="${safeText(data.source)}" target="_blank" rel="noreferrer">NASA mission page ↗</a>` : `<a href="https://www.nasa.gov/a-to-z-of-nasa-missions/" target="_blank" rel="noreferrer">NASA A–Z catalog ↗</a>`;
  const target = data.target || classifyTarget(data.name);
  const missionPeriod = data.period || (data.launch || data.launch_date ? data.status === "Active" || data.status === "En route" ? `Launched ${launchDate} · ongoing` : data.status ? `Launched ${launchDate} · ${data.status.toLowerCase()}` : `Launch listed ${launchDate} · mission dates not summarized` : "Not listed in this explorer");
  const vehicle = data.vehicle || "Not listed in this explorer";
  const crewed = data.crewNote || (data.crewed === true ? "Crewed mission" : data.crewed === false ? "Uncrewed mission" : "Not verified");
  $("#detail-index").textContent = String(state.missions.findIndex((item) => item.name === name) + 1).padStart(2, "0");
  $("#detail-content").innerHTML = `<div class="mission-detail"><div class="detail-kicker">${safeText(data.status || "NASA CATALOG ENTRY")}</div><h3>${safeText(data.name)}</h3><div class="detail-subtitle">DESTINATION · ${safeText(target)}</div>${routeSvg(data.routeType, data.name)}<div class="mission-facts"><div class="fact"><span class="fact-label">MISSION PERIOD</span><span class="fact-value">${safeText(missionPeriod)}</span></div><div class="fact"><span class="fact-label">LAUNCH DATE</span><span class="fact-value">${safeText(launchDate)}</span></div><div class="fact"><span class="fact-label">SPACE VEHICLE</span><span class="fact-value">${safeText(vehicle)}</span></div><div class="fact"><span class="fact-label">CREW</span><span class="fact-value">${safeText(crewed)}</span></div><div class="fact"><span class="fact-label">LAUNCH SITE</span><span class="fact-value">${origin}</span></div><div class="fact"><span class="fact-label">MISSION SOURCE</span><span class="fact-value">${source}</span></div></div>${data.route ? `<p class="mission-route"><span>FLIGHT PATH &nbsp;/&nbsp;</span> ${safeText(data.route)}</p>` : ""}</div>`;
}

function resetFilters() {
  state.decade = "all"; state.visible = 60;
  $("#search").value = "";
  document.querySelectorAll("#decade-filters .filter-chip").forEach((button) => button.classList.toggle("active", button.dataset.decade === "all"));
  renderList();
}

async function init() {
  let catalog = [];
  try {
    const response = await fetch("missions.json");
    if (response.ok) catalog = (await response.json()).missions || [];
  } catch (error) {
    console.warn("NASA catalog list could not be loaded; showing curated entries only.", error);
  }
  state.missions = combinedMissions(catalog);
  renderDecadeFilters();
  renderList();
  $("#search").addEventListener("input", () => { state.visible = 60; renderList(); });
  $("#load-more").addEventListener("click", () => { state.visible += 60; renderList(); });
  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); $("#search").focus(); }
    if (event.key === "Escape") $("#search").blur();
  });
}

init();
