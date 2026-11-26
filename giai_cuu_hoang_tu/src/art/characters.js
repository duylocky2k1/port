// Sprite 6 nhân vật chơi được, vũ khí, bảo vật, icon UI. Tất cả vẽ bằng code.
(function () {
  const P = G.P;
  const SKIN = '#ffd9b8', SKIN_D = '#f0b894', INK = '#1b1030';

  // thông số theo spec: màu tóc / đầm / vương miện (KHÔNG đổi)
  const LOOK = {
    ngocanh:  { hair: '#e0412f', hairD: '#a8281c', dress: '#ff7eb6', trim: '#ffffff', crown: '#ffd84a', hairEnd: 29, wavy: true },
    ngocngan: { hair: '#2a2438', hairD: '#15101f', dress: '#2f7de1', trim: '#c9d8f0', crown: '#d8e2f0', hairEnd: 31 },
    ngocgiao: { hair: '#2a2438', hairD: '#15101f', dress: '#ffd21f', trim: '#ff8c1a', crown: '#ffd84a', hairEnd: 28, bun: true },
    minhthu:  { hair: '#2a2438', hairD: '#15101f', dress: '#2fa84f', trim: '#fff3c4', crown: '#ffd84a', hairEnd: 27, flat: true },
    minhhien: { hair: '#2a2438', hairD: '#15101f', dress: '#ffffff', trim: '#1b1030', crown: '#d8e2f0', hairEnd: 23, check: true },
  };

  function drawPrincess(c, L, blink) {
    // tóc phía sau
    G.blob(c, L.hair, 6, 8, 19, L.hairEnd - 8);
    if (L.wavy) { for (let x = 6; x < 25; x += 3) P(c, L.hair, x, L.hairEnd, 2, 2); }
    P(c, L.hairD, 6, L.hairEnd - 5, 2, 5); P(c, L.hairD, 23, L.hairEnd - 5, 2, 5);
    // cổ + đầu
    P(c, SKIN_D, 13, 20, 5, 3);
    G.ellipse(c, SKIN, 15, 13, 8, 7);
    // tóc mái
    G.ellipse(c, L.hair, 15, 9, 9, 5);
    if (L.flat) { P(c, L.hair, 7, 8, 17, 4); P(c, L.hairD, 7, 11, 17, 1); }
    else { P(c, L.hair, 7, 9, 9, 4); P(c, L.hair, 13, 11, 4, 1); P(c, L.hairD, 7, 12, 6, 1); }
    P(c, L.hair, 6, 9, 3, 10); P(c, L.hair, 22, 9, 3, 10);
    if (L.bun) { G.ellipse(c, L.hair, 8, 5, 3, 3); P(c, '#ff3b5c', 9, 7, 2, 2); }
    // mắt, má hồng, miệng
    if (blink) { P(c, INK, 11, 15, 3, 1); P(c, INK, 18, 15, 3, 1); }
    else { P(c, INK, 11, 14, 3, 3); P(c, INK, 18, 14, 3, 3); P(c, '#ffffff', 11, 14, 1, 1); P(c, '#ffffff', 18, 14, 1, 1); }
    P(c, '#ff8aa0', 9, 17, 2, 1); P(c, '#ff8aa0', 21, 17, 2, 1); P(c, '#c0392b', 15, 18, 2, 1);
    // vương miện
    P(c, L.crown, 11, 3, 10, 3); [11, 14, 17, 20].forEach(function (x) { P(c, L.crown, x, 1, 2, 2); });
    P(c, '#e0383e', 15, 4, 2, 1); P(c, G.shade(L.crown, -50), 11, 5, 10, 1);
    // thân + váy
    P(c, L.dress, 11, 23, 9, 5);
    for (let i = 0; i < 10; i++) { const w = 11 + Math.round(i * 1.0); P(c, L.dress, 15 - Math.floor(w / 2), 28 + i, w, 1); }
    P(c, L.trim, 11, 23, 9, 1); P(c, G.shade(L.dress, -40), 15, 27, 2, 1);
    P(c, L.trim, 10, 36, 12, 1); P(c, L.trim, 9, 37, 14, 1);
    if (L.check) { // đầm ca rô trắng đen
      for (let y = 23; y < 38; y++) for (let x = 7; x < 24; x++) { const d = c.getImageData(x, y, 1, 1).data; if (d[3] > 0 && !(y === 23)) { P(c, (((x >> 1) + (y >> 1)) % 2) ? '#ffffff' : '#222222', x, y, 1, 1); } }
      P(c, '#222222', 11, 23, 9, 1);
    }
    // tay
    P(c, L.dress, 8, 23, 3, 2); P(c, SKIN, 8, 25, 3, 4);
    P(c, L.dress, 20, 23, 3, 2); P(c, SKIN, 21, 25, 3, 4);
    // giày
    P(c, '#7a3b1e', 11, 38, 4, 2); P(c, '#7a3b1e', 17, 38, 4, 2);
  }

  function drawMushroom(c, blink) {
    P(c, '#43b45a', 15, 0, 1, 3); G.ellipse(c, '#43b45a', 17, 1, 2, 1);
    G.ellipse(c, '#e0383e', 15, 12, 13, 9);
    for (let y = 16; y < 21; y++) P(c, '#b3262c', 3, y, 24, 1);
    G.ellipse(c, '#e0383e', 15, 12, 13, 8); P(c, '#b3262c', 4, 19, 22, 1);
    G.ellipse(c, '#ffffff', 8, 11, 3, 3); G.ellipse(c, '#ffffff', 15, 6, 3, 2); G.ellipse(c, '#ffffff', 22, 11, 3, 3); G.ellipse(c, '#ffffff', 12, 16, 2, 2); G.ellipse(c, '#ffffff', 19, 16, 2, 2);
    G.blob(c, '#fff0d0', 8, 20, 14, 14); P(c, '#e8d3a8', 8, 31, 14, 3);
    if (blink) { P(c, INK, 11, 25, 3, 1); P(c, INK, 17, 25, 3, 1); }
    else { P(c, INK, 11, 23, 3, 4); P(c, INK, 17, 23, 3, 4); P(c, '#fff', 11, 23, 1, 1); P(c, '#fff', 17, 23, 1, 1); }
    P(c, '#ff8aa0', 9, 28, 2, 1); P(c, '#ff8aa0', 20, 28, 2, 1);
    P(c, '#c0392b', 13, 29, 5, 1); P(c, '#c0392b', 12, 28, 1, 1); P(c, '#c0392b', 18, 28, 1, 1);
    P(c, '#fff0d0', 5, 25, 3, 4); P(c, '#fff0d0', 22, 25, 3, 4);
    P(c, '#7a3b1e', 8, 35, 6, 4); P(c, '#7a3b1e', 17, 35, 6, 4);
  }

  // ----- vũ khí (mỗi cái 1 texture riêng để dễ xoay/ném) -----
  const WEAPONS = {
    ngocanh: { w: 20, h: 20, fn: function (c) {
      for (let i = 0; i < 12; i++) P(c, '#8b5a2b', 2 + i, 17 - i, 2, 2);
      P(c, '#aab4c0', 12, 5, 3, 3); P(c, '#aab4c0', 13, 4, 3, 3);
      G.ellipse(c, '#ff4fa3', 16, 3, 2, 2); P(c, '#4aa3ff', 17, 2, 2, 2); P(c, '#ffd84a', 15, 1, 2, 2); P(c, '#ffffff', 16, 2, 1, 1);
    }, off: [8, -14], org: [0.2, 0.9], rot: -10 },
    ngocngan: { w: 22, h: 18, fn: function (c) {
      P(c, '#c9d8f0', 2, 6, 3, 8); c.fillStyle = '#2f7de1';
      for (let x = 0; x < 14; x++) { const hh = 6 + Math.floor(x * 0.55); P(c, '#2f7de1', 4 + x, 9 - Math.floor(hh / 2), 1, hh); }
      P(c, '#c9d8f0', 17, 1, 3, 16); P(c, '#8aa0c8', 19, 1, 1, 16);
      P(c, '#1b1030', 1, 14, 5, 3); P(c, '#aab4c0', 8, 14, 4, 3);
    }, off: [9, -14], org: [0.3, 0.5], rot: -5 },
    ngocgiao: { w: 28, h: 30, fn: function (c) {
      G.ellipse(c, '#ffd84a', 14, 17, 11, 11); G.ellipse(c, '#fff8e0', 14, 17, 9, 9);
      P(c, '#aab4c0', 5, 4, 7, 5); P(c, '#aab4c0', 16, 4, 7, 5); P(c, '#8aa0b0', 5, 7, 7, 2); P(c, '#8aa0b0', 16, 7, 7, 2);
      P(c, '#aab4c0', 13, 6, 3, 2); P(c, INK, 14, 10, 1, 7); P(c, INK, 14, 17, 5, 1); P(c, '#e0383e', 14, 17, 1, 1);
      [[14, 8], [14, 26], [4, 17], [24, 17]].forEach(function (p) { P(c, INK, p[0], p[1], 1, 1); });
      P(c, '#7a3b1e', 6, 27, 3, 3); P(c, '#7a3b1e', 19, 27, 3, 3);
    }, off: [11, -16], org: [0.3, 0.6], rot: 0 },
    minhthu: { w: 20, h: 24, fn: function (c) {
      [['#ffffff', 0], ['#e8f0ff', 2], ['#ffffff', 4]].forEach(function (p, i) { P(c, p[0], 2 + i, 6 - i + 0, 14, 16); P(c, '#9aa7c4', 2 + i, 21 - i, 14, 1); });
      P(c, '#ffffff', 1, 3, 15, 17); P(c, '#1b6ac9', 3, 5, 11, 2);
      P(c, '#4aa3ff', 4, 12, 2, 5); P(c, '#e0383e', 7, 10, 2, 7); P(c, '#3fbf5f', 10, 13, 2, 4); P(c, '#8aa0c8', 3, 18, 11, 1);
      P(c, '#8aa0c8', 3, 8, 11, 1); P(c, '#8aa0c8', 3, 9, 7, 1);
    }, off: [9, -14], org: [0.3, 0.7], rot: -6 },
    minhhien: { w: 18, h: 24, fn: function (c) {
      G.blob(c, '#4a5568', 1, 1, 16, 22); P(c, '#2b3340', 1, 20, 16, 3);
      P(c, '#9be8a6', 3, 3, 12, 6); P(c, '#1f6f3a', 4, 4, 2, 4); P(c, '#1f6f3a', 7, 4, 2, 4); P(c, '#1f6f3a', 10, 4, 2, 4); P(c, '#1f6f3a', 13, 7, 1, 1);
      const cols = ['#e0383e', '#ffd84a', '#4aa3ff', '#dddddd']; for (let r = 0; r < 4; r++) for (let q = 0; q < 4; q++) P(c, cols[(r + q) % 4], 3 + q * 3, 11 + r * 3, 2, 2);
    }, off: [9, -14], org: [0.3, 0.7], rot: 0 },
    hoangthien: { w: 18, h: 16, fn: function (c) {
      G.ellipse(c, '#3fbf5f', 9, 9, 6, 5); P(c, '#2b9a46', 4, 12, 10, 2); P(c, '#3fbf5f', 3, 5, 4, 4); P(c, '#3fbf5f', 11, 5, 4, 4);
      P(c, '#ffffff', 4, 5, 3, 3); P(c, '#ffffff', 11, 5, 3, 3); P(c, INK, 5, 6, 1, 2); P(c, INK, 12, 6, 1, 2);
      P(c, '#c0392b', 7, 11, 4, 1); P(c, '#2b9a46', 1, 13, 4, 3); P(c, '#2b9a46', 13, 13, 4, 3);
    }, off: [9, -12], org: [0.5, 0.6], rot: 0 },
  };
  G.art.weapons = WEAPONS;

  // ----- bảo vật 28x28 -----
  const TREASURE = [
    function (c) { // Áo giáp: giáp ngực + vai tròn + váy giáp
      G.ellipse(c, '#e8b020', 5, 8, 4, 3); G.ellipse(c, '#e8b020', 23, 8, 4, 3); P(c, '#fff08a', 3, 6, 3, 1); P(c, '#fff08a', 21, 6, 3, 1); P(c, '#b8860b', 4, 10, 4, 1); P(c, '#b8860b', 20, 10, 4, 1);
      G.blob(c, '#ffd84a', 8, 6, 12, 14); P(c, '#1b1030', 12, 5, 4, 3); P(c, '#b8860b', 8, 17, 12, 3); P(c, '#fff08a', 9, 8, 2, 7);
      P(c, '#e0383e', 13, 8, 2, 12); P(c, '#b8860b', 8, 12, 12, 1); G.ellipse(c, '#4aa3ff', 14, 13, 2, 2); P(c, '#ffffff', 13, 12, 1, 1);
      [[8, 20], [12, 20], [16, 20]].forEach(function (t, k) { P(c, k === 1 ? '#e8b020' : '#ffd84a', t[0], t[1], 4, 6); P(c, '#b8860b', t[0], t[1] + 5, 4, 1); });
      P(c, '#e0383e', 8, 19, 12, 2);
    },
    function (c) { // Quyển sách
      G.blob(c, '#2b2f8f', 4, 3, 20, 22); P(c, '#1b1d66', 4, 22, 20, 3); P(c, '#fff3c4', 22, 5, 2, 18);
      [[4, 3], [22, 3], [4, 23], [22, 23]].forEach(function (p) { P(c, '#ffd84a', p[0], p[1], 2, 2); });
      G.ellipse(c, '#ffd84a', 13, 13, 5, 3); G.ellipse(c, '#2b2f8f', 13, 13, 3, 2); P(c, '#4aa3ff', 12, 12, 2, 2); P(c, '#ffffff', 12, 12, 1, 1);
      P(c, '#ffd84a', 13, 6, 1, 3); P(c, '#ffd84a', 13, 18, 1, 3);
    },
    function (c) { // Trái tim dũng cảm
      const m = ['..ccc...ccc..', '.cRRRc.cRRRc.', 'cRWRRRcRRRRRc', 'cRWRRRRRRRRRc', 'cRRRRRRRRRRRc', '.cRRRRRRRRRc.', '..cRRRYRRRc..', '...cRRYYRc...', '....cRRRc....', '.....cRc.....', '......c......'];
      G.M(c, m.map(function (r) { return r; }), { c: '#b8860b', R: '#e0183e', W: '#ff9bb0', Y: '#ffe36b' }, 6, 6);
      P(c, '#ffd84a', 12, 12, 3, 3); P(c, '#ffffff', 13, 12, 1, 1);
    },
    function (c) { // La Bàn Suy Luận [SPEC]: vỏ vàng chạm khắc, mặt xanh tím có dấu hỏi + ngôi sao, kim mũi tên vàng, đá tím ở tâm
      G.ellipse(c, '#b8860b', 14, 14, 12, 12); G.ellipse(c, '#ffd84a', 14, 14, 11, 11); P(c, '#b8860b', 13, 1, 3, 2);
      [[14, 4], [14, 24], [4, 14], [24, 14], [7, 7], [21, 7], [7, 21], [21, 21]].forEach(function (p) { P(c, '#fff08a', p[0], p[1], 1, 1); });
      G.ellipse(c, '#3a3a9a', 14, 14, 8, 8); G.ellipse(c, '#5a4ab8', 13, 13, 6, 6);
      G.M(c, ['xx.', '..x', '.x.', '...', '.x.'], { x: '#c8d0ff' }, 7, 10); P(c, '#fff3c4', 19, 9, 1, 3); P(c, '#fff3c4', 18, 10, 3, 1);
      for (let i = 0; i < 6; i++) P(c, '#ffd84a', 14 + Math.floor(i / 2), 13 - i, 1, 1); P(c, '#fff08a', 16, 7, 2, 2);
      for (let i = 0; i < 5; i++) P(c, '#b8860b', 13 - Math.floor(i / 2), 15 + i, 1, 1);
      G.ellipse(c, '#9b59ff', 14, 14, 2, 2); P(c, '#e0c8ff', 13, 13, 1, 1);
    },
    function (c) { // Quyền Trượng Thông Tuệ [SPEC]: thân vàng kim, đầu ngôi sao sáu cánh / tinh thể băng, đá xanh băng ở giữa
      for (let i = 0; i < 16; i++) P(c, i % 4 === 0 ? '#b8860b' : '#ffd84a', 13, 12 + i, 3, 1); P(c, '#fff08a', 13, 12, 1, 15); P(c, '#b8860b', 11, 26, 7, 2);
      const cx = 14, cy = 8; [[0, -7], [0, 7], [-6, -4], [6, -4], [-6, 4], [6, 4]].forEach(function (d) { for (let k = 0; k <= 6; k++) { P(c, '#bfefff', Math.round(cx + d[0] * k / 6), Math.round(cy + d[1] * k / 6), 2, 2); } });
      G.ellipse(c, '#ffd84a', cx, cy, 4, 4); G.ellipse(c, '#4ad8ff', cx, cy, 3, 3); P(c, '#e8ffff', cx - 1, cy - 2, 2, 2);
      [[3, 3], [24, 5], [4, 16], [23, 18]].forEach(function (p) { P(c, '#ffffff', p[0], p[1], 1, 1); });
    },
  ];

  function drawHeart(c, col, hi) { G.M(c, ['.rr..rr.', 'rhrrrrrr', 'rrrrrrrr', 'rrrrrrrr', '.rrrrrr.', '..rrrr..', '...rr...'], { r: col, h: hi }, 0, 0); }
  function drawStar(c, col, hi) { G.M(c, ['....y....', '....y....', '...yyy...', 'yyyyyyyyy', '.yyyhyyy.', '..yyyyy..', '..yy.yy..', '.yy...yy.'], { y: col, h: hi }, 0, 0); }

  G.art.buildCharacters = function (scene) {
    Object.keys(LOOK).forEach(function (id) {
      G.mk(scene, 'ch_' + id, 30, 41, function (c) { drawPrincess(c, LOOK[id], false); }, { outline: true });
      G.mk(scene, 'ch_' + id + '_b', 30, 41, function (c) { drawPrincess(c, LOOK[id], true); }, { outline: true });
    });
    G.mk(scene, 'ch_hoangthien', 30, 41, function (c) { drawMushroom(c, false); }, { outline: true });
    G.mk(scene, 'ch_hoangthien_b', 30, 41, function (c) { drawMushroom(c, true); }, { outline: true });
    Object.keys(WEAPONS).forEach(function (id) { const w = WEAPONS[id]; G.mk(scene, 'wp_' + id, w.w, w.h, w.fn, { outline: true }); });
    TREASURE.forEach(function (fn, i) { G.mk(scene, 'tr_' + i, 28, 28, fn, { outline: true }); G.mk(scene, 'trg_' + i, 28, 28, function (c) { fn(c); c.globalCompositeOperation = 'source-atop'; c.fillStyle = '#2a2548'; c.fillRect(0, 0, 28, 28); }, { outline: false }); });
    G.mk(scene, 'ic_heart', 8, 7, function (c) { drawHeart(c, '#e0183e', '#ff9bb0'); }, {});
    G.mk(scene, 'ic_heart_g', 8, 7, function (c) { drawHeart(c, '#5b5870', '#6f6c88'); }, {});
    G.mk(scene, 'ic_star', 9, 8, function (c) { drawStar(c, '#ffd84a', '#fff7b0'); }, {});
    G.mk(scene, 'ic_star_g', 9, 8, function (c) { drawStar(c, '#4a4566', '#4a4566'); }, {});
    G.mk(scene, 'ic_lock', 12, 14, function (c) {
      P(c, '#9aa0aa', 3, 0, 6, 1); P(c, '#9aa0aa', 2, 1, 2, 5); P(c, '#9aa0aa', 8, 1, 2, 5);
      G.blob(c, '#6b7280', 1, 5, 10, 8); P(c, '#4b5563', 1, 11, 10, 2); P(c, INK, 5, 7, 2, 3);
    }, { outline: true });
    G.mk(scene, 'ic_check', 14, 12, function (c) { for (let i = 0; i < 4; i++) P(c, '#3fbf5f', 1 + i, 6 + i, 2, 2); for (let i = 0; i < 7; i++) P(c, '#3fbf5f', 4 + i, 8 - i, 2, 2); }, { outline: true });
    G.mk(scene, 'px', 4, 4, function (c) { P(c, '#ffffff', 0, 0, 4, 4); }, {}); // hạt pixel trắng
    G.mk(scene, 'spark', 7, 7, function (c) { P(c, '#fff7b0', 3, 0, 1, 7); P(c, '#fff7b0', 0, 3, 7, 1); P(c, '#ffffff', 2, 2, 3, 3); }, {});
    G.mk(scene, 'note', 8, 10, function (c) { G.M(c, ['..xxxx..', '..x..x..', '..x.....', '..x.....', '..x.....', 'xxx.....', 'xxx.....'], { x: '#ffffff' }, 0, 1); }, {});
    G.mk(scene, 'ic_q', 9, 12, function (c) { G.M(c, ['.xxxx..', 'xx..xx.', '....xx.', '...xx..', '..xx...', '..xx...', '.......', '..xx...'], { x: '#ffd84a' }, 1, 2); }, {});
  };

  // ---------- Container nhân vật có animation ----------
  G.makeChar = function (scene, id, x, y, s, opts) {
    opts = opts || {}; s = s || 4;
    const cont = scene.add.container(x, y);
    const shadow = scene.add.ellipse(0, -2 * s, 22 * s, 5 * s, 0x000000, 0.3);
    const body = scene.add.image(0, 0, 'ch_' + id).setOrigin(0.5, 1).setScale(s);
    const W = G.art.weapons[id], off = W.off;
    const weapon = scene.add.image(off[0] * s, (off[1] + 41) * s - 41 * s, 'wp_' + id).setOrigin(W.org[0], W.org[1]).setScale(s).setAngle(W.rot);
    weapon.x = off[0] * s; weapon.y = off[1] * s;
    cont.add([shadow, body, weapon]);
    cont.setSize(30 * s, 41 * s);
    cont.charId = id; cont.bodyImg = body; cont.weaponImg = weapon; cont.shadowImg = shadow; cont.s = s;
    if (opts.idle !== false) {
      cont.idleTween = scene.tweens.add({ targets: body, scaleY: s * 1.05, scaleX: s * 0.98, duration: 520 + Math.random() * 120, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      cont.idleTween2 = scene.tweens.add({ targets: weapon, y: weapon.y - s * 1.2, duration: 520, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      cont.blinkEv = scene.time.addEvent({ delay: 2000 + Math.random() * 1500, loop: true, callback: function () { if (!body.scene) return; body.setTexture('ch_' + id + '_b'); scene.time.delayedCall(130, function () { if (body.scene) body.setTexture('ch_' + id); }); } });
    }
    cont.once('destroy', function () { scene.tweens.killTweensOf([body, weapon, cont]); if (cont.blinkEv) cont.blinkEv.remove(); });
    cont.cheer = function () { scene.tweens.add({ targets: cont, y: cont.y - 40 * s / 4 * 1.5, duration: 200, yoyo: true, repeat: 2, ease: 'Quad.easeOut' }); scene.tweens.add({ targets: weapon, angle: weapon.angle - 40, duration: 200, yoyo: true, repeat: 2 }); };
    cont.sad = function () { scene.tweens.add({ targets: cont, x: cont.x + 6, duration: 50, yoyo: true, repeat: 5 }); body.setTint(0xaaaaee); scene.time.delayedCall(400, function () { if (body.scene) body.clearTint(); }); };
    cont.talkPose = function () { scene.tweens.add({ targets: cont, y: cont.y - 6, duration: 120, yoyo: true, repeat: 1 }); };
    return cont;
  };
})();
