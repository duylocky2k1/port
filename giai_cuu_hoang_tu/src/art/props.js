// Đồ họa bổ sung (vẽ bằng code): Người Canh Cửa, Hiền Triết Bông Tuyết, cánh cửa mê cung, bông tuyết chân lý,
// icon cho slide, bối cảnh Đỉnh Núi tuyết + phòng bảo vật. Nạp sau world.js, trước Boot.
(function () {
  const P = G.P, INK = '#1b1030', H = G.art.h, NPCS = G.art.npcDefs, BG = G.art.bgDefs;

  // ================= NPC mới =================
  NPCS.gatekeeper = { w: 54, h: 74, fn: function (c, m, b) { // ông lão pháp sư, áo tím than họa tiết dấu hỏi, mũ chóp nhọn, quyền trượng đầu "?"
    // quyền trượng
    P(c, '#6b4423', 44, 14, 3, 58); P(c, '#8a5a2f', 44, 14, 1, 58);
    G.M(c, ['.yyyy.', 'yy..yy', '....yy', '...yy.', '..yy..', '..yy..', '......', '..yy..'], { y: '#ffd84a' }, 42, 2);
    // áo choàng
    for (let y = 0; y < 38; y++) { const w = 22 + Math.floor(y * 0.75); P(c, '#2a1f5c', 24 - Math.floor(w / 2), 34 + y, w, 1); }
    P(c, '#3d2f80', 10, 50, 4, 20); P(c, '#ffd84a', 6, 70, 36, 2);
    [[12, 56], [30, 62], [16, 66]].forEach(function (q) { G.M(c, ['xx.', '..x', '.x.', '...', '.x.'], { x: '#ffd84a' }, q[0], q[1]); });
    P(c, '#ffd84a', 13, 50, 22, 2); P(c, '#9b7bff', 22, 50, 4, 2);
    // tay cầm trượng
    P(c, '#f2c9a0', 41, 40, 6, 5); P(c, '#2a1f5c', 34, 40, 8, 6);
    // mặt + râu bạc dài
    G.ellipse(c, '#f2c9a0', 24, 26, 8, 7);
    for (let i = 0; i < 26; i++) { const w = Math.max(2, 18 - Math.floor(i * 0.6)); P(c, i % 3 ? '#e8ecf4' : '#ffffff', 24 - Math.floor(w / 2), 29 + i, w, 1); }
    P(c, '#c8ccd8', 21, 40, 1, 12); P(c, '#c8ccd8', 27, 38, 1, 14);
    P(c, '#e8ecf4', 14, 22, 4, 8); P(c, '#e8ecf4', 30, 22, 4, 8);
    // kính tròn + mắt phát sáng
    [20, 28].forEach(function (x) { G.ellipse(c, '#ffd84a', x, 24, 3, 3); G.ellipse(c, b ? '#f2c9a0' : '#9ff5ff', x, 24, 2, 2); if (b) P(c, INK, x - 2, 24, 4, 1); else P(c, '#ffffff', x - 1, 23, 1, 1); });
    P(c, '#ffd84a', 23, 24, 2, 1); P(c, '#e8ecf4', 17, 20, 6, 1); P(c, '#e8ecf4', 26, 20, 6, 1);
    if (m) { G.ellipse(c, '#5a2a3a', 24, 32, 3, 2); } else P(c, '#b8a8a8', 22, 31, 5, 1);
    // mũ chóp nhọn (đỉnh gập)
    for (let i = 0; i < 16; i++) { const w = 4 + i; P(c, '#2a1f5c', 24 - Math.floor(w / 2) + Math.floor((16 - i) / 5), 3 + i, w, 1); }
    P(c, '#2a1f5c', 30, 0, 5, 4); P(c, '#ffd84a', 34, 0, 2, 2);
    P(c, '#3d2f80', 10, 18, 28, 3); P(c, '#ffd84a', 12, 16, 24, 2);
    G.M(c, ['xx.', '..x', '.x.', '...', '.x.'], { x: '#ffd84a' }, 22, 8);
  } };

  NPCS.snowsage = { w: 76, h: 76, fn: function (c, m, b) { // bông tuyết sáu cánh, mặt ông lão, mày trắng dài, râu tinh thể băng, vương miện pha lê
    const cx = 38, cy = 38;
    for (let a = 0; a < 6; a++) {
      const ang = -Math.PI / 2 + a * Math.PI / 3, dx = Math.cos(ang), dy = Math.sin(ang);
      for (let k = 6; k <= 34; k++) { P(c, '#9fe0ff', Math.round(cx + dx * k) - 2, Math.round(cy + dy * k) - 2, 5, 5); P(c, '#eaf8ff', Math.round(cx + dx * k) - 1, Math.round(cy + dy * k) - 1, 3, 3); }
      [16, 25].forEach(function (k, j) { const bx = cx + dx * k, by = cy + dy * k, L = j ? 6 : 8; [-1, 1].forEach(function (s) { const a2 = ang + s * 0.9; for (let t = 1; t <= L; t++) P(c, '#d8f4ff', Math.round(bx + Math.cos(a2) * t) - 1, Math.round(by + Math.sin(a2) * t) - 1, 3, 3); }); });
      G.ellipse(c, '#ffffff', Math.round(cx + dx * 35), Math.round(cy + dy * 35), 2, 2);
    }
    // mặt
    G.ellipse(c, '#bfe8ff', cx, cy, 15, 15); G.ellipse(c, '#f4fbff', cx, cy, 13, 13);
    // vương miện pha lê
    [[-8, 0], [-4, -3], [0, -6], [4, -3], [8, 0]].forEach(function (d) { P(c, '#7fd8ff', cx + d[0] - 1, cy - 14 + d[1], 3, 6 - d[1]); P(c, '#e8ffff', cx + d[0], cy - 14 + d[1], 1, 2); });
    P(c, '#7fd8ff', cx - 10, cy - 10, 21, 3); P(c, '#ffd84a', cx - 1, cy - 10, 3, 3);
    // mày dài trắng
    P(c, '#ffffff', cx - 13, cy - 5, 10, 2); P(c, '#ffffff', cx + 4, cy - 5, 10, 2); P(c, '#ffffff', cx - 15, cy - 4, 3, 3); P(c, '#ffffff', cx + 13, cy - 4, 3, 3);
    H.eyePair(c, cx - 6, cx + 6, cy - 1, b, false);
    P(c, '#ffb3c8', cx - 11, cy + 3, 3, 2); P(c, '#ffb3c8', cx + 9, cy + 3, 3, 2);
    // râu tinh thể băng
    for (let i = 0; i < 12; i++) { const w = Math.max(1, 14 - i); P(c, i % 2 ? '#bfefff' : '#e8fbff', cx - Math.floor(w / 2), cy + 6 + i, w, 1); }
    [[-5, 14], [0, 18], [5, 14]].forEach(function (d) { P(c, '#7fd8ff', cx + d[0], cy + d[1], 1, 2); });
    if (m) { G.ellipse(c, '#4a6a8a', cx, cy + 6, 3, 2); } else P(c, '#7a9ab8', cx - 2, cy + 6, 5, 1);
  } };

  // ================= icon cho slide (16x16) =================
  const ICONS = {
    sun: function (c) { for (let a = 0; a < 8; a++) { const an = a * Math.PI / 4; P(c, '#ff9f1a', Math.round(8 + Math.cos(an) * 7) - 1, Math.round(8 + Math.sin(an) * 7) - 1, 2, 2); } G.ellipse(c, '#ffb43a', 8, 8, 5, 5); P(c, '#ffd84a', 6, 5, 3, 2); P(c, INK, 5, 7, 2, 1); P(c, INK, 10, 7, 2, 1); P(c, INK, 5, 6, 1, 1); P(c, INK, 11, 6, 1, 1); P(c, INK, 6, 11, 4, 1); },
    tube: function (c) { P(c, '#ffffff', 4, 1, 8, 10); P(c, '#ff9f1a', 4, 1, 8, 2); P(c, '#ffd84a', 6, 5, 4, 3); P(c, '#ff9f1a', 5, 11, 6, 4); },
    shield: function (c) { shield(c, '#7fc8ff', '#d8f0ff'); },
    shieldfull: function (c) { shield(c, '#4aa3ff', '#e8f8ff'); P(c, '#ffffff', 1, 1, 1, 1); P(c, '#fff7b0', 14, 2, 1, 1); P(c, '#fff7b0', 13, 12, 1, 1); },
    shieldbroken: function (c) { shield(c, '#7a7690', '#a8a4c0'); for (let i = 0; i < 9; i++) P(c, INK, 7 + (i % 3 === 0 ? 1 : 0) - (i % 4 === 2 ? 1 : 0), 2 + i, 1, 1); },
    qr: function (c) { P(c, '#ffffff', 1, 1, 14, 14); const r = G.rng(5); for (let y = 0; y < 12; y += 2) for (let x = 0; x < 12; x += 2) if (r() < 0.5) P(c, INK, 2 + x, 2 + y, 2, 2); [[2, 2], [10, 2], [2, 10]].forEach(function (p) { P(c, INK, p[0], p[1], 4, 4); P(c, '#ffffff', p[0] + 1, p[1] + 1, 2, 2); P(c, INK, p[0] + 1, p[1] + 1, 1, 1); }); },
    girl: function (c) { G.ellipse(c, '#7a4a22', 8, 6, 6, 5); P(c, '#7a4a22', 2, 6, 3, 6); P(c, '#7a4a22', 11, 6, 3, 6); G.ellipse(c, '#f2c9a0', 8, 7, 4, 4); P(c, INK, 6, 7, 1, 1); P(c, INK, 10, 7, 1, 1); P(c, '#ff8aa0', 5, 9, 1, 1); P(c, '#ff8aa0', 11, 9, 1, 1); P(c, '#7fe0c0', 5, 11, 6, 4); P(c, '#f2c9a0', 4, 11, 1, 3); P(c, '#f2c9a0', 11, 11, 1, 3); },
    team: function (c) { [[3, '#e0383e'], [8, '#4aa3ff'], [13, '#3fbf5f']].forEach(function (p, i) { G.ellipse(c, i === 1 ? '#3a2a1a' : '#7a4a22', p[0], 4 + (i === 1 ? -1 : 0), 2, 2); G.ellipse(c, '#f2c9a0', p[0], 6 + (i === 1 ? -1 : 0), 2, 2); P(c, p[1], p[0] - 2, 9 + (i === 1 ? -1 : 0), 5, 6); }); },
    chest: function (c) { P(c, '#8a5a2f', 1, 6, 14, 9); P(c, '#a8703a', 1, 3, 14, 4); P(c, '#ffd84a', 1, 7, 14, 1); P(c, '#ffd84a', 7, 6, 2, 4); P(c, '#ffd84a', 1, 3, 1, 12); P(c, '#ffd84a', 14, 3, 1, 12); P(c, '#fff7b0', 3, 1, 1, 1); P(c, '#fff7b0', 12, 1, 1, 1); },
    choice: function (c) { P(c, '#c8ccd8', 7, 4, 2, 8); P(c, '#c8ccd8', 6, 3, 4, 1); P(c, '#c8ccd8', 7, 2, 2, 1); P(c, '#e0383e', 1, 8, 6, 2); P(c, '#e0383e', 1, 7, 1, 4); P(c, '#4aa3ff', 9, 8, 6, 2); P(c, '#4aa3ff', 14, 7, 1, 4); P(c, '#f2c9a0', 6, 11, 4, 4); P(c, '#f2c9a0', 7, 9, 1, 2); },
    progress: function (c) { for (let i = 0; i < 10; i++) P(c, '#3fa070', 2 + i, 13 - i, 3, 3); P(c, '#3fa070', 10, 2, 5, 2); P(c, '#3fa070', 13, 2, 2, 5); P(c, '#ffd84a', 2, 3, 3, 3); P(c, '#ffd84a', 10, 11, 3, 3); },
    trophy: function (c) { P(c, '#ffd84a', 4, 2, 8, 6); G.ellipse(c, '#ffd84a', 8, 7, 4, 3); P(c, '#ffd84a', 1, 3, 3, 1); P(c, '#ffd84a', 1, 3, 1, 3); P(c, '#ffd84a', 12, 3, 3, 1); P(c, '#ffd84a', 14, 3, 1, 3); P(c, '#b8860b', 7, 10, 2, 3); P(c, '#b8860b', 4, 13, 8, 2); P(c, '#fff7b0', 5, 3, 1, 4); },
    heart: function (c) { G.M(c, ['.rr..rr.', 'rhrrrrrr', 'rrrrrrrr', 'rrrrrrrr', '.rrrrrr.', '..rrrr..', '...rr...'], { r: '#ff6a8a', h: '#ffd0dc' }, 4, 4); },
    hand: function (c) { P(c, '#f2c9a0', 1, 10, 10, 3); P(c, '#f2c9a0', 9, 8, 4, 3); P(c, '#e0a870', 1, 12, 9, 1); P(c, '#e8f6ff', 5, 4, 5, 6); P(c, '#9fd8ff', 5, 4, 5, 1); G.ellipse(c, '#3fbf5f', 12, 3, 2, 2); P(c, '#ffffff', 11, 3, 1, 1); P(c, '#ffffff', 12, 4, 1, 1); },
    quiz: function (c) { P(c, '#ffffff', 2, 1, 12, 14); P(c, '#c8ccd8', 2, 1, 12, 2); [5, 8, 11].forEach(function (y, i) { P(c, INK, 4, y, 2, 2); P(c, i === 1 ? '#3fbf5f' : '#8aa0c8', 7, y, 6, 2); }); },
    star: function (c) { G.M(c, ['....y....', '....y....', '...yyy...', 'yyyyyyyyy', '.yyyhyyy.', '..yyyyy..', '..yy.yy..', '.yy...yy.'], { y: '#ffd84a', h: '#fff7b0' }, 3, 4); },
  };
  function shield(c, col, hi) { P(c, col, 3, 2, 10, 7); for (let i = 0; i < 6; i++) P(c, col, 3 + i, 9 + i, 10 - i * 2, 1); P(c, hi, 4, 3, 2, 6); P(c, G.shade(col, -40), 3, 2, 10, 1); }

  G.art.buildProps = function (scene) {
    Object.keys(ICONS).forEach(function (k) { G.mk(scene, 'si_' + k, 16, 16, ICONS[k], { outline: true }); });
    // cánh cửa mê cung (đóng / mở) + biểu tượng
    G.mk(scene, 'door', 48, 72, function (c) { doorFrame(c); P(c, '#3a2a5a', 9, 16, 30, 56); P(c, '#2a1d48', 23, 16, 2, 56); for (let y = 22; y < 70; y += 9) { P(c, '#4a3a72', 11, y, 10, 1); P(c, '#4a3a72', 27, y, 10, 1); } P(c, '#9b7bff', 19, 44, 2, 4); P(c, '#9b7bff', 27, 44, 2, 4); }, { outline: true });
    G.mk(scene, 'door_open', 48, 72, function (c) { doorFrame(c); P(c, '#ffe9a8', 9, 16, 30, 56); P(c, '#fff7d0', 14, 24, 20, 48); P(c, '#3a2a5a', 5, 16, 5, 56); P(c, '#3a2a5a', 38, 16, 5, 56); }, { outline: true });
    G.mk(scene, 'sym_star', 12, 12, function (c) { G.M(c, ['.....y.....', '....yyy....', 'yyyyyyyyyyy', '.yyyyyyyyy.', '..yyyyyyy..', '..yyy.yyy..', '.yy.....yy.'], { y: '#ffffff' }, 0, 2); }, {});
    G.mk(scene, 'sym_check', 12, 12, function (c) { for (let i = 0; i < 4; i++) P(c, '#ffffff', 1 + i, 6 + i, 2, 2); for (let i = 0; i < 7; i++) P(c, '#ffffff', 4 + i, 9 - i, 2, 2); }, {});
    G.mk(scene, 'sym_warn', 12, 12, function (c) { for (let i = 0; i < 11; i++) P(c, '#ffffff', 6 - Math.floor(i / 2), i, 1 + Math.floor(i / 2) * 2, 1); P(c, INK, 5, 3, 2, 5); P(c, INK, 5, 9, 2, 1); }, {});
    // bông tuyết chân lý (32x32) + hạt tuyết + sương + journal
    G.mk(scene, 'flake', 32, 32, function (c) { for (let a = 0; a < 6; a++) { const an = a * Math.PI / 3 - Math.PI / 2, dx = Math.cos(an), dy = Math.sin(an); for (let k = 2; k <= 14; k++) P(c, '#ffffff', Math.round(16 + dx * k) - 1, Math.round(16 + dy * k) - 1, 3, 3); [-1, 1].forEach(function (s) { for (let t = 1; t <= 4; t++) P(c, '#ffffff', Math.round(16 + dx * 9 + Math.cos(an + s * 0.9) * t), Math.round(16 + dy * 9 + Math.sin(an + s * 0.9) * t), 2, 2); }); } G.ellipse(c, '#ffffff', 16, 16, 4, 4); G.ellipse(c, '#cfefff', 16, 16, 2, 2); }, { outline: true });
    G.mk(scene, 'snow', 3, 3, function (c) { P(c, '#ffffff', 1, 0, 1, 3); P(c, '#ffffff', 0, 1, 3, 1); }, {});
    G.mk(scene, 'fog', 16, 8, function (c) { G.ellipse(c, 'rgba(170,140,255,0.55)', 8, 4, 7, 3); }, {});
    G.mk(scene, 'piece', 7, 7, function (c) { P(c, '#c8b0ff', 0, 1, 6, 6); P(c, '#c8b0ff', 2, 0, 2, 1); P(c, '#c8b0ff', 6, 3, 1, 2); }, {});
    ['#2b5fc9', '#c0392b', '#2f8f3a', '#7a3fa0'].forEach(function (col, i) { G.mk(scene, 'journal' + i, 12, 14, function (c) { P(c, col, 0, 0, 11, 14); P(c, '#fff3c4', 11, 1, 1, 12); P(c, G.shade(col, -50), 0, 0, 1, 14); P(c, '#ffd84a', 3, 3, 6, 1); P(c, '#ffffff', 3, 6, 6, 2); P(c, '#ffd84a', 3, 10, 6, 1); }, { outline: true }); });
  };
  function doorFrame(c) { P(c, '#6a6a80', 0, 8, 48, 64); G.ellipse(c, '#6a6a80', 24, 14, 24, 14); P(c, '#8a8aa0', 0, 8, 3, 64); P(c, '#4a4a60', 45, 8, 3, 64); G.ellipse(c, '#3a2a5a', 24, 18, 15, 10); for (let y = 12; y < 72; y += 10) { P(c, '#55556a', 0, y, 6, 1); P(c, '#55556a', 42, y + 5, 6, 1); } P(c, '#3f8f4a', 0, 30, 3, 12); P(c, '#3f8f4a', 45, 48, 3, 10); }

  // ================= bối cảnh mới =================
  // Đỉnh Núi Chân Lý: tuyết trắng, xanh băng, xanh dương đậm, tím nhạt; tổ rồng xa bị phong ấn
  BG.snow = function (c) {
    H.skyBands(c, ['#4a6ad0', '#5a80dc', '#6a96e6', '#86b0f0', '#a6c8f6', '#c8e0fb'], 26);
    H.lights(c, 14, 9);
    H.mountains(c, '#c8d8f4', 150, 90, 91, '#ffffff'); H.mountains(c, '#9fb8e8', 170, 60, 92, '#e8f2ff');
    // núi tổ rồng phía xa (bên phải) + mây đen + trang Journal
    for (let y = 0; y < 110; y++) { const w = 16 + Math.floor(y * 1.1); P(c, '#3a3060', 400 - Math.floor(w / 2), 62 + y, w, 1); }
    H.prasat(c, 400, 70, 1, '#5a3a6a', '#2a1838', '#e0383e');
    [[370, 40, 22, 7], [420, 34, 26, 8], [395, 26, 18, 6]].forEach(function (e) { G.ellipse(c, '#3a2e4a', e[0], e[1], e[2], e[3]); });
    [[360, 56], [440, 50], [418, 70]].forEach(function (p) { P(c, '#ffffff', p[0], p[1], 5, 6); P(c, '#8aa0c8', p[0] + 1, p[1] + 2, 3, 1); });
    // con đường băng dẫn tới tổ rồng (đang bị phong ấn)
    for (let i = 0; i < 40; i++) P(c, i % 2 ? '#bfefff' : '#9fe0ff', 300 + i * 2, 186 - Math.floor(i * 1.6), 6, 3);
    P(c, 'rgba(160,120,255,0.45)', 370, 108, 6, 24); P(c, 'rgba(160,120,255,0.45)', 362, 116, 22, 6);
    // vách băng hai bên
    for (let y = 0; y < 120; y++) { const w = Math.max(0, 46 - Math.floor(y * 0.25)); P(c, y % 9 < 5 ? '#9fe0ff' : '#c8f0ff', 0, 80 + y, 46 - w + 20, 1); P(c, y % 9 < 5 ? '#9fe0ff' : '#c8f0ff', 480 - (46 - w + 20), 80 + y, 46 - w + 20, 1); }
    // nền tuyết dày
    P(c, '#e8f2ff', 0, 188, 480, 82); P(c, '#ffffff', 0, 188, 480, 4); const r = G.rng(93);
    for (let i = 0; i < 70; i++) P(c, '#c8daf4', Math.floor(r() * 480), 196 + Math.floor(r() * 70), 4 + Math.floor(r() * 6), 1);
    // thông phủ tuyết
    [[30, 192], [70, 196], [110, 190], [430, 194], [460, 190]].forEach(function (t) { H.pine(c, t[0], t[1], 40, '#2f6a5a', '#ffffff'); P(c, '#ffffff', t[0] - 3, t[1] - 38, 6, 2); });
    // pha lê băng phát sáng
    [[150, 192], [200, 198], [260, 190], [340, 196]].forEach(function (p) { for (let i = 0; i < 10; i++) P(c, i < 3 ? '#e8ffff' : '#7fd8ff', p[0] - Math.floor(i / 3), p[1] - 10 + i, 1 + Math.floor(i / 3) * 2, 1); });
  };
  // phòng bảo vật hình tròn cuối mê cung
  BG.vault = function (c) {
    P(c, '#14102a', 0, 0, 480, 270); const r = G.rng(97);
    for (let y = 0; y < 190; y += 14) for (let x = (y / 14 % 2) * 12; x < 480; x += 24) { const sh = Math.floor(r() * 10); P(c, 'rgb(' + (58 + sh) + ',' + (52 + sh) + ',' + (84 + sh) + ')', x, y, 23, 13); P(c, '#6a64a0', x, y, 23, 1); }
    // vòm tròn
    for (let y = 0; y < 60; y++) { const w = Math.round(2 * Math.sqrt(Math.max(0, 200 * 200 - (200 - y * 3) * (200 - y * 3)))); P(c, 'rgba(10,8,30,0.35)', 240 - w / 2, y, w, 1); }
    // ánh sáng vàng từ trên
    for (let y = 0; y < 180; y++) { const w = 30 + Math.floor(y * 0.5); P(c, 'rgba(255,233,168,0.16)', 240 - Math.floor(w / 2), y, w, 1); }
    // bệ đá
    P(c, '#8a8aa8', 196, 150, 88, 34); P(c, '#a8a8c8', 196, 150, 88, 3); P(c, '#6a6a88', 206, 140, 68, 12); P(c, '#b8b8d8', 206, 140, 68, 2);
    [[214, 160], [256, 160]].forEach(function (p) { G.M(c, ['xx.', '..x', '.x.', '...', '.x.'], { x: '#ffd84a' }, p[0], p[1]); }); P(c, '#ffd84a', 236, 162, 6, 1); P(c, '#ffd84a', 238, 160, 2, 5);
    // đuốc vàng
    [[90, 80], [380, 80], [150, 60], [320, 60]].forEach(function (t) { P(c, '#6b4423', t[0], t[1], 4, 20); G.ellipse(c, '#ff9a1a', t[0] + 2, t[1] - 4, 4, 6); G.ellipse(c, '#ffe36b', t[0] + 2, t[1] - 3, 2, 4); });
    H.brickFloor(c, 184, '#3a3470', '#5a50a0', '#26204e');
  };
  // Mê cung: thêm rêu, dây leo, đuốc tím (đè lên bối cảnh gốc)
  const mazeBase = BG.maze;
  BG.maze = function (c) {
    mazeBase(c); const r = G.rng(63);
    for (let i = 0; i < 26; i++) { const x = Math.floor(r() * 480), l = 10 + Math.floor(r() * 40); for (let k = 0; k < l; k++) P(c, k % 4 ? '#2f6a4a' : '#4f9a5a', x + Math.round(Math.sin(k / 4) * 2), k, 2, 1); }
    [[120, 96], [280, 96], [420, 96]].forEach(function (t) { P(c, '#4a3a2a', t[0], t[1], 4, 18); G.ellipse(c, '#9b59ff', t[0] + 2, t[1] - 4, 4, 6); G.ellipse(c, '#d8b8ff', t[0] + 2, t[1] - 3, 2, 3); });
    for (let i = 0; i < 40; i++) P(c, 'rgba(180,160,255,0.18)', Math.floor(r() * 480), 140 + Math.floor(r() * 40), 20, 3);
  };
  // Tổ Tri Thức: thêm vết nứt đỏ tím, biểu đồ + công thức phát sáng
  const lairBase = BG.lair;
  BG.lair = function (c) {
    lairBase(c); const r = G.rng(83);
    for (let i = 0; i < 9; i++) { let x = Math.floor(r() * 480), y = Math.floor(r() * 120); for (let k = 0; k < 14; k++) { P(c, k % 2 ? '#ff4a8a' : '#c03aff', x, y, 1, 2); x += Math.floor(r() * 3) - 1; y += 2; } }
    [[120, 30], [340, 34]].forEach(function (p) { P(c, '#3a2a5a', p[0], p[1], 34, 24); [6, 12, 9, 16].forEach(function (h, k) { P(c, '#ff9ad0', p[0] + 4 + k * 7, p[1] + 20 - h, 4, h); }); });
    ['E=mc²', 'p<.05', 'Σx', 'β₁'].forEach(function (s, i) { const x = 30 + i * 120, y = 140 + (i % 2) * 14; for (let k = 0; k < s.length; k++) P(c, 'rgba(255,170,230,0.55)', x + k * 4, y, 3, 4); });
  };
})();
