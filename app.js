const CURATED = [
  {name:"Apollo 11",year:1969,target:"Moon",origin:"Kennedy Space Center, Florida, USA",launch:"1969-07-16",status:"Completed",source:"https://www.nasa.gov/mission/apollo-11/",launchSource:"https://www.nasa.gov/mission/apollo-11/",route:"Earth → lunar orbit → Moon",routeType:"moon"},
  {name:"Artemis I",year:2022,target:"Moon",origin:"Kennedy Space Center, Florida, USA",launch:"2022-11-16",status:"Completed",source:"https://www.nasa.gov/mission/artemis-i/",launchSource:"https://www.nasa.gov/mission/artemis-i/",route:"Earth → lunar distant retrograde orbit → Earth",routeType:"moon"},
  {name:"Artemis II",year:2026,target:"Moon",origin:"Kennedy Space Center, Florida, USA",launch:"2026-04-01",status:"Completed",source:"https://www.nasa.gov/mission/artemis-ii/",launchSource:"https://www.nasa.gov/mission/artemis-ii/",route:"Earth → lunar flyby → Earth",routeType:"moon"},
  {name:"Cassini-Huygens",year:1997,target:"Saturn",origin:"Cape Canaveral Space Force Station, Florida, USA",launch:"1997-10-15",status:"Completed",source:"https://science.nasa.gov/mission/cassini/",launchSource:"https://science.nasa.gov/mission/cassini/",route:"Earth → Venus flybys → Jupiter flyby → Saturn",routeType:"saturn"},
  {name:"Curiosity (MSL)",year:2011,target:"Mars",origin:"Cape Canaveral Space Force Station, Florida, USA",launch:"2011-11-26",status:"Active",source:"https://science.nasa.gov/mission/msl-curiosity/",launchSource:"https://science.nasa.gov/mission/msl-curiosity/",route:"Earth → Mars transfer → Gale Crater",routeType:"mars"},
  {name:"DART",year:2021,target:"Asteroid Dimorphos",origin:"Vandenberg Space Force Base, California, USA",launch:"2021-11-24",status:"Completed",source:"https://science.nasa.gov/mission/dart/",launchSource:"https://science.nasa.gov/mission/dart/",route:"Earth → Didymos system → Dimorphos impact",routeType:"asteroid"},
  {name:"Dawn",year:2007,target:"Vesta and Ceres",origin:"Cape Canaveral Space Force Station, Florida, USA",launch:"2007-09-27",status:"Completed",source:"https://science.nasa.gov/mission/dawn/",launchSource:"https://science.nasa.gov/mission/dawn/",route:"Earth → Vesta orbit → Ceres orbit",routeType:"asteroid"},
  {name:"Europa Clipper",year:2024,target:"Jupiter / Europa",origin:"Kennedy Space Center, Florida, USA",launch:"2024-10-14",status:"En route",source:"https://science.nasa.gov/mission/europa-clipper/",launchSource:"https://science.nasa.gov/mission/europa-clipper/",route:"Earth → Mars gravity assist → Earth → Jupiter",routeType:"jupiter"},
  {name:"Hubble Space Telescope",year:1990,target:"Low Earth orbit",origin:"Kennedy Space Center, Florida, USA",launch:"1990-04-24",status:"Active",source:"https://science.nasa.gov/mission/hubble/",launchSource:"https://science.nasa.gov/mission/hubble/",route:"Earth launch → low Earth orbit",routeType:"earth"},
  {name:"James Webb Space Telescope",year:2021,target:"Sun–Earth L₂",origin:"Guiana Space Centre, Kourou, French Guiana",launch:"2021-12-25",status:"Active",source:"https://science.nasa.gov/mission/webb/",launchSource:"https://science.nasa.gov/mission/webb/",route:"Earth → Sun–Earth L₂ halo orbit",routeType:"l2"},
  {name:"Juno",year:2011,target:"Jupiter",origin:"Cape Canaveral Space Force Station, Florida, USA",launch:"2011-08-05",status:"Active",source:"https://science.nasa.gov/mission/juno/",launchSource:"https://science.nasa.gov/mission/juno/",route:"Earth → Jupiter polar orbit",routeType:"jupiter"},
  {name:"Lunar Reconnaissance Orbiter",year:2009,target:"Moon",origin:"Cape Canaveral Space Force Station, Florida, USA",launch:"2009-06-18",status:"Active",source:"https://science.nasa.gov/mission/lro/",launchSource:"https://science.nasa.gov/mission/lro/",route:"Earth → lunar transfer → low lunar orbit",routeType:"moon"},
  {name:"Mars 2020 / Perseverance",year:2020,target:"Mars",origin:"Cape Canaveral Space Force Station, Florida, USA",launch:"2020-07-30",status:"Active",source:"https://science.nasa.gov/mission/mars-2020-perseverance/",launchSource:"https://science.nasa.gov/mission/mars-2020-perseverance/",route:"Earth → Mars transfer → Jezero Crater",routeType:"mars"},
  {name:"Mariner 2",year:1962,target:"Venus",origin:"Cape Canaveral, Florida, USA",launch:"1962-08-27",status:"Completed",source:"https://science.nasa.gov/mission/mariner-2/",launchSource:"https://science.nasa.gov/mission/mariner-2/",route:"Earth → Venus flyby",routeType:"venus"},
  {name:"New Horizons",year:2006,target:"Pluto and Kuiper Belt",origin:"Cape Canaveral Space Force Station, Florida, USA",launch:"2006-01-19",status:"Active",source:"https://science.nasa.gov/mission/new-horizons/",launchSource:"https://science.nasa.gov/mission/new-horizons/",route:"Earth → Jupiter gravity assist → Pluto → Arrokoth",routeType:"outer"},
  {name:"OSIRIS-REx",year:2016,target:"Asteroid Bennu",origin:"Cape Canaveral Space Force Station, Florida, USA",launch:"2016-09-08",status:"En route",source:"https://science.nasa.gov/mission/osiris-rex/",launchSource:"https://science.nasa.gov/mission/osiris-rex/",route:"Earth → Bennu rendezvous → sample return to Earth",routeType:"asteroid"},
  {name:"Parker Solar Probe",year:2018,target:"The Sun",origin:"Cape Canaveral Space Force Station, Florida, USA",launch:"2018-08-12",status:"Active",source:"https://science.nasa.gov/mission/parker-solar-probe/",launchSource:"https://science.nasa.gov/mission/parker-solar-probe/",route:"Earth → repeated Venus gravity assists → solar orbit",routeType:"sun"},
  {name:"Pioneer 10",year:1972,target:"Jupiter / interstellar space",origin:"Cape Canaveral, Florida, USA",launch:"1972-03-03",status:"Completed",source:"https://science.nasa.gov/mission/pioneer-10/",launchSource:"https://science.nasa.gov/mission/pioneer-10/",route:"Earth → Jupiter flyby → escape trajectory",routeType:"outer"},
  {name:"Voyager 1",year:1977,target:"Interstellar space",origin:"Cape Canaveral, Florida, USA",launch:"1977-09-05",status:"Active",source:"https://science.nasa.gov/mission/voyager-1/",launchSource:"https://science.nasa.gov/mission/voyager-1/",route:"Earth → Jupiter flyby → Saturn flyby → interstellar space",routeType:"outer"},
  {name:"Voyager 2",year:1977,target:"Uranus, Neptune / interstellar space",origin:"Cape Canaveral, Florida, USA",launch:"1977-08-20",status:"Active",source:"https://science.nasa.gov/mission/voyager-2/",launchSource:"https://science.nasa.gov/mission/voyager-2/",route:"Earth → Jupiter → Saturn → Uranus → Neptune",routeType:"outer"}
];

// Mission-specific facts link back to the NASA page on each curated entry.
// Unknown facts stay blank instead of being inferred from the catalog title.
const VERIFIED_DETAILS = {
  "Apollo 11": {period:"July 16–24, 1969", vehicle:"Saturn V; Apollo Command/Service Module and Lunar Module", crewed:true},
  "Artemis I": {period:"November 16–December 11, 2022", vehicle:"Space Launch System (SLS) Block 1 and Orion spacecraft", crewed:false, crewNote:"Uncrewed test flight; carried the instrumented mannequin Commander Moonikin Campos"},
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

const state = { missions: [], visible: 60, selected: null, decade: "all", status: "all" };
const $ = (selector) => document.querySelector(selector);
const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
const normalizeUrl = (value) => String(value || "").replace(/^https?:\/\//, "").replace(/\/(?=$|#)/, "");
const safeText = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));

// Match move-explorer: don't load Google Analytics before consent or on local previews.
const GA_ID = "G-Z3JM0ZF2C0";
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

// Withdrawing consent must stop tracking: expire GA cookies and reload so gtag is gone.
function removeAnalytics() {
  const domains = ["", location.hostname, `.${location.hostname}`];
  document.cookie.split(";").map((cookie) => cookie.split("=")[0].trim()).filter((name) => name.startsWith("_ga")).forEach((name) => {
    domains.forEach((domain) => { document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`; });
  });
  location.reload();
}

function setupAnalyticsConsent() {
  const banner = $("#analytics-consent");
  const choose = (value) => {
    setAnalyticsConsent(value);
    banner.hidden = true;
    if (value === "granted") loadAnalytics();
    else if (gaLoaded) removeAnalytics();
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

// --- Journey diagram -----------------------------------------------------------------------
// Each mission becomes a row of illustrated stops (Earth → … → destination) joined by a flight path.
const ROUTE_DESTINATIONS = {
  earth:"Earth orbit", station:"International Space Station", suborbital:"Suborbital flight", airborne:"Earth's atmosphere",
  ground:"Earth (ground-based)", moon:"Moon", l1:"Sun–Earth L₁", l2:"Sun–Earth L₂", mars:"Mars", venus:"Venus", mercury:"Mercury",
  sun:"The Sun", heliocentric:"Orbit around the Sun", asteroid:"Asteroid", comet:"Comet", jupiter:"Jupiter system",
  saturn:"Saturn system", outer:"Outer solar system"
};

// Recognisable body for a stop label, checked in order.
const BODY_RULES = [
  [/international space station|\biss\b|skylab|space station|gateway/i, "station"], [/l[₁1]\b|lagrange.*1/i, "l1"], [/l[₂2]\b|lagrange.*2/i, "l2"],
  [/splashdown|sample return|return to earth|→?\s*earth$/i, "splash"], [/mercury/i, "mercury"], [/venus/i, "venus"],
  [/jupiter|europa|io\b|ganymede/i, "jupiter"], [/saturn|titan|enceladus/i, "saturn"], [/uranus/i, "uranus"], [/neptune/i, "neptune"],
  [/pluto|arrokoth|kuiper/i, "pluto"], [/interstellar|escape|heliopause|deep space/i, "interstellar"], [/comet|halley|tempel|churyumov/i, "comet"],
  [/asteroid|bennu|dimorphos|didymos|vesta|ceres|psyche|itokawa|ryugu|eros|trojan/i, "asteroid"], [/mars|gale|jezero|phobos|deimos/i, "mars"],
  [/moon|lunar/i, "moon"], [/sun\b|solar orbit|corona|solar/i, "sun"], [/balloon/i, "balloon"], [/aircraft|airborne|flight over|take-off|study area/i, "aircraft"],
  [/ground|facility|telescope site|habitat|analog/i, "ground"], [/orbit/i, "orbit"], [/earth/i, "earth"]
];
const bodyFor = (label) => (BODY_RULES.find(([pattern]) => pattern.test(label)) || [null, "orbit"])[1];

function journeyStops(data) {
  const launch = launchText(data);
  const launched = Boolean(data.launch || (data.launchDate && !data.planned && data.dateLabel !== "Scheduled launch"));
  const start = {label:"Earth", body:"earth", note: launched ? launch : data.planned ? "Planned" : ""};
  const end = data.milestone || null;
  const endNote = end ? milestoneText(end).replace(/\s*\/.*$/, "") : "";
  const target = data.target && !/^(earth|universe|sun-earth interaction|space environment|solar system.*|exoplanets|milky way)$/i.test(data.target) ? data.target : null;
  // Curated missions carry a real route string, e.g. "Earth → Venus flybys → Jupiter flyby → Saturn".
  if (data.route) {
    const parts = data.route.split("→").map((part) => part.trim()).filter(Boolean);
    return parts.map((part, index) => index === 0 ? {...start, label: /launch/i.test(part) ? "Earth launch" : "Earth"} :
      {label: part.charAt(0).toUpperCase() + part.slice(1), body: index === parts.length - 1 && /earth/i.test(part) ? "splash" : bodyFor(part), note: index === parts.length - 1 && end ? endNote : ""});
  }
  const crewedReturn = end && end.ends && /splashdown|landing/i.test(end.label);
  const returnsSample = /sample return/i.test(data.type || "");
  const dest = (body, label) => ({body, label, note: end && !end.ends ? endNote : ""});
  switch (data.routeType) {
    case "ground": return [{label: data.target || "Ground facility", body:"ground", note: launch !== "Not available" ? launch : ""}];
    case "airborne": {
      const craft = /balloon/i.test(data.type || data.name) ? "balloon" : "aircraft";
      return [{label: craft === "balloon" ? "Balloon launch" : "Take-off", body: craft, note: data.launchText || launch}, {label: data.target && !/^earth$/i.test(data.target) ? data.target : "Study area", body:"earth", note:""}, {label:"Return to base", body:"ground", note:""}];
    }
    case "suborbital": return [start, {label:"Edge of space", body:"orbit", note:""}, {label:"Splashdown", body:"splash", note: endNote}];
    case "station": return [start, {label:"Space station", body:"station", note:""}, ...(crewedReturn ? [{label:"Return to Earth", body:"splash", note: endNote}] : [])];
    case "earth": return [start, {label: target && /orbit/i.test(target) ? target : "Earth orbit", body:"orbit", note:""}, ...(crewedReturn ? [{label: end.label, body:"splash", note: endNote}] : [])];
    case "moon": return [start, dest("moon", target || "Moon"), ...(crewedReturn || /artemis|apollo [0-9]/i.test(data.name) && end ? [{label:"Splashdown", body:"splash", note: endNote}] : [])];
    case "l1": return [start, {label:"Sun–Earth L₁", body:"l1", note:""}];
    case "l2": return [start, {label:"Sun–Earth L₂", body:"l2", note:""}];
    case "heliocentric": return [start, {label:"Orbit around the Sun", body:"sun", note:""}];
    case "outer": return [start, {label:"Jupiter flyby", body:"jupiter", note:""}, {label: target || "Interstellar space", body:"interstellar", note:""}];
    case "asteroid": case "comet": return [start, dest(data.routeType, target || (data.routeType === "comet" ? "Comet" : "Asteroid")), ...(returnsSample ? [{label:"Sample return", body:"splash", note: end && end.ends ? endNote : ""}] : [])];
    case "mars": return [start, dest("mars", target || "Mars"), ...(returnsSample ? [{label:"Sample return", body:"splash", note:""}] : [])];
    default: {
      const body = data.routeType || "orbit";
      return [start, dest(body === "sun" ? "sun" : body, target || ROUTE_DESTINATIONS[body] || "Destination")];
    }
  }
}

// Small illustrated bodies, drawn centred on (x, y).
function bodySvg(kind, x, y) {
  const g = (inner) => `<g transform="translate(${x} ${y})">${inner}</g>`;
  switch (kind) {
    case "earth": return g(`<circle r="17" fill="url(#jEarth)"/><path d="M-9-6c4-3 8-2 11 0 2 2 6 1 7 4-3 2-6 1-8 4-2 3-6 2-7-1-1-2-4-3-3-7Z" fill="#8ac3ad" opacity=".85"/><path d="M3 7c3-1 6 0 7 2-2 3-6 4-8 2Z" fill="#8ac3ad" opacity=".75"/><circle r="20" fill="none" stroke="#6dc3c8" stroke-opacity=".35"/>`);
    case "splash": return g(`<circle r="13" fill="url(#jEarth)"/><path d="M-6-21v-9M-6-30l-8 6M-6-30l8 6" stroke="#e7edf1" stroke-width="1"/><path d="M-15-29a9 6 0 0 1 18 0Z" fill="#eea06c"/><path d="M-12 18q3-3 6 0t6 0 6 0" fill="none" stroke="#6dc3c8" stroke-width="1.2"/>`);
    case "moon": return g(`<circle r="12" fill="url(#jMoon)"/><circle cx="-4" cy="-3" r="2.6" fill="#8f9aa6"/><circle cx="4" cy="4" r="1.8" fill="#8f9aa6"/><circle cx="5" cy="-5" r="1.2" fill="#8f9aa6"/>`);
    case "mars": return g(`<circle r="14" fill="url(#jMars)"/><ellipse cy="-11" rx="6" ry="2.2" fill="#f4ece4" opacity=".9"/><path d="M-8 2c4-2 8 1 12-1" stroke="#8a3f26" stroke-width="2.5" fill="none" opacity=".6"/>`);
    case "venus": return g(`<circle r="15" fill="url(#jVenus)"/><path d="M-12-3c6 2 14-2 24 1M-11 5c8-1 14 2 22 0" stroke="#fff6dc" stroke-opacity=".35" fill="none"/>`);
    case "mercury": return g(`<circle r="9" fill="#a3978c"/><circle cx="-3" cy="-2" r="1.6" fill="#7d736a"/><circle cx="3" cy="3" r="1.2" fill="#7d736a"/>`);
    case "sun": return g(`<circle r="30" fill="url(#jGlow)"/><circle r="19" fill="url(#jSun)"/>`);
    case "jupiter": return g(`<circle r="21" fill="#d9a46c"/><path d="M-20-8h40M-21 0h42M-19 8h38" stroke="#a8693d" stroke-width="3" opacity=".7"/><ellipse cx="7" cy="5" rx="4" ry="2.4" fill="#b8492f"/>`);
    case "saturn": return g(`<circle r="14" fill="#e3c98f"/><path d="M-13-4h26M-13 4h26" stroke="#b99556" stroke-width="2" opacity=".6"/><ellipse rx="27" ry="7" fill="none" stroke="#efdcae" stroke-width="2.5" transform="rotate(-18)"/>`);
    case "uranus": return g(`<circle r="12" fill="#9fe0e6"/><ellipse rx="18" ry="3" fill="none" stroke="#cdeff2" stroke-opacity=".6" transform="rotate(80)"/>`);
    case "neptune": return g(`<circle r="12" fill="#4f7fd8"/><ellipse cx="-3" cy="-2" rx="3" ry="1.6" fill="#2c4f9e"/>`);
    case "pluto": return g(`<circle r="8" fill="#d8bfa0"/><path d="M0 1c-3-4 2-6 3-2 2-4 6-1 2 3l-3 3Z" fill="#f3e6d3"/>`);
    case "asteroid": return g(`<path d="M-12-3l5-9 9-1 7 5 2 8-6 7-10 1-7-5Z" fill="#9b8a76"/><circle cx="-3" cy="-2" r="2" fill="#7a6b5b"/><circle cx="4" cy="3" r="1.5" fill="#7a6b5b"/>`);
    case "comet": return g(`<path d="M-4-3L-38-16-36-8-40 2-5 3Z" fill="url(#jTail)"/><circle r="5" fill="#d9e7eb"/><circle r="9" fill="#9fd4e6" opacity=".25"/>`);
    case "station": return g(`<rect x="-3" y="-3" width="6" height="6" fill="#d9e7eb"/><path d="M-20 0h40" stroke="#d9e7eb" stroke-width="1.5"/><path d="M-20-9h8v18h-8ZM12-9h8v18h-8Z" fill="#3c76a8" stroke="#9fd4e6" stroke-width=".6"/>`);
    case "orbit": return g(`<circle r="9" fill="url(#jEarth)" opacity=".75"/><ellipse rx="19" ry="7" fill="none" stroke="#56d3d1" stroke-dasharray="2 3" transform="rotate(-15)"/><g transform="translate(15 -8)"><rect x="-2" y="-2" width="4" height="4" fill="#e7edf1"/><path d="M-7-1.5h4v3h-4ZM3-1.5h4v3h-4Z" fill="#3c76a8"/></g>`);
    case "l1": case "l2": return g(`<circle r="13" fill="none" stroke="#e5bc7a" stroke-dasharray="2 3"/><path d="M-6 0h12M0-6v12" stroke="#e5bc7a"/><text y="4" x="16" fill="#e5bc7a" font-size="9" font-family="DM Mono">${kind === "l1" ? "L₁" : "L₂"}</text>`);
    case "interstellar": return g(`<path d="M-6-22a28 28 0 0 1 0 44" fill="none" stroke="#6b84da" stroke-dasharray="2 3"/><circle cx="8" cy="-8" r="1.2" fill="#fff"/><circle cx="14" cy="6" r="1" fill="#fff"/><circle cx="4" cy="12" r="1.4" fill="#fff"/><circle cx="18" cy="-2" r="1" fill="#fff"/>`);
    case "aircraft": return g(`<path d="M-16 1l12-2 6-10h4l-3 10 9-1 3-4h3l-1 6 1 6h-3l-3-4-9-1 3 10h-4l-6-10-12-2Z" fill="#d9e7eb"/>`);
    case "balloon": return g(`<path d="M0-18c10 0 13 9 9 16L2 8h-4l-7-10c-4-7-1-16 9-16Z" fill="#e7edf1"/><path d="M-2 8l1 7h2l1-7" stroke="#e7edf1" fill="none"/><rect x="-3" y="15" width="6" height="4" fill="#eea06c"/>`);
    case "ground": return g(`<path d="M-14 8h28M-10 8v-6a10 10 0 0 1 20 0v6" fill="none" stroke="#d9e7eb" stroke-width="1.5"/><path d="M0-8l6-6" stroke="#eea06c" stroke-width="2"/><path d="M-18 12h36" stroke="#3a5466"/>`);
    default: return g(`<circle r="10" fill="#e5bc7a"/>`);
  }
}

const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function wrapLabel(text, x, y, width = 15) {
  const words = String(text).split(/\s+/); const lines = [""];
  words.forEach((word) => { if ((lines[lines.length - 1] + " " + word).trim().length > width && lines[lines.length - 1]) lines.push(word); else lines[lines.length - 1] = (lines[lines.length - 1] + " " + word).trim(); });
  return lines.slice(0, 2).map((line, index) => `<tspan x="${x}" y="${y + index * 10}">${safeText(index === 1 && lines.length > 2 ? line + "…" : line)}</tspan>`).join("");
}

function journeySvg(data) {
  const stops = journeyStops(data);
  const width = 360, baseY = 92;
  const xs = stops.length === 1 ? [width / 2] : stops.map((_, index) => 40 + index * ((width - 80) / (stops.length - 1)));
  const ys = stops.map((_, index) => baseY - Math.sin(Math.PI * (stops.length === 1 ? 0.5 : index / (stops.length - 1))) * 18);
  let path = "";
  for (let i = 0; i < stops.length - 1; i++) {
    const mx = (xs[i] + xs[i + 1]) / 2, my = Math.min(ys[i], ys[i + 1]) - 34;
    path += `${i === 0 ? `M${xs[0]} ${ys[0]}` : ""} Q${mx} ${my} ${xs[i + 1]} ${ys[i + 1]}`;
  }
  const craft = path ? `<g><path d="M-5-3L6 0-5 3-3 0Z" fill="#f0ffff"/><circle r="6" fill="#56d3d1" opacity=".18"/>${reducedMotion() ? "" : `<animateMotion dur="${2.5 + stops.length}s" repeatCount="indefinite" rotate="auto" path="${path}"/>`}</g>` : "";
  const stars = [[18,24],[70,150],[120,18],[205,160],[250,22],[330,140],[300,40],[160,130],[345,80]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${(x + y) % 3 ? 0.8 : 1.3}" fill="#e7edf1" opacity=".55"/>`).join("");
  const labels = stops.map((stop, index) => `<text text-anchor="middle" fill="#cfdbe2" font-size="8.5" font-family="DM Sans" font-weight="600">${wrapLabel(stop.label, xs[index], ys[index] + 40)}</text>${stop.note ? `<text x="${xs[index]}" y="${ys[index] + 63}" text-anchor="middle" fill="#56d3d1" font-size="7" font-family="DM Mono">${safeText(String(stop.note).slice(0, 24))}</text>` : ""}`).join("");
  const description = stops.map((stop) => stop.label).join(" → ");
  return `<div class="orbit-graphic journey"><svg viewBox="0 0 ${width} 180" role="img" aria-label="Journey for ${safeText(data.name)}: ${safeText(description)}"><defs>
<radialGradient id="jEarth" cx="35%" cy="30%"><stop stop-color="#8bd7ec"/><stop offset=".55" stop-color="#2a86a4"/><stop offset="1" stop-color="#123950"/></radialGradient>
<radialGradient id="jMoon" cx="35%" cy="30%"><stop stop-color="#e3e9ef"/><stop offset="1" stop-color="#8d99a6"/></radialGradient>
<radialGradient id="jMars" cx="35%" cy="30%"><stop stop-color="#f0a47a"/><stop offset="1" stop-color="#9c4a2c"/></radialGradient>
<radialGradient id="jVenus" cx="35%" cy="30%"><stop stop-color="#fbe7b5"/><stop offset="1" stop-color="#c79a55"/></radialGradient>
<radialGradient id="jSun" cx="40%" cy="35%"><stop stop-color="#fff3c4"/><stop offset=".6" stop-color="#f7c35f"/><stop offset="1" stop-color="#e8873a"/></radialGradient>
<radialGradient id="jGlow"><stop stop-color="#f7c35f" stop-opacity=".45"/><stop offset="1" stop-color="#f7c35f" stop-opacity="0"/></radialGradient>
<linearGradient id="jTail" x1="1" x2="0"><stop stop-color="#9fd4e6" stop-opacity=".8"/><stop offset="1" stop-color="#9fd4e6" stop-opacity="0"/></linearGradient></defs>
${stars}${path ? `<path d="${path}" fill="none" stroke="#56d3d1" stroke-width="1.6" stroke-dasharray="4 5" stroke-linecap="round" opacity=".8"/>` : ""}
${stops.map((stop, index) => bodySvg(stop.body, xs[index], ys[index])).join("")}${craft}${labels}</svg></div>`;
}

// --- Data helpers -----------------------------------------------------------------------------
const STATUS_LABELS = {Active:"Active", "Extended Mission":"Active", "Operations Ongoing":"Active", Ongoing:"Active", Past:"Completed", Inactive:"Inactive", Future:"Upcoming"};
const TODAY = new Date().toISOString().slice(0, 10);
function statusLabel(mission) {
  if (mission.status) return STATUS_LABELS[mission.status] || mission.status;
  if (mission.planned) return "Upcoming";
  // A crewed flight or campaign with a recorded end (landing, splashdown…) in the past is complete.
  return mission.milestone?.ends && mission.milestone.date && mission.milestone.date < TODAY ? "Completed" : "";
}
const ROBOTIC = /orbiter|lander|rover|flyby|probe|impact|cubesat|smallsat|telescope|observatory|instrument|experiment|sample return|satellite|payload|technology|rotorcraft|space environment|earth observation|small spacecraft|space antenna/i;

// Curated entries replace their NASA catalog row, matched by NASA page URL (or name as a fallback).
function combinedMissions(catalog) {
  const map = new Map();
  (catalog || []).forEach((item) => map.set(normalizeUrl(item.source), {...item}));
  CURATED.forEach((mission) => {
    const key = [...map.keys()].find((url) => url === normalizeUrl(mission.source)) || [...map.entries()].find(([, item]) => normalize(item.name) === normalize(mission.name))?.[0] || normalizeUrl(mission.source);
    map.set(key, {...map.get(key), ...mission, ...VERIFIED_DETAILS[mission.name], curated:true});
  });
  return [...map.values()].sort((a,b) => a.name.localeCompare(b.name));
}

const destinationOf = (mission) => mission.target || ROUTE_DESTINATIONS[mission.routeType] || "Not listed";

function decadeOf(mission) {
  if (mission.planned) return "upcoming";
  return mission.year ? String(Math.floor(mission.year / 10) * 10) : "unknown";
}

function statusGroup(mission) {
  const label = statusLabel(mission);
  return label === "Active" || label === "En route" ? "active" : label === "Upcoming" ? "upcoming" : label === "Completed" || label === "Inactive" ? "completed" : "unknown";
}

function currentMissions() {
  const query = $("#search").value.trim().toLowerCase();
  return state.missions.filter((mission) => {
    const text = `${mission.name} ${destinationOf(mission)} ${mission.origin || ""} ${mission.site || ""} ${mission.type || ""} ${(mission.programs || []).join(" ")}`.toLowerCase();
    return (!query || text.includes(query)) && (state.decade === "all" || decadeOf(mission) === state.decade) && (state.status === "all" || statusGroup(mission) === state.status);
  });
}

function setFilter(group, value) {
  state[group] = value;
  state.visible = 60;
  document.querySelectorAll(`#${group}-filters .filter-chip`).forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.value === value);
    chip.setAttribute("aria-pressed", String(chip.dataset.value === value));
  });
  renderList();
}

function renderFilters() {
  const chip = (group, value, label, count) => `<button type="button" class="filter-chip${state[group] === value ? " active" : ""}" data-group="${group}" data-value="${value}" aria-pressed="${state[group] === value}">${label} <span class="decade-count">${count}</span></button>`;
  const tally = (fn) => state.missions.reduce((counts, mission) => counts.set(fn(mission), (counts.get(fn(mission)) || 0) + 1), new Map());
  const decades = tally(decadeOf);
  $("#decade-filters").innerHTML = [
    chip("decade", "all", "All decades", state.missions.length),
    ...[...decades.keys()].filter((key) => /^\d+$/.test(key)).sort().map((decade) => chip("decade", decade, `${decade}s`, decades.get(decade))),
    decades.get("upcoming") ? chip("decade", "upcoming", "Upcoming", decades.get("upcoming")) : "",
    decades.get("unknown") ? chip("decade", "unknown", "Date not listed", decades.get("unknown")) : ""
  ].join("");
  const statuses = tally(statusGroup);
  $("#status-filters").innerHTML = [["all", "Any status", state.missions.length], ["active", "Active", statuses.get("active")], ["completed", "Completed", statuses.get("completed")], ["upcoming", "Upcoming", statuses.get("upcoming")], ["unknown", "Not listed", statuses.get("unknown")]]
    .filter(([, , count]) => count).map(([value, label, count]) => chip("status", value, label, count)).join("");
}

function resultsLabel() {
  const decade = state.decade === "all" ? "" : state.decade === "unknown" ? "DATE NOT LISTED" : state.decade === "upcoming" ? "UPCOMING" : `${state.decade}S`;
  const status = state.status === "all" ? "" : state.status.toUpperCase();
  const parts = [decade, status].filter(Boolean).join(" · ");
  return parts ? `${parts} MISSIONS` : "ALL MISSIONS";
}

function renderList() {
  const filtered = currentMissions();
  const page = filtered.slice(0, state.visible);
  $("#mission-list").innerHTML = page.length ? page.map((mission) => {
    const isSelected = state.selected?.name === mission.name;
    const group = statusGroup(mission);
    const statusClass = group === "active" ? "active" : mission.status === "En route" || group === "upcoming" ? "enroute" : "";
    const yearLabel = mission.planned ? (mission.year ? `${mission.year}*` : "TBD") : mission.year || "NASA";
    return `<button type="button" class="mission-card${isSelected ? " selected" : ""}" data-name="${safeText(mission.name)}" aria-pressed="${isSelected}"><span class="mission-year">${yearLabel}</span><span><span class="mission-name">${safeText(mission.name)}</span><span class="mission-target">${safeText(destinationOf(mission))}</span></span><span class="status-dot ${statusClass}" title="${safeText(statusLabel(mission) || "Status not listed")}"></span></button>`;
  }).join("") : `<div class="no-results">No missions match these filters.<br><a href="#" id="reset-filters">Reset filters</a></div>`;
  $("#results-count").textContent = `${filtered.length} ENTRIES`;
  $("#results-label").textContent = resultsLabel();
  $("#load-more").hidden = filtered.length <= state.visible;
}

// ISO dates (YYYY-MM-DD / YYYY-MM / YYYY) become readable text; NASA's own wording is used for ranges.
function formatDate(iso) {
  const [year, month, day] = String(iso).split("-").map(Number);
  if (day) return new Date(Date.UTC(year, month - 1, day, 12)).toLocaleDateString("en-US", {month:"short", day:"numeric", year:"numeric", timeZone:"UTC"});
  if (month) return new Date(Date.UTC(year, month - 1, 1, 12)).toLocaleDateString("en-US", {month:"long", year:"numeric", timeZone:"UTC"});
  return String(year);
}

function launchText(data) {
  if (data.launch) return formatDate(data.launch);
  if (data.launchText) return data.launchText;
  if (data.launchDate) return formatDate(data.launchDate);
  return data.planned ? "Not yet scheduled" : "Not available";
}

function crewText(data) {
  if (data.crewNote) return data.crewNote;
  if (data.crewed === false) return "Uncrewed mission";
  if (data.crew?.length) return `Crewed: ${data.crew.join(", ")}`;
  if (data.crewed === true) return "Crewed mission";
  if (data.passengers?.length) return `Uncrewed; carried ${data.passengers.join(", ")} (non-human)`;
  if (data.routeType === "ground") return "Not applicable (ground facility)";
  if (data.routeType === "airborne") return "Aircraft or balloon campaign; crew not listed";
  if (ROBOTIC.test(data.type || "") || ["l1","l2","mars","venus","mercury","sun","heliocentric","asteroid","comet","jupiter","saturn","outer"].includes(data.routeType)) return "Uncrewed (robotic)";
  return "Not verified";
}

const milestoneText = (milestone) => milestone.date && milestone.date.length === 10 ? formatDate(milestone.date) : milestone.text;

function periodText(data, launchDate) {
  if (data.period) return data.period;
  const launched = data.launch || (data.launchDate && !data.planned && data.dateLabel !== "Scheduled launch");
  if (data.planned) return "Not yet launched";
  if (!launched) return data.launchText && data.dateLabel !== "Launch" ? data.launchText : "Not listed in this explorer";
  if (/\d{4}\s*[-–]\s*(\d{4}|present)|through/i.test(data.launchText || "")) return data.launchText;  // campaign ranges
  const end = data.milestone?.ends ? milestoneText(data.milestone) : null;
  if (end) return `${launchDate} – ${end}`;
  const status = statusLabel(data);
  if (status === "Active" || status === "En route") return `${launchDate} – present`;
  if (status === "Completed" || status === "Inactive") return `Launched ${launchDate} · mission ended`;
  return `Launched ${launchDate}`;
}

function selectMission(name) {
  const mission = state.missions.find((item) => item.name === name);
  if (!mission) return;
  state.selected = mission;
  // Update the list in place so the clicked button (and keyboard focus) survives.
  document.querySelectorAll(".mission-card").forEach((card) => {
    card.classList.toggle("selected", card.dataset.name === name);
    card.setAttribute("aria-pressed", String(card.dataset.name === name));
  });
  const data = mission;
  const link = (url, text) => `<a href="${safeText(url)}" target="_blank" rel="noreferrer">${text}</a>`;
  const wikidataNote = (field) => data[`${field}Source`] === "Wikidata" && data.wikidata ? ` <span class="fact-note">${link(`https://www.wikidata.org/wiki/${data.wikidata}`, "via Wikidata ↗")}</span>` : "";
  const fact = (label, value, raw = false) => `<div class="fact"><span class="fact-label">${safeText(label)}</span><span class="fact-value">${raw ? value : safeText(value)}</span></div>`;
  const launchDate = launchText(data);
  const dateLabel = (data.curated ? "Launch date" : data.dateLabel || "Launch date").toUpperCase();
  const dateSource = !data.curated && data.dateSource ? ` <span class="fact-note">${link(data.dateSource, "source ↗")}</span>` : "";
  const dateNote = data.launchNote ? `<span class="fact-note">${safeText(data.launchNote)}</span>` : "";
  const site = data.origin ? link(data.launchSource || data.source, safeText(data.origin)) : data.site ? safeText(data.site) + wikidataNote("site") : "Not listed in this explorer";
  const source = data.source ? link(data.source, "NASA mission page ↗") : link("https://www.nasa.gov/a-to-z-of-nasa-missions/", "NASA A–Z catalog ↗");
  const crew = safeText(crewText(data)) + (!data.curated && data.crewSource === "Wikidata" ? wikidataNote("crew") : "");
  const facts = [
    fact("MISSION PERIOD", periodText(data, launchDate)),
    fact(dateLabel, safeText(launchDate) + dateSource + dateNote, true),
    fact("SPACE VEHICLE", safeText(data.vehicle || "Not listed in this explorer") + (data.curated ? "" : wikidataNote("vehicle")), true),
    fact("CREW", crew, true),
    fact("LAUNCH SITE", site, true),
    data.milestone && !String(data.dateLabel || "").includes("/") ? fact(data.milestone.label.toUpperCase(), milestoneText(data.milestone)) : "",
    data.duration ? fact("DURATION", data.duration) : "",
    data.programs?.length ? fact("PROGRAM", data.programs.join(", ")) : "",
    data.result ? fact("RESULT", data.result) : "",
    fact("MISSION SOURCE", source, true)
  ].join("");
  const image = data.image ? `<figure class="mission-image"><img src="${safeText(data.image.url)}" alt="${safeText(data.image.alt || "")}" loading="lazy">${data.image.credit ? `<figcaption>Image: ${safeText(data.image.credit)}</figcaption>` : ""}</figure>` : "";
  const summary = data.summary ? `<p class="mission-summary">${safeText(data.summary)}</p>` : "";
  const kicker = [statusLabel(data), data.type].filter(Boolean).join(" · ") || "NASA CATALOG ENTRY";
  const position = currentMissions().findIndex((item) => item.name === name);
  $("#detail-index").textContent = position >= 0 ? String(position + 1).padStart(2, "0") : "—";
  $("#detail-content").innerHTML = `<div class="mission-detail"><div class="detail-kicker">${safeText(kicker)}</div><h3>${safeText(data.name)}</h3><div class="detail-subtitle">DESTINATION · ${safeText(destinationOf(data))}</div>${journeySvg(data)}${summary || image ? `<div class="mission-about">${image}${summary}</div>` : ""}<div class="mission-facts">${facts}</div></div>`;
}

function resetFilters() {
  $("#search").value = "";
  state.status = "all";
  setFilter("decade", "all");
  setFilter("status", "all");
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
  $("#mission-count").textContent = state.missions.length.toLocaleString();
  $("#launch-count").textContent = state.missions.filter((mission) => mission.origin || mission.site).length.toLocaleString();
  renderFilters();
  renderList();
  document.querySelector(".sidebar").addEventListener("click", (event) => {
    const chip = event.target.closest(".filter-chip[data-group]");
    if (chip) setFilter(chip.dataset.group, chip.dataset.value);
  });
  $("#mission-list").addEventListener("click", (event) => {
    const card = event.target.closest(".mission-card");
    if (card) selectMission(card.dataset.name);
    if (event.target.id === "reset-filters") { event.preventDefault(); resetFilters(); }
  });
  $("#search").addEventListener("input", () => { state.visible = 60; renderList(); });
  $("#load-more").addEventListener("click", () => { state.visible += 60; renderList(); });
  if (!/Mac|iPhone|iPad/.test(navigator.platform)) $(".search-box kbd").textContent = "Ctrl K";
  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); $("#search").focus(); }
    if (event.key === "Escape") $("#search").blur();
  });
}

init();
