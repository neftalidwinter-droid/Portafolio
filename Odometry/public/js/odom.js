// ═══════════════════════════════════════════
//  CONSTANTES DE ODOMETRÍA
// ═══════════════════════════════════════════
const TICKS_V   = 1450;                        // ticks por vuelta
const DIAM_MM   = 140;
const CIRC_CM   = (Math.PI * DIAM_MM) / 10;   // ≈ 43.982 cm
const CM_TICK   = CIRC_CM / TICKS_V;          // ≈ 0.03033 cm/tick
const ANCHO_CM  = 20;                          // distancia entre ruedas (cm)
const ARC_CIRC  = 2 * Math.PI * 35;           // circunferencia del arco SVG (radio 35) ≈ 219.9

// ═══════════════════════════════════════════
//  ESTADO
// ═══════════════════════════════════════════
let pose      = { x: 0, y: 0, theta: 0 };
let prevL     = 0, prevR = 0;
let trail     = [{ x: 0, y: 0 }];
const SCALE   = 6;                             // px / cm (fijo)
let scale     = SCALE;                         // zoom ajustable
let velWin    = [];                            // ventana de velocidad
let vLin      = 0, vAng = 0, vWheelL = 0, vWheelR = 0;
let ftL, ftR;                                  // timers de flash

// ═══════════════════════════════════════════
//  CANVAS: MAPA
// ═══════════════════════════════════════════
const canvas = document.getElementById('mapCanvas');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  const p = canvas.parentElement;
  canvas.width  = p.clientWidth;
  canvas.height = p.clientHeight;
  draw();
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ═══════════════════════════════════════════
//  CANVAS: COMPÁS
// ═══════════════════════════════════════════
const compass = document.getElementById('compass');
const cctx    = compass.getContext('2d');

function drawCompass(theta) {
  const W = compass.width, H = compass.height;
  const cx = W/2, cy = H/2, R = 40;
  cctx.clearRect(0, 0, W, H);

  // Aro exterior
  cctx.beginPath();
  cctx.arc(cx, cy, R, 0, Math.PI*2);
  cctx.strokeStyle = '#1f2b3a';
  cctx.lineWidth = 1.5;
  cctx.stroke();

  // Marcas de minuto
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const r1 = i % 3 === 0 ? R - 7 : R - 4;
    cctx.beginPath();
    cctx.moveTo(cx + Math.cos(a)*r1, cy + Math.sin(a)*r1);
    cctx.lineTo(cx + Math.cos(a)*R,  cy + Math.sin(a)*R);
    cctx.strokeStyle = i % 3 === 0 ? '#2a3a4a' : '#1a2530';
    cctx.lineWidth = 1;
    cctx.stroke();
  }

  // N cardinal
  cctx.font = '500 8px Barlow Condensed';
  cctx.fillStyle = '#2a3a4a';
  cctx.textAlign = 'center';
  cctx.textBaseline = 'middle';
  cctx.fillText('N', cx, cy - R + 9);

  // Flecha de rumbo
  const ax = Math.cos(-theta - Math.PI/2);
  const ay = Math.sin(-theta - Math.PI/2);
  const tipR = R - 6, tailR = 12;

  cctx.beginPath();
  cctx.moveTo(cx + ax*tipR, cy + ay*tipR);
  cctx.lineTo(cx - ax*tailR + ay*7, cy - ay*tailR - ax*7);
  cctx.lineTo(cx - ax*tailR - ay*7, cy - ay*tailR + ax*7);
  cctx.closePath();
  cctx.fillStyle = 'rgba(0,229,255,0.88)';
  cctx.fill();

  // Punto central
  cctx.beginPath();
  cctx.arc(cx, cy, 2.5, 0, Math.PI*2);
  cctx.fillStyle = '#0f1318';
  cctx.fill();
  cctx.strokeStyle = '#2a3a4a';
  cctx.lineWidth = 1;
  cctx.stroke();
}

// ═══════════════════════════════════════════
//  HELPERS SVG: ARCO DE PROGRESO
// ═══════════════════════════════════════════
function setArc(el, ticks) {
  const frac = (ticks % TICKS_V) / TICKS_V;
  el.style.strokeDashoffset = ARC_CIRC * (1 - frac);
}

// ═══════════════════════════════════════════
//  FLASH DE VUELTA COMPLETA
// ═══════════════════════════════════════════
function showFlash(id, ms = 850) {
  const el = document.getElementById(id);
  el.classList.add('show');
  const prev = id === 'flash-L' ? ftL : ftR;
  clearTimeout(prev);
  const t = setTimeout(() => el.classList.remove('show'), ms);
  if (id === 'flash-L') ftL = t; else ftR = t;
}

// ═══════════════════════════════════════════
//  ODOMETRÍA DIFERENCIAL
// ═══════════════════════════════════════════
function updateOdom(ticksL, ticksR) {
  const dL = (ticksL - prevL) * CM_TICK;
  const dR = (ticksR - prevR) * CM_TICK;
  prevL = ticksL;
  prevR = ticksR;

  if (dL === 0 && dR === 0) return;

  const d      = (dL + dR) / 2;
  const dTheta = (dR - dL) / ANCHO_CM;

  // Actualiza ángulo primero, luego posición con ángulo actualizado
  pose.theta += dTheta;
  // Convención: theta=0 → robot avanza en +Y (Norte)
  pose.x += d * Math.cos(pose.theta + Math.PI / 2);
  pose.y += d * Math.sin(pose.theta + Math.PI / 2);

  trail.push({ x: pose.x, y: pose.y });
  if (trail.length > 3000) trail.shift();
}

// ═══════════════════════════════════════════
//  ZOOM MANUAL (rueda del mouse + botones)
// ═══════════════════════════════════════════
canvas.addEventListener('wheel', e => {
  e.preventDefault();
  const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
  scale = Math.max(0.3, Math.min(120, scale * factor));
  draw();
}, { passive: false });

document.getElementById('btn-zoom-in').addEventListener('click', () => {
  scale = Math.min(120, scale * 1.25); draw();
});
document.getElementById('btn-zoom-out').addEventListener('click', () => {
  scale = Math.max(0.3, scale / 1.25); draw();
});
document.getElementById('btn-zoom-rst').addEventListener('click', () => {
  scale = SCALE; draw();
});

// ═══════════════════════════════════════════
//  PASO DE GRILLA
// ═══════════════════════════════════════════
function gridStep() {
  const cmPerPx = 1 / scale;
  const raw     = cmPerPx * 65;
  const steps   = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];
  return steps.find(s => s >= raw) ?? 1000;
}

// ═══════════════════════════════════════════
//  RECTÁNGULO REDONDEADO (compatible)
// ═══════════════════════════════════════════
function roundRect(ctx, x, y, w, h, r) {
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
}

// ═══════════════════════════════════════════
//  DIBUJO DEL MAPA (robot siempre al centro)
// ═══════════════════════════════════════════
function draw() {
  const W = canvas.width, H = canvas.height;
  const cx = W / 2, cy = H / 2; // robot siempre aquí
  ctx.clearRect(0, 0, W, H);

  const gs   = gridStep();
  const gsPx = gs * scale;

  // ── Rango de mundo visible ──
  const wL = pose.x - cx / scale;
  const wR = pose.x + cx / scale;
  const wB = pose.y - cy / scale;
  const wT = pose.y + cy / scale;

  // ── Grilla ──
  ctx.strokeStyle = 'rgba(20,33,48,0.75)';
  ctx.lineWidth   = 0.5;

  const gxStart = Math.floor(wL / gs) * gs;
  for (let wx = gxStart; wx <= wR + gs; wx += gs) {
    const sx = cx + (wx - pose.x) * scale;
    ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, H); ctx.stroke();
  }
  const gyStart = Math.floor(wB / gs) * gs;
  for (let wy = gyStart; wy <= wT + gs; wy += gs) {
    const sy = cy - (wy - pose.y) * scale;
    ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(W, sy); ctx.stroke();
  }

  // ── Etiquetas de grilla ──
  ctx.font      = '9px Share Tech Mono';
  ctx.fillStyle = 'rgba(40,55,70,0.75)';
  ctx.textAlign = 'center';
  for (let wx = gxStart; wx <= wR + gs; wx += gs) {
    const sx = cx + (wx - pose.x) * scale;
    const lbl = Math.round(wx);
    if (lbl !== 0 && Math.abs(sx - cx) > 20 && sx > 10 && sx < W - 10)
      ctx.fillText(lbl, sx, cy + 11);
  }
  ctx.textAlign = 'right';
  for (let wy = gyStart; wy <= wT + gs; wy += gs) {
    const sy  = cy - (wy - pose.y) * scale;
    const lbl = Math.round(wy);
    if (lbl !== 0 && Math.abs(sy - cy) > 10 && sy > 5 && sy < H - 5)
      ctx.fillText(lbl, cx - 5, sy + 3);
  }

  // ── Ejes cartesianos (origen 0,0) ──
  const ox = cx + (0 - pose.x) * scale;
  const oy = cy - (0 - pose.y) * scale;
  ctx.strokeStyle = 'rgba(30,43,60,0.95)';
  ctx.lineWidth   = 1;
  if (oy >= 0 && oy <= H) {
    ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(W, oy); ctx.stroke();
  }
  if (ox >= 0 && ox <= W) {
    ctx.beginPath(); ctx.moveTo(ox, 0); ctx.lineTo(ox, H); ctx.stroke();
  }

  // ── Marcador de origen ──
  if (ox > -8 && ox < W+8 && oy > -8 && oy < H+8) {
    ctx.beginPath();
    ctx.arc(ox, oy, 4, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(255,107,53,0.55)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,107,53,0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // ── Rastro del robot (color uniforme, sin atenuación) ──
  if (trail.length > 1) {
    const sx = p => cx + (p.x - pose.x) * scale;
    const sy = p => cy - (p.y - pose.y) * scale;

    // Halo suave
    ctx.beginPath();
    ctx.moveTo(sx(trail[0]), sy(trail[0]));
    for (let i = 1; i < trail.length; i++)
      ctx.lineTo(sx(trail[i]), sy(trail[i]));
    ctx.strokeStyle = 'rgba(0,229,255,0.13)';
    ctx.lineWidth   = 7;
    ctx.lineJoin    = 'round';
    ctx.lineCap     = 'round';
    ctx.stroke();

    // Línea principal — azul brillante uniforme en todo su recorrido
    ctx.beginPath();
    ctx.moveTo(sx(trail[0]), sy(trail[0]));
    for (let i = 1; i < trail.length; i++)
      ctx.lineTo(sx(trail[i]), sy(trail[i]));
    ctx.strokeStyle = '#00e5ff';
    ctx.lineWidth   = 1.8;
    ctx.lineJoin    = 'round';
    ctx.lineCap     = 'round';
    ctx.stroke();
  }

  // ── Robot (siempre al centro del canvas) ──
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-pose.theta);

  const bw = 20, bh = 26;

  // Cuerpo
  roundRect(ctx, -bw/2, -bh/2, bw, bh, 3);
  ctx.fillStyle   = 'rgba(10,13,17,0.96)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,229,255,0.72)';
  ctx.lineWidth   = 1.5;
  ctx.stroke();

  // Flecha de dirección (apunta hacia adelante)
  ctx.fillStyle = 'rgba(0,229,255,0.95)';
  ctx.beginPath();
  ctx.moveTo(0,  -bh/2 - 5);
  ctx.lineTo(-4, -bh/2 + 5);
  ctx.lineTo( 4, -bh/2 + 5);
  ctx.closePath();
  ctx.fill();

  // Mini-ruedas laterales
  ctx.fillStyle = 'rgba(0,229,255,0.18)';
  ctx.fillRect(-bw/2 - 5, -7, 5, 12);   // izquierda
  ctx.fillStyle = 'rgba(255,107,53,0.18)';
  ctx.fillRect( bw/2,     -7, 5, 12);   // derecha

  ctx.restore();

  // Punto central del robot (siempre sobre el rastro)
  ctx.beginPath();
  ctx.arc(cx, cy, 2.5, 0, Math.PI*2);
  ctx.fillStyle = 'var(--accent, #00e5ff)';
  ctx.fill();

  // Escala
  document.getElementById('ml-scale').textContent =
    scale >= 1
      ? `1 cm = ${scale.toFixed(1)}px`
      : `1px = ${(1/scale).toFixed(1)}cm`;
}

// ═══════════════════════════════════════════
//  RESET
// ═══════════════════════════════════════════
function resetPose() {
  pose     = { x: 0, y: 0, theta: 0 };
  prevL    = 0; prevR = 0;
  trail    = [{ x: 0, y: 0 }];
  velWin   = [];
  vLin     = 0; vAng = 0; vWheelL = 0; vWheelR = 0;
  scale    = SCALE;
  draw();
}

// ═══════════════════════════════════════════
//  FETCH PRINCIPAL (100 ms)
// ═══════════════════════════════════════════
async function tick() {
  try {
    const [rL, rR] = await Promise.all([
      fetch('/ticketsL'),
      fetch('/ticketsR')
    ]);
    const { ticketsL } = await rL.json();
    const { ticketsR } = await rR.json();
    const now = Date.now();

    // ── Flashes de vuelta completa ──
    if (Math.floor(prevL / TICKS_V) < Math.floor(ticketsL / TICKS_V)) showFlash('flash-L');
    if (Math.floor(prevR / TICKS_V) < Math.floor(ticketsR / TICKS_V)) showFlash('flash-R');

    // ── Velocidad (ventana deslizante 500 ms) ──
    velWin.push({ t: now, L: ticketsL, R: ticketsR });
    velWin = velWin.filter(v => now - v.t <= 500);
    if (velWin.length >= 2) {
      const old = velWin[0], nw = velWin[velWin.length - 1];
      const dt  = (nw.t - old.t) / 1000;
      if (dt > 0) {
        const dL = (nw.L - old.L) * CM_TICK;
        const dR = (nw.R - old.R) * CM_TICK;
        vWheelL = dL / dt;
        vWheelR = dR / dt;
        vLin    = (dL + dR) / 2 / dt;
        vAng    = (dR - dL) / ANCHO_CM / dt;
      }
    }

    // ── Odometría ──
    updateOdom(ticketsL, ticketsR);

    // ── Animación de ruedas ──
    const degT = 360 / TICKS_V;
    const rotL = ticketsL * degT;
    const rotR = ticketsR * degT;
    document.getElementById('rimL').setAttribute('transform', `rotate(${-rotL})`); // antihorario
    document.getElementById('rimR').setAttribute('transform', `rotate(${rotR})`);  // horario
    setArc(document.getElementById('arcL'), ticketsL);
    setArc(document.getElementById('arcR'), ticketsR);

    // ── Barras de progreso ──
    const pL = (ticketsL % TICKS_V) / TICKS_V * 100;
    const pR = (ticketsR % TICKS_V) / TICKS_V * 100;
    document.getElementById('barL').style.width = pL + '%';
    document.getElementById('barR').style.width = pR + '%';

    // ── Datos de rueda ──
    const vuelL = Math.floor(ticketsL / TICKS_V);
    const vuelR = Math.floor(ticketsR / TICKS_V);
    const partL = ticketsL % TICKS_V;
    const partR = ticketsR % TICKS_V;
    document.getElementById('tL').innerHTML = `${ticketsL} <span>ticks</span>`;
    document.getElementById('tR').innerHTML = `${ticketsR} <span>ticks</span>`;
    document.getElementById('revL').textContent =
      `${vuelL} vuelta${vuelL !== 1 ? 's' : ''} · ${partL} / ${TICKS_V}`;
    document.getElementById('revR').textContent =
      `${vuelR} vuelta${vuelR !== 1 ? 's' : ''} · ${partR} / ${TICKS_V}`;

    // ── Recorrido ──
    const cmL = (ticketsL * CM_TICK).toFixed(2);
    const cmR = (ticketsR * CM_TICK).toFixed(2);
    document.getElementById('cmL').innerHTML = `${cmL}<span class="d-unit"> cm</span>`;
    document.getElementById('cmR').innerHTML = `${cmR}<span class="d-unit"> cm</span>`;
    document.getElementById('dtL').textContent = `${ticketsL} ticks`;
    document.getElementById('dtR').textContent = `${ticketsR} ticks`;

    // ── Posición ──
    document.getElementById('valX').innerHTML =
      `${pose.x.toFixed(2)}<span class="pose-unit"> cm</span>`;
    document.getElementById('valY').innerHTML =
      `${pose.y.toFixed(2)}<span class="pose-unit"> cm</span>`;
    document.getElementById('valT').innerHTML =
      `${pose.theta.toFixed(4)}<span class="pose-unit"> rad</span>`;

    // ── Velocidad ──
    document.getElementById('valV').innerHTML =
      `${vLin.toFixed(2)}<span class="vel-unit"> cm/s</span>`;
    document.getElementById('valW').innerHTML =
      `${vAng.toFixed(4)}<span class="vel-unit"> rad/s</span>`;
    document.getElementById('subV').textContent =
      vLin >  0.5 ? 'AVANZANDO'    :
      vLin < -0.5 ? 'RETROCEDIENDO' : 'DETENIDO';
    document.getElementById('subW').textContent =
      vAng >  0.005 ? 'GIRANDO IZQ' :
      vAng < -0.005 ? 'GIRANDO DER' : 'RECTO';
    document.getElementById('valVL').innerHTML =
      `${vWheelL.toFixed(2)}<span class="vel-unit"> cm/s</span>`;
    document.getElementById('valVR').innerHTML =
      `${vWheelR.toFixed(2)}<span class="vel-unit"> cm/s</span>`;

    // ── Sincronía ──
    const delta   = Math.abs(ticketsL - ticketsR);
    const sign    = ticketsL >= ticketsR ? '+' : '−';
    document.getElementById('deltaVal').textContent =
      delta === 0 ? '±0' : sign + delta;

    const syncOk   = delta <  10;
    const syncWarn = delta <  50;
    const syncTxt  = syncOk ? 'EN SYNC' : syncWarn ? 'DRIFT LEVE' : 'DESYNC';
    const syncClr  = syncOk ? '#00ff88'  : syncWarn ? '#00e5ff'    : '#ff6b35';
    const syncBdr  = syncOk ? 'rgba(0,255,136,0.2)' :
                     syncWarn ? 'rgba(0,229,255,0.2)' : 'rgba(255,107,53,0.2)';
    document.getElementById('syncText').textContent = syncTxt;
    document.getElementById('syncDot').style.background   = syncClr;
    document.getElementById('syncPill').style.borderColor = syncBdr;
    document.getElementById('syncPill').style.color       = syncClr;

    // ── Mapa + Compás ──
    draw();
    drawCompass(pose.theta);

  } catch (e) {
    console.error('Error fetch:', e);
  }
}

setInterval(tick, 100);
tick();