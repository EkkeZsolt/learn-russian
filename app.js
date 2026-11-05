// Orosz kvíz — vegyes típusok, cookie-ban mentett haladás, nincs TTS.
const COOKIE = "oroszKvizHaladas";
const app = document.getElementById("app");
const restartBtn = document.getElementById("restartBtn");
const byId = Object.fromEntries([...QUESTIONS, ...WORKBOOK_QUESTIONS].map(q => [q.id, q]));
const TYPE_LABEL = { choice: "Válaszválasztós", fill: "Mondatkiegészítés", bool: "Igaz / hamis", input: "Beírós", match: "Párosítás", order: "Rakd sorrendbe" };
const POOLS = {
  book: { label: "Tankönyv 1–22. oldal + számok 1–100", short: "Tankönyv", questions: QUESTIONS },
  wb: { label: "Munkafüzet 1–16. oldal", short: "Munkafüzet", questions: WORKBOOK_QUESTIONS }
};
function pool() { return POOLS[(state && state.mode) || "book"]; }
function maxPoints() { return pool().questions.reduce((s, q) => s + (q.type === "match" ? q.pairs.length : 1), 0); }

let state = loadState();       // {order:[id], idx:0, results:{id:[pont,max]}}
let answered = false;          // az aktuális kérdés le van-e zárva
let matchCache = null;         // {rightOrder:[], matched:Set, selected:null, wrong:Set}
let orderCache = null;         // {pool:[], built:[], failed:false}

function cookiePath() {
  const p = location.pathname;
  const i = p.lastIndexOf("/");
  return i >= 0 ? p.slice(0, i + 1) : "/";
}
function saveState() {
  try {
    const v = encodeURIComponent(JSON.stringify(state));
    const d = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = COOKIE + "=" + v + "; expires=" + d + "; path=" + cookiePath() + "; SameSite=Lax";
  } catch (e) { /* cookie nem elérhető (pl. file://) — a kvíz így is végigjátszható */ }
}
function loadState() {
  try {
    const m = document.cookie.match(new RegExp("(?:^|; )" + COOKIE + "=([^;]*)"));
    if (!m) return null;
    const s = JSON.parse(decodeURIComponent(m[1]));
    if (!s || !Array.isArray(s.order) || !s.order.every(id => byId[id])) return null;
    if (!POOLS[s.mode]) s.mode = "book"; // régi mentés: tankönyves kvíz
    return s;
  } catch (e) { return null; }
}
function clearState() {
  document.cookie = COOKIE + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=" + cookiePath() + "; SameSite=Lax";
  state = null;
}
function shuffle(a) {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; }
  return x;
}
function norm(s) {
  return String(s).toLowerCase().trim().replaceAll("ё", "е")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[.!?,;:«»"']/g, "").replace(/\s+/g, " ");
}
function score() { return state ? Object.values(state.results).reduce((s, r) => s + r[0], 0) : 0; }
function esc(s) { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; }

restartBtn.addEventListener("click", () => {
  if (confirm("Biztosan újrakezded? A mentett haladás törlődik.")) { clearState(); renderHome(); }
});

function renderHome() {
  restartBtn.hidden = !state;
  const has = state && state.idx > 0 && state.idx < state.order.length;
  const finished = state && state.idx >= state.order.length;
  const bookMax = POOLS.book.questions.reduce((s, q) => s + (q.type === "match" ? q.pairs.length : 1), 0);
  const wbMax = POOLS.wb.questions.reduce((s, q) => s + (q.type === "match" ? q.pairs.length : 1), 0);
  app.innerHTML = `
  <section class="card">
    <h1>Orosz kvíz 🇷🇺</h1>
    <p>Válassz kvízt – mindegyik kb. 35–45 perc alatt végigvihető egy óra alatt:</p>
    <ul class="list">
      <li><strong>📖 Tankönyv:</strong> az első 22 oldal anyaga + az összes szám 1–100-ig (${QUESTIONS.length} feladat, ${bookMax} pont)</li>
      <li><strong>📝 Munkafüzet:</strong> a munkafüzet első 16 oldalának összes anyaga (${WORKBOOK_QUESTIONS.length} feladat, ${wbMax} pont)</li>
      <li>Mindenféle típus: válaszválasztós, beírós, igaz/hamis, mondatkiegészítés, párosítás, szórend-kirakás</li>
      <li>Minden magyarázat <strong>magyarul</strong> van, hang/TTS nincs</li>
      <li>A haladásod <strong>cookie-ban</strong> mentődik: ha bezárod, ugyanott folytathatod</li>
    </ul>
    ${finished ? `<p><strong>Kész vagy a(z) ${esc(pool().short)} kvízzel!</strong> Pontod: ${score()} / ${maxPoints()}.</p>` : ""}
    ${has ? `<p class="muted">Félbehagyott kvízed: <strong>${esc(pool().label)}</strong> – folytatás innen: ${state.idx + 1}. feladat / ${state.order.length} &nbsp;•&nbsp; Eddigi pont: ${score()}</p>
            <button class="btn-primary" id="goBtn" type="button">▶ Folytatás (${esc(pool().short)})</button>` : ""}
    <div class="actions" style="margin-top:12px">
      <button class="btn-primary" id="bookBtn" type="button">▶ Tankönyves kvíz indítása</button>
      <button class="btn-primary" id="wbBtn" type="button">▶ Munkafüzetes kvíz indítása</button>
    </div>
    ${has ? `<div class="actions"><button id="newBtn" type="button">Mentett haladás törlése</button></div>` : ""}
  </section>`;
  if (has) document.getElementById("goBtn").addEventListener("click", renderQuestion);
  document.getElementById("bookBtn").addEventListener("click", () => {
    if (has && pool().short !== "Tankönyv" && !confirm("A félbehagyott munkafüzetes kvízed törlődik. Biztosan a tankönyvest indítod?")) return;
    if (finished || !state || pool().short !== "Tankönyv") startNew("book");
    renderQuestion();
  });
  document.getElementById("wbBtn").addEventListener("click", () => {
    if (has && pool().short !== "Munkafüzet" && !confirm("A félbehagyott tankönyves kvízed törlődik. Biztosan a munkafüzetest indítod?")) return;
    if (finished || !state || pool().short !== "Munkafüzet") startNew("wb");
    renderQuestion();
  });
  const nb = document.getElementById("newBtn");
  if (nb) nb.addEventListener("click", () => { if (confirm("Biztosan törlöd a mentett haladást?")) { clearState(); renderHome(); } });
}

function startNew(mode) {
  const p = POOLS[mode] || POOLS.book;
  state = { mode: POOLS[mode] ? mode : "book", order: shuffle(p.questions.map(q => q.id)), idx: 0, results: {} };
  saveState();
}

function header(q) {
  const total = state.order.length;
  const pct = Math.round(state.idx / total * 100);
  return `<div class="row"><span>${state.idx + 1}. feladat / ${total}</span><span>Pont: ${score()} / ${maxPoints()}</span></div>
  <div class="progress"><div style="width:${pct}%"></div></div>
  <div class="meta"><span class="pill">${esc(pool().short)}</span><span class="pill">${esc(q.cat)}</span><span class="pill type">${TYPE_LABEL[q.type]}</span></div>`;
}

function renderQuestion() {
  restartBtn.hidden = false;
  answered = false; matchCache = null; orderCache = null;
  if (!state) { renderHome(); return; }
  if (state.idx >= state.order.length) { renderResult(); return; }
  const q = byId[state.order[state.idx]];
  let body = "";
  if (q.type === "choice" || q.type === "fill" || q.type === "bool") {
    const opts = q.type === "bool" ? ["Igaz", "Hamis"] : q.options;
    body = `<h2>${esc(q.q)}</h2><div class="options" id="opts">
      ${opts.map((o, i) => `<button type="button" data-i="${i}">${esc(o)}</button>`).join("")}</div><div id="fb"></div>`;
    app.innerHTML = `<section class="card">${header(q)}${body}</section>`;
    document.querySelectorAll("#opts button").forEach(b => b.addEventListener("click", () => answerChoice(q, Number(b.dataset.i), b)));
  } else if (q.type === "input") {
    app.innerHTML = `<section class="card">${header(q)}<h2>${esc(q.q)}</h2>
      ${q.hint ? `<p class="muted">${esc(q.hint)}</p>` : ""}
      <form id="form"><input type="text" id="inp" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Ide írd a választ…">
      <button class="btn-primary" type="submit">Ellenőrzés</button></form><div id="fb"></div></section>`;
    document.getElementById("inp").focus();
    document.getElementById("form").addEventListener("submit", e => { e.preventDefault(); answerInput(q); });
  } else if (q.type === "match") {
    matchCache = { rightOrder: shuffle(q.pairs.map((p, i) => i)), matched: new Set(), selected: null, wrongLeft: new Set() };
    app.innerHTML = `<section class="card">${header(q)}<h2>${esc(q.q)}</h2>
      <p class="muted">Koppints bal oldalt egy szóra, majd jobb oldalt a párjára.</p>
      <div class="match"><div class="col" id="left"></div><div class="col" id="right"></div></div><div id="fb"></div></section>`;
    drawMatch(q);
  } else if (q.type === "order") {
    orderCache = { pool: shuffle(q.words.map((w, i) => i)), built: [], failed: false };
    app.innerHTML = `<section class="card">${header(q)}<h2>${esc(q.q)}</h2>
      <div class="sentence" id="built"><span class="muted">Koppints a szavakra…</span></div>
      <div class="chips" id="pool"></div>
      <div class="actions"><button type="button" id="undoBtn">↩ Utolsó vissza</button>
      <button class="btn-primary" type="button" id="checkBtn">Ellenőrzés</button></div><div id="fb"></div></section>`;
    drawOrder(q);
    document.getElementById("undoBtn").addEventListener("click", () => { if (answered) return; orderCache.built.pop(); drawOrder(q); });
    document.getElementById("checkBtn").addEventListener("click", () => answerOrder(q));
  }
  window.scrollTo(0, 0);
}

function finish(q, points, max) {
  answered = true;
  state.results[q.id] = [points, max];
  saveState();
}
function feedback(q, ok, pointsText) {
  const el = document.getElementById("fb");
  el.innerHTML = `<div class="feedback ${ok ? "ok" : "bad"}">
    <div class="verdict">${ok ? "✅ Helyes!" : "❌ Nem jó"} ${pointsText || ""}</div>
    <div>${esc(q.explain)}</div></div>
    <button class="btn-next" id="nextBtn" type="button">${state.idx + 1 >= state.order.length ? "Eredmény megtekintése →" : "Következő feladat →"}</button>`;
  document.getElementById("nextBtn").addEventListener("click", () => { state.idx++; saveState(); renderQuestion(); });
  el.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function answerChoice(q, i, btn) {
  if (answered) return;
  const correctIdx = q.type === "bool" ? (q.answer ? 0 : 1) : q.answer;
  const ok = i === correctIdx;
  document.querySelectorAll("#opts button").forEach((b, bi) => {
    b.disabled = true;
    if (bi === correctIdx) b.classList.add("correct");
    else if (bi === i) b.classList.add("wrong");
  });
  finish(q, ok ? 1 : 0, 1);
  feedback(q, ok, ok ? "(+1 pont)" : `(helyes válasz: ${esc(q.type === "bool" ? (q.answer ? "Igaz" : "Hamis") : q.options[q.answer])})`);
}

function answerInput(q) {
  if (answered) return;
  const v = document.getElementById("inp").value;
  if (!norm(v)) return;
  const ok = [q.answer, ...(q.accept || [])].some(a => norm(a) === norm(v));
  document.getElementById("inp").disabled = true;
  finish(q, ok ? 1 : 0, 1);
  feedback(q, ok, ok ? "(+1 pont)" : `(helyes válasz: ${esc(q.answer)})`);
}

function drawMatch(q) {
  const L = document.getElementById("left"), R = document.getElementById("right");
  L.innerHTML = q.pairs.map((p, i) => `<button type="button" data-side="l" data-i="${i}" class="${matchCache.matched.has(i) ? "done" : ""} ${matchCache.selected === i ? "sel" : ""}" ${matchCache.matched.has(i) ? "disabled" : ""}>${esc(p[0])}</button>`).join("");
  R.innerHTML = matchCache.rightOrder.map(i => `<button type="button" data-side="r" data-i="${i}" class="${matchCache.matched.has(i) ? "done" : ""}" ${matchCache.matched.has(i) ? "disabled" : ""}>${esc(q.pairs[i][1])}</button>`).join("");
  app.querySelectorAll(".match button").forEach(b => b.addEventListener("click", () => matchTap(q, b)));
}
function matchTap(q, b) {
  if (answered) return;
  const i = Number(b.dataset.i);
  if (b.dataset.side === "l") { matchCache.selected = i; drawMatch(q); return; }
  if (matchCache.selected === null) return;
  const left = matchCache.selected;
  if (left === i) {
    matchCache.matched.add(i); matchCache.selected = null; drawMatch(q);
    if (matchCache.matched.size === q.pairs.length) {
      const pts = q.pairs.length - matchCache.wrongLeft.size;
      finish(q, pts, q.pairs.length);
      feedback(q, matchCache.wrongLeft.size === 0, `(${pts} / ${q.pairs.length} pont)`);
    }
  } else {
    matchCache.wrongLeft.add(left);
    b.classList.add("err");
    setTimeout(() => drawMatch(q), 450);
  }
}

function drawOrder(q) {
  const built = document.getElementById("built"), pool = document.getElementById("pool");
  built.innerHTML = orderCache.built.length
    ? orderCache.built.map(i => `<span>${esc(q.words[i])}</span>`).join(" ")
    : `<span class="muted">Koppints a szavakra…</span>`;
  pool.innerHTML = orderCache.pool.filter(i => !orderCache.built.includes(i))
    .map(i => `<button type="button" data-i="${i}">${esc(q.words[i])}</button>`).join("");
  pool.querySelectorAll("button").forEach(b => b.addEventListener("click", () => { if (!answered) { orderCache.built.push(Number(b.dataset.i)); drawOrder(q); } }));
}
function answerOrder(q) {
  if (answered || orderCache.built.length !== q.words.length) return;
  const ok = orderCache.built.every((v, idx) => v === idx);
  if (!ok) {
    const first = !orderCache.failed;
    orderCache.failed = true;
    const el = document.getElementById("fb");
    el.innerHTML = `<div class="feedback bad"><div class="verdict">❌ Nem jó a sorrend</div><div>${first ? "Ezért a feladatért már nem jár pont, de próbáld újra" : "Még mindig nem jó, próbáld újra"} – az Utolsó vissza gombbal javíthatsz.</div></div>`;
    return;
  }
  finish(q, orderCache.failed ? 0 : 1, 1);
  feedback(q, true, orderCache.failed ? "(0 pont – második próbára sikerült)" : "(+1 pont)");
}

function renderResult() {
  restartBtn.hidden = false;
  const pts = score();
  const pct = Math.round(pts / maxPoints() * 100);
  const cats = {};
  for (const q of pool().questions) {
    const r = state.results[q.id]; if (!r) continue;
    const key = q.cat.startsWith("Számok") ? "Számok 1–100" : q.cat;
    cats[key] = cats[key] || [0, 0]; cats[key][0] += r[0]; cats[key][1] += r[1];
  }
  const rows = Object.entries(cats).map(([k, v]) => `<li>${esc(k)}: <strong>${v[0]} / ${v[1]}</strong></li>`).join("");
  const msg = pct >= 90 ? "Kiváló! Szinte mindent tudsz ebből a részből. 🏆"
    : pct >= 70 ? "Ügyes vagy! Már csak pár dolgot érdemes átnézni. 💪"
    : pct >= 50 ? "Jó úton jársz – nézd át a magyarázatokat, és próbáld újra! 📚"
    : "Ne add fel! Olvasd el figyelmesen a magyar magyarázatokat, és indíts egy új kört! 🌱";
  app.innerHTML = `<section class="card center">
    <h1>Kész! 🎉</h1>
    <div class="scorebig">${pts} / ${maxPoints()}</div>
    <p><strong>${pct}%</strong> – ${msg}</p>
    <p class="muted">${esc(pool().label)} – kategóriánként:</p><ul class="list" style="text-align:left">${rows}</ul>
    <div class="actions"><button class="btn-primary" id="againBtn" type="button">↻ Újrakezdés (ugyanez a kvíz)</button><button id="homeBtn" type="button">Kezdőlap – másik kvíz választása</button></div>
  </section>`;
  document.getElementById("againBtn").addEventListener("click", () => { startNew(state.mode); renderQuestion(); });
  document.getElementById("homeBtn").addEventListener("click", renderHome);
  window.scrollTo(0, 0);
}

renderHome();
