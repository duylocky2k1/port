// Âm thanh chiptune tổng hợp bằng WebAudio (không cần file). Phím M để tắt/bật.
G.audio = (function () {
  let ctx = null, master = null, muted = false, timer = null, theme = null, step = 0;
  try { muted = localStorage.getItem('gchd_muted') === '1'; } catch (e) {}
  function ensure() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
      ctx = new AC(); master = ctx.createGain(); master.gain.value = muted ? 0 : 0.25; master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return true;
  }
  const N = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  function freq(n) { // 'C4','F#3','-' (nghỉ)
    if (!n || n === '-') return 0; const m = /^([A-G])(#?)(\d)$/.exec(n); if (!m) return 0;
    return 440 * Math.pow(2, (N[m[1]] + (m[2] ? 1 : 0) + (parseInt(m[3]) - 4) * 12 - 9) / 12);
  }
  function tone(f, t, d, type, vol, slideTo) {
    if (!f) return; const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || 'square'; o.frequency.setValueAtTime(f, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + d);
    g.gain.setValueAtTime(vol || 0.3, t); g.gain.exponentialRampToValueAtTime(0.001, t + d);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + d + 0.02);
  }
  const SFX = {
    click: () => tone(880, ctx.currentTime, 0.06, 'square', 0.25),
    hover: () => tone(660, ctx.currentTime, 0.03, 'square', 0.08),
    select: () => { const t = ctx.currentTime; tone(523, t, 0.08); tone(784, t + 0.08, 0.14); },
    confirm: () => { const t = ctx.currentTime; [523, 659, 784, 1047].forEach((f, i) => tone(f, t + i * 0.07, 0.12)); },
    type: () => tone(1200 + Math.random() * 200, ctx.currentTime, 0.02, 'square', 0.05),
    correct: () => { const t = ctx.currentTime; [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, t + i * 0.09, 0.2, 'square', 0.25)); },
    wrong: () => { const t = ctx.currentTime; tone(220, t, 0.18, 'sawtooth', 0.3); tone(165, t + 0.16, 0.3, 'sawtooth', 0.3); },
    hurt: () => tone(300, ctx.currentTime, 0.25, 'sawtooth', 0.3, 80),
    locked: () => { const t = ctx.currentTime; tone(150, t, 0.08, 'square', 0.3); tone(150, t + 0.1, 0.08, 'square', 0.3); },
    treasure: () => { const t = ctx.currentTime; [392, 523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => tone(f, t + i * 0.1, 0.18, 'square', 0.22)); },
    collect: () => { const t = ctx.currentTime; tone(800, t, 0.08); tone(1200, t + 0.08, 0.15); },
    teleport: () => tone(200, ctx.currentTime, 0.9, 'sine', 0.3, 1600),
    swoosh: () => tone(900, ctx.currentTime, 0.25, 'sawtooth', 0.12, 120),
    hit: () => { const t = ctx.currentTime; tone(120, t, 0.2, 'square', 0.4, 40); tone(900, t, 0.08, 'sawtooth', 0.2, 100); },
    roar: () => { const t = ctx.currentTime; tone(110, t, 0.6, 'sawtooth', 0.4, 55); tone(80, t, 0.6, 'square', 0.3, 40); },
    gameover: () => { const t = ctx.currentTime; [392, 349, 330, 294, 262].forEach((f, i) => tone(f, t + i * 0.22, 0.3, 'triangle', 0.35)); },
    win: () => { const t = ctx.currentTime; [523, 523, 523, 659, 784, 659, 784, 1047].forEach((f, i) => tone(f, t + i * 0.14, 0.2, 'square', 0.25)); },
    page: () => tone(500, ctx.currentTime, 0.05, 'triangle', 0.2, 900),
  };
  // Nhạc nền: mỗi theme = tempo + melody + bass (mảng 16 bước, lặp)
  const THEMES = {
    title: { bpm: 132, lead: ['C5', '-', 'E5', '-', 'G5', '-', 'E5', '-', 'A4', '-', 'C5', '-', 'F5', '-', 'E5', '-'], bass: ['C3', '-', 'C3', '-', 'A2', '-', 'A2', '-', 'F2', '-', 'F2', '-', 'G2', '-', 'G2', '-'] },
    forest: { bpm: 100, lead: ['E4', '-', 'G4', 'A4', '-', 'G4', 'E4', '-', 'D4', '-', 'F4', 'G4', '-', 'F4', 'D4', '-'], bass: ['A2', '-', '-', '-', 'E2', '-', '-', '-', 'D2', '-', '-', '-', 'E2', '-', '-', '-'] },
    library: { bpm: 84, lead: ['A4', '-', 'C5', '-', 'B4', '-', 'G4', '-', 'A4', '-', 'E5', '-', 'D5', '-', 'B4', '-'], bass: ['A2', '-', 'E3', '-', 'G2', '-', 'D3', '-', 'F2', '-', 'C3', '-', 'E2', '-', 'B2', '-'] },
    stream: { bpm: 110, lead: ['G4', 'B4', 'D5', 'B4', 'G4', 'B4', 'D5', 'B4', 'F4', 'A4', 'C5', 'A4', 'E4', 'G4', 'B4', 'G4'], bass: ['G2', '-', '-', '-', 'G2', '-', '-', '-', 'F2', '-', '-', '-', 'E2', '-', '-', '-'] },
    maze: { bpm: 96, lead: ['D4', '-', 'F4', '-', 'A4', '-', 'F4', '-', 'C4', '-', 'E4', '-', 'G4', '-', 'E4', '-'], bass: ['D2', 'D2', '-', 'D2', 'D2', '-', 'D2', '-', 'C2', 'C2', '-', 'C2', 'C2', '-', 'C2', '-'] },
    summit: { bpm: 120, lead: ['C5', 'E5', 'G5', 'E5', 'C5', 'E5', 'G5', 'C6', 'B4', 'D5', 'G5', 'D5', 'B4', 'D5', 'G5', 'B5'], bass: ['C3', '-', 'G2', '-', 'C3', '-', 'G2', '-', 'G2', '-', 'D3', '-', 'G2', '-', 'D3', '-'] },
    boss: { bpm: 150, lead: ['A4', 'A4', '-', 'A4', 'C5', '-', 'B4', 'A4', 'G4', 'G4', '-', 'G4', 'B4', '-', 'A4', 'G4'], bass: ['A2', 'A2', 'A3', 'A2', 'A2', 'A3', 'A2', 'A3', 'G2', 'G2', 'G3', 'G2', 'G2', 'G3', 'G2', 'G3'] },
    win: { bpm: 128, lead: ['C5', 'E5', 'G5', 'C6', 'G5', 'E5', 'G5', 'C6', 'D5', 'F5', 'A5', 'D6', 'A5', 'F5', 'A5', 'D6'], bass: ['C3', '-', 'C3', '-', 'C3', '-', 'C3', '-', 'D3', '-', 'D3', '-', 'D3', '-', 'D3', '-'] },
  };
  function schedule() {
    if (!ctx || !theme || ctx.state !== 'running') return; const T = THEMES[theme]; const t = ctx.currentTime + 0.05, d = 60 / T.bpm / 2;
    const i = step % 16; tone(freq(T.lead[i]), t, d * 0.9, 'square', 0.07); tone(freq(T.bass[i]), t, d * 0.95, 'triangle', 0.16);
    step++;
  }
  return {
    ensure,
    sfx(n) { if (muted || !ensure()) return; try { SFX[n] && SFX[n](); } catch (e) {} },
    music(name) {
      if (theme === name && timer) return; theme = name; step = 0; if (timer) { clearInterval(timer); timer = null; }
      if (!name) return; if (!ensure()) return; const T = THEMES[name]; if (!T) return;
      timer = setInterval(schedule, (60 / T.bpm / 2) * 1000);
    },
    toggle() { muted = !muted; try { localStorage.setItem('gchd_muted', muted ? '1' : '0'); } catch (e) {} if (master) master.gain.value = muted ? 0 : 0.25; return muted; },
    get muted() { return muted; },
  };
})();
// Trình duyệt chỉ cho phát tiếng sau lần bấm đầu tiên
window.addEventListener('pointerdown', () => G.audio.ensure(), { once: true });
