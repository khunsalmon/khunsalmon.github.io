/* =========================================================
   ✏️ CONFIG — แก้ข้อมูลตรงนี้ได้เลย
   ========================================================= */
const CONFIG = {
  // เวลาที่เริ่มคบกัน (เวลาไทย +07:00)
  start: '2023-10-28T18:00:00+07:00',

  // รูปทั้งหมด อยู่ในโฟลเดอร์ photos/ — ถ้ายังไม่มีไฟล์ จะขึ้นกรอบชมพูบอกชื่อไฟล์แทน
  photos: {
    cover: 'photos/cover.jpg',      // รูปในหัวใจลูกไม้ (การ์ดในซอง)
    strip1: 'photos/strip-1.jpg',   // ฟิล์ม 3 ช่อง หน้านับเวลา
    strip2: 'photos/strip-2.jpg',
    strip3: 'photos/strip-3.jpg',
  },

  // บ้าน (จุดเริ่มเส้นทางบิน) + ตำแหน่งที่ใช้คำนวณท้องฟ้า
  home: { name: 'Bangkok', lat: 13.7563, lng: 100.5018 },

  cities: [
    { name: 'Taipei',   country: 'Taiwan',      lat: 25.0330, lng: 121.5654, photo: 'photos/taipei.jpg',   note: 'ไทเป ♡' },
    { name: 'Chengdu',  country: 'China',       lat: 30.5728, lng: 104.0668, photo: 'photos/chengdu.jpg',  note: 'เฉิงตู ♡' },
    { name: 'Shanghai', country: 'China',       lat: 31.2304, lng: 121.4737, photo: 'photos/shanghai.jpg', note: 'เซี่ยงไฮ้ ♡' },
    { name: 'Seoul',    country: 'South Korea', lat: 37.5665, lng: 126.9780, photo: 'photos/seoul.jpg',    note: 'โซล ♡' },
  ],

  italy: [
    'ดูพระอาทิตย์ตกที่ Colosseum กรุงโรม',
    'โยนเหรียญที่ Trevi Fountain (จะได้กลับมาอีก)',
    'นั่งเรือกอนโดลาที่ Venice',
    'ดูวิวเมือง Florence จาก Piazzale Michelangelo',
    'เดินเล่นริมทะเล Amalfi / Cinque Terre',
    'กินพิซซ่าที่ Naples + เจลาโต้ทุกวัน 🍦',
    'ถ่ายรูปคู่ให้ได้ 1,000 รูป 📸',
  ],

  bubbles: ['รักนะ ♡', 'ครบ 3 ปีแล้วน้า', 'ปีที่ 4 ไปอิตาลีกัน!', 'I love you 3000 🍣', 'ชิบะก็รักนะ 🐕', 'อยู่ด้วยกันนานๆ นะ', 'จุ๊บ ♡'],
};

// hash ของรหัส (ไม่เก็บรหัสตรงๆ ในโค้ด)
const PIN_HASH = 3831097135;
const PIN_LEN = 6;

/* ========================================================= */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const fx = $('#fx');
const rand = (a, b) => a + Math.random() * (b - a);

function pinHash(s) { let h = 5381; for (const c of s) h = ((h * 33) ^ c.charCodeAt(0)) >>> 0; return h; }

function placeholder(label) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="#f3d6dc"/><path d="M150 205 C110 175 85 155 85 127 C85 108 99 95 117 95 C131 95 143 104 150 116 C157 104 169 95 183 95 C201 95 215 108 215 127 C215 155 190 175 150 205Z" fill="#e8a7b5"/><text x="150" y="245" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#8e2a3a">${label}</text></svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function setPhoto(el, src) {
  const isSvg = el instanceof SVGElement;
  const fallback = placeholder(src);
  el.addEventListener('error', () => { isSvg ? el.setAttribute('href', fallback) : (el.src = fallback); }, { once: true });
  isSvg ? el.setAttribute('href', src) : (el.src = src);
}

/* ---------- FX: hearts & petals ---------- */
const HEART = (c) => `<svg viewBox="0 0 32 30" width="100%" height="100%"><path d="M16 29C6 21 0 16 0 9 0 4 4 0 9 0c3 0 5.5 1.6 7 4 1.5-2.4 4-4 7-4 5 0 9 4 9 9 0 7-6 12-16 20Z" fill="${c}"/></svg>`;
const PETAL_COLORS = ['#f3c6cf', '#e8a0b0', '#d9788c', '#f8dde2', '#c9566e', '#fff'];

function rain(n = 50, spread = 2600) {
  for (let i = 0; i < n; i++) {
    const wrap = document.createElement('div');
    wrap.className = 'fall';
    const size = rand(12, 26);
    const dur = rand(4.5, 8);
    wrap.style.left = rand(-2, 100) + 'vw';
    wrap.style.setProperty('--rot', rand(-360, 360) + 'deg');
    wrap.style.animationDuration = dur + 's';
    wrap.style.animationDelay = rand(0, spread) + 'ms';
    const color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
    const inner = document.createElement('span');
    inner.style.animationDuration = rand(1, 2.2) + 's';
    if (Math.random() < .5) {
      inner.style.width = inner.style.height = size + 'px';
      inner.innerHTML = HEART(color);
    } else {
      inner.className = 'petal';
      inner.style.background = `linear-gradient(135deg, ${color}, #fff8)`;
      inner.style.width = size * .8 + 'px'; inner.style.height = size + 'px';
    }
    wrap.appendChild(inner);
    fx.appendChild(wrap);
    setTimeout(() => wrap.remove(), dur * 1000 + spread + 200);
  }
}

function burst(x, y, n = 14, chars = ['♥', '♡', '✦']) {
  for (let i = 0; i < n; i++) {
    const b = document.createElement('span');
    b.className = 'burst';
    b.textContent = chars[i % chars.length];
    const a = (i / n) * Math.PI * 2, d = rand(60, 140);
    b.style.left = x + 'px'; b.style.top = y + 'px';
    b.style.setProperty('--dx', Math.cos(a) * d + 'px');
    b.style.setProperty('--dy', Math.sin(a) * d + 'px');
    b.style.fontSize = rand(14, 28) + 'px';
    fx.appendChild(b);
    setTimeout(() => b.remove(), 1200);
  }
}

/* =========================================================
   PAGE 1 — LOCK
   ========================================================= */
function lock() {
  const dots = $('#pinDots'), msg = $('#lockMsg');
  let pin = '';
  dots.innerHTML = '<i></i>'.repeat(PIN_LEN);
  const draw = () => $$('i', dots).forEach((d, i) => d.classList.toggle('on', i < pin.length));

  let unlockedOnce = false;
  try { unlockedOnce = sessionStorage.getItem('unlocked') === '1'; } catch (e) {}
  if (unlockedOnce) return unlock(true);

  function press(k) {
    if (dots.classList.contains('ok')) return;
    if (k === 'del') { pin = pin.slice(0, -1); draw(); return; }
    if (k === 'hint') { msg.textContent = 'คำใบ้: วันแรกของเรา (วว/ดด/ปป) ♡'; return; }
    if (!/^\d$/.test(k) || pin.length >= PIN_LEN) return;
    pin += k; draw();
    if (pin.length === PIN_LEN) setTimeout(check, 180);
  }
  function check() {
    if (pinHash(pin) === PIN_HASH) {
      dots.classList.add('ok');
      msg.textContent = 'ยินดีต้อนรับกลับมานะ ♡';
      const r = dots.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2, 22);
      try { sessionStorage.setItem('unlocked', '1'); } catch (e) {}
      setTimeout(() => unlock(false), 900);
    } else {
      dots.classList.remove('shake'); void dots.offsetWidth; dots.classList.add('shake');
      msg.textContent = 'ไม่ใช่น้า ลองใหม่อีกทีนะ';
      if (navigator.vibrate) navigator.vibrate(120);
      setTimeout(() => { pin = ''; draw(); }, 450);
    }
  }
  $('#keypad').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    press(b.dataset.k || b.textContent.trim());
  });
  document.addEventListener('keydown', (e) => {
    if ($('#lock').hidden) return;
    if (/^\d$/.test(e.key)) press(e.key);
    else if (e.key === 'Backspace') press('del');
  });
}

function unlock(instant) {
  const lockEl = $('#lock'), site = $('#site');
  site.hidden = false;
  window.scrollTo(0, 0);
  initSite();
  if (instant) { lockEl.hidden = true; return; }
  lockEl.classList.add('out');
  setTimeout(() => { lockEl.hidden = true; rain(30, 1500); }, 800);
}

/* =========================================================
   SITE
   ========================================================= */
let siteReady = false;
function initSite() {
  if (siteReady) return; siteReady = true;
  $$('[data-photo]').forEach((el) => setPhoto(el, CONFIG.photos[el.dataset.photo]));
  decoStars();
  navDots();
  reveals();
  envelope();
  counter();
  map();
  stats();
  sky();
  dream();
  cartoon();
  music();
}

function decoStars() {
  const glyphs = ['★', '✦', '✧', '♥'], colors = ['#e8a0b0', '#a9cbb7', '#d8b27a', '#c9566e'];
  $$('.deco-stars').forEach((box) => {
    for (let i = 0; i < 16; i++) {
      const s = document.createElement('i');
      s.textContent = glyphs[i % glyphs.length];
      s.style.left = rand(2, 96) + '%'; s.style.top = rand(2, 96) + '%';
      s.style.color = colors[i % colors.length];
      s.style.fontSize = rand(12, 24) + 'px';
      s.style.animationDelay = rand(0, 3) + 's';
      box.appendChild(s);
    }
  });
}

function navDots() {
  const nav = $('#dotsNav');
  const pages = $$('.page');
  pages.forEach((p) => {
    const a = document.createElement('a');
    a.href = '#' + p.id;
    a.innerHTML = `<span>${p.dataset.label}</span>`;
    a.setAttribute('aria-label', p.dataset.label);
    nav.appendChild(a);
  });
  const io = new IntersectionObserver((ents) => ents.forEach((e) => {
    if (e.isIntersecting) $$('a', nav).forEach((a) => a.classList.toggle('on', a.hash === '#' + e.target.id));
  }), { threshold: .5 });
  pages.forEach((p) => io.observe(p));
}

function reveals() {
  const els = $$('.page > *:not(.deco-stars):not(.next)');
  els.forEach((el) => el.classList.add('reveal'));
  const io = new IntersectionObserver((ents) => ents.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .15 });
  els.forEach((el) => io.observe(el));
}

/* ---------- PAGE 2 — ENVELOPE ---------- */
function envelope() {
  const env = $('#envelope'), modal = $('#letterModal');
  const openModal = () => { modal.hidden = false; document.body.style.overflow = 'hidden'; };
  const closeModal = () => { modal.hidden = true; document.body.style.overflow = ''; };
  env.addEventListener('click', () => {
    if (env.classList.contains('open')) return openModal();
    env.classList.add('open');
    $('#tapHint').hidden = true;
    rain(70, 3000);
    setTimeout(openModal, 1900);
    setTimeout(() => { $('#reopen').hidden = false; }, 2000);
  });
  $('#reopen').addEventListener('click', openModal);
  $('#closeLetter').addEventListener('click', closeModal);
  $('#letterNext').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
}

/* ---------- PAGE 3 — COUNTER ---------- */
function counter() {
  const start = new Date(CONFIG.start);
  const TZ = 7 * 3600e3; // คำนวณปฏิทินตามเวลาไทย
  const els = {}; $$('#tiles b').forEach((b) => (els[b.dataset.u] = b));
  const fmt = (n) => n.toLocaleString('en-US');

  function diff(now) {
    const a = new Date(start.getTime() + TZ), b = new Date(now.getTime() + TZ);
    let y = b.getUTCFullYear() - a.getUTCFullYear();
    let mo = b.getUTCMonth() - a.getUTCMonth();
    let anchor = () => new Date(Date.UTC(a.getUTCFullYear() + y, a.getUTCMonth() + mo, a.getUTCDate(), a.getUTCHours(), a.getUTCMinutes()));
    if (mo < 0) { y--; mo += 12; }
    while (anchor() > b) { mo--; if (mo < 0) { y--; mo += 12; } }
    let rest = b - anchor();
    const d = Math.floor(rest / 864e5); rest -= d * 864e5;
    const h = Math.floor(rest / 36e5); rest -= h * 36e5;
    const mi = Math.floor(rest / 6e4); rest -= mi * 6e4;
    return { y, mo, d, h, mi, s: Math.floor(rest / 1e3) };
  }
  function tick() {
    const now = new Date();
    const v = diff(now);
    for (const k in v) {
      const t = String(v[k]);
      if (els[k].textContent !== t) {
        els[k].textContent = t;
        els[k].classList.remove('tick'); void els[k].offsetWidth; els[k].classList.add('tick');
      }
    }
    const ms = now - start;
    $('#tDays').textContent = fmt(Math.floor(ms / 864e5));
    $('#tHours').textContent = fmt(Math.floor(ms / 36e5));
    $('#tMins').textContent = fmt(Math.floor(ms / 6e4));
    $('#tSecs').textContent = fmt(Math.floor(ms / 1e3));
  }
  tick(); setInterval(tick, 1000);
}

/* ---------- PAGE 4 — MAP ---------- */
function map() {
  const stampsEl = $('#stamps');
  CONFIG.cities.forEach((c, i) => {
    const b = document.createElement('button');
    b.className = 'stamp';
    b.innerHTML = `<div class="stamp-in"><img alt="${c.name}"><b>${c.name}</b><small>${c.country}</small></div>`;
    setPhoto($('img', b), c.photo);
    b.addEventListener('click', () => focusCity(i));
    stampsEl.appendChild(b);
  });

  if (!window.L) { $('#map').innerHTML = '<p style="padding:40px">โหลดแผนที่ไม่ได้ ลองเชื่อมเน็ตใหม่นะ</p>'; return; }

  const m = L.map('map', { scrollWheelZoom: false, zoomControl: true, attributionControl: true, tap: true });
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO', subdomains: 'abcd', maxZoom: 18,
  }).addTo(m);

  const icon = (html, cls = '') => L.divIcon({ className: '', html: `<div class="pin ${cls}"><span>${html}</span></div>`, iconSize: [34, 34], iconAnchor: [3, 34], popupAnchor: [14, -34] });
  const H = CONFIG.home;
  L.marker([H.lat, H.lng], { icon: icon('⌂', 'home') }).addTo(m).bindTooltip('home ♡', { direction: 'top', offset: [14, -30] });

  // เส้นทางบินโค้งๆ จากบ้านไปแต่ละเมือง
  function arc(a, b) {
    const pts = [], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
    const dx = b[1] - a[1], dy = b[0] - a[0];
    const cx = mx + dx * .18, cy = my - dy * .18;
    for (let t = 0; t <= 1.0001; t += .04) {
      pts.push([(1 - t) ** 2 * a[0] + 2 * (1 - t) * t * cx + t * t * b[0], (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * cy + t * t * b[1]]);
    }
    return pts;
  }
  const markers = CONFIG.cities.map((c) => {
    L.polyline(arc([H.lat, H.lng], [c.lat, c.lng]), { color: '#8e2a3a', weight: 2, dashArray: '6 8', opacity: .8 }).addTo(m);
    const mk = L.marker([c.lat, c.lng], { icon: icon('♥') }).addTo(m);
    const div = document.createElement('div');
    div.className = 'pop-polaroid';
    div.innerHTML = `<img alt="${c.name}"><b>${c.name}</b><small>${c.note}</small>`;
    setPhoto($('img', div), c.photo);
    mk.bindPopup(div, { closeButton: false, maxWidth: 200 });
    return mk;
  });
  const bounds = L.latLngBounds([[H.lat, H.lng], ...CONFIG.cities.map((c) => [c.lat, c.lng])]);
  m.fitBounds(bounds, { padding: [30, 30] });
  new IntersectionObserver((e, o) => { if (e[0].isIntersecting) { m.invalidateSize(); m.fitBounds(bounds, { padding: [30, 30] }); o.disconnect(); } }).observe($('#map'));

  function focusCity(i) {
    const c = CONFIG.cities[i];
    $$('.stamp').forEach((s, j) => s.classList.toggle('on', j === i));
    m.flyTo([c.lat, c.lng], 9, { duration: 1.6 });
    setTimeout(() => markers[i].openPopup(), 1650);
  }
  window._focusCity = focusCity;
}

/* ---------- PAGE 5 — STATS ---------- */
const SHIBA_SVG = `<svg viewBox="0 0 100 100"><path d="M16 46 L26 8 L47 30Z M84 46 L74 8 L53 30Z" fill="#e8954a"/><path d="M24 36 L28 17 L39 30Z M76 36 L72 17 L61 30Z" fill="#f7c9b6"/><ellipse cx="50" cy="56" rx="39" ry="33" fill="#e8954a"/><path d="M14 62 Q20 92 50 92 Q80 92 86 62 Q76 56 68 58 Q60 46 50 50 Q40 46 32 58 Q24 56 14 62Z" fill="#fff4e4"/><circle cx="37" cy="41" r="3.5" fill="#fff4e4"/><circle cx="63" cy="41" r="3.5" fill="#fff4e4"/><ellipse cx="37" cy="55" rx="4" ry="4.6" fill="#2b1a1a"/><ellipse cx="63" cy="55" rx="4" ry="4.6" fill="#2b1a1a"/><circle cx="38.5" cy="53.5" r="1.4" fill="#fff"/><circle cx="64.5" cy="53.5" r="1.4" fill="#fff"/><ellipse cx="50" cy="64" rx="5.5" ry="3.8" fill="#2b1a1a"/><path d="M43 70 Q46.5 75 50 70 Q53.5 75 57 70" fill="none" stroke="#2b1a1a" stroke-width="2" stroke-linecap="round"/><ellipse cx="27" cy="67" rx="6" ry="3.5" fill="#f4a3b0" opacity=".8"/><ellipse cx="73" cy="67" rx="6" ry="3.5" fill="#f4a3b0" opacity=".8"/></svg>`;

function stats() {
  $('.shiba-ico').innerHTML = SHIBA_SVG;
  const nums = $$('[data-count]');
  const show = (b, v) => (b.textContent = Math.round(v).toLocaleString('en-US') + (b.hasAttribute('data-plus') ? '+' : ''));
  nums.forEach((b) => show(b, 0));
  const io = new IntersectionObserver((ents) => ents.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    const b = e.target, to = +b.dataset.count, t0 = performance.now(), dur = 1800;
    (function step(t) {
      const p = Math.min(1, (t - t0) / dur);
      show(b, to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }), { threshold: .6 });
  nums.forEach((b) => io.observe(b));

  const shibaNum = $('#shibaStat [data-count]');
  $('#shibaStat').addEventListener('click', (e) => {
    shibaNum.dataset.count = +shibaNum.dataset.count + 1;
    show(shibaNum, +shibaNum.dataset.count);
    const f = document.createElement('div');
    f.className = 'fly-shiba';
    f.innerHTML = SHIBA_SVG;
    f.style.left = (e.clientX || innerWidth / 2) + 'px';
    f.style.top = (e.clientY || innerHeight / 2) + 'px';
    f.style.setProperty('--dx', rand(-80, 80) + 'px');
    f.style.setProperty('--rot', rand(-30, 30) + 'deg');
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 1500);
  });
}

/* ---------- PAGE 6 — SKY ---------- */
// ดาวสว่าง: [ชื่อ, RA (ชั่วโมง), Dec (องศา), ความสว่าง(mag)]
const STARS = [
  ['Sirius', 6.752, -16.716, -1.46], ['Canopus', 6.399, -52.696, -.74], ['Rigil Kentaurus', 14.660, -60.835, -.27],
  ['Arcturus', 14.261, 19.182, -.05], ['Vega', 18.616, 38.784, .03], ['Capella', 5.278, 45.998, .08],
  ['Rigel', 5.242, -8.202, .13], ['Procyon', 7.655, 5.225, .34], ['Achernar', 1.629, -57.237, .46],
  ['Betelgeuse', 5.919, 7.407, .5], ['Hadar', 14.064, -60.373, .61], ['Altair', 19.846, 8.868, .77],
  ['Acrux', 12.443, -63.099, .77], ['Aldebaran', 4.599, 16.509, .85], ['Antares', 16.490, -26.432, 1.09],
  ['Spica', 13.420, -11.161, .97], ['Pollux', 7.755, 28.026, 1.14], ['Fomalhaut', 22.961, -29.622, 1.16],
  ['Deneb', 20.690, 45.280, 1.25], ['Mimosa', 12.795, -59.689, 1.25], ['Regulus', 10.139, 11.967, 1.35],
  ['Castor', 7.577, 31.888, 1.58], ['Shaula', 17.560, -37.104, 1.62], ['Bellatrix', 5.419, 6.350, 1.64],
  ['Elnath', 5.438, 28.608, 1.65], ['Alnilam', 5.604, -1.202, 1.69], ['Alnair', 22.137, -46.961, 1.74],
  ['Alnitak', 5.679, -1.943, 1.74], ['Alioth', 12.900, 55.960, 1.76], ['Dubhe', 11.062, 61.751, 1.79],
  ['Mirfak', 3.405, 49.861, 1.79], ['Kaus Australis', 18.403, -34.385, 1.85], ['Sargas', 17.622, -42.998, 1.86],
  ['Alkaid', 13.792, 49.313, 1.86], ['Menkalinan', 5.992, 44.948, 1.9], ['Atria', 16.811, -69.028, 1.91],
  ['Peacock', 20.427, -56.735, 1.94], ['Polaris', 2.530, 89.264, 1.98], ['Hamal', 2.120, 23.462, 2.0],
  ['Diphda', .727, -17.987, 2.04], ['Mirach', 1.162, 35.621, 2.05], ['Nunki', 18.921, -26.297, 2.05],
  ['Alpheratz', .140, 29.091, 2.06], ['Saiph', 5.796, -9.670, 2.07], ['Rasalhague', 17.582, 12.560, 2.08],
  ['Algol', 3.136, 40.956, 2.1], ['Almach', 2.065, 42.330, 2.1], ['Alphecca', 15.578, 26.715, 2.22],
  ['Sadr', 20.370, 40.257, 2.23], ['Mintaka', 5.533, -.299, 2.23], ['Mizar', 13.399, 54.925, 2.23],
  ['Schedar', .675, 56.537, 2.24], ['Caph', .153, 59.150, 2.28], ['Dschubba', 16.006, -22.622, 2.29],
  ['Larawag', 16.836, -34.293, 2.29], ['Merak', 11.031, 56.383, 2.37], ['Enif', 21.736, 9.875, 2.38],
  ['Ankaa', .438, -42.306, 2.38], ['Scheat', 23.063, 28.083, 2.42], ['Sabik', 17.173, -15.725, 2.43],
  ['Phecda', 11.897, 53.695, 2.44], ['Navi', .945, 60.717, 2.47], ['Markab', 23.079, 15.205, 2.48],
  ['Aljanah', 20.770, 33.970, 2.48], ['Menkar', 3.038, 4.090, 2.54], ['Ascella', 19.044, -29.880, 2.6],
  ['Acrab', 16.091, -19.805, 2.62], ['Sheratan', 1.911, 20.808, 2.64], ['Ruchbah', 1.430, 60.235, 2.68],
  ['Kaus Media', 18.350, -29.828, 2.7], ['Tarazed', 19.771, 10.613, 2.72], ['Kornephoros', 16.504, 21.490, 2.77],
  ['Kaus Borealis', 18.466, -25.421, 2.81], ['Algenib', .221, 15.184, 2.83], ['Deneb Algedi', 21.784, -16.127, 2.85],
  ['Alcyone', 3.791, 24.105, 2.87], ['Fawaris', 19.750, 45.131, 2.87], ['Sadalsuud', 21.526, -5.571, 2.9],
  ['Sadalmelik', 22.096, -.320, 2.95], ['Alnasl', 18.097, -30.424, 2.98], ['Dabih', 20.350, -14.781, 3.05],
  ['Albireo', 19.512, 27.960, 3.08], ['Phi Sgr', 18.761, -26.991, 3.17], ['Sulafat', 18.982, 32.690, 3.25],
  ['Megrez', 12.257, 57.033, 3.31], ['Tau Sgr', 19.116, -27.670, 3.32], ['Segin', 1.907, 63.670, 3.37],
  ['Sheliak', 18.835, 33.363, 3.5], ['Rotanev', 20.626, 14.595, 3.6], ['Alshain', 19.922, 6.407, 3.71],
  ['Sualocin', 20.661, 15.912, 3.77],
];
const LINES = [
  // Orion
  ['Betelgeuse', 'Bellatrix'], ['Bellatrix', 'Mintaka'], ['Betelgeuse', 'Alnitak'], ['Mintaka', 'Alnilam'], ['Alnilam', 'Alnitak'], ['Alnitak', 'Saiph'], ['Mintaka', 'Rigel'],
  // Pegasus + Andromeda
  ['Alpheratz', 'Scheat'], ['Scheat', 'Markab'], ['Markab', 'Algenib'], ['Algenib', 'Alpheratz'], ['Markab', 'Enif'], ['Alpheratz', 'Mirach'], ['Mirach', 'Almach'],
  // Perseus, Cassiopeia, Aries
  ['Almach', 'Mirfak'], ['Mirfak', 'Algol'], ['Caph', 'Schedar'], ['Schedar', 'Navi'], ['Navi', 'Ruchbah'], ['Ruchbah', 'Segin'], ['Hamal', 'Sheratan'],
  // Cygnus, Lyra, Aquila, Delphinus
  ['Deneb', 'Sadr'], ['Sadr', 'Albireo'], ['Aljanah', 'Sadr'], ['Sadr', 'Fawaris'], ['Vega', 'Sheliak'], ['Sheliak', 'Sulafat'], ['Sulafat', 'Vega'],
  ['Tarazed', 'Altair'], ['Altair', 'Alshain'], ['Rotanev', 'Sualocin'],
  // Scorpius + Sagittarius teapot
  ['Acrab', 'Dschubba'], ['Dschubba', 'Antares'], ['Antares', 'Larawag'], ['Larawag', 'Sargas'], ['Sargas', 'Shaula'],
  ['Alnasl', 'Kaus Media'], ['Kaus Media', 'Kaus Australis'], ['Kaus Australis', 'Alnasl'], ['Kaus Media', 'Kaus Borealis'], ['Kaus Borealis', 'Phi Sgr'],
  ['Phi Sgr', 'Kaus Media'], ['Phi Sgr', 'Nunki'], ['Nunki', 'Tau Sgr'], ['Tau Sgr', 'Ascella'], ['Ascella', 'Phi Sgr'], ['Ascella', 'Kaus Australis'],
  // Capricornus / Aquarius (simplified)
  ['Dabih', 'Deneb Algedi'], ['Sadalsuud', 'Sadalmelik'],
  // Taurus, Auriga, Gemini, Big Dipper, Crux, Centaurus
  ['Aldebaran', 'Elnath'], ['Capella', 'Menkalinan'], ['Capella', 'Elnath'], ['Castor', 'Pollux'],
  ['Dubhe', 'Merak'], ['Merak', 'Phecda'], ['Phecda', 'Megrez'], ['Megrez', 'Dubhe'], ['Megrez', 'Alioth'], ['Alioth', 'Mizar'], ['Mizar', 'Alkaid'],
  ['Acrux', 'Mimosa'], ['Rigil Kentaurus', 'Hadar'],
];
const LABELS = ['Vega', 'Deneb', 'Altair', 'Fomalhaut', 'Antares', 'Arcturus', 'Capella', 'Aldebaran', 'Polaris', 'Achernar', 'Enif', 'Alpheratz', 'Nunki', 'Peacock', 'Alnair', 'Mirfak'];

function sky() {
  const svg = $('#sky'), tip = $('#skyTip');
  const NS = 'http://www.w3.org/2000/svg';
  const D = Math.PI / 180;
  const lat = CONFIG.home.lat, lng = CONFIG.home.lng;
  const when = new Date(CONFIG.start);
  const jd = when.getTime() / 864e5 + 2440587.5, d = jd - 2451545;
  const lst = ((280.46061837 + 360.98564736629 * d + lng) % 360 + 360) % 360;

  $('#skyPlace').textContent = CONFIG.home.name;
  $('#skyCoords').textContent = `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? 'N' : 'S'} · ${Math.abs(lng).toFixed(2)}°${lng >= 0 ? 'E' : 'W'}`;

  function altaz(raH, dec) {
    const ha = (lst - raH * 15) * D, de = dec * D, la = lat * D;
    const alt = Math.asin(Math.sin(de) * Math.sin(la) + Math.cos(de) * Math.cos(la) * Math.cos(ha));
    const az = Math.atan2(-Math.cos(de) * Math.sin(ha), Math.sin(de) * Math.cos(la) - Math.cos(de) * Math.sin(la) * Math.cos(ha));
    return [alt / D, az];
  }
  // ดวงจันทร์ (สูตรความแม่นยำต่ำ ~1°)
  function moon() {
    const L = (218.316 + 13.176396 * d) * D, M = (134.963 + 13.064993 * d) * D, F = (93.272 + 13.229350 * d) * D;
    const lam = L + 6.289 * D * Math.sin(M), bet = 5.128 * D * Math.sin(F), eps = 23.439 * D;
    const ra = Math.atan2(Math.sin(lam) * Math.cos(eps) - Math.tan(bet) * Math.sin(eps), Math.cos(lam));
    const dec = Math.asin(Math.sin(bet) * Math.cos(eps) + Math.cos(bet) * Math.sin(eps) * Math.sin(lam));
    return [((ra / D + 360) % 360) / 15, dec / D];
  }

  const C = 260, R = 220;
  function proj(alt, az) {
    const r = R * Math.tan((90 - alt) * D / 2); // stereographic: horizon = R
    return [C - r * Math.sin(az), C - r * Math.cos(az)]; // N บน, E ซ้าย (มองขึ้นฟ้า)
  }
  const el = (tag, attrs, parent = svg) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent.appendChild(e); return e; };

  svg.innerHTML = `<defs>
    <radialGradient id="skyBg" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#1c1233"/><stop offset=".75" stop-color="#2a1538"/><stop offset="1" stop-color="#5a2340"/></radialGradient>
    <filter id="glow" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <clipPath id="skyClip"><circle cx="${C}" cy="${C}" r="${R}"/></clipPath>
  </defs>`;
  el('circle', { cx: C, cy: C, r: R + 12, fill: 'none', stroke: '#6e1423', 'stroke-width': 1.5 });
  el('circle', { cx: C, cy: C, r: R, fill: 'url(#skyBg)' });
  const g = el('g', { 'clip-path': 'url(#skyClip)' });
  [30, 60].forEach((a) => el('circle', { cx: C, cy: C, r: R * Math.tan((90 - a) * D / 2), fill: 'none', stroke: 'rgba(255,220,200,.12)', 'stroke-dasharray': '2 5' }, g));

  const pos = {};
  STARS.forEach(([n, ra, dec, mag]) => { const [alt, az] = altaz(ra, dec); pos[n] = { alt, az, mag, xy: proj(alt, az) }; });

  const lineG = el('g', {}, g);
  LINES.forEach(([a, b]) => {
    const A = pos[a], B = pos[b];
    if (!A || !B || (A.alt < -2 && B.alt < -2)) return;
    el('line', { class: 'cl', x1: A.xy[0], y1: A.xy[1], x2: B.xy[0], y2: B.xy[1] }, lineG);
  });

  const starG = el('g', { filter: 'url(#glow)' }, g);
  const label = (x, y, off, text) => {
    const left = x > C + R * .55;
    el('text', { class: 'lbl', x: left ? x - off : x + off, y: y + 4, 'text-anchor': left ? 'end' : 'start' }, g).textContent = text;
  };
  const hover = (node, text) => {
    const showTip = () => {
      const r = svg.getBoundingClientRect(), bb = node.getBoundingClientRect();
      tip.textContent = text; tip.hidden = false;
      tip.style.left = bb.left - r.left + bb.width / 2 + 'px'; tip.style.top = bb.top - r.top + 'px';
    };
    node.addEventListener('mouseenter', showTip); node.addEventListener('click', showTip);
    node.addEventListener('mouseleave', () => (tip.hidden = true));
  };
  for (const n in pos) {
    const s = pos[n]; if (s.alt < 0) continue;
    const r = Math.max(.9, 3.4 - .62 * s.mag);
    const c = el('circle', { class: 'star', cx: s.xy[0], cy: s.xy[1], r, fill: '#fff6e8' }, starG);
    hover(c, `${n} ✦`);
    if (LABELS.includes(n)) label(s.xy[0], s.xy[1], r + 4, n);
  }

  // ดวงจันทร์ + ดาวเคราะห์ (ตำแหน่งวันที่ 28 ต.ค. 2023)
  const mo = moon();
  const bodies = [
    { n: 'Full Moon 🌕', ra: mo[0], dec: mo[1], draw: (x, y) => { el('circle', { cx: x, cy: y, r: 11, fill: '#fff3d6', filter: 'url(#glow)' }, g); } },
    { n: 'Jupiter', ra: 2.80, dec: 15.0, draw: (x, y) => el('circle', { cx: x, cy: y, r: 3.6, fill: '#ffe2b0', filter: 'url(#glow)' }, g) },
    { n: 'Saturn', ra: 22.22, dec: -12.5, draw: (x, y) => el('circle', { cx: x, cy: y, r: 2.8, fill: '#f6d9a0', filter: 'url(#glow)' }, g) },
  ];
  bodies.forEach((b) => {
    let [alt, az] = altaz(b.ra, b.dec);
    if (alt < -3) return;
    alt = Math.max(alt, 1.5); // ถ้าเพิ่งโผล่ขอบฟ้า ให้ยังเห็นอยู่ในวง
    const [x, y] = proj(alt, az);
    b.draw(x, y);
    const hit = el('circle', { cx: x, cy: y, r: 12, fill: 'transparent', class: 'star' }, g);
    hover(hit, b.n);
    label(x, y - 10, 13, b.n.replace(' 🌕', ''));
  });

  [['N', 0], ['E', 90], ['S', 180], ['W', 270]].forEach(([l, a]) => {
    const x = C - (R + 28) * Math.sin(a * D), y = C - (R + 28) * Math.cos(a * D) + 6;
    el('text', { class: 'card', x, y, 'text-anchor': 'middle' }).textContent = l;
  });

  $('#skyLines').addEventListener('change', (e) => svg.classList.toggle('nolines', !e.target.checked));
  svg.addEventListener('mouseleave', () => (tip.hidden = true));
}

/* ---------- PAGE 7 — DREAM ---------- */
function dream() {
  const list = $('#checklist');
  let done = [];
  try { done = JSON.parse(localStorage.getItem('italyDone') || '[]'); } catch (e) {}
  const progress = () => ($('#dreamProgress').textContent = `ทำแล้ว ${done.length}/${CONFIG.italy.length}`);
  CONFIG.italy.forEach((txt, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<label><input type="checkbox" ${done.includes(i) ? 'checked' : ''}><span>${txt}</span></label>`;
    $('input', li).addEventListener('change', (e) => {
      done = e.target.checked ? [...new Set([...done, i])] : done.filter((x) => x !== i);
      try { localStorage.setItem('italyDone', JSON.stringify(done)); } catch (err) {}
      if (e.target.checked) { const r = e.target.getBoundingClientRect(); burst(r.left + 10, r.top + 10, 8); }
      progress();
    });
    list.appendChild(li);
  });
  progress();
}

/* ---------- PAGE 8 — CARTOON ---------- */
function cartoon() {
  const svg = $('#couple');
  const HP = 'M0 6C-4 2 -7 0 -7 -3 C-7 -5.5 -5 -7 -3 -7 C-1.6 -7 -.5 -6 0 -5 C.5 -6 1.6 -7 3 -7 C5 -7 7 -5.5 7 -3 C7 0 4 2 0 6Z';
  svg.innerHTML = `
  <ellipse cx="205" cy="312" rx="165" ry="12" fill="rgba(110,20,35,.12)"/>
  ${[150, 200, 250, 175, 228].map((x, i) => `<g transform="translate(${x} 120) scale(${1.2 + (i % 2) * .6})"><path class="floatH" style="animation-delay:${i * .8}s" d="${HP}" fill="${['#e8a0b0', '#c9566e', '#f3c6cf'][i % 3]}"/></g>`).join('')}
  <g class="bob">
    <!-- A -->
    <g class="charA">
      <ellipse cx="124" cy="306" rx="12" ry="6" fill="#4a2a24"/><ellipse cx="156" cy="306" rx="12" ry="6" fill="#4a2a24"/>
      <path d="M92 304 Q90 222 140 212 Q190 222 188 304Z" fill="#8e2a3a"/>
      <path d="M118 222 Q140 236 162 222" fill="none" stroke="#f6ecdc" stroke-width="5" stroke-linecap="round"/>
      <circle cx="140" cy="262" r="3" fill="#f6ecdc"/><circle cx="140" cy="280" r="3" fill="#f6ecdc"/>
      <path d="M180 246 Q194 252 199 244" fill="none" stroke="#ffe0cf" stroke-width="13" stroke-linecap="round"/>
      <g class="headA">
        <path d="M80 140 Q76 222 108 226 L172 226 Q204 222 200 140 Q198 78 140 76 Q82 78 80 140Z" fill="#3b2420"/>
        <circle cx="140" cy="150" r="54" fill="#ffe3d3"/>
        <path d="M86 142 Q90 86 140 84 Q190 86 194 142 Q176 116 156 120 Q146 102 124 120 Q104 118 86 142Z" fill="#3b2420"/>
        <g transform="translate(102 98) rotate(-18)">
          <path d="M0 0 L-16 -10 L-16 10Z M0 0 L16 -10 L16 10Z" fill="#c9566e"/><circle r="4.5" fill="#a3283d"/>
        </g>
        <g class="eye"><ellipse cx="121" cy="156" rx="6" ry="7.5" fill="#2b1a1a"/><circle cx="123" cy="153" r="2.4" fill="#fff"/></g>
        <g class="eye"><ellipse cx="159" cy="156" rx="6" ry="7.5" fill="#2b1a1a"/><circle cx="161" cy="153" r="2.4" fill="#fff"/></g>
        <ellipse cx="108" cy="172" rx="10" ry="5.5" fill="#f4a3b0" opacity=".75"/><ellipse cx="172" cy="172" rx="10" ry="5.5" fill="#f4a3b0" opacity=".75"/>
        <path d="M134 174 Q140 180 146 174" fill="none" stroke="#7a3a3a" stroke-width="2.6" stroke-linecap="round"/>
      </g>
    </g>
    <!-- B -->
    <g class="charB">
      <ellipse cx="244" cy="306" rx="12" ry="6" fill="#2b1f1f"/><ellipse cx="276" cy="306" rx="12" ry="6" fill="#2b1f1f"/>
      <path d="M212 304 Q210 222 260 212 Q310 222 308 304Z" fill="#f6ecdc" stroke="#e6d0b0" stroke-width="2"/>
      <path d="M236 216 L260 236 L284 216" fill="none" stroke="#8e2a3a" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="M226 270 L294 270" stroke="#e8a0b0" stroke-width="4" stroke-dasharray="2 6" stroke-linecap="round"/>
      <path d="M220 246 Q206 252 201 244" fill="none" stroke="#ffe0cf" stroke-width="13" stroke-linecap="round"/>
      <g class="headB">
        <circle cx="260" cy="150" r="54" fill="#ffe3d3"/>
        <path d="M204 150 Q196 84 260 80 Q324 84 316 150 Q312 120 296 112 Q284 126 264 112 Q246 128 226 114 Q212 124 204 150Z" fill="#2a1d1b"/>
        <path d="M258 82 Q262 60 280 66" fill="none" stroke="#2a1d1b" stroke-width="5" stroke-linecap="round"/>
        <path d="M234 158 Q241 148 248 158" fill="none" stroke="#2b1a1a" stroke-width="3.4" stroke-linecap="round"/>
        <path d="M272 158 Q279 148 286 158" fill="none" stroke="#2b1a1a" stroke-width="3.4" stroke-linecap="round"/>
        <ellipse cx="228" cy="172" rx="10" ry="5.5" fill="#f4a3b0" opacity=".75"/><ellipse cx="292" cy="172" rx="10" ry="5.5" fill="#f4a3b0" opacity=".75"/>
        <path d="M253 172 Q260 183 267 172Z" fill="#c0465a"/>
      </g>
    </g>
    <g transform="translate(200 236) scale(2)"><path class="heldHeart" d="${HP}" fill="#c9566e" stroke="#fff" stroke-width=".8"/></g>
  </g>
  <!-- shiba -->
  <g transform="translate(318 240)"><g class="shibaG">
    <path class="tail" d="M58 46 Q78 40 72 22 Q66 10 56 20 Q66 22 62 32 Q58 40 48 42Z" fill="#e8954a"/>
    <ellipse cx="38" cy="58" rx="28" ry="18" fill="#e8954a"/><ellipse cx="34" cy="62" rx="16" ry="12" fill="#fff4e4"/>
    <g transform="translate(-2 -6) scale(.55)">${SHIBA_SVG.replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g>
  </g></g>`;

  const bubble = $('#bubble');
  let i = 0;
  svg.addEventListener('click', (e) => {
    svg.classList.remove('jump'); void svg.getBoundingClientRect(); svg.classList.add('jump');
    i = (i + 1) % CONFIG.bubbles.length;
    bubble.textContent = CONFIG.bubbles[i];
    bubble.classList.remove('pop'); void bubble.offsetWidth; bubble.classList.add('pop');
    burst(e.clientX, e.clientY, 10, ['♥', '♡']);
  });
}

/* ---------- music (ถ้ามีไฟล์ music/our-song.mp3) ---------- */
function music() {
  const a = $('#song'), btn = $('#vinyl');
  a.addEventListener('loadedmetadata', () => (btn.hidden = false));
  btn.addEventListener('click', () => {
    if (a.paused) { a.play(); btn.classList.add('playing'); } else { a.pause(); btn.classList.remove('playing'); }
  });
  a.load();
}

lock();
