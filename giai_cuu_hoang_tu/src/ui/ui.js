// Thư viện UI phong cách retro: chữ, panel, nút, hộp thoại, bảng phân trang, quiz, thanh trạng thái, chuyển cảnh.
(function () {
  const C = G.C;
  // ---------- chữ ----------
  G.txt = function (scene, x, y, str, size, color, o) {
    o = o || {};
    // chữ có dấu tiếng Việt: viền đen dày sẽ che các dấu nhỏ của font pixel, nên chỉ giữ viền mỏng (G.MARK_SW)
    let sw = o.sw === undefined ? Math.max(2, Math.round(size / 12)) : o.sw, pad = 0;
    const marked = /[\u00C0-\u024F\u1E00-\u1EFF]/.test(str);
    if (G.MARK_SW !== undefined && marked) sw = Math.min(sw, G.MARK_SW);
    // dấu nằm trên đầu chữ hoa có thể bị Phaser cắt khỏi canvas -> chừa thêm khoảng đệm trên/dưới (đối xứng nên vị trí không đổi)
    // chuỗi rỗng = chữ sẽ được gõ/cập nhật sau (hội thoại, sắc lệnh) nên cũng đệm trước
    if (marked || str === '') pad = Math.round(size * 0.3);
    const t = scene.add.text(x, y, str, {
      fontFamily: G.FONT, fontSize: size + 'px', color: color || '#ffffff', align: o.align || 'center',
      stroke: o.stroke === undefined ? '#1b1030' : o.stroke, strokeThickness: sw, padding: { top: pad, bottom: pad, left: 0, right: 0 },
      wordWrap: o.wrap ? { width: o.wrap, useAdvancedWrap: true } : undefined, lineSpacing: o.ls === undefined ? 2 : o.ls,
    });
    const oy = o.oy === undefined ? 0.5 : o.oy;
    t.setOrigin(o.ox === undefined ? 0.5 : o.ox, oy);
    if (pad) t.y += pad * (2 * oy - 1); // bù phần đệm để chữ giữ đúng vị trí
    if (o.shadow) t.setShadow(0, o.shadow, '#000000', 0, true, true);
    return t;
  };
  // ---------- panel pixel (vẽ bằng Graphics) ----------
  G.panel = function (scene, x, y, w, h, o) {
    o = o || {}; const g = scene.add.graphics(); const b = o.b || 8;
    const fill = G.num(o.fill || C.woodDark), border = G.num(o.border || C.gold), dark = G.num(o.dark || C.ink);
    g.fillStyle(dark, 1); g.fillRect(x + b, y, w - b * 2, h); g.fillRect(x, y + b, w, h - b * 2);
    g.fillStyle(border, 1); g.fillRect(x + b, y + 2, w - b * 2, h - 4); g.fillRect(x + 2, y + b, w - 4, h - b * 2);
    g.fillStyle(dark, 1); g.fillRect(x + b + 4, y + 6, w - b * 2 - 8, h - 12); g.fillRect(x + 6, y + b + 4, w - 12, h - b * 2 - 8);
    g.fillStyle(fill, 1); g.fillRect(x + b + 6, y + 8, w - b * 2 - 12, h - 16); g.fillRect(x + 8, y + b + 6, w - 16, h - b * 2 - 12);
    if (o.shine !== false) { g.fillStyle(0xffffff, 0.12); g.fillRect(x + b + 6, y + 8, w - b * 2 - 12, 6); }
    if (o.rivets) { g.fillStyle(border, 1); [[x + 14, y + 14], [x + w - 22, y + 14], [x + 14, y + h - 22], [x + w - 22, y + h - 22]].forEach(function (p) { g.fillRect(p[0], p[1], 8, 8); }); }
    return g;
  };
  // ---------- nút ----------
  const BTN = { red: ['#e0383e', '#a0242a', '#ff7a7e'], blue: ['#2f7de1', '#1d4f9a', '#7ab4ff'], green: ['#2fa84f', '#1d7a36', '#7ae09a'], gold: ['#e8b020', '#a87a0a', '#fff08a'], gray: ['#6b6880', '#46445a', '#9a98b0'] };
  G.button = function (scene, x, y, w, h, label, cb, o) {
    o = o || {}; const pal = BTN[o.color || 'red'];
    const cont = scene.add.container(x, y); const g = scene.add.graphics();
    const fs = o.size || Math.min(52, Math.round(h * 0.55));
    const t = G.txt(scene, 0, -2, label, fs, '#ffffff', { wrap: w - 30 });
    cont.add([g, t]); cont.setSize(w, h); cont.label = t; cont.enabled = true; cont.hover = false; cont.down = false;
    function draw() {
      g.clear(); const pc = cont.enabled ? pal : BTN.gray, off = cont.down ? 4 : 0, hov = cont.hover && cont.enabled;
      g.fillStyle(G.num(C.ink), 1); g.fillRect(-w / 2 + 6, -h / 2 + 8, w - 12, h); g.fillRect(-w / 2, -h / 2 + 14, w, h - 12);
      g.fillStyle(hov ? G.num(C.gold) : G.num(C.ink), 1); g.fillRect(-w / 2 + 6, -h / 2 + off, w - 12, h); g.fillRect(-w / 2, -h / 2 + 6 + off, w, h - 12);
      g.fillStyle(G.num(pc[1]), 1); g.fillRect(-w / 2 + 10, -h / 2 + 4 + off, w - 20, h - 8); g.fillRect(-w / 2 + 4, -h / 2 + 10 + off, w - 8, h - 20);
      g.fillStyle(G.num(pc[0]), 1); g.fillRect(-w / 2 + 10, -h / 2 + 4 + off, w - 20, h - 16); g.fillRect(-w / 2 + 4, -h / 2 + 10 + off, w - 8, h - 28);
      g.fillStyle(G.num(pc[2]), 0.55); g.fillRect(-w / 2 + 12, -h / 2 + 7 + off, w - 24, 5);
      t.y = -2 + off; t.setAlpha(cont.enabled ? 1 : 0.55);
    }
    draw();
    cont.setInteractive({ hitArea: new Phaser.Geom.Rectangle(0, 0, w, h + 8), hitAreaCallback: Phaser.Geom.Rectangle.Contains, useHandCursor: true });
    cont.on('pointerover', function () { if (!cont.enabled) return; cont.hover = true; draw(); G.audio.sfx('hover'); scene.tweens.add({ targets: cont, scale: (o.scale || 1) * 1.06, duration: 80 }); });
    cont.on('pointerout', function () { cont.hover = false; cont.down = false; draw(); scene.tweens.add({ targets: cont, scale: o.scale || 1, duration: 80 }); });
    cont.on('pointerdown', function () { if (!cont.enabled) return; cont.down = true; draw(); });
    cont.on('pointerup', function () { if (!cont.enabled) { G.audio.sfx('locked'); return; } if (!cont.down) return; cont.down = false; draw(); G.audio.sfx('click'); if (cb) cb(cont); });
    cont.setEnabled = function (v) { cont.enabled = v; cont.input.cursor = v ? 'pointer' : 'default'; draw(); if (cont.blinkTw) { cont.blinkTw.paused = !v; if (!v) cont.setAlpha(1); } return cont; };
    cont.setLabel = function (s) { t.setText(s); return cont; };
    if (o.blink) cont.blinkTw = scene.tweens.add({ targets: cont, alpha: 0.72, duration: 520, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    cont.once('destroy', function () { scene.tweens.killTweensOf(cont); });
    cont.setScale(o.scale || 1);
    return cont;
  };
  // ---------- hiệu ứng đánh máy ----------
  G.typewrite = function (scene, textObj, str, cps, onDone) {
    let i = 0, ev, done = false; textObj.setText('');
    function finish() { if (done) return; done = true; if (ev) ev.remove(); textObj.setText(str); if (onDone) onDone(); }
    ev = scene.time.addEvent({ delay: 1000 / (cps || 45), loop: true, callback: function () { i++; textObj.setText(str.slice(0, i)); if (i % 3 === 0 && str[i - 1] !== ' ') G.audio.sfx('type'); if (i >= str.length) finish(); } });
    return { skip: finish, get done() { return done; }, stop: function () { done = true; if (ev) ev.remove(); } };
  };
  // ---------- toast ----------
  G.toast = function (scene, msg, color) {
    const y = 190, t = G.txt(scene, G.W / 2, y, msg, 54, '#ffffff', { sw: 6 }).setDepth(900);
    const b = G.panel(scene, G.W / 2 - t.width / 2 - 40, y - 48, t.width + 80, 96, { fill: color || '#7a1d1d', border: C.gold }).setDepth(899);
    b.alpha = 0; t.alpha = 0; scene.tweens.add({ targets: [b, t], alpha: 1, duration: 120 });
    scene.tweens.add({ targets: [b, t], alpha: 0, delay: 1500, duration: 300, onComplete: function () { b.destroy(); t.destroy(); } });
    scene.tweens.add({ targets: t, y: y - 6, duration: 120, yoyo: true });
  };
  // ---------- hộp thoại ----------
  G.Dialog = function (scene) { this.scene = scene; this.objs = []; this.busy = false; };
  G.Dialog.prototype = {
    say: function (name, lines, onDone, npc) {
      const s = this.scene, self = this; this.hide(); lines = [].concat(lines); let idx = 0, tw = null;
      const bx = 110, by = 770, bw = 1700, bh = 270;
      const panel = G.panel(s, bx, by, bw, bh, { fill: '#43260f', border: C.gold, rivets: true }).setDepth(500);
      const tagW = Math.max(360, name.length * 26 + 60);
      const tag = G.panel(s, bx + 40, by - 36, tagW, 64, { fill: '#7a1d1d', border: C.gold, b: 6 }).setDepth(501);
      const nm = G.txt(s, bx + 40 + tagW / 2, by - 4, name, 38, C.cream).setDepth(502);
      const txt = G.txt(s, bx + 60, by + 44, '', 48, C.cream, { ox: 0, oy: 0, align: 'left', wrap: bw - 120, sw: 4 }).setDepth(502);
      const btn = G.button(s, bx + bw - 190, by + bh - 46, 280, 64, 'TIẾP TỤC', function () { adv(); }, { color: 'green', blink: true, size: 38 }).setDepth(503);
      // nút TRỞ LẠI đối xứng bên trái: quay về câu trước; các phần còn lại của ô vẫn bấm để tiếp tục
      const back = G.button(s, bx + 190, by + bh - 46, 280, 64, 'TRỞ LẠI', function () { goBack(); }, { color: 'blue', size: 38 }).setDepth(503);
      const zone = s.add.zone(bx, by, bw, bh).setOrigin(0).setInteractive().setDepth(499);
      this.objs = [panel, tag, nm, txt, btn, back, zone];
      function show() { btn.setEnabled(false); back.setEnabled(true); if (npc && npc.talk) npc.talk(true); tw = G.typewrite(s, txt, lines[idx], 48, function () { if (npc && npc.talk) npc.talk(false); btn.setEnabled(true); }); }
      function adv() { if (!tw) return; if (!tw.done) { tw.skip(); return; } idx++; if (idx >= lines.length) { self.hide(); if (npc && npc.talk) npc.talk(false); if (onDone) onDone(); } else show(); }
      function goBack() { if (!tw || idx === 0) return; tw.stop(); if (npc && npc.talk) npc.talk(false); idx--; show(); }
      zone.on('pointerup', adv);
      this.keyFn = function (e) { if (e.code === 'Space' || e.code === 'Enter') adv(); }; s.input.keyboard.on('keydown', this.keyFn);
      this.tw = function () { return tw; };
      show();
    },
    hide: function () { const s = this.scene; if (this.keyFn && s.input && s.input.keyboard) s.input.keyboard.off('keydown', this.keyFn); this.keyFn = null; if (this.tw && this.tw()) this.tw().stop(); this.objs.forEach(function (o) { if (o && o.destroy) o.destroy(); }); this.objs = []; },
  };
  // ---------- bảng phân trang (case study, lý thuyết, trình bày) ----------
  G.Paged = function (scene) { this.scene = scene; this.objs = []; };
  G.Paged.prototype = {
    show: function (cfg) { // cfg: { pages:[{title,body}], heading, doneLabel, onDone, tone:'paper'|'water' }
      const s = this.scene, self = this; this.hide();
      const pages = cfg.pages && cfg.pages.length ? cfg.pages : null; let idx = 0;
      const bx = 220, by = 110, bw = 1480, bh = 640, water = cfg.tone === 'water';
      const dim = s.add.rectangle(0, 0, G.W, G.H, 0x000000, 0.45).setOrigin(0).setInteractive().setDepth(600);
      const panel = G.panel(s, bx, by, bw, bh, { fill: water ? '#0e5a78' : C.paper, border: water ? '#7fe8ff' : C.gold, rivets: true }).setDepth(601);
      const head = G.txt(s, bx + bw / 2, by - 30, cfg.heading || '', 44, '#ffffff').setDepth(603);
      const title = G.txt(s, bx + bw / 2, by + 64, '', 56, water ? '#e8fffb' : '#7a1d1d', { sw: water ? 5 : 0 }).setDepth(602);
      const body = G.txt(s, bx + 70, by + 120, '', 40, water ? '#ffffff' : '#2a1a10', { ox: 0, oy: 0, align: 'left', wrap: bw - 140, sw: water ? 4 : 0 }).setDepth(602);
      const ind = G.txt(s, bx + bw / 2, by + bh - 56, '', 40, water ? '#e8fffb' : '#5a3a1a', { sw: 0 }).setDepth(602);
      const back = G.button(s, bx + 190, by + bh - 56, 300, 70, 'QUAY LẠI', function () { go(-1); }, { color: 'blue', size: 38 }).setDepth(603);
      const next = G.button(s, bx + bw - 210, by + bh - 56, 340, 70, 'TIẾP TỤC', function () { go(1); }, { color: 'green', size: 38, blink: true }).setDepth(603);
      this.objs = [dim, panel, head, title, body, ind, back, next];
      function fit(str) { let fs = 42; body.setFontSize(fs); body.setText(str); while (body.height > 410 && fs > 22) { fs -= 2; body.setFontSize(fs); } }
      function render() {
        const p = pages ? pages[idx] : (cfg.warn || { title: 'CHƯA CẤU HÌNH NỘI DUNG', body: 'Người tạo game cần điền nội dung vào file\ncontent/content.js\n(mục pages / presentation của chặng này).\n\nBạn vẫn có thể bấm nút bên dưới để đi tiếp và thử luồng game.' });
        title.setText(p.title || ''); fit(p.body || ''); if (!pages) { title.setColor('#c0392b'); }
        const n = pages ? pages.length : 1; ind.setText(pages ? 'TRANG ' + (idx + 1) + '/' + n : '');
        back.setVisible(true); back.setEnabled(true); // luôn bấm được; ở trang đầu không có trang trước nên không làm gì
        next.setLabel(idx >= n - 1 ? (pages ? (cfg.doneLabel || 'XONG') : 'BỎ QUA & ĐI TIẾP') : 'TIẾP TỤC');
      }
      function go(d) {
        const n = pages ? pages.length : 1; G.audio.sfx('page');
        if (d > 0 && idx >= n - 1) { self.hide(); if (cfg.onDone) cfg.onDone(); return; }
        idx = Math.max(0, Math.min(n - 1, idx + d)); render(); s.tweens.add({ targets: [title, body], alpha: { from: 0.2, to: 1 }, duration: 160 });
      }
      render();
    },
    hide: function () { this.objs.forEach(function (o) { if (o && o.destroy) o.destroy(); }); this.objs = []; },
  };
  // ---------- bảng câu hỏi trắc nghiệm ----------
  G.Quiz = function (scene) { this.scene = scene; this.objs = []; };
  G.Quiz.prototype = {
    show: function (cfg) { // cfg: { title, q, options, answer, onResult(correct), box:{x,y,w,h}, fill, border, okText, badText, zoomCorrect, zoomBtn, dim }
      const s = this.scene, self = this; this.hide();
      const B = cfg.box || {}, bx = B.x || 220, by = B.y || 50, bw = B.w || 1480, bh = B.h || 840;
      const dim = s.add.rectangle(0, 0, G.W, G.H, 0x000000, cfg.dim === undefined ? 0.45 : cfg.dim).setOrigin(0).setInteractive().setDepth(600);
      const panel = G.panel(s, bx, by, bw, bh, { fill: cfg.fill || '#241848', border: cfg.border || C.gold, rivets: true }).setDepth(601);
      const head = G.txt(s, bx + bw / 2, by + 44, cfg.title || 'CÂU HỎI', 46, C.gold, { wrap: bw - 80 }).setDepth(602); while (head.height > 60 && parseInt(head.style.fontSize, 10) > 28) head.setFontSize(parseInt(head.style.fontSize, 10) - 2);
      const q = G.txt(s, bx + 60, by + 96, cfg.q, 42, '#ffffff', { ox: 0, oy: 0, align: 'left', wrap: bw - 120 }).setDepth(602);
      let fs = 42; while (q.height > 150 && fs > 26) { fs -= 2; q.setFontSize(fs); }
      this.objs = [dim, panel, head, q];
      const opts = cfg.options, rows = [], optTexts = []; let sel = -1, locked = false, y = by + 96 + Math.max(q.height, 60) + 24;
      const letters = ['A', 'B', 'C', 'D', 'E'];
      const avail = bh - (y - by) - 100, minRow = Math.min(cfg.rowMax || 100, Math.floor(avail / opts.length) - 10);
      const startFs = minRow < 80 ? 32 : 40;
      opts.forEach(function (o) { optTexts.push(G.txt(s, -bw / 2 + 120, 0, o, startFs, '#ffffff', { ox: 0, wrap: bw - 260, align: 'left', sw: 3 })); });
      // cỡ chữ chung (câu hỏi và mọi đáp án) giảm dần tới khi tất cả vừa khung; đáp án nhiều dòng thì ô của nó cao hơn
      let common = Math.min(parseInt(q.style.fontSize, 10), startFs), rh = [];
      function fitRows(fsz) { optTexts.forEach(function (t) { t.setFontSize(fsz); }); rh = optTexts.map(function (t) { return Math.max(minRow, t.height + 24); }); return rh.reduce(function (a, b) { return a + b; }, 0) + 10 * (opts.length - 1) <= avail; }
      while (common > 22 && !fitRows(common)) common -= 2;
      fitRows(common); q.setFontSize(common);
      opts.forEach(function (o, i) {
        const h = rh[i], row = s.add.container(bx + bw / 2, y + h / 2), g = s.add.graphics();
        const t = optTexts[i];
        const L = G.txt(s, -bw / 2 + 74, 0, letters[i], 46, C.gold);
        row.add([g, L, t]); row.rh = h; row.setSize(bw - 100, h).setDepth(603);
        function paint(state) { // normal | sel | ok | bad
          const hh = row.rh; g.clear(); const col = { normal: 0x3a2d6e, sel: 0x6a50c8, ok: 0x1d7a36, bad: 0x9a2a2a }[state], br = { normal: 0x1b1030, sel: 0xffd84a, ok: 0x7ae09a, bad: 0xff7a7e }[state];
          g.fillStyle(br, 1); g.fillRect(-(bw - 100) / 2, -hh / 2, bw - 100, hh); g.fillStyle(col, 1); g.fillRect(-(bw - 100) / 2 + 5, -hh / 2 + 5, bw - 110, hh - 10);
          if (state === 'sel') { g.fillStyle(0xffffff, 0.12); g.fillRect(-(bw - 100) / 2 + 5, -hh / 2 + 5, bw - 110, 6); }
        }
        paint('normal'); row.paint = paint; rows.push(row);
        row.setInteractive({ useHandCursor: true });
        row.on('pointerup', function () { if (locked) return; sel = i; rows.forEach(function (r, k) { r.paint(k === i ? 'sel' : 'normal'); }); confirm.setEnabled(true); G.audio.sfx('select'); });
        self.objs.push(row); y += h + 10;
      });
      const confirm = G.button(s, bx + bw / 2, by + bh - 50, 520, 72, 'XÁC NHẬN ĐÁP ÁN', function () {
        if (sel < 0 || locked) return; locked = true; confirm.setEnabled(false); const ok = sel === cfg.answer;
        rows[sel].paint(ok ? 'ok' : 'bad'); if (!ok && cfg.answer >= 0 && cfg.reveal) rows[cfg.answer].paint('ok');
        const cy = by + bh / 2 - 20, res = G.txt(s, bx + bw / 2, cy, ok ? (cfg.okText || 'CHÍNH XÁC!') : (cfg.badText || 'CHƯA CHÍNH XÁC!'), 110, ok ? '#7ae09a' : '#ff7a7e', { sw: 10 }).setDepth(700); self.objs.push(res);
        res.setScale(0.3); s.tweens.add({ targets: res, scale: 1, duration: 260, ease: 'Back.easeOut' });
        G.audio.sfx(ok ? 'correct' : 'wrong'); if (ok) G.burst(s, bx + bw / 2, cy, 'spark', 26, { speed: 520, life: 800, scale: 3, depth: 701 });
        if (!ok) s.tweens.add({ targets: rows[sel], x: rows[sel].x + 14, duration: 50, yoyo: true, repeat: 3 });
        if (ok && cfg.zoomCorrect) { // phương án sai tan thành hạt tuyết, đáp án đúng phóng to ra giữa
          s.time.delayedCall(800, function () {
            s.tweens.add({ targets: res, alpha: 0, duration: 300 }); q.setVisible(false); confirm.setVisible(false);
            rows.forEach(function (r, k) { if (k !== sel) { G.burst(s, r.x, r.y, cfg.zoomParticle || 'snow', 18, { speed: 220, life: 900, scale: 5, depth: 700 }); s.tweens.add({ targets: r, alpha: 0, duration: 400 }); } else r.setVisible(false); });
            const zw = bw - 120, zg = s.add.graphics().setDepth(702), zt = G.txt(s, bx + bw / 2, by + bh / 2 - 30, opts[sel], 54, '#ffffff', { wrap: zw - 80, sw: 5 }).setDepth(703);
            let zf = 54; while (zt.height > bh - 300 && zf > 30) { zf -= 2; zt.setFontSize(zf); }
            const zh = zt.height + 90; zg.fillStyle(0xffffff, 1); zg.fillRect(-zw / 2 - 6, -zh / 2 - 6, zw + 12, zh + 12); zg.fillStyle(0x1d7a36, 1); zg.fillRect(-zw / 2, -zh / 2, zw, zh); zg.setPosition(bx + bw / 2, by + bh / 2 - 30);
            [zg, zt].forEach(function (o) { o.setScale(0.6); o.alpha = 0; s.tweens.add({ targets: o, scale: 1, alpha: 1, duration: 600, ease: 'Back.easeOut' }); });
            self.objs.push(zg, zt);
            const nb = G.button(s, bx + bw / 2 + 150, by + bh - 60, 480, 76, cfg.zoomBtn || 'TIẾP THEO', function () { nb.setEnabled(false); if (cfg.onResult) cfg.onResult(true); }, { color: 'green', blink: true, size: 42 }).setDepth(704); self.objs.push(nb);
            // QUAY LẠI: trở về bảng chọn đáp án (giữ phương án đã chọn, xác nhận lại được)
            const bk = G.button(s, bx + bw / 2 - 330, by + bh - 60, 400, 76, 'QUAY LẠI', function () {
              bk.setEnabled(false); [zg, zt, nb, bk, res].forEach(function (o) { if (o && o.destroy) o.destroy(); });
              rows.forEach(function (r, k) { r.setVisible(true); r.setAlpha(1); r.paint(k === sel ? 'sel' : 'normal'); });
              q.setVisible(true); confirm.setVisible(true); confirm.setEnabled(true); locked = false;
            }, { color: 'blue', size: 40 }).setDepth(704); self.objs.push(bk);
          });
          return;
        }
        s.time.delayedCall(ok ? 1100 : 950, function () { if (cfg.onResult) cfg.onResult(ok); });
      }, { color: 'gold', size: 40 }).setDepth(603);
      confirm.setEnabled(false); this.objs.push(confirm);
    },
    hide: function () { this.objs.forEach(function (o) { if (o && o.destroy) o.destroy(); }); this.objs = []; },
  };
  // ---------- thanh trạng thái: 5 ô bảo vật + 5 trái tim ----------
  G.StatusBar = function (scene, o) {
    o = o || {}; this.scene = scene; const self = this; this.slots = []; this.hearts = []; this.depth = 450;
    for (let i = 0; i < 5; i++) {
      const x = 80 + i * 108, y = 78, g = scene.add.graphics().setDepth(450);
      g.fillStyle(0x1b1030, 1); g.fillCircle(x, y, 50); g.fillStyle(0xffd84a, 1); g.fillCircle(x, y, 46); g.fillStyle(0x241848, 1); g.fillCircle(x, y, 40);
      const icon = scene.add.image(x, y, 'tr_' + i).setScale(2.2).setDepth(451).setVisible(false);
      const num = G.txt(scene, x, y, String(i + 1), 38, '#6a60a8', { sw: 0 }).setDepth(451);
      this.slots.push({ x: x, y: y, g: g, icon: icon, num: num, has: false });
    }
    for (let i = 0; i < 5; i++) { this.hearts.push(scene.add.image(G.W - 60 - (4 - i) * 66, 70, 'ic_heart').setScale(7).setDepth(450)); }
    if (o.noHp) this.hearts.forEach(function (h) { h.setVisible(false); });
    this.refresh();
  };
  G.StatusBar.prototype = {
    refresh: function () { const st = G.state.data, self = this; this.slots.forEach(function (sl, i) { const has = !!st.treasures[i]; sl.has = has; sl.icon.setVisible(has); sl.num.setVisible(!has); if (has) { self.scene.tweens.add({ targets: sl.icon, scale: { from: 2.2, to: 2.45 }, duration: 700, yoyo: true, repeat: -1 }); } }); this.setHp(G.state.hp); },
    setHp: function (n, hurt) { this.hearts.forEach(function (h, i) { h.setTexture(i < n ? 'ic_heart' : 'ic_heart_g'); }); if (hurt && this.hearts[n]) { const h = this.hearts[n], sc = this.scene; sc.tweens.add({ targets: h, scale: { from: 11, to: 7 }, angle: { from: 25, to: 0 }, duration: 350, ease: 'Back.easeOut' }); } },
    slotPos: function (i) { return { x: this.slots[i].x, y: this.slots[i].y }; },
    raise: function (d) { this.slots.forEach(function (sl) { sl.g.setDepth(d); sl.icon.setDepth(d + 1); sl.num.setDepth(d + 1); if (sl.zone) sl.zone.setDepth(d + 2); }); },
    onSlot: function (cb) { const sc = this.scene; this.slots.forEach(function (sl, i) { sl.zone = sc.add.zone(sl.x, sl.y, 104, 104).setInteractive({ useHandCursor: true }).setDepth(453); sl.zone.on('pointerup', function () { cb(i); }); }); },
    setUsed: function (i, used) { // Boss: bảo vật đã dùng → ô xám, biểu tượng biến mất
      const sl = this.slots[i]; sl.used = used; this.scene.tweens.killTweensOf(sl.icon); sl.icon.setScale(2.2); sl.icon.setVisible(!used && sl.has); sl.g.clear();
      sl.g.fillStyle(0x1b1030, 1); sl.g.fillCircle(sl.x, sl.y, 50); sl.g.fillStyle(used ? 0x6b6880 : 0xffd84a, 1); sl.g.fillCircle(sl.x, sl.y, 46); sl.g.fillStyle(used ? 0x3a3850 : 0x241848, 1); sl.g.fillCircle(sl.x, sl.y, 40);
      if (!used && sl.has) this.scene.tweens.add({ targets: sl.icon, scale: { from: 2.2, to: 2.6 }, duration: 600, yoyo: true, repeat: -1 });
    },
    glowAll: function () { const sc = this.scene; this.slots.forEach(function (sl, i) { sc.time.delayedCall(i * 140, function () { G.burst(sc, sl.x, sl.y, 'spark', 16, { speed: 300, life: 700, scale: 3, depth: 460 }); sc.tweens.add({ targets: sl.icon, scale: 3.4, duration: 200, yoyo: true }); }); }); },
    setTreasure: function (i) { const sl = this.slots[i]; sl.has = true; sl.icon.setVisible(true); sl.num.setVisible(false); sl.icon.setScale(3.4); this.scene.tweens.add({ targets: sl.icon, scale: 2.2, duration: 400, ease: 'Back.easeOut' }); G.burst(this.scene, sl.x, sl.y, 'spark', 14, { speed: 260, life: 600, scale: 2, depth: 455 }); this.scene.tweens.add({ targets: sl.icon, scale: { from: 2.2, to: 2.45 }, duration: 700, yoyo: true, repeat: -1, delay: 450 }); },
  };
  // ---------- hạt (burst) tự viết, độc lập phiên bản Phaser ----------
  G.burst = function (scene, x, y, key, n, o) {
    o = o || {};
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, sp = (o.speed || 300) * (0.4 + Math.random() * 0.6), life = (o.life || 700) * (0.6 + Math.random() * 0.6);
      const p = scene.add.image(x, y, key).setScale(o.scale || 2).setDepth(o.depth || 800); if (o.tint) p.setTint(o.tint);
      scene.tweens.add({ targets: p, x: x + Math.cos(a) * sp, y: y + Math.sin(a) * sp + (o.gravity || 0), alpha: 0, scale: 0.4, angle: Math.random() * 360, duration: life, ease: 'Quad.easeOut', onComplete: function () { p.destroy(); } });
    }
  };
  // ---------- chuyển cảnh kiểu pixel ----------
  const CELL = 80, COLS = G.W / CELL, ROWS = Math.ceil(G.H / CELL);
  G.cover = function (scene, toOpaque, onDone) {
    const cells = []; let max = 0;
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      const rc = scene.add.rectangle(c * CELL, r * CELL, CELL + 1, CELL + 1, 0x0b0820).setOrigin(0).setDepth(2000).setAlpha(toOpaque ? 0 : 1);
      const delay = (c + r) * 14 + Math.random() * 160; max = Math.max(max, delay + 160); cells.push(rc);
      scene.tweens.add({ targets: rc, alpha: toOpaque ? 1 : 0, duration: 150, delay: delay });
    }
    scene.time.delayedCall(max + 40, function () { if (!toOpaque) cells.forEach(function (rc) { rc.destroy(); }); if (onDone) onDone(); });
  };
  G.fadeIn = function (scene) { G.cover(scene, false); };
  G.go = function (scene, key, data) { if (scene._leaving) return; scene._leaving = true; G.cover(scene, true, function () { scene.scene.start(key, data); }); };
  // ---------- hiệu ứng dịch chuyển (chùm sáng) ----------
  G.beam = function (scene, x, groundY, color, onDone) {
    G.audio.sfx('teleport'); const col = G.num(color || '#ffd84a');
    const b = scene.add.rectangle(x, 0, 150, groundY, col, 1).setAlpha(0).setOrigin(0.5, 0).setDepth(300);
    scene.tweens.add({ targets: b, alpha: 0.65, duration: 400 });
    for (let i = 0; i < 40; i++) { const p = scene.add.image(x + (Math.random() - 0.5) * 140, groundY + 10, 'spark').setTint(col).setScale(2.4).setDepth(301); scene.tweens.add({ targets: p, y: groundY - 300 - Math.random() * 200, alpha: 0, duration: 900 + Math.random() * 500, delay: Math.random() * 600, onComplete: function () { p.destroy(); } }); }
    scene.time.delayedCall(900, function () { scene.tweens.add({ targets: b, alpha: 0, duration: 400, onComplete: function () { b.destroy(); if (onDone) onDone(); } }); });
  };
  // ---------- hiệu ứng nền (ambient) ----------
  G.ambient = function (scene, kind) {
    const W = G.W;
    if (kind === 'clouds') { for (let i = 0; i < 5; i++) { const c = scene.add.image(Math.random() * W, 60 + Math.random() * 280, 'cloud').setScale(4 + Math.random() * 3).setAlpha(0.9).setDepth(2); scene.tweens.add({ targets: c, x: W + 300, duration: 60000 + Math.random() * 40000, repeat: -1, onRepeat: function () { c.x = -300; } }); } return; }
    const cfg = { leaves: ['leaf', 18, 5], flies: ['fly', 24, 2.5], drops: ['drop', 20, 3], dust: ['dust', 40, 3], embers: ['ember', 30, 3], pages: ['page', 8, 3], snow: ['snow', 60, 4] }[kind]; if (!cfg) return;
    for (let i = 0; i < cfg[1]; i++) {
      const p = scene.add.image(Math.random() * W, Math.random() * 760, cfg[0]).setScale(cfg[2]).setDepth(5).setAlpha(0.8);
      const falling = kind === 'leaves' || kind === 'drops' || kind === 'pages' || kind === 'snow', rising = kind === 'embers';
      scene.tweens.add({ targets: p, y: falling ? 780 : (rising ? -20 : p.y + (Math.random() - 0.5) * 120), x: p.x + (Math.random() - 0.5) * 200, angle: falling ? 360 : 0, alpha: kind === 'flies' || kind === 'dust' ? { from: 0.2, to: 1 } : 0.8, duration: 4000 + Math.random() * 5000, yoyo: !falling && !rising, repeat: -1, delay: Math.random() * 3000, onRepeat: function () { if (falling) { p.y = -20; p.x = Math.random() * W; } if (rising) { p.y = 780; p.x = Math.random() * W; } } });
    }
  };
  G.bg = function (scene, key) { return scene.add.image(0, 0, 'bg_' + key).setOrigin(0).setScale(4).setDepth(0); };
})();
