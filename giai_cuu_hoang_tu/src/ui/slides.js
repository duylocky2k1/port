// Trình chiếu slide theo giao diện game (bầu trời + nền cỏ pixel, bong bóng tiêu đề, thẻ PART).
// Slide được vẽ hoàn toàn từ dữ liệu trong content.js (xem chú thích đầu file content.js).
(function () {
  const INK = '#1b1030';
  const BAN = { green: '#8ee05a', yellow: '#ffe27a', dark: '#1b2340', pink: '#ffb3b3', white: '#ffffff', blue: '#9fd8ff' };

  function box(g, x, y, w, h, fill, border, b) { b = b || 5; g.fillStyle(G.num(border || INK), 1); g.fillRect(x + b, y, w - 2 * b, h); g.fillRect(x, y + b, w, h - 2 * b); g.fillStyle(G.num(fill), 1); g.fillRect(x + b, y + b, w - 2 * b, h - 2 * b); }
  function arrow(g, cx, cy, col) { g.fillStyle(G.num(col || INK), 1); g.fillTriangle(cx - 13, cy - 18, cx - 13, cy + 18, cx + 15, cy); }
  function tx(s, L, x, y, str, size, color, o) { o = o || {}; const t = G.txt(s, x, y, str, size, color, { ox: o.ox === undefined ? 0.5 : o.ox, oy: o.oy === undefined ? 0.5 : o.oy, wrap: o.wrap, align: o.align || 'center', sw: o.sw || 0, stroke: o.stroke, ls: o.ls }); L.add(t); return t; }
  // co chữ cho vừa ô; nếu có max thì phóng to trước (để chữ dễ đọc khi chiếu), maxW chặn tràn ngang
  function fit(t, maxH, min, max, maxW) {
    let fs = parseInt(t.style.fontSize, 10); const over = function () { return t.height > maxH || (maxW && t.width > maxW); };
    if (max) { while (!over() && fs < max) { fs += 2; t.setFontSize(fs); } }
    while (over() && fs > (min || 18)) { fs -= 2; t.setFontSize(fs); } return t; }
  G.slideBox = box;

  // ảnh slide: giải mã sẵn từ data URI, đăng ký texture khi vẽ lần đầu
  const PHOTOS = {};
  Object.keys(window.SLIDE_IMAGES || {}).forEach(function (k) { const im = new Image(); im.src = window.SLIDE_IMAGES[k]; PHOTOS[k] = im; });
  function photo(s, k) {
    const key = 'ph_' + k, im = PHOTOS[k];
    if (!s.textures.exists(key)) { if (!im || !im.complete || !im.naturalWidth) return null; s.textures.addImage(key, im).setFilter(Phaser.Textures.FilterMode.LINEAR); }
    return key;
  }

  // ---------- các khối nội dung ----------
  const BLOCKS = {
    cards: function (s, L, g, b, x, y, w, h) {
      const items = b.items || [], n = items.length, cols = b.cols || n, rows = Math.ceil(n / cols);
      const gap = b.arrows ? 70 : 22, vgap = 18, cw = (w - gap * (cols - 1)) / cols, ch = (h - vgap * (rows - 1)) / rows;
      const made = items.map(function (it, i) {
        const r = Math.floor(i / cols), ci = i % cols, inRow = Math.min(cols, n - r * cols), off = (cols - inRow) * (cw + gap) / 2;
        const cx = x + off + ci * (cw + gap), cy = y + r * (ch + vgap);
        if (b.arrows && ci < inRow - 1) arrow(g, cx + cw + gap / 2, cy + ch / 2);
        return card(s, L, g, b, it, cx, cy, cw, ch);
      });
      const sc = Math.min.apply(null, made.map(function (m) { return m.sc; })); made.forEach(function (m) { m.apply(sc); }); // cùng cỡ chữ trong một khối
    },
    table: function (s, L, g, b, x, y, w, h) {
      const nc = b.cols.length, ws = b.widths || b.cols.map(function () { return 1 / nc; }), gapX = b.arrows ? 56 : 14, usable = w - gapX * (nc - 1);
      const colX = []; let cx = x; ws.forEach(function (f) { colX.push(cx); cx += f * usable + gapX; });
      const headH = 58, rows = b.rows.length, rgap = 14, rh = (h - headH - rgap - rgap * (rows - 1)) / rows;
      b.cols.forEach(function (t, i) { if (!t) return; const cw = ws[i] * usable, col = (b.colors && b.colors[i]) || '#c8ccd8', dk = col === '#1b2340'; box(g, colX[i], y, cw, headH, col, INK, 5); fit(tx(s, L, colX[i] + cw / 2, y + headH / 2, t, 30, dk ? '#ffffff' : INK, { wrap: cw - 20 }), headH - 8, 18, 36, cw - 20); });
      b.rows.forEach(function (row, r) {
        const ry = y + headH + rgap + r * (rh + rgap);
        row.forEach(function (cell, i) {
          const cw = ws[i] * usable, lab = i === 0, fill = lab ? (b.rowLight ? '#dfe6ff' : '#1b2340') : (i === b.hl ? '#e6ffd8' : '#ffffff');
          box(g, colX[i], ry, cw, rh, fill, INK, 5);
          const t = lab ? tx(s, L, colX[i] + cw / 2, ry + rh / 2, cell, 32, b.rowLight ? INK : '#ffffff', { wrap: cw - 24 }) : tx(s, L, colX[i] + 20, ry + rh / 2, cell, 31, INK, { ox: 0, wrap: cw - 40, align: 'left' });
          fit(t, rh - 20, 18, 42, lab ? cw - 24 : cw - 40);
          if (b.arrows && i < row.length - 1) arrow(g, colX[i] + cw + gapX / 2, ry + rh / 2);
        });
      });
    },
    list: function (s, L, g, b, x, y, w, h) {
      const items = b.items || [], cols = b.cols || 1, per = Math.ceil(items.length / cols), gap = 24, vg = 12, cw = (w - gap * (cols - 1)) / cols, rh = (h - vg * (per - 1)) / per;
      items.forEach(function (it, i) {
        const c = Math.floor(i / per), r = i % per, bx = x + c * (cw + gap), by = y + r * (rh + vg);
        box(g, bx, by, cw, rh, b.color || '#ffffff', INK, 5);
        const num = (i < 9 ? '0' : '') + (i + 1) + '  ', main = typeof it === 'string' ? it : it.t, d = typeof it === 'string' ? null : it.d;
        const t1 = tx(s, L, bx + 20, by, num + main, 30, INK, { ox: 0, oy: 0, wrap: cw - 40, align: 'left' });
        const t2 = d ? tx(s, L, bx + 20, by, d, 25, '#3a3a5a', { ox: 0, oy: 0, wrap: cw - 40, align: 'left' }) : null;
        let sc = 1; const tot = function () { return t1.height + (t2 ? t2.height + 2 : 0); };
        const ap = function () { t1.setFontSize(Math.round(30 * sc)); if (t2) t2.setFontSize(Math.round(25 * sc)); };
        while (tot() < rh - 18 && sc < 1.35) { sc += 0.05; ap(); }
        while (tot() > rh - 10 && sc > 0.55) { sc -= 0.05; ap(); }
        let ty = by + (rh - tot()) / 2; t1.y = ty; if (t2) t2.y = ty + t1.height + 2;
      });
    },
    stats: function (s, L, g, b, x, y, w, h) {
      box(g, x, y, w, h, '#1b2340', INK, 6);
      const tt = fit(tx(s, L, x + w / 2, y + 32, b.title || '', 34, '#9be86a', { wrap: w - 40 }), 52, 20); tt.y = y + 12 + tt.height / 2;
      const n = b.items.length, gap = 16, iw = (w - 40 - gap * (n - 1)) / n, iy = y + tt.height + 24, ih = y + h - 14 - iy;
      b.items.forEach(function (it, i) {
        const ix = x + 20 + i * (iw + gap); box(g, ix, iy, iw, ih, '#ffffff', INK, 4);
        const v = fit(tx(s, L, ix + iw / 2, iy, it.v, 44, '#e8481c', { oy: 0, wrap: iw - 16 }), ih * 0.5, 22, 60, iw - 16);
        const t = it.t ? fit(tx(s, L, ix + iw / 2, iy, it.t, 24, INK, { oy: 0, wrap: iw - 20 }), ih - v.height - 16, 16, 32, iw - 20) : null;
        const tot = v.height + (t ? t.height + 4 : 0); v.y = iy + (ih - tot) / 2; if (t) t.y = v.y + v.height + 4;
      });
    },
    phones: function (s, L, g, b, x, y, w, h) {
      const n = b.items.length, cw = w / n, capH = Math.min(118, h * 0.24), ph = h - capH - 18, pw = Math.min(ph * 0.58, cw - 70);
      b.items.forEach(function (it, i) {
        const mx = x + cw * i + cw / 2, px = mx - pw / 2, py = y;
        box(g, px, py, pw, ph, '#2a2a38', INK, 12); box(g, px + 12, py + 16, pw - 24, ph - 32, '#fff7e8', '#2a2a38', 2);
        g.fillStyle(G.num('#ffb43a'), 1); g.fillRect(px + 14, py + 18, pw - 28, 54); g.fillStyle(G.num('#2a2a38'), 1); g.fillRect(mx - 34, py + 16, 68, 10);
        tx(s, L, mx, py + 50, 'SHIELD UP', 30, '#ffffff', { sw: 4, stroke: INK });
        const sz = Math.min(pw * 0.5, ph * 0.34), iy = py + 84 + sz / 2;
        if (it.icon) L.add(s.add.image(mx, iy, 'si_' + it.icon).setDisplaySize(sz, sz));
        const btnY = py + ph - 70;
        if (it.line) fit(tx(s, L, mx, (iy + sz / 2 + btnY - 24) / 2, it.line, 26, INK, { wrap: pw - 44 }), btnY - 30 - iy - sz / 2, 16, 36, pw - 44);
        if (it.btn) { box(g, px + 30, btnY - 24, pw - 60, 48, '#ff8a3a', INK, 4); fit(tx(s, L, mx, btnY, it.btn, 26, '#ffffff', { sw: 3, stroke: INK, wrap: pw - 70 }), 42, 16); }
        box(g, x + cw * i + 14, y + h - capH, cw - 28, capH, '#ffffff', INK, 8);
        fit(tx(s, L, mx, y + h - capH / 2, it.caption || '', 34, INK, { wrap: cw - 60 }), capH - 18, 18, 44, cw - 60);
      });
    },
    banner: function (s, L, g, b, x, y, w, h, pre) {
      box(g, x, y, w, h, BAN[b.color || 'green'] || b.color, INK, 6);
      const t = pre || tx(s, L, 0, 0, b.text, b.h ? 50 : 36, b.color === 'dark' ? '#9be86a' : INK, { wrap: w - 70 });
      t.setPosition(x + w / 2, y + h / 2); fit(t, h - 16, 20, b.h ? 66 : 0, w - 70);
    },
    label: function (s, L, g, b, x, y, w, h, pre) {
      const al = b.align || 'left', t = pre; t.setOrigin(al === 'left' ? 0 : al === 'right' ? 1 : 0.5, 0.5); t.setPosition(al === 'left' ? x + 6 : al === 'right' ? x + w - 6 : x + w / 2, y + h / 2);
    },
  };

  function card(s, L, g, b, it, x, y, w, h) {
    const dark = !!it.dark, fill = dark ? '#1b2340' : (it.color || b.color || '#ffffff');
    box(g, x, y, w, h, fill, dark ? '#ffd84a' : INK, 6);
    let top = y + 6;
    if (it.head) {
      const hh = Math.min(58, h * 0.24); g.fillStyle(G.num(it.headColor || b.headColor || '#ffd43a'), 1); g.fillRect(x + 6, y + 6, w - 12, hh); g.fillStyle(G.num(INK), 1); g.fillRect(x + 6, y + 6 + hh, w - 12, 4);
      fit(tx(s, L, x + w / 2, y + 6 + hh / 2, it.head, 32, INK, { wrap: w - 24 }), hh - 4, 18); top = y + 10 + hh;
    }
    let ix = x + 20, iw = w - 40;
    if (it.icon) {
      const sz = Math.min(h - (top - y) - 40, w * 0.24, 140), icy = top + (y + h - top) / 2;
      box(g, x + 16, icy - sz / 2 - 10, sz + 20, sz + 20, '#ffe0ec', INK, 4); L.add(s.add.image(x + 26 + sz / 2, icy, 'si_' + it.icon).setDisplaySize(sz, sz));
      ix = x + 26 + sz + 30; iw = x + w - 20 - ix;
    }
    const align = b.align || 'left', parts = [];
    if (it.title) parts.push({ str: it.title, size: 38, color: dark ? '#ffd84a' : '#e8481c' });
    if (it.sub) parts.push({ str: it.sub, size: 40, color: dark ? '#ffffff' : INK });
    if (it.body) parts.push({ str: it.body, size: 31, color: dark ? '#ffffff' : INK });
    if (it.foot) parts.push({ str: it.foot, size: 27, color: '#1f8a3a' });
    let imgH = 0;
    const pk = it.img ? photo(s, it.img) : null;
    if (pk) { // ảnh nằm ở đáy thẻ, giữ nguyên tỉ lệ
      const src = s.textures.get(pk).getSourceImage(), k = Math.min((w - 32) / src.width, h * 0.38 / src.height), pw = Math.round(src.width * k), ph = Math.round(src.height * k);
      const px = Math.round(x + (w - pw) / 2), py = Math.round(y + h - 18 - ph);
      box(g, px - 4, py - 4, pw + 8, ph + 8, INK, INK, 4); L.add(s.add.image(px, py, pk).setOrigin(0).setDisplaySize(pw, ph));
      imgH = Math.round(h * 0.38) + 12; // cùng chiều cao chừa cho mọi thẻ để chữ thẳng hàng
    }
    const pillH = it.pill ? 52 : 0, availH = y + h - top - 26 - pillH - imgH;
    const objs = parts.map(function (p) { return { p: p, t: tx(s, L, 0, 0, p.str, p.size, p.color, { ox: align === 'center' ? 0.5 : 0, oy: 0, wrap: iw, align: align }) }; });
    const total = function () { return objs.reduce(function (a, o) { return a + o.t.height; }, 0) + 10 * Math.max(0, objs.length - 1); };
    let sc = 1; const ap = function (v) { sc = v; objs.forEach(function (o) { o.t.setFontSize(Math.round(o.p.size * sc)); }); };
    while (total() < availH * 0.8 && sc < 1.45) ap(sc + 0.04);
    while (total() > availH && sc > 0.5) ap(sc - 0.04);
    const best = sc;
    if (it.pill) { const pt = tx(s, L, 0, 0, it.pill, 26, INK, {}); const pw = pt.width + 30; box(g, ix, y + h - 20 - 44, pw, 40, '#8ee05a', INK, 4); pt.setPosition(ix + pw / 2, y + h - 20 - 24); }
    return { sc: best, apply: function (v) {
      ap(v); const valign = b.valign || (it.head ? 'top' : 'center');
      let ty = top + 12 + (valign === 'center' ? Math.max(0, (availH - total()) / 2) : 4);
      objs.forEach(function (o) { o.t.setPosition(align === 'center' ? ix + iw / 2 : ix, ty); ty += o.t.height + 10; });
    } };
  }

  // ---------- vẽ một slide vào vùng R = {x,y,w,h} (khung trời + cỏ do Slides vẽ) ----------
  G.renderSlide = function (s, sl, R, L, g) {
    // bong bóng tiêu đề
    const bx = R.x + 40, by = R.y + 26;
    const tt = tx(s, L, 0, 0, sl.title || '', 52, sl.titleColor || INK, { wrap: 900 });
    const tw = Math.min(Math.max(tt.width + 100, 380), 980), th = Math.max(100, tt.height + 40);
    box(g, bx, by, tw, th, '#ffffff', INK, 8); tt.setPosition(bx + tw / 2, by + th / 2);
    box(g, bx + tw - 96, by + th + 8, 22, 22, '#ffffff', INK, 5); box(g, bx + tw - 66, by + th + 32, 16, 16, '#ffffff', INK, 4);
    let hb = by + th + 52;
    // thẻ PART / CÂU / SHIELD UP
    if (sl.tag) {
      const tg = tx(s, L, 0, 0, sl.tag, 36, '#ffffff', { sw: 4, stroke: INK }); const pw = Math.max(220, tg.width + 60), px = R.x + R.w - 40 - pw;
      box(g, px, by + 4, pw, 52, '#7ab648', INK, 5); tg.setPosition(px + pw / 2 + 12, by + 30); L.add(s.add.image(px - 4, by + 30, 'ic_heart').setScale(8));
    }
    // câu dẫn
    if (sl.lead) {
      let lx = bx + tw + 40, lw = R.x + R.w - 40 - lx, ly = by + 74;
      if (lw < 640) { lx = R.x + 40; lw = R.w - 80; ly = hb - 10; }
      const lt = tx(s, L, 0, 0, sl.lead, 34, INK, { wrap: lw - 50 }); fit(lt, 120, 22, 40);
      const lh = Math.max(70, lt.height + 28); box(g, lx, ly, lw, lh, '#ffffff', INK, 6); lt.setPosition(lx + lw / 2, ly + lh / 2);
      hb = Math.max(hb, ly + lh + 18);
    }
    const cx = R.x + 50, cw = R.w - 100, cTop = hb, cBot = R.y + R.h - 96;
    if (!sl.blocks || !sl.blocks.length) { // slide chữ đơn giản
      box(g, cx, cTop, cw, cBot - cTop, '#ffffff', INK, 6);
      const bt = tx(s, L, cx + 40, cTop + 30, sl.body || '', 40, INK, { ox: 0, oy: 0, wrap: cw - 80, align: 'left' }); fit(bt, cBot - cTop - 80, 22, 52);
      bt.y = cTop + Math.max(30, (cBot - cTop - bt.height) / 2);
      return;
    }
    // đo các khối cố định (banner/label) rồi chia phần còn lại theo trọng số h
    const GAP = 16, pre = [], fixed = [];
    let flexW = 0, fixedH = 0;
    sl.blocks.forEach(function (b, i) {
      if (b.type === 'label') { const t = tx(s, L, 0, 0, b.text, 30, '#1b2340', { wrap: cw - 20, align: b.align || 'left' }); fit(t, 80, 20); pre[i] = t; fixed[i] = t.height + 10; }
      else if (b.type === 'banner' && !b.h) { const t = tx(s, L, 0, 0, b.text, 38, b.color === 'dark' ? '#9be86a' : INK, { wrap: cw - 80 }); pre[i] = t; fixed[i] = Math.max(76, t.height + 34); }
      else flexW += (b.h || 1);
      fixedH += fixed[i] || 0;
    });
    const flexH = Math.max(80, cBot - cTop - fixedH - GAP * (sl.blocks.length - 1));
    let y = cTop;
    sl.blocks.forEach(function (b, i) {
      const h = fixed[i] || flexH * (b.h || 1) / (flexW || 1), fn = BLOCKS[b.type];
      if (fn) fn(s, L, g, b, cx, y, cw, h, pre[i]);
      y += h + GAP;
    });
  };

  // ---------- trình chiếu nhiều slide ----------
  G.Slides = function (scene) { this.scene = scene; this.objs = []; };
  G.Slides.prototype = {
    show: function (cfg) { // { slides, heading, doneLabel, onDone, warn:{title,body}, color }
      const s = this.scene, self = this; this.hide();
      let pages = cfg.slides && cfg.slides.length ? cfg.slides : null, warned = false;
      if (!pages) { warned = true; const w = cfg.warn || {}; pages = [{ title: w.title || 'CHƯA CẤU HÌNH NỘI DUNG', titleColor: '#c0392b', body: w.body || 'Người tạo game cần điền nội dung vào file content/content.js.\n\nBạn vẫn có thể bấm nút bên dưới để đi tiếp và thử luồng game.' }]; }
      const R = { x: 50, y: 18, w: 1820, h: 950 }; let idx = 0;
      const dim = s.add.rectangle(0, 0, G.W, G.H, 0x0b0820, 0.7).setOrigin(0).setInteractive().setDepth(600);
      const frame = G.panel(s, R.x, R.y, R.w, R.h, { fill: cfg.color || '#62c4ff', border: C().gold, rivets: false }).setDepth(601);
      const deco = s.add.graphics().setDepth(601); // dải cỏ + đất pixel dưới đáy khung
      const gy = R.y + R.h - 78; deco.fillStyle(0x5fd35f, 1); deco.fillRect(R.x + 14, gy, R.w - 28, 16); deco.fillStyle(0xb8662b, 1); deco.fillRect(R.x + 14, gy + 16, R.w - 28, 48);
      for (let x = R.x + 14; x < R.x + R.w - 22; x += 16) { deco.fillStyle(0x8fe86f, 1); deco.fillRect(x, gy - 6 + ((x / 16) % 2) * 3, 6, 6); deco.fillStyle(0x8a4a1c, 1); deco.fillRect(x + 4, gy + 26 + ((x / 16) % 3) * 8, 8, 4); }
      const clouds = [[420, 120], [1500, 200], [980, 70]].map(function (p) { return s.add.image(p[0], p[1], 'cloud').setScale(5).setAlpha(0.7).setDepth(601); });
      const ind = G.txt(s, G.W / 2, 1022, '', 38, '#ffffff').setDepth(603);
      const back = G.button(s, 270, 1022, 340, 76, 'QUAY LẠI', function () { if (idx > 0) go(-1); else if (cfg.onBack) { self.hide(); cfg.onBack(); } }, { color: 'blue', size: 40 }).setDepth(603);
      const next = G.button(s, G.W - 290, 1022, 400, 76, 'TIẾP THEO', function () { go(1); }, { color: 'green', size: 40, blink: true }).setDepth(603);
      let L = null, g = null;
      this.objs = [dim, frame, deco, ind, back, next].concat(clouds);
      function render() {
        if (L) L.destroy(); L = s.add.container(0, 0).setDepth(602); g = s.add.graphics(); L.add(g);
        G.renderSlide(s, pages[idx], R, L, g);
        const n = pages.length; ind.setText((cfg.heading ? cfg.heading + '   ' : '') + (warned ? '' : (idx + 1) + '/' + n));
        back.setVisible(true); back.setEnabled(true); // luôn bấm được; ở trang đầu: có onBack thì về bước trước, không có thì không làm gì
        next.setLabel(idx >= n - 1 ? (warned ? 'BỎ QUA & ĐI TIẾP' : (cfg.doneLabel || 'XONG')) : 'TIẾP THEO');
        L.alpha = 0.2; s.tweens.add({ targets: L, alpha: 1, duration: 160 });
      }
      function go(d) {
        const n = pages.length; G.audio.sfx('page');
        if (d > 0 && idx >= n - 1) { self.hide(); if (cfg.onDone) cfg.onDone(); return; }
        const ni = Math.max(0, Math.min(n - 1, idx + d)); if (ni === idx) return; idx = ni; render();
      }
      this.keyFn = function (e) { if (e.code === 'ArrowRight' || e.code === 'PageDown') go(1); else if ((e.code === 'ArrowLeft' || e.code === 'PageUp') && idx > 0) go(-1); };
      s.input.keyboard.on('keydown', this.keyFn);
      this.layer = function () { return L; };
      render();
    },
    hide: function () { const s = this.scene; if (this.keyFn && s.input && s.input.keyboard) s.input.keyboard.off('keydown', this.keyFn); this.keyFn = null; if (this.layer && this.layer()) this.layer().destroy(); this.layer = null; this.objs.forEach(function (o) { if (o && o.destroy) o.destroy(); }); this.objs = []; },
  };
  function C() { return G.C; }
})();
