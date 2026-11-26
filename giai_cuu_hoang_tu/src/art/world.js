// NPC, Rồng Giáo Sư, Hoàng tử và toàn bộ bối cảnh – vẽ bằng code.
(function () {
  const P = G.P, INK = '#1b1030';
  G.GROUND = 720; // đường chân nhân vật (px màn hình)
  // 7 nút trên bản đồ (px màn hình)
  G.mapNodes = [
    { x: 330, y: 650 }, { x: 600, y: 470 }, { x: 880, y: 640 }, { x: 1130, y: 430 }, { x: 1370, y: 640 }, { x: 1560, y: 400 }, { x: 1760, y: 250 },
  ]; // [0]=điểm xuất phát, [1..5]=5 chặng, [6]=Tổ Tri Thức

  // ============ NPC (mỗi NPC có 3 biến thể: _a bình thường, _b mở miệng, _c chớp mắt) ============
  function eyePair(c, x1, x2, y, blink, big) {
    if (blink) { P(c, INK, x1 - 2, y + 1, 5, 1); P(c, INK, x2 - 2, y + 1, 5, 1); return; }
    [x1, x2].forEach(function (x) { G.ellipse(c, '#ffffff', x, y, big ? 4 : 3, big ? 3 : 2); P(c, INK, x - 1, y - 1, 2, 3); P(c, '#ffffff', x - 1, y - 1, 1, 1); });
  }
  const NPCS = {
    tree: { w: 72, h: 120, fn: function (c, m, b) {
      // thân
      G.blob(c, '#6b4423', 20, 36, 32, 76); P(c, '#8a5a2f', 24, 40, 3, 68); P(c, '#8a5a2f', 40, 44, 2, 60); P(c, '#43260f', 47, 40, 4, 72);
      for (let i = 0; i < 6; i++) { P(c, '#6b4423', 8 + i * 2, 108 + i, 14, 3); P(c, '#6b4423', 50 - i * 2, 108 + i, 14, 3); } P(c, '#43260f', 16, 112, 40, 6);
      // cành tay
      P(c, '#6b4423', 2, 60, 20, 5); P(c, '#6b4423', 50, 60, 20, 5); P(c, '#6b4423', 2, 52, 4, 8); P(c, '#6b4423', 66, 52, 4, 8);
      G.ellipse(c, '#2f8f3a', 5, 50, 5, 4); G.ellipse(c, '#2f8f3a', 67, 50, 5, 4);
      // tán lá
      [[36, 24, 30, 20, '#2f8f3a'], [16, 34, 14, 12, '#2f8f3a'], [56, 34, 14, 12, '#2f8f3a'], [36, 10, 22, 11, '#3fbf5f'], [22, 22, 12, 9, '#3fbf5f'], [50, 22, 12, 9, '#3fbf5f']].forEach(function (e) { G.ellipse(c, e[4], e[0], e[1], e[2], e[3]); });
      [[20, 20], [40, 14], [54, 24], [30, 30], [46, 34], [12, 36], [60, 38]].forEach(function (p) { P(c, '#7be08a', p[0], p[1], 3, 2); P(c, '#1f6a28', p[0] + 2, p[1] + 6, 3, 2); });
      // mặt
      eyePair(c, 29, 43, 58, b, true); P(c, '#d8d0c0', 24, 51, 10, 3); P(c, '#d8d0c0', 38, 51, 10, 3); P(c, '#b8b0a0', 24, 53, 5, 1);
      G.blob(c, '#8a5a2f', 33, 62, 6, 9); P(c, '#43260f', 33, 69, 6, 2);
      // râu rễ cây
      for (let i = 0; i < 9; i++) { const x = 25 + i * 2; P(c, '#8a6a3a', x, 76, 2, 18 + ((i * 7) % 12)); P(c, '#6b4a22', x + 1, 80, 1, 10 + ((i * 5) % 10)); }
      if (m) { G.ellipse(c, INK, 36, 77, 5, 3); P(c, '#c0392b', 33, 78, 6, 2); } else { P(c, INK, 30, 76, 12, 2); }
    } },
    librarian: { w: 46, h: 60, fn: function (c, m, b) {
      c.save(); G.blob(c, '#8e1b2e', 9, 26, 28, 30); P(c, '#ffd84a', 9, 53, 28, 2); P(c, '#ffd84a', 22, 28, 2, 26); P(c, '#6e1020', 9, 40, 28, 2);
      P(c, '#3a2412', 12, 56, 8, 3); P(c, '#3a2412', 26, 56, 8, 3);
      G.ellipse(c, SK(), 23, 16, 8, 8);
      // tóc + râu trắng
      P(c, '#f4f4f4', 14, 12, 3, 9); P(c, '#f4f4f4', 30, 12, 3, 9);
      for (let i = 0; i < 14; i++) { const w = Math.max(2, 16 - i); P(c, '#ffffff', 23 - Math.floor(w / 2), 18 + i, w, 1); }
      P(c, '#dfe3ea', 19, 20, 9, 2);
      // kính tròn
      [19, 27].forEach(function (x) { G.ellipse(c, '#ffd84a', x, 14, 4, 4); G.ellipse(c, '#e8f6ff', x, 14, 3, 3); if (b) P(c, INK, x - 2, 14, 4, 1); else P(c, INK, x - 1, 13, 2, 2); }); P(c, '#ffd84a', 22, 13, 2, 1);
      if (m) { P(c, '#6b1d1d', 21, 22, 5, 3); } else { P(c, '#c0868a', 21, 22, 5, 1); }
      // mũ học giả
      P(c, '#5a0f1e', 12, 5, 22, 3); P(c, '#8e1b2e', 15, 2, 16, 4); P(c, '#ffd84a', 31, 5, 2, 8); P(c, '#ffd84a', 31, 12, 3, 2);
      // sách khổng lồ + gậy
      G.blob(c, '#2b2f8f', 0, 32, 14, 16); P(c, '#fff3c4', 12, 34, 2, 12); P(c, '#ffd84a', 6, 38, 3, 3);
      P(c, SK(), 11, 34, 5, 3); P(c, '#7a4a22', 38, 18, 2, 24); P(c, '#ffd84a', 37, 15, 4, 3); P(c, SK(), 36, 38, 5, 3); c.restore();
      function SK() { return '#f2c9a0'; }
    } },
    spirit: { w: 46, h: 54, fn: function (c, m, b) {
      for (let y = 0; y < 16; y++) { const w = Math.round(1 + y * 0.8); P(c, '#5fe0d0', 22 - Math.floor(w / 2), 3 + y, w, 1); }
      G.ellipse(c, '#5fe0d0', 22, 31, 14, 15); G.ellipse(c, '#9ff5ea', 22, 33, 10, 11); P(c, '#e8fffb', 14, 22, 3, 6); P(c, '#e8fffb', 12, 28, 2, 3);
      eyePair(c, 16, 28, 30, b, true); P(c, '#ff8aa0', 12, 35, 3, 2); P(c, '#ff8aa0', 29, 35, 3, 2);
      if (m) { G.ellipse(c, '#1f6a6a', 22, 38, 3, 2); } else { P(c, '#1f6a6a', 19, 37, 6, 1); P(c, '#1f6a6a', 18, 36, 1, 1); P(c, '#1f6a6a', 25, 36, 1, 1); }
      P(c, '#7a4a22', 38, 16, 2, 36); P(c, '#5fe0d0', 36, 8, 6, 8); P(c, '#e8fffb', 37, 9, 2, 3); P(c, '#5fe0d0', 38, 5, 2, 3);
      for (let i = 0; i < 3; i++) { c.strokeStyle = 'rgba(159,245,234,0.9)'; c.lineWidth = 1; c.strokeRect(4 + i * 3, 48 + (i % 2), 38 - i * 6, 4); }
    } },
    owl: { w: 44, h: 52, fn: function (c, m, b) {
      G.ellipse(c, '#8b5a2b', 22, 30, 15, 18); G.ellipse(c, '#a87438', 22, 20, 14, 12);
      P(c, '#8b5a2b', 7, 5, 6, 8); P(c, '#8b5a2b', 31, 5, 6, 8); P(c, '#5a3a1a', 8, 3, 3, 4); P(c, '#5a3a1a', 33, 3, 3, 4);
      G.ellipse(c, '#e8c98a', 22, 36, 9, 12); for (let i = 0; i < 4; i++) { P(c, '#c9a96a', 17, 28 + i * 4, 3, 1); P(c, '#c9a96a', 24, 30 + i * 4, 3, 1); }
      P(c, '#5a3a1a', 5, 24, 5, 16); P(c, '#5a3a1a', 34, 24, 5, 16);
      [15, 29].forEach(function (x) { G.ellipse(c, '#fff3c4', x, 19, 6, 6); if (b) P(c, INK, x - 3, 20, 7, 1); else { G.ellipse(c, '#ffd84a', x, 19, 4, 4); P(c, INK, x - 1, 18, 3, 3); P(c, '#fff', x - 1, 18, 1, 1); } });
      G.ellipse(c, 'rgba(0,0,0,0)', 29, 19, 6, 6); P(c, '#ffd84a', 24, 13, 10, 1); P(c, '#ffd84a', 24, 25, 10, 1); P(c, '#ffd84a', 24, 13, 1, 13); P(c, '#ffd84a', 33, 13, 1, 13);
      P(c, '#ff9f1a', 20, 22, 5, 4); if (m) { P(c, '#c0392b', 20, 26, 5, 3); } else P(c, '#d9780a', 21, 26, 3, 1);
      P(c, '#ff9f1a', 14, 46, 6, 3); P(c, '#ff9f1a', 25, 46, 6, 3);
    } },
    sage: { w: 56, h: 56, fn: function (c, m, b) {
      [[28, 36, 22, 14], [14, 34, 12, 11], [42, 34, 12, 11], [20, 26, 12, 10], [36, 26, 12, 10], [28, 24, 12, 9]].forEach(function (e) { G.ellipse(c, '#ffffff', e[0], e[1], e[2], e[3]); });
      [[10, 40, 8, 6], [46, 40, 8, 6], [28, 46, 14, 6]].forEach(function (e) { G.ellipse(c, '#dfe9f7', e[0], e[1], e[2], e[3]); });
      eyePair(c, 22, 34, 30, b, false); P(c, '#ff8aa0', 16, 34, 3, 2); P(c, '#ff8aa0', 37, 34, 3, 2);
      P(c, '#c9d8f0', 20, 25, 6, 2); P(c, '#c9d8f0', 31, 25, 6, 2);
      for (let i = 0; i < 12; i++) { const w = Math.max(2, 14 - i); P(c, '#eef3fb', 28 - Math.floor(w / 2), 38 + i, w, 1); }
      if (m) { G.ellipse(c, '#6b1d1d', 28, 36, 3, 2); } else P(c, '#a05a5a', 25, 36, 6, 1);
      for (let i = 0; i < 10; i++) P(c, '#4a63d8', 28 - Math.floor((10 - i) / 2) - 1, 2 + i, (10 - i) + 2, 1);
      P(c, '#4a63d8', 17, 12, 22, 3); P(c, '#ffd84a', 27, 4, 2, 2); P(c, '#ffd84a', 24, 9, 2, 2);
      P(c, '#7a4a22', 49, 12, 2, 40); G.ellipse(c, '#ffd84a', 50, 10, 4, 4); P(c, '#fff7b0', 49, 8, 2, 3);
    } },
    prince: { w: 32, h: 46, fn: function (c, m, b) { // m = giơ tay vẫy cầu cứu
      const SK = '#e0a870';
      P(c, '#ffd84a', 13, 0, 4, 2); P(c, '#ffd84a', 11, 2, 8, 2); P(c, '#ffd84a', 9, 4, 12, 3); P(c, '#e0383e', 14, 3, 2, 2); P(c, '#b8860b', 9, 7, 12, 2); P(c, '#4aa3ff', 12, 5, 1, 1); P(c, '#3fbf5f', 17, 5, 1, 1);
      G.ellipse(c, SK, 15, 15, 6, 6); P(c, '#1b1030', 9, 9, 12, 2); P(c, '#1b1030', 8, 11, 2, 6); P(c, '#1b1030', 20, 11, 2, 6);
      if (b) { P(c, INK, 11, 15, 3, 1); P(c, INK, 17, 15, 3, 1); } else { P(c, INK, 12, 14, 2, 2); P(c, INK, 18, 14, 2, 2); }
      P(c, '#7a5a9a', 11, 17, 4, 1); P(c, '#7a5a9a', 17, 17, 4, 1); // quầng thâm mắt
      P(c, '#a0451c', 14, 20, 4, 1); P(c, '#a0451c', 13, 21, 1, 1); P(c, '#a0451c', 18, 21, 1, 1);
      G.blob(c, SK, 9, 23, 13, 9); P(c, '#e0383e', 9, 24, 3, 8); P(c, '#ffd84a', 9, 23, 5, 2); P(c, '#ffd84a', 17, 24, 5, 2);
      for (let i = 0; i < 8; i++) P(c, '#ffd84a', 10 + i, 24 + Math.floor(i * 0.9), 2, 1);
      P(c, '#c8102e', 8, 32, 16, 10); P(c, '#ffd84a', 8, 32, 16, 2); P(c, '#ffd84a', 8, 40, 16, 2); P(c, '#8a0a20', 15, 34, 2, 6);
      P(c, SK, 10, 42, 4, 3); P(c, SK, 18, 42, 4, 3);
      P(c, SK, 5, 25, 4, 8); if (m) { P(c, SK, 23, 12, 4, 14); P(c, SK, 24, 9, 3, 3); } else P(c, SK, 23, 25, 4, 8);
      P(c, '#ffd84a', 5, 25, 4, 1); P(c, '#ffd84a', 23, m ? 24 : 25, 4, 1);
    } },
    dragon: { w: 104, h: 104, fn: function (c, m, b) { // [SPEC] thân đỏ đậm, áo choàng đen tím viền vàng, quyền trượng + xấp Journal
      const WD = '#6e0f1c', BODY = '#b3202f', DARK = '#4a0812';
      // cánh dơi
      tri(c, WD, [30, 40], [2, 10], [8, 62]); tri(c, WD, [30, 40], [8, 62], [26, 56]); tri(c, WD, [74, 40], [102, 10], [96, 62]); tri(c, WD, [74, 40], [96, 62], [78, 56]);
      tri(c, BODY, [30, 42], [6, 16], [14, 50]); tri(c, BODY, [74, 42], [98, 16], [90, 50]);
      [[2, 10, 30, 40], [2, 10, 20, 52], [14, 30, 30, 44]].forEach(function (b) { for (let k = 0; k < 20; k++) { const t = k / 20; P(c, DARK, Math.round(b[0] + (b[2] - b[0]) * t), Math.round(b[1] + (b[3] - b[1]) * t), 2, 2); P(c, DARK, Math.round(102 - (b[0] + (b[2] - b[0]) * t)), Math.round(b[1] + (b[3] - b[1]) * t), 2, 2); } });
      // thân + áo choàng
      G.ellipse(c, BODY, 52, 66, 30, 30); G.ellipse(c, '#f0b08a', 52, 72, 18, 20); for (let y = 60; y < 90; y += 5) P(c, '#d9906a', 40, y, 24, 1);
      for (let y = 0; y < 32; y++) { const w = 40 + y; P(c, '#24102e', 52 - Math.floor(w / 2), 66 + y, w, 1); } P(c, '#ffd84a', 36, 96, 32, 2); P(c, '#ffd84a', 51, 66, 2, 30); P(c, '#3d1a52', 38, 76, 3, 20); P(c, '#3d1a52', 63, 76, 3, 20); P(c, '#ffd84a', 34, 66, 2, 30); P(c, '#ffd84a', 68, 66, 2, 30);
      P(c, BODY, 42, 98, 8, 5); P(c, BODY, 54, 98, 8, 5);
      // tay + journal + quyền trượng
      P(c, BODY, 20, 70, 10, 8); P(c, BODY, 74, 70, 10, 8); G.blob(c, '#ffffff', 10, 56, 14, 18); P(c, '#1b6ac9', 12, 58, 10, 2); P(c, '#8aa0c8', 12, 64, 10, 1); P(c, '#8aa0c8', 12, 67, 10, 1); G.blob(c, '#e8e0c8', 8, 60, 14, 16); P(c, '#c0392b', 10, 62, 10, 2);
      P(c, '#b8860b', 86, 40, 3, 60); P(c, '#ffd84a', 86, 40, 1, 60); G.ellipse(c, '#9b59ff', 87, 36, 5, 5); P(c, '#e0c8ff', 85, 33, 2, 2); P(c, BODY, 82, 70, 8, 7);
      // đầu
      G.ellipse(c, BODY, 52, 34, 24, 19); G.ellipse(c, '#d84a4a', 52, 46, 15, 9); P(c, DARK, 46, 45, 2, 2); P(c, DARK, 56, 45, 2, 2); for (let x = 36; x < 70; x += 6) P(c, '#8a1424', x, 22, 3, 2);
      P(c, '#fff3c4', 30, 14, 4, 8); P(c, '#fff3c4', 31, 10, 2, 4); P(c, '#fff3c4', 70, 14, 4, 8); P(c, '#fff3c4', 71, 10, 2, 4);
      // kính
      [40, 64].forEach(function (x) { G.ellipse(c, '#1b1030', x, 33, 9, 9); G.ellipse(c, '#e8f6ff', x, 33, 7, 7); if (b) P(c, INK, x - 4, 34, 8, 2); else { G.ellipse(c, '#ffd84a', x, 34, 3, 3); P(c, INK, x - 1, 33, 3, 3); } });
      P(c, '#1b1030', 48, 32, 8, 2); P(c, '#1b1030', 32, 24, 14, 2); P(c, '#1b1030', 58, 24, 14, 2); P(c, '#1b1030', 44, 26, 2, 2); P(c, '#1b1030', 58, 26, 2, 2);
      // miệng
      if (m) { G.ellipse(c, '#6b1d1d', 52, 52, 10, 5); P(c, '#e04050', 46, 53, 12, 3); [44, 48, 56, 60].forEach(function (x) { P(c, '#ffffff', x, 48, 2, 3); }); }
      else { P(c, '#4a0812', 42, 52, 20, 2); P(c, '#ffffff', 44, 54, 2, 3); P(c, '#ffffff', 58, 54, 2, 3); }
      // mũ tốt nghiệp
      P(c, '#1b1030', 38, 8, 28, 8); P(c, '#1b1030', 24, 5, 56, 4); P(c, '#2a2050', 28, 5, 48, 1); P(c, '#ffd84a', 50, 4, 4, 3); P(c, '#ffd84a', 78, 8, 2, 16); P(c, '#ffd84a', 76, 22, 6, 5);
    } },
  };
  G.art.npcDefs = NPCS;

  // ============ BỐI CẢNH 480x270 (hiển thị x4) ============
  function skyBands(c, cols, hEach) { P(c, cols[cols.length - 1], 0, 0, 480, 270); cols.forEach(function (col, i) { P(c, col, 0, i * hEach, 480, hEach + 1); }); }
  function tri(c, col, a, b, d) { const ys = [a[1], b[1], d[1]], y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys); const pts = [a, b, d]; for (let y = y0; y <= y1; y++) { const xs = []; for (let i = 0; i < 3; i++) { const p = pts[i], q = pts[(i + 1) % 3]; if ((p[1] <= y && q[1] > y) || (q[1] <= y && p[1] > y)) xs.push(p[0] + (y - p[1]) * (q[0] - p[0]) / (q[1] - p[1])); } if (xs.length >= 2) { const xa = Math.min.apply(null, xs), xb = Math.max.apply(null, xs); P(c, col, Math.round(xa), y, Math.max(1, Math.round(xb - xa)), 1); } } }
  function mountains(c, col, base, amp, seed, hl) {
    const r = G.rng(seed), ph = [r() * 6, r() * 6, r() * 6];
    for (let x = 0; x < 480; x++) { const y = base - Math.floor(amp * (0.55 + 0.25 * Math.sin(x / 38 + ph[0]) + 0.15 * Math.sin(x / 17 + ph[1]) + 0.05 * Math.sin(x / 7 + ph[2]))); P(c, col, x, y, 1, base - y + 1); if (hl) P(c, hl, x, y, 1, 1); }
  }
  function roundTree(c, x, y, h, col, hi, trunk) { P(c, trunk || '#5a3a1a', x - 1, y - h * 0.4, 3, h * 0.4); G.ellipse(c, col, x, y - h * 0.65, Math.round(h * 0.38), Math.round(h * 0.34)); G.ellipse(c, hi, x - 2, y - h * 0.75, Math.round(h * 0.18), Math.round(h * 0.15)); }
  function pine(c, x, y, h, col, hi) { P(c, '#5a3a1a', x - 1, y - 4, 3, 4); for (let i = 0; i < 4; i++) { const w = 6 + i * 4, yy = y - 4 - (3 - i) * Math.floor(h / 4) - 3; P(c, col, x - Math.floor(w / 2), yy - Math.floor(h / 5), w, Math.floor(h / 4) + 1); P(c, hi, x - Math.floor(w / 2), yy - Math.floor(h / 5), Math.max(2, Math.floor(w / 3)), 1); } }
  function grass(c, y, top, mid, dark, seed) {
    const r = G.rng(seed); P(c, top, 0, y, 480, 4); P(c, mid, 0, y + 4, 480, 270 - y); P(c, G.shade(top, 25), 0, y, 480, 1);
    for (let x = 0; x < 480; x += 2) { if (r() < 0.5) P(c, G.shade(top, 30), x, y - 1, 1, 1); }
    for (let i = 0; i < 90; i++) { P(c, dark, Math.floor(r() * 480), y + 6 + Math.floor(r() * (264 - y)), 2 + Math.floor(r() * 3), 1); }
    for (let x = 0; x < 480; x += 16) P(c, dark, x, y + 4, 1, 1);
  }
  function brickFloor(c, y, a, b, line) { P(c, a, 0, y, 480, 270 - y); P(c, b, 0, y, 480, 3); for (let r = 0; y + r * 12 < 270; r++) { P(c, line, 0, y + 3 + r * 12, 480, 1); for (let x = (r % 2) * 16; x < 480; x += 32) P(c, line, x, y + 3 + r * 12, 1, 12); } }
  function prasat(c, x, y, s, col, dark, gold) { // đền/lâu đài kiểu Khmer
    const tiers = [[18, 10], [14, 9], [10, 8], [7, 7]]; let yy = y;
    P(c, dark, x - 24 * s / 2, y - 6, 24 * s / 2 * 2, 6); P(c, col, x - 20 * s / 2, y - 12, 20 * s, 6);
    yy = y - 12; tiers.forEach(function (t, i) { const w = t[0] * s / 2 * 1, h = t[1] * s / 2; P(c, col, x - w / 2 * 2 / 2 - w / 2, yy - h, w * 1, h); P(c, dark, x - w / 2, yy - h, w, 1); for (let k = 0; k < 2; k++) P(c, dark, x - w / 2 + 2, yy - h + 3 + k * 4, w - 4, 1); yy -= h; });
    for (let i = 0; i < 10; i++) { const w = Math.max(1, 6 - Math.floor(i / 2)); P(c, gold, x - Math.floor(w / 2), yy - i, w, 1); } P(c, gold, x, yy - 12, 1, 3);
    [-1, 1].forEach(function (d) { const sx = x + d * 18 * s / 2 * 0.9, sh = 22 * s / 2; P(c, col, sx - 5, y - 12 - sh, 10, sh); P(c, dark, sx - 5, y - 12 - sh, 10, 1); for (let i = 0; i < 8; i++) P(c, gold, sx - Math.floor((8 - i) / 2) + 0, y - 12 - sh - i, Math.max(1, 5 - Math.floor(i / 2)), 1); P(c, dark, sx - 1, y - 12 - sh + 5, 2, 5); });
  }
  function lights(c, n, seed) { const r = G.rng(seed); for (let i = 0; i < n; i++) P(c, 'rgba(255,255,200,0.9)', Math.floor(r() * 480), Math.floor(r() * 200), 1, 1); }

  const BG = {
    title: function (c) {
      skyBands(c, ['#5ec8ff', '#74d0ff', '#8cd8ff', '#a4e0ff', '#bce8ff', '#d2f0ff'], 22);
      G.ellipse(c, '#fff7b0', 400, 40, 14, 14); G.ellipse(c, '#fff3c4', 400, 40, 10, 10);
      mountains(c, '#8fa6e8', 150, 70, 11, '#b3c3f5'); mountains(c, '#6f8fd8', 165, 55, 12);
      prasat(c, 398, 158, 3, '#d8a35a', '#8a5a22', '#ffd84a');
      mountains(c, '#3f9f5a', 190, 30, 13);
      for (let x = 10; x < 480; x += 22) roundTree(c, x, 192, 28 + (x % 11), '#2f8f3a', '#4fbf5a');
      grass(c, 188, '#5fd35f', '#3fa33f', '#2f8f33', 14);
      // bục đất kiểu platformer
      [[40, 150, 4], [112, 130, 3], [270, 138, 3]].forEach(function (p) { for (let i = 0; i < p[2]; i++) { P(c, '#b8662b', p[0] + i * 12, p[1], 12, 12); P(c, '#e08a4a', p[0] + i * 12, p[1], 12, 2); P(c, '#8a4a1c', p[0] + i * 12 + 11, p[1], 1, 12); P(c, '#8a4a1c', p[0] + i * 12, p[1] + 11, 12, 1); P(c, '#8a4a1c', p[0] + i * 12 + 5, p[1] + 5, 2, 1); } });
    },
    decree: function (c) {
      skyBands(c, ['#3b2a7a', '#5a3a8a', '#8a4a92', '#c4607a', '#f08a6a', '#ffc27a'], 24);
      lights(c, 30, 5);
      mountains(c, '#4a3a8a', 160, 90, 21, '#6a5aaa'); mountains(c, '#32286a', 180, 60, 22);
      prasat(c, 90, 168, 2, '#c98a4a', '#6a3a1a', '#ffd84a');
      // núi + tổ rồng bên phải
      for (let y = 0; y < 100; y++) { const w = 30 + y; P(c, '#2a2058', 400 - Math.floor(w / 2), 80 + y, w, 1); } P(c, '#1a1440', 372, 70, 56, 18);
      for (let i = 0; i < 8; i++) P(c, '#6b4423', 380 + (i * 7) % 40, 64 + (i % 3) * 5, 8, 6);
      mountains(c, '#1f6a3a', 215, 28, 23); for (let x = 6; x < 480; x += 20) pine(c, x, 222, 34, '#1f7a3a', '#3fbf5f');
      grass(c, 218, '#3f9f4a', '#2a7a38', '#1f5f2a', 24);
    },
    forest: function (c) {
      skyBands(c, ['#8fe0c0', '#7fd8b0', '#6fcf9f'], 40);
      mountains(c, '#5fb88a', 150, 60, 31); mountains(c, '#3f9f6a', 168, 45, 32);
      for (let x = 4; x < 480; x += 14) pine(c, x, 178, 54 + (x * 7) % 18, '#2a8f4a', '#4fbf6a');
      for (let x = 10; x < 480; x += 26) roundTree(c, x, 184, 52 + (x % 20), '#1f7a38', '#3fa84f');
      // gốc cây lớn hai bên
      [[0, 14], [452, 14]].forEach(function (t) { P(c, '#5a3a1a', t[0], 0, 28, 190); P(c, '#7a5a2a', t[0] + 4, 0, 3, 190); P(c, '#3a2410', t[0] + 22, 0, 4, 190); });
      G.ellipse(c, '#1f7a38', 14, 24, 34, 24); G.ellipse(c, '#1f7a38', 466, 24, 34, 24); G.ellipse(c, '#2f9f48', 40, 10, 40, 16); G.ellipse(c, '#2f9f48', 440, 10, 40, 16);
      for (let x = 40; x < 440; x += 18) { const l = 24 + (x * 13) % 30; P(c, '#2f8f3a', x, 0, 2, l); P(c, '#3fbf5f', x, l - 2, 2, 2); }
      grass(c, 180, '#4fbf4f', '#2f8f33', '#1f6a28', 33);
      [[60, 192], [140, 204], [390, 196], [310, 212], [450, 200]].forEach(function (m) { P(c, '#fff3c4', m[0] + 1, m[1] + 4, 3, 4); G.ellipse(c, '#e0383e', m[0] + 2, m[1] + 3, 4, 3); P(c, '#fff', m[0] + 1, m[1] + 2, 1, 1); });
      G.ellipse(c, '#3a9f4a', 90, 186, 6, 3); G.ellipse(c, '#3a9f4a', 350, 188, 7, 3);
    },
    library: function (c) {
      P(c, '#4a2c1a', 0, 0, 480, 270); for (let y = 0; y < 180; y += 6) P(c, '#5a3a22', 0, y, 480, 1);
      // kệ sách hai bên + giữa
      const cols = ['#c0392b', '#2b5fc9', '#2f8f3a', '#d4a017', '#7a3fa0', '#e8d9b0', '#1a8a8a'], r = G.rng(41);
      [[0, 120], [180, 120], [360, 120]].forEach(function (sh) { P(c, '#6b4423', sh[0], 14, sh[1], 166); for (let row = 0; row < 5; row++) { const y = 18 + row * 32; P(c, '#43260f', sh[0], y + 28, sh[1], 4); for (let x = sh[0] + 4; x < sh[0] + sh[1] - 6; x += 5) { const h = 18 + Math.floor(r() * 9); P(c, cols[Math.floor(r() * cols.length)], x, y + 28 - h, 4, h); } } });
      // cột + cửa sổ vòm
      [[120, 30], [330, 30]].forEach(function (cl) { P(c, '#c9b891', cl[0], 0, 30, 190); P(c, '#e6d8b0', cl[0] + 4, 0, 3, 190); P(c, '#8a7a55', cl[0] + 24, 0, 6, 190); P(c, '#8a7a55', cl[0] - 3, 0, 36, 8); P(c, '#8a7a55', cl[0] - 3, 176, 36, 14); });
      [[150, 30], [300, 30]].forEach(function (w) { P(c, '#2a1a10', w[0], 34, 30, 80); G.ellipse(c, '#2a1a10', w[0] + 15, 34, 15, 14); P(c, '#ffe9a8', w[0] + 3, 36, 24, 76); G.ellipse(c, '#ffe9a8', w[0] + 15, 36, 12, 11); P(c, '#2a1a10', w[0] + 14, 24, 2, 90); });
      // đèn chùm
      [[240, 6], [100, 4], [380, 4]].forEach(function (l) { P(c, '#8a6a22', l[0], 0, 1, l[1] + 10); P(c, '#ffd84a', l[0] - 8, l[1] + 10, 17, 3); for (let i = -6; i <= 6; i += 4) { P(c, '#ffe9a8', l[0] + i, l[1] + 4, 2, 6); P(c, '#fff7d0', l[0] + i, l[1] + 3, 2, 2); } P(c, '#9fdcff', l[0] - 6, l[1] + 13, 2, 4); P(c, '#9fdcff', l[0] + 4, l[1] + 13, 2, 4); });
      brickFloor(c, 180, '#8a5a30', '#b07a40', '#6a4222');
      // bàn đọc sách bên phải
      P(c, '#6b4423', 345, 160, 90, 8); P(c, '#8a5a2f', 345, 158, 90, 3); P(c, '#43260f', 350, 168, 6, 14); P(c, '#43260f', 424, 168, 6, 14);
      P(c, '#ffffff', 370, 150, 18, 8); P(c, '#8aa0c8', 372, 152, 14, 1); P(c, '#e0383e', 392, 152, 10, 6); P(c, '#2b2f8f', 408, 148, 14, 10); P(c, '#3a2412', 360, 146, 4, 12); P(c, '#ffd84a', 359, 142, 6, 4);
    },
    stream: function (c) {
      skyBands(c, ['#9be8ff', '#8adcf5', '#7ad0ea'], 40);
      mountains(c, '#6aa8c8', 140, 70, 51, '#8fc4de'); mountains(c, '#4a8aa8', 160, 50, 52);
      // thác nước
      P(c, '#6b6b7a', 380, 40, 70, 120); P(c, '#8a8a9a', 380, 40, 6, 120); P(c, '#d8f6ff', 400, 44, 28, 116); for (let y = 44; y < 160; y += 6) P(c, '#ffffff', 402 + (y % 12), y, 3, 3);
      for (let x = 4; x < 480; x += 16) roundTree(c, x, 170, 40 + (x * 3) % 22, '#2a8f5a', '#4fbf7f');
      grass(c, 168, '#4fbf6f', '#2f9f5a', '#1f7a42', 53);
      // dòng suối ngang
      P(c, '#2a9fd0', 0, 188, 480, 70); P(c, '#4fc8ee', 0, 188, 480, 6); P(c, '#1f7aa8', 0, 240, 480, 18);
      const r = G.rng(54); for (let i = 0; i < 80; i++) P(c, '#bff0ff', Math.floor(r() * 480), 196 + Math.floor(r() * 56), 3 + Math.floor(r() * 5), 1);
      // bờ đá
      P(c, '#8a8a7a', 0, 184, 480, 4); for (let x = 0; x < 480; x += 10) P(c, '#6a6a5a', x, 186, 5, 2);
      // cầu đá đứt đoạn: hai nửa
      [[150, 70], [262, 70]].forEach(function (b, i) { for (let k = 0; k < 6; k++) { const w = (i ? 6 : 6) * 10; } });
      P(c, '#9a9a8a', 130, 176, 78, 10); P(c, '#b8b8a8', 130, 176, 78, 2); P(c, '#6a6a5a', 130, 184, 78, 2); P(c, '#9a9a8a', 276, 176, 78, 10); P(c, '#b8b8a8', 276, 176, 78, 2); P(c, '#6a6a5a', 276, 184, 78, 2);
      for (let k = 0; k < 3; k++) { P(c, '#6a6a5a', 204 + k * 3, 176 + k * 2, 4, 8 - k * 2); P(c, '#6a6a5a', 272 - k * 3, 176 + k * 2, 4, 8 - k * 2); }
      [[0, 14], [452, 14]].forEach(function (t) { P(c, '#6b4a2a', t[0], 90, 28, 100); P(c, '#8a6a3a', t[0] + 4, 90, 3, 100); });
      G.ellipse(c, '#2a8f5a', 14, 90, 34, 24); G.ellipse(c, '#2a8f5a', 466, 90, 34, 24);
      [[30, 232], [100, 246], [220, 252], [330, 238], [430, 250]].forEach(function (p) { G.ellipse(c, '#8a8a7a', p[0], p[1], 8, 4); P(c, '#aaaaa0', p[0] - 4, p[1] - 3, 5, 1); });
    },
    maze: function (c) {
      P(c, '#1a1536', 0, 0, 480, 270);
      const r = G.rng(61);
      // tường đá mê cung
      for (let y = 0; y < 180; y += 14) for (let x = (y / 14 % 2) * 12; x < 480; x += 24) { const sh = Math.floor(r() * 12); P(c, 'rgb(' + (52 + sh) + ',' + (46 + sh) + ',' + (88 + sh) + ')', x, y, 23, 13); P(c, '#2a2450', x + 22, y, 1, 13); P(c, '#6a60a8', x, y, 23, 1); }
      // lối đi tối (hành lang)
      [[60, 40, 60, 100], [200, 70, 70, 110], [350, 30, 80, 150]].forEach(function (a) { P(c, '#0e0a20', a[0], a[1], a[2], a[3]); P(c, '#1a1536', a[0] + 2, a[1] + 2, a[2] - 4, a[3] - 2); });
      // cột đèn rune
      [30, 190, 340, 450].forEach(function (x) { P(c, '#3a3470', x, 20, 10, 160); P(c, '#6a60a8', x, 20, 2, 160); G.ellipse(c, '#7fe8ff', x + 5, 40, 3, 3); P(c, '#ffffff', x + 4, 39, 1, 1); });
      brickFloor(c, 180, '#3a3470', '#5a50a0', '#26204e');
      // ký hiệu dấu hỏi phát sáng
      [[90, 70], [230, 100], [380, 60], [150, 130], [420, 120]].forEach(function (q) { P(c, '#7fe8ff', q[0], q[1], 6, 2); P(c, '#7fe8ff', q[0] + 4, q[1] + 2, 2, 4); P(c, '#7fe8ff', q[0] + 2, q[1] + 6, 2, 2); P(c, '#7fe8ff', q[0] + 2, q[1] + 10, 2, 2); });
    },
    summit: function (c) {
      skyBands(c, ['#ff9a8a', '#ffb08a', '#ffc98a', '#ffe0a0', '#c8e0ff', '#a4c8ff'], 28);
      G.ellipse(c, '#fff3c4', 100, 120, 20, 20); lights(c, 10, 7);
      mountains(c, '#8a7ac8', 160, 100, 71, '#b3a6e8'); mountains(c, '#6a5aa8', 175, 70, 72);
      // đỉnh núi + tổ rồng xa
      for (let y = 0; y < 120; y++) { const w = 20 + y; P(c, '#5a4a98', 420 - Math.floor(w / 2), 50 + y, w, 1); } prasat(c, 420, 58, 1.2, '#7a6aa8', '#3a2a68', '#ffd84a');
      // biển mây
      const r = G.rng(73); for (let i = 0; i < 26; i++) G.ellipse(c, i % 3 ? '#ffffff' : '#eef3fb', Math.floor(r() * 480), 180 + Math.floor(r() * 80), 22 + Math.floor(r() * 24), 6 + Math.floor(r() * 6));
      // bậc đá lên đỉnh
      for (let i = 0; i < 9; i++) { P(c, '#a8a8b8', 60 + i * 22, 186 - i * 4 + 0, 40, 10 + i * 4); P(c, '#cfcfe0', 60 + i * 22, 186 - i * 4, 40, 2); P(c, '#78788a', 60 + i * 22 + 38, 186 - i * 4, 2, 10 + i * 4); }
      P(c, '#a8a8b8', 0, 190, 70, 80); P(c, '#cfcfe0', 0, 190, 70, 2);
      P(c, '#a8a8b8', 250, 168, 230, 102); P(c, '#cfcfe0', 250, 168, 230, 2); for (let x = 250; x < 480; x += 24) P(c, '#78788a', x, 170, 1, 100);
      // sách ma thuật lơ lửng
      [[60, 70], [330, 40], [200, 100], [440, 130]].forEach(function (b) { P(c, '#2b2f8f', b[0], b[1], 12, 9); P(c, '#fff3c4', b[0] + 1, b[1] + 1, 5, 7); P(c, '#fff3c4', b[0] + 6, b[1] + 1, 5, 7); P(c, '#ffd84a', b[0], b[1], 1, 9); });
    },
    lair: function (c) {
      P(c, '#1a0f2e', 0, 0, 480, 270); const r = G.rng(81);
      for (let y = 0; y < 190; y += 16) for (let x = (y / 16 % 2) * 14; x < 480; x += 28) { const sh = Math.floor(r() * 10); P(c, 'rgb(' + (46 + sh) + ',' + (30 + sh) + ',' + (70 + sh) + ')', x, y, 27, 15); P(c, '#1a0f2e', x + 27, y, 1, 15); P(c, '#6a4a98', x, y, 27, 1); }
      // cửa sổ đêm
      P(c, '#0a0620', 190, 20, 100, 110); G.ellipse(c, '#0a0620', 240, 20, 50, 20); P(c, '#101040', 194, 24, 92, 104); lights(c, 0, 1); for (let i = 0; i < 20; i++) P(c, '#ffffff', 196 + Math.floor(r() * 88), 24 + Math.floor(r() * 100), 1, 1); G.ellipse(c, '#fff3c4', 262, 52, 9, 9); G.ellipse(c, '#101040', 266, 49, 8, 8); P(c, '#0a0620', 238, 20, 4, 110);
      // chồng sách khổng lồ
      [[10, 90, 50], [60, 120, 40], [400, 80, 60], [440, 110, 36]].forEach(function (s) { for (let k = 0; k * 10 < s[2] + 40; k++) { const w = 40 - (k % 3) * 6; P(c, ['#c0392b', '#2b5fc9', '#2f8f3a', '#7a3fa0', '#d4a017'][k % 5], s[0] + (k % 2) * 4, 180 - k * 10, w, 10); P(c, '#fff3c4', s[0] + (k % 2) * 4 + w - 3, 182 - k * 10, 3, 6); } });
      // đuốc
      [[170, 70], [310, 70]].forEach(function (t) { P(c, '#6b4423', t[0], t[1], 4, 22); G.ellipse(c, '#ff8a1a', t[0] + 2, t[1] - 4, 4, 6); G.ellipse(c, '#ffd84a', t[0] + 2, t[1] - 3, 2, 4); });
      brickFloor(c, 182, '#3a2860', '#5a4090', '#241848');
    },
  };

  G.art.bgDefs = BG; // props.js thêm bối cảnh mới vào đây
  G.art.h = { skyBands: skyBands, tri: tri, mountains: mountains, pine: pine, roundTree: roundTree, grass: grass, brickFloor: brickFloor, prasat: prasat, lights: lights, eyePair: eyePair };

  // bản đồ 480x270 nhìn từ trên xuống
  function drawMap(c) {
    const r = G.rng(91);
    for (let y = 0; y < 270; y += 6) for (let x = 0; x < 480; x += 6) { const sh = Math.floor(r() * 18); P(c, 'rgb(' + (92 + sh) + ',' + (190 + sh) + ',' + (92 + sh) + ')', x, y, 6, 6); }
    // biển bên trái-dưới
    for (let y = 150; y < 270; y++) { const w = Math.max(0, 120 - Math.abs(y - 215) * 1.6 - Math.floor(r() * 3)); P(c, '#3a9fe0', 0, y, w, 1); }
    // núi phía trên bên phải
    for (let i = 0; i < 9; i++) { const x = 330 + i * 17, h = 24 + (i * 13) % 20; for (let y = 0; y < h; y++) { const w = Math.floor(y * 0.9) + 2; P(c, y < 6 ? '#ffffff' : (y % 7 < 4 ? '#8a8a9a' : '#6a6a7a'), x - Math.floor(w / 2), 8 + y, w, 1); } }
    // hồ
    G.ellipse(c, '#4fb8f0', 250, 245, 36, 10); G.ellipse(c, '#7fd0ff', 244, 243, 20, 5);
    // cây rải rác (tránh đường)
    const pts = G.mapNodes.map(function (n) { return { x: n.x / 4, y: n.y / 4 }; });
    function nearPath(x, y) { for (let i = 0; i < pts.length - 1; i++) { const a = pts[i], b = pts[i + 1]; for (let t = 0; t <= 1; t += 0.05) { const px = a.x + (b.x - a.x) * t, py = a.y + (b.y - a.y) * t; if (Math.abs(px - x) < 22 && Math.abs(py - y) < 20) return true; } } return false; }
    for (let i = 0; i < 160; i++) { const x = Math.floor(r() * 470) + 4, y = Math.floor(30 + r() * 235); if (nearPath(x, y)) continue; if (x < 120 && y > 160 + 0 && y < 270 && (120 - Math.abs(y - 215) * 1.6) > x - 8) continue; if (y < 62 && x > 320) continue; if (Math.abs(x - 250) < 42 && y > 232) continue;
      G.ellipse(c, '#1f8f3a', x, y, 5, 5); G.ellipse(c, '#3fbf5f', x - 1, y - 2, 3, 3); P(c, '#5a3a1a', x, y + 4, 1, 3); }
  }

  G.art.buildWorld = function (scene) {
    Object.keys(NPCS).forEach(function (k) {
      const d = NPCS[k];
      G.mk(scene, 'npc_' + k + '_a', d.w, d.h, function (c) { d.fn(c, false, false); }, { outline: true });
      G.mk(scene, 'npc_' + k + '_b', d.w, d.h, function (c) { d.fn(c, true, false); }, { outline: true });
      G.mk(scene, 'npc_' + k + '_c', d.w, d.h, function (c) { d.fn(c, false, true); }, { outline: true });
    });
    Object.keys(BG).forEach(function (k) { G.mk(scene, 'bg_' + k, 480, 270, BG[k], {}); });
    G.mk(scene, 'bg_map', 480, 270, drawMap, {});
    // mây, lá, đom đóm, cuộn giấy
    G.mk(scene, 'cloud', 40, 16, function (c) { G.ellipse(c, '#ffffff', 20, 10, 18, 5); G.ellipse(c, '#ffffff', 12, 7, 8, 5); G.ellipse(c, '#ffffff', 26, 6, 9, 5); P(c, '#dbe7f7', 4, 13, 32, 2); }, {});
    G.mk(scene, 'leaf', 5, 4, function (c) { P(c, '#3fbf5f', 0, 1, 5, 2); P(c, '#7be08a', 1, 0, 3, 1); P(c, '#1f7a38', 4, 3, 1, 1); }, {});
    G.mk(scene, 'fly', 4, 4, function (c) { P(c, '#fff7a0', 1, 0, 2, 4); P(c, '#fff7a0', 0, 1, 4, 2); }, {});
    G.mk(scene, 'drop', 4, 6, function (c) { P(c, '#bff0ff', 1, 0, 2, 6); P(c, '#7fd8ff', 0, 2, 4, 3); }, {});
    G.mk(scene, 'page', 8, 10, function (c) { P(c, '#ffffff', 0, 0, 8, 10); P(c, '#8aa0c8', 1, 2, 6, 1); P(c, '#8aa0c8', 1, 4, 6, 1); P(c, '#8aa0c8', 1, 6, 4, 1); }, { outline: true });
    G.mk(scene, 'ember', 3, 3, function (c) { P(c, '#ff9a1a', 0, 0, 3, 3); P(c, '#ffd84a', 1, 1, 1, 1); }, {});
    G.mk(scene, 'dust', 2, 2, function (c) { P(c, '#ffe9a8', 0, 0, 2, 2); }, {});
    G.mk(scene, 'wave', 32, 8, function (c) { P(c, 'rgba(0,0,0,0)', 0, 0, 1, 1); for (let x = 0; x < 32; x++) P(c, 'rgba(255,255,255,0.55)', x, 3 + Math.round(2 * Math.sin(x / 32 * Math.PI * 2)), 1, 1); }, {});
    G.mk(scene, 'stone', 16, 10, function (c) { G.blob(c, '#9a9a8a', 0, 0, 16, 10); P(c, '#b8b8a8', 1, 1, 14, 2); P(c, '#6a6a5a', 0, 8, 16, 2); }, { outline: true });
    // cổng mê cung
    G.mk(scene, 'gate', 40, 56, function (c) { P(c, '#6a60a8', 0, 8, 40, 48); G.ellipse(c, '#6a60a8', 20, 12, 20, 12); P(c, '#0e0a20', 6, 14, 28, 42); G.ellipse(c, '#0e0a20', 20, 16, 14, 12); P(c, '#26204e', 0, 8, 6, 48); P(c, '#26204e', 34, 8, 6, 48); for (let y = 16; y < 56; y += 6) P(c, '#8a8a9a', 10, y, 20, 2); for (let x = 10; x <= 28; x += 6) P(c, '#8a8a9a', x, 16, 2, 40); }, { outline: true });
    G.mk(scene, 'gate_open', 40, 56, function (c) { P(c, '#6a60a8', 0, 8, 40, 48); G.ellipse(c, '#6a60a8', 20, 12, 20, 12); P(c, '#ffe9a8', 6, 14, 28, 42); G.ellipse(c, '#ffe9a8', 20, 16, 14, 12); P(c, '#fff7d0', 12, 24, 16, 32); P(c, '#26204e', 0, 8, 6, 48); P(c, '#26204e', 34, 8, 6, 48); }, { outline: true });
    // lồng giam Hoàng tử
    G.mk(scene, 'cage', 44, 56, function (c) { P(c, '#5a5a6a', 0, 0, 44, 4); P(c, '#5a5a6a', 0, 52, 44, 4); for (let x = 2; x < 44; x += 6) P(c, '#8a8a9a', x, 4, 2, 48); P(c, '#aaaabb', 2, 4, 1, 48); }, { outline: true });
    // biểu tượng chặng trên bản đồ (24x24)
    const NODE = [
      function (c) { P(c, '#5a3a1a', 10, 14, 5, 9); G.ellipse(c, '#1f7a38', 12, 9, 10, 8); G.ellipse(c, '#3fbf5f', 9, 6, 5, 4); P(c, '#fff', 10, 10, 2, 2); P(c, INK, 10, 10, 1, 1); P(c, INK, 14, 10, 1, 1); },
      function (c) { P(c, '#c9b891', 2, 8, 20, 14); P(c, '#8a7a55', 1, 6, 22, 3); P(c, '#6e1020', 4, 2, 16, 5); P(c, '#2b2f8f', 7, 11, 5, 8); P(c, '#ffffff', 12, 11, 5, 8); P(c, '#ffd84a', 11, 11, 1, 8); },
      function (c) { P(c, '#2a9fd0', 0, 10, 24, 12); P(c, '#9fe8ff', 2, 13, 5, 1); P(c, '#9fe8ff', 12, 17, 6, 1); P(c, '#9a9a8a', 1, 8, 8, 4); P(c, '#9a9a8a', 15, 8, 8, 4); P(c, '#6a6a5a', 9, 9, 6, 2); },
      function (c) { P(c, '#6a60a8', 2, 4, 20, 19); G.ellipse(c, '#6a60a8', 12, 6, 10, 5); P(c, '#0e0a20', 7, 8, 10, 15); G.ellipse(c, '#0e0a20', 12, 9, 5, 4); P(c, '#7fe8ff', 11, 12, 2, 1); P(c, '#7fe8ff', 12, 14, 1, 2); },
      function (c) { for (let y = 0; y < 20; y++) { const w = 3 + y; P(c, y < 5 ? '#ffffff' : '#8a8a9a', 12 - Math.floor(w / 2), 3 + y, w, 1); } P(c, '#ffd84a', 11, 0, 3, 3); P(c, '#ffd84a', 10, 1, 5, 1); P(c, '#6a6a7a', 9, 12, 3, 8); },
      function (c) { P(c, '#7a4a22', 2, 8, 20, 14); P(c, '#a06a32', 2, 8, 20, 2); P(c, '#ffd84a', 4, 3, 2, 5); P(c, '#ffd84a', 11, 1, 2, 7); P(c, '#ffd84a', 18, 3, 2, 5); P(c, '#0e0a20', 9, 14, 6, 8); P(c, '#e0383e', 5, 12, 2, 2); P(c, '#e0383e', 17, 12, 2, 2); },
    ];
    NODE.forEach(function (fn, i) { G.mk(scene, 'node_' + i, 24, 24, fn, { outline: true }); });
  };

  // ============ Helper: NPC có animation miệng / chớp mắt ============
  G.makeNpc = function (scene, name, x, y, s, opts) {
    opts = opts || {}; s = s || 4;
    const img = scene.add.image(x, y, 'npc_' + name + '_a').setOrigin(0.5, 1).setScale(s);
    img.npcName = name; let talkEv = null, flip = false;
    img.talk = function (on) { if (talkEv) { talkEv.remove(); talkEv = null; } if (on) { talkEv = scene.time.addEvent({ delay: 130, loop: true, callback: function () { if (!img.scene) return; flip = !flip; img.setTexture('npc_' + name + (flip ? '_b' : '_a')); } }); } else img.setTexture('npc_' + name + '_a'); };
    if (opts.idle !== false) {
      img.idleTween = scene.tweens.add({ targets: img, scaleY: s * 1.025, y: y - s * 0.4, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      img.blinkEv = scene.time.addEvent({ delay: 2400 + Math.random() * 1200, loop: true, callback: function () { if (!img.scene || talkEv) return; img.setTexture('npc_' + name + '_c'); scene.time.delayedCall(140, function () { if (img.scene && !talkEv) img.setTexture('npc_' + name + '_a'); }); } });
    }
    img.once('destroy', function () { scene.tweens.killTweensOf(img); if (talkEv) talkEv.remove(); if (img.blinkEv) img.blinkEv.remove(); });
    return img;
  };
})();
