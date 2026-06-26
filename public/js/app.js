let map;
let selectedStageId = 1;
let activeCharKey = null;
const stageMarkers = new Map();
const pointMarkers = [];
const stageLines = [];

// Crop the view to the Antarctic / Scotia Sea theatre only.
const CROP_BOUNDS = L.latLngBounds([[-80, -75], [-50, -14]]);

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function stageColor(stage) {
  return ROUTE_DATA.palette[(stage.id - 1) % ROUTE_DATA.palette.length];
}

function coordsFor(pointId) {
  const point = ROUTE_DATA.points[pointId];
  return [point.lat, point.lng];
}

function getStage(stageId) {
  return ROUTE_DATA.stages.find(stage => stage.id === stageId);
}

function uniquePointIds() {
  const ids = new Set();
  ROUTE_DATA.stages.forEach(stage => stage.points.forEach(pointId => ids.add(pointId)));
  return [...ids];
}

function excerptsFor(stageId) {
  return (typeof STAGE_EXCERPTS !== "undefined" && STAGE_EXCERPTS[String(stageId)]) || [];
}

/* ---------------- map ---------------- */
function initMap() {
  map = L.map("map", {
    center: [-63, -46],
    zoom: 4,
    minZoom: 3,
    zoomControl: true,
    maxBounds: CROP_BOUNDS,
    maxBoundsViscosity: 0.85
  });

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 18,
    bounds: CROP_BOUNDS
  }).addTo(map);

  drawPlannedRoute();
  drawStageLines();
  addPointMarkers();
  addStageMarkers();
  fitAntarctic();
}

function drawPlannedRoute() {
  L.polyline(ROUTE_DATA.plannedRoute.points, {
    color: "#6b7280",
    weight: 2,
    opacity: 0.55,
    dashArray: "7 8"
  }).addTo(map).bindTooltip(ROUTE_DATA.plannedRoute.label, { sticky: true });
}

function drawStageLines() {
  ROUTE_DATA.stages.forEach(stage => {
    if (stage.points.length < 2) return;
    const latLngs = stage.points.map(coordsFor);
    const line = L.polyline(latLngs, {
      color: stageColor(stage),
      weight: stage.id === 10 ? 0 : 4,
      opacity: stage.id === 10 ? 0 : 0.74,
      dashArray: stage.id >= 11 ? "8 6" : null,
      smoothFactor: 0.8
    }).addTo(map);

    line.on("click", () => selectStage(stage.id, true));
    line.bindTooltip(`${stage.id}. ${stage.title}`, { sticky: true });
    stageLines.push(line);
  });
}

function addPointMarkers() {
  uniquePointIds().forEach(pointId => {
    const point = ROUTE_DATA.points[pointId];
    const marker = L.marker([point.lat, point.lng], {
      icon: L.divIcon({
        className: "",
        html: '<div class="point-marker"></div>',
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      }),
      interactive: true
    }).addTo(map);

    marker.bindPopup(`
      <div class="popup-title">${esc(point.name)}</div>
      <div class="popup-meta">${esc(point.nameEn)}<br>${esc(point.precision)}<br>${esc(point.note)}</div>
    `);
    pointMarkers.push(marker);
  });
}

function addStageMarkers() {
  ROUTE_DATA.stages.forEach(stage => {
    const point = ROUTE_DATA.points[stage.anchor];
    const color = stageColor(stage);
    const marker = L.marker([point.lat, point.lng], {
      icon: L.divIcon({
        className: "",
        html: `<div class="stage-marker" style="background:${color}">${stage.id}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
      })
    }).addTo(map);

    marker.bindPopup(`
      <div class="popup-title">${stage.id}. ${esc(stage.title)}</div>
      <div class="popup-meta">${esc(stage.date)}<br>${esc(stage.chapters)} · 原文摘录 ${excerptsFor(stage.id).length} 条</div>
      <div class="popup-btn" onclick="selectStage(${stage.id}, false)">查看本阶段</div>
    `);
    marker.on("click", () => selectStage(stage.id, false));
    stageMarkers.set(stage.id, marker);
  });
}

function fitAll() {
  const bounds = L.latLngBounds(uniquePointIds().map(coordsFor));
  map.fitBounds(bounds, { padding: [54, 54], maxZoom: 5 });
}

function fitAntarctic() {
  const antarcticIds = uniquePointIds().filter(pointId => !["portStanley", "puntaArenas"].includes(pointId));
  const bounds = L.latLngBounds(antarcticIds.map(coordsFor));
  map.fitBounds(bounds, { padding: [54, 54], maxZoom: 5 });
}

/* ---------------- character cast ---------------- */
function buildCast() {
  const wrap = document.getElementById("cast-chips");
  wrap.innerHTML = CHARACTERS.map(c => `
    <button class="cast-chip" type="button" data-key="${c.key}"
      title="${esc(c.role)}" onclick="selectCharacter('${c.key}')">
      ${c.rank ? '<span class="star">★</span>' : ""}${esc(c.name)}
    </button>
  `).join("");
}

function selectCharacter(key) {
  const c = CHARACTERS.find(x => x.key === key);
  if (!c) return;
  if (activeCharKey === key) { closeBio(); return; }
  activeCharKey = key;
  document.getElementById("bio-rank").textContent = c.rank ? `核心人物 · 排名第 ${c.rank}` : "";
  document.getElementById("bio-name").textContent = c.name;
  document.getElementById("bio-role").textContent = `${c.role} · ${c.nameEn}`;
  document.getElementById("bio-text").textContent = c.bio;
  const figure = document.getElementById("bio-figure");
  const source = document.getElementById("bio-source");
  if (c.image?.src) {
    document.getElementById("bio-image").src = c.image.src;
    document.getElementById("bio-image").alt = c.image.alt || c.nameEn || c.name;
    document.getElementById("bio-caption").textContent = c.image.caption || "资料图片";
    source.href = c.image.sourceUrl || c.image.src;
    source.hidden = false;
    figure.hidden = false;
  } else {
    document.getElementById("bio-image").removeAttribute("src");
    document.getElementById("bio-caption").textContent = "";
    source.hidden = true;
    figure.hidden = true;
  }
  document.getElementById("bio-card").hidden = false;
  document.querySelectorAll(".cast-chip").forEach(ch => ch.classList.toggle("active", ch.dataset.key === key));
}

function closeBio() {
  activeCharKey = null;
  document.getElementById("bio-card").hidden = true;
  document.querySelectorAll(".cast-chip").forEach(ch => ch.classList.remove("active"));
}

/* ---------------- reading column ---------------- */
function buildStageChips() {
  const wrap = document.getElementById("stage-chips");
  wrap.innerHTML = ROUTE_DATA.stages.map(stage => `
    <button class="chip" type="button" data-stage-id="${stage.id}"
      title="${stage.id}. ${esc(stage.title)}" onclick="selectStage(${stage.id}, true)">${stage.id}</button>
  `).join("");
}

function buildSources() {
  const list = document.getElementById("source-list");
  list.innerHTML = ROUTE_DATA.sources.map(source => `
    <li>
      <a href="${esc(source.url)}" target="_blank" rel="noopener">${esc(source.label)}</a><br>
      ${esc(source.detail)}
    </li>
  `).join("");
}

function renderExcerpts(stage) {
  const list = excerptsFor(stage.id);
  document.getElementById("excerpt-count").textContent = `共 ${list.length} 条`;
  document.getElementById("excerpt-list").innerHTML = list.map(e => `
    <div class="excerpt">
      <div class="excerpt-ref"><span class="ref-chip">${esc(e.ref)}</span>${esc(e.title)}</div>
      <blockquote class="excerpt-quote">${esc(e.quote)}</blockquote>
      <div class="excerpt-note">${esc(e.note)}</div>
    </div>
  `).join("");
}

function renderStage(stage) {
  const color = stageColor(stage);
  document.getElementById("reading").style.setProperty("--stage-color", color);

  document.getElementById("hl-kicker").textContent = `阶段 ${stage.id}`;
  document.getElementById("hl-title").textContent = stage.title;
  document.getElementById("hl-meta").textContent = `${stage.date} · ${stage.days} · ${stage.chapters}`;
  document.getElementById("stage-summary").textContent = stage.summary;
  document.getElementById("stage-counter").textContent = `${stage.id} / ${ROUTE_DATA.stages.length}`;
  document.getElementById("detail-book").textContent = stage.bookNote;

  renderExcerpts(stage);

  document.getElementById("detail-places").innerHTML = stage.points.map(pointId => {
    const point = ROUTE_DATA.points[pointId];
    return `
      <li>
        <strong>${esc(point.name)}</strong> <span class="place-precision">${esc(point.nameEn)}</span><br>
        ${esc(point.note)}<br>
        <span class="place-precision">${esc(point.precision)}</span>
      </li>
    `;
  }).join("");

  document.querySelectorAll(".chip").forEach(chip => {
    chip.classList.toggle("active", Number(chip.dataset.stageId) === stage.id);
  });

  document.getElementById("prev-stage").disabled = stage.id === 1;
  document.getElementById("next-stage").disabled = stage.id === ROUTE_DATA.stages.length;

  const body = document.querySelector(".reading-body");
  if (body) body.scrollTop = 0;
}

function selectStage(stageId, focusMap = true) {
  const stage = getStage(stageId);
  if (!stage) return;

  selectedStageId = stageId;
  renderStage(stage);
  document.getElementById("reading").classList.add("open");

  const activeChip = document.querySelector(`.chip[data-stage-id="${stageId}"]`);
  if (activeChip) activeChip.scrollIntoView({ block: "nearest", inline: "nearest" });

  const marker = stageMarkers.get(stageId);
  if (marker) marker.openPopup();

  if (focusMap && map) {
    const latLngs = stage.points.map(coordsFor);
    if (latLngs.length === 1) {
      map.flyTo(latLngs[0], 6, { duration: 0.7 });
    } else {
      map.fitBounds(L.latLngBounds(latLngs), { padding: [60, 60], maxZoom: 6 });
    }
  }
}

/* ---------------- controls / modals ---------------- */
function initControls() {
  document.getElementById("toggle-panel").addEventListener("click", () => {
    document.getElementById("reading").classList.toggle("open");
    setTimeout(() => map.invalidateSize(), 230);
  });

  document.getElementById("fit-all").addEventListener("click", fitAll);
  document.getElementById("fit-antarctic").addEventListener("click", fitAntarctic);

  document.getElementById("prev-stage").addEventListener("click", () => {
    if (selectedStageId > 1) selectStage(selectedStageId - 1, true);
  });
  document.getElementById("next-stage").addEventListener("click", () => {
    if (selectedStageId < ROUTE_DATA.stages.length) selectStage(selectedStageId + 1, true);
  });

  document.getElementById("bio-close").addEventListener("click", closeBio);

  window.addEventListener("resize", () => map && map.invalidateSize());
}

function initModals() {
  [["open-book-maps", "book-map-modal"], ["open-sources", "sources-modal"]].forEach(([btn, modal]) => {
    document.getElementById(btn).addEventListener("click", () => {
      document.getElementById(modal).hidden = false;
    });
  });

  document.querySelectorAll("[data-close]").forEach(el => {
    el.addEventListener("click", () => {
      const target = document.getElementById(el.dataset.close);
      if (target) target.hidden = true;
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      document.getElementById("book-map-modal").hidden = true;
      document.getElementById("sources-modal").hidden = true;
      closeBio();
    }
  });
}

window.selectStage = selectStage;
window.selectCharacter = selectCharacter;

document.addEventListener("DOMContentLoaded", () => {
  initMap();
  buildCast();
  buildStageChips();
  buildSources();
  initControls();
  initModals();
  selectStage(1, false);
});
