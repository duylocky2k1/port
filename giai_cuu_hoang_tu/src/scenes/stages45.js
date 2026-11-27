// Chặng 4 – Mê Cung Suy Luận (3 cánh cửa) và Chặng 5 – Đỉnh Núi Chân Lý (2 bông tuyết) theo kịch bản Bước 8, 9.
(function () {
  const C = G.C, CT = function () { return window.GAME_CONTENT; }, L4 = ['A', 'B', 'C', 'D', 'E', 'F'];

  // ---------- tiện ích dùng chung ----------
  function walk(s, obj, x, cb) { const d = Math.abs(obj.x - x); if (d < 4) { if (cb) cb(); return; } s.tweens.add({ targets: obj, x: x, duration: Math.max(500, d * 2.2), ease: 'Sine.easeInOut', onComplete: cb }); s.tweens.add({ targets: obj, y: obj.y - 10, duration: 160, yoyo: true, repeat: Math.max(1, Math.round(d / 120)) }); }
  function fog(s, x, y, n) { for (let i = 0; i < (n || 16); i++) { const f = s.add.image(x + (Math.random() - 0.5) * 220, y + (Math.random() - 0.5) * 120, 'fog').setScale(6 + Math.random() * 6).setDepth(25).setAlpha(0); s.tweens.add({ targets: f, alpha: { from: 0.9, to: 0 }, x: f.x + (Math.random() - 0.5) * 160, duration: 1400 + Math.random() * 800, delay: Math.random() * 300, onComplete: function () { f.destroy(); } }); } }
  function pointer(s, x, y) { const g = s.add.graphics().setDepth(40); g.fillStyle(0x1b1030, 1); g.fillTriangle(-26, -18, 26, -18, 0, 20); g.fillStyle(0xffd84a, 1); g.fillTriangle(-18, -13, 18, -13, 0, 12); g.setPosition(x, y); s.tweens.add({ targets: g, y: y + 18, duration: 420, yoyo: true, repeat: -1 }); return g; }
  function nod(s, npc) { s.tweens.add({ targets: npc, scaleY: npc.scaleY * 0.93, duration: 140, yoyo: true, repeat: 1 }); }
  function shakeHead(s, npc) { const x = npc.x; s.tweens.add({ targets: npc, x: x + 14, duration: 70, yoyo: true, repeat: 3, onComplete: function () { npc.x = x; } }); }
  function hurt(s, ctx) { G.state.hp--; ctx.bar.setHp(G.state.hp, true); G.audio.sfx('hurt'); ctx.player.sad(); s.cameras.main.shake(220, 0.007); if (G.state.hp <= 0) { s.time.delayedCall(800, function () { G.go(s, 'GameOver', { retry: s.scene.key }); }); return true; } return false; }
  function bigText(s, str, col, y) { const t = G.txt(s, G.W / 2, y || 360, str, 96, col || C.gold, { sw: 10, wrap: 1700 }).setDepth(700); t.setScale(0.3); s.tweens.add({ targets: t, scale: 1, duration: 320, ease: 'Back.easeOut' }); s.tweens.add({ targets: t, alpha: 0, delay: 1500, duration: 400, onComplete: function () { t.destroy(); } }); }
  function flash(s, col, cb) { const r = s.add.rectangle(0, 0, G.W, G.H, col, 1).setAlpha(0).setOrigin(0).setDepth(1500); s.tweens.add({ targets: r, alpha: 0.95, duration: 380, yoyo: true, hold: 160, onYoyo: function () { if (cb) cb(); }, onComplete: function () { r.destroy(); } }); }
  function warnSlide(title, body) { return { title: title, titleColor: '#c0392b', body: body }; }

  // ---------- bảng chọn 1 trong 3 danh sách (Cửa 2, Cửa 3) ----------
  function listPick(s, cfg, done) {
    const objs = [], X = 60, Y = 24, W = 1800, Hh = 960;
    const dim = s.add.rectangle(0, 0, G.W, G.H, 0x000000, 0.55).setOrigin(0).setInteractive().setDepth(600); objs.push(dim);
    objs.push(G.panel(s, X, Y, W, Hh, { fill: '#241848', border: C.gold, rivets: true }).setDepth(601));
    objs.push(G.txt(s, G.W / 2, Y + 56, cfg.title, 56, C.gold, { sw: 6 }).setDepth(602));
    const q = G.txt(s, G.W / 2, Y + 130, cfg.q, 40, '#ffffff', { wrap: W - 140, sw: 4 }).setDepth(602); objs.push(q);
    const bw = (W - 80 - 2 * 30) / 3, by = Y + 190, bh = Hh - 190 - 120; let sel = -1, locked = false; const boards = [];
    cfg.lists.forEach(function (items, i) {
      const x = X + 40 + i * (bw + 30), g = s.add.graphics().setDepth(602), L = s.add.container(0, 0).setDepth(603); objs.push(g, L);
      const head = G.txt(s, x + bw / 2, by + 40, 'DANH SÁCH ' + (i + 1), 40, '#1b1030', { sw: 0 }); L.add(head);
      const body = G.txt(s, x + 24, by + 84, items.map(function (t) { return '• ' + t; }).join('\n'), 30, '#1b1030', { ox: 0, oy: 0, wrap: bw - 48, align: 'left', sw: 0, ls: 4 }); L.add(body);
      let fs = 30; while (body.height > bh - 104 && fs > 18) { fs -= 1; body.setFontSize(fs); }
      function paint(st) { const br = { normal: 0x1b1030, sel: 0xffd84a, ok: 0x7ae09a, bad: 0xff7a7e }[st], fl = { normal: 0xfff3c4, sel: 0xfff3c4, ok: 0xc8f5d0, bad: 0xffc8c8 }[st]; g.clear(); g.fillStyle(br, 1); g.fillRect(x - 6, by - 6, bw + 12, bh + 12); g.fillStyle(fl, 1); g.fillRect(x, by, bw, bh); g.fillStyle(st === 'sel' ? 0xffd84a : 0xc9a96a, 1); g.fillRect(x, by, bw, 76); }
      paint('normal'); const zone = s.add.zone(x, by, bw, bh).setOrigin(0).setInteractive({ useHandCursor: true }).setDepth(604); objs.push(zone);
      zone.on('pointerup', function () { if (locked) return; sel = i; boards.forEach(function (b, k) { b.paint(k === i ? 'sel' : 'normal'); }); ok.setEnabled(true); G.audio.sfx('select'); });
      boards.push({ paint: paint, L: L });
    });
    const ok = G.button(s, G.W / 2, Y + Hh - 62, 560, 80, 'XÁC NHẬN ĐÁP ÁN', function () {
      if (sel < 0 || locked) return; locked = true; ok.setEnabled(false); const right = sel === cfg.answer;
      boards[sel].paint(right ? 'ok' : 'bad'); G.audio.sfx(right ? 'correct' : 'wrong');
      const res = G.txt(s, G.W / 2, G.H / 2, right ? cfg.okText : cfg.badText, 110, right ? '#7ae09a' : '#ff7a7e', { sw: 10 }).setDepth(700); objs.push(res); res.setScale(0.3); s.tweens.add({ targets: res, scale: 1, duration: 260, ease: 'Back.easeOut' });
      if (!right) s.tweens.add({ targets: boards[sel].L, x: 14, duration: 50, yoyo: true, repeat: 3 });
      s.time.delayedCall(right ? 1200 : 1000, function () { objs.forEach(function (o) { if (o && o.destroy) o.destroy(); }); ok.destroy(); done(right); });
    }, { color: 'gold', size: 42 }).setDepth(605); ok.setEnabled(false);
  }

  // =====================================================================
  class Stage4Maze extends Phaser.Scene {
    constructor() { super('Stage4Maze'); }
    create() {
      const s = this, c = CT().stage4, DX = [560, 1060, 1580], DS = [4, 4, 4.8];
      const ctx = G.stageSetup(s, { no: 3, key: 'stage4', bg: 'maze', music: 'maze', npc: 'gatekeeper', npcX: DX[0] + 200, npcScale: 4.2, ambient: ['dust'], treasure: 3 });
      ctx.name = c.npc; const gy = ctx.gy, npc = ctx.npc, pl = ctx.player; npc.alpha = 0; pl.alpha = 0; pl.x = 230;
      // tiêu đề + thanh tiến độ 3 cánh cửa
      G.txt(s, G.W / 2, 52, c.title, 60, C.gold, { sw: 8 }).setDepth(450);
      const prog = c.doors.map(function (d, k) { const x = G.W / 2 - 110 + k * 110; return { im: s.add.image(x, 150, 'door').setScale(1.15).setDepth(450).setTint(0x8888aa), ck: s.add.image(x + 26, 166, 'ic_check').setScale(3).setDepth(451).setVisible(false) }; });
      // ba cánh cửa
      const doors = c.doors.map(function (d, k) {
        const sc = DS[k], im = s.add.image(DX[k], gy + 6, 'door').setOrigin(0.5, 1).setScale(sc).setDepth(8);
        const sym = s.add.image(DX[k], gy + 6 - (72 - 18) * sc, 'sym_' + d.symbol).setScale(sc * 0.8).setDepth(9).setTint(0x77778a).setAlpha(0.35);
        return { im: im, sym: sym, sc: sc };
      });
      function glowDoor(k, on) { const d = doors[k]; s.tweens.killTweensOf(d.sym); d.sym.setAlpha(on ? 1 : 0.35); if (on) { d.sym.setTint(0xffd84a); s.tweens.add({ targets: d.sym, scale: d.sc * 0.95, duration: 500, yoyo: true, repeat: -1 }); prog[k].im.setTint(0xffe9a8); } }
      function openDoor(k, cb) {
        const d = doors[k]; s.tweens.killTweensOf(d.sym); d.sym.setTint(0xffd84a).setScale(d.sc * 1.1); G.burst(s, d.sym.x, d.sym.y, 'spark', 20, { speed: 300, life: 700, scale: 3, depth: 30 });
        s.tweens.add({ targets: d.im, x: d.im.x + 6, duration: 60, yoyo: true, repeat: 5, onComplete: function () {
          d.im.setTexture('door_open'); d.sym.setVisible(false); G.audio.sfx('treasure'); G.burst(s, d.im.x, gy - 150, 'spark', 30, { speed: 420, life: 900, scale: 3, depth: 30 });
          prog[k].im.clearTint(); prog[k].ck.setVisible(true); s.tweens.add({ targets: prog[k].ck, scale: { from: 6, to: 3 }, duration: 300 }); s.time.delayedCall(700, cb);
        } });
      }
      function ask(k, onRight) {
        const d = c.doors[k], ok = c.okText, bad = c.badText;
        function retryOr(cbAgain) { npc.talk(false); shakeHead(s, npc); s.tweens.add({ targets: doors[k].im, x: doors[k].im.x + 18, duration: 45, yoyo: true, repeat: 5 }); if (hurt(s, ctx)) return; s.time.delayedCall(600, cbAgain); }
        if (d.kind === 'options') {
          const opts = d.options || [];
          if (opts.length < 2) { // [PLACEHOLDER] chưa đủ phương án: trình bày nội dung đúng + cảnh báo
            const sl = opts.map(function (o, i) { return o.slide || { title: 'PHƯƠNG ÁN ' + L4[i], body: o.text || o.label }; });
            sl.push(warnSlide('CHƯA CẤU HÌNH ĐỦ PHƯƠNG ÁN', 'Cửa này cần ít nhất 2 phương án để người chơi lựa chọn.\nNgười tạo game cần điền thêm phương án vào content/content.js (stage4.doors[' + k + '].options).\n\nBấm nút bên dưới để bỏ qua và mở cửa.'));
            ctx.slides.show({ slides: sl, heading: d.name, doneLabel: 'BỎ QUA & MỞ CỬA', color: '#5a4ab0', onDone: onRight }); return;
          }
          const pick = function () { ctx.quiz.show({ title: d.name, q: d.q, options: opts.map(function (o) { return o.label; }), answer: d.answer, okText: ok, badText: bad, onResult: function (r) { ctx.quiz.hide(); if (r) onRight(); else retryOr(pick); } }); };
          // một slide chứa đủ các phương án dạng thẻ A–D (như slide CÂU 5-2 trong case study), rồi mới hiện bảng chọn đáp án
          ctx.slides.show({ slides: [{ tag: 'CÂU 5-2', title: d.cardTitle || d.name.split('–').pop().trim(), lead: 'Chọn đáp án đúng', blocks: [{ type: 'cards', items: opts.map(function (o, i) { return { head: L4[i], body: o.label }; }) }] }], heading: d.name, doneLabel: 'CHỌN ĐÁP ÁN', color: '#5a4ab0', onDone: pick });
        } else {
          const lists = d.lists || [], full = lists.filter(function (l) { return l && l.length; }).length;
          if (full < 3) {
            const right = lists[d.answer] || [];
            ctx.slides.show({ heading: d.name, doneLabel: 'BỎ QUA & MỞ CỬA', color: '#5a4ab0', onDone: onRight, slides: [
              { title: d.name.split('–').pop().trim(), lead: d.q, blocks: [{ type: 'list', cols: 2, items: right }] },
              warnSlide('CHƯA CẤU HÌNH ĐỦ 3 DANH SÁCH', 'Cửa này cần đúng 3 danh sách (1 đúng, 2 sai) để người chơi lựa chọn.\nNgười tạo game cần điền vào content/content.js (stage4.doors[' + k + '].lists).\n\nBấm nút bên dưới để bỏ qua và mở cửa.')] });
            return;
          }
          const go = function () { listPick(s, { title: d.name, q: d.q, lists: lists, answer: d.answer, okText: ok, badText: bad }, function (r) { if (r) onRight(); else retryOr(go); }); };
          go();
        }
      }
      function doDoor(k) {
        if (k >= doors.length) return vault();
        glowDoor(k, true); const ptr = pointer(s, DX[k], gy - 72 * DS[k] - 40);
        const z = s.add.zone(DX[k], gy - 36 * DS[k], 48 * DS[k], 72 * DS[k]).setInteractive({ useHandCursor: true }).setDepth(30);
        z.once('pointerup', function () {
          z.destroy(); ptr.destroy(); G.audio.sfx('select'); s.tweens.add({ targets: npc, y: npc.y - 24, duration: 200, yoyo: true });
          ctx.dlg.say(c.npc, [c.doors[k].q], function () {
            ask(k, function () {
              nod(s, npc); pl.cheer();
              openDoor(k, function () {
                const d = c.doors[k], next = function () {
                  walk(s, pl, DX[k], function () {
                    if (k + 1 < doors.length) { // Người Canh Cửa dịch chuyển tới cửa tiếp theo
                      fog(s, npc.x, gy - 150); s.tweens.add({ targets: npc, alpha: 0, duration: 300, onComplete: function () { npc.x = DX[k + 1] + 210; fog(s, npc.x, gy - 150); s.tweens.add({ targets: npc, alpha: 1, duration: 400 }); } });
                      walk(s, pl, DX[k + 1] - 250, function () { doDoor(k + 1); });
                    } else doDoor(k + 1);
                  });
                };
                const expl = d.explain || (d.options && d.options[d.answer] && d.options[d.answer].slide ? [d.options[d.answer].slide] : null);
                if (expl && expl.length) ctx.slides.show({ slides: expl, doneLabel: 'TIẾP TỤC', color: '#5a4ab0', onDone: next }); else next();
              });
            });
          }, npc);
        });
      }
      function vault() { // căn phòng cất giữ La Bàn Suy Luận
        flash(s, 0x0b0820, function () {
          s.add.image(0, 0, 'bg_vault').setOrigin(0).setScale(4).setDepth(1); doors.forEach(function (d) { d.im.setVisible(false); d.sym.setVisible(false); });
          pl.x = 520; npc.x = 1460; npc.alpha = 1;
        });
        s.time.delayedCall(900, function () {
          const cp = s.add.image(960, 520, 'tr_3').setScale(5).setDepth(15); s.tweens.add({ targets: cp, y: 500, duration: 800, yoyo: true, repeat: -1 });
          ctx.dlg.say(c.npc, c.vault, function () {
            s.tweens.add({ targets: npc, y: npc.y - 30, duration: 300, yoyo: true }); G.burst(s, 960, 560, 'spark', 26, { speed: 300, life: 900, scale: 3 });
            s.tweens.killTweensOf(cp); s.tweens.add({ targets: cp, y: 380, angle: 1080, duration: 1400, ease: 'Cubic.easeOut', onComplete: function () { cp.destroy(); G.ceremony(s, 3, function () { ctx.dlg.say(c.npc, c.outro, function () { fog(s, npc.x, gy - 150, 24); s.tweens.add({ targets: npc, alpha: 0, duration: 900 }); prog.forEach(function (p) { G.burst(s, p.im.x, p.im.y, 'spark', 10, { speed: 200, life: 600, scale: 2, depth: 460 }); }); s.time.delayedCall(900, function () { G.stageComplete(s, 3, 3); }); }, npc); }); } });
          }, npc);
        });
      }
      G.seq([
        function (n) { // vòng phép tím + dấu hỏi, mảnh ghép bay quanh
          const ring = s.add.ellipse(pl.x, gy + 4, 220, 50).setStrokeStyle(8, 0xb98aff).setDepth(18); s.tweens.add({ targets: ring, scaleX: 1.3, alpha: 0, duration: 1800, onComplete: function () { ring.destroy(); } });
          for (let i = 0; i < 14; i++) { const p = s.add.image(pl.x, gy - 120, i % 2 ? 'piece' : 'ic_q').setScale(4).setDepth(19); const o = { a: i * 0.45 }; s.tweens.add({ targets: o, a: o.a + 7, duration: 1500, onUpdate: function () { p.x = pl.x + Math.cos(o.a) * 150; p.y = gy - 130 + Math.sin(o.a) * 60; }, onComplete: function () { p.destroy(); } }); }
          G.beam(s, pl.x, gy, '#b98aff', n); s.time.delayedCall(500, function () { pl.alpha = 1; });
        },
        function (n) { fog(s, npc.x, gy - 160, 26); s.tweens.add({ targets: npc, alpha: 1, duration: 1200, delay: 300, onComplete: n }); },
        function (n) { ctx.dlg.say(c.npc, c.greeting, n, npc); },
        function (n) { // giơ quyền trượng → 3 biểu tượng cửa phát sáng, chỉ Cửa 1 sáng tiếp
          s.tweens.add({ targets: npc, y: npc.y - 30, duration: 260, yoyo: true }); G.audio.sfx('teleport');
          doors.forEach(function (d, k) { s.time.delayedCall(200 + k * 250, function () { d.sym.setAlpha(1).setTint(0xffd84a); G.burst(s, d.sym.x, d.sym.y, 'spark', 12, { speed: 200, life: 600, scale: 3, depth: 30 }); }); });
          s.time.delayedCall(1300, function () { doors.forEach(function (d, k) { if (k) d.sym.setTint(0x77778a).setAlpha(0.35); }); glowDoor(0, true);
            const b = G.button(s, G.W / 2, 880, 560, 96, c.startBtn, function () { b.destroy(); n(); }, { color: 'green', blink: true, size: 50 }).setDepth(520); });
        },
        function (n) { walk(s, pl, DX[0] - 250, n); },
        function () { doDoor(0); },
      ]);
    }
  }

  // =====================================================================
  class Stage5Summit extends Phaser.Scene {
    constructor() { super('Stage5Summit'); }
    create() {
      const s = this, c = CT().stage5, FX = [820, 1130], FY = [440, 360];
      const ctx = G.stageSetup(s, { no: 4, key: 'stage5', bg: 'snow', music: 'summit', npc: 'snowsage', npcX: 1560, npcScale: 4.8, ambient: ['snow'], treasure: 4, groundY: 760 });
      ctx.name = c.npc; const gy = ctx.gy, npc = ctx.npc, pl = ctx.player; npc.alpha = 0; pl.alpha = 0; pl.x = 300;
      npc.idleTween.stop(); npc.y = gy - 70; const baseY = npc.y;
      s.tweens.add({ targets: npc, y: baseY - 16, angle: { from: -3, to: 3 }, duration: 1600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      const pedestal = s.add.ellipse(npc.x, gy + 4, 260, 46, 0x9fe8ff, 0.55).setDepth(18).setAlpha(0);
      // tiêu đề + tiến độ 2 bông tuyết
      G.txt(s, G.W / 2, 52, c.title, 60, '#e8f8ff', { sw: 8 }).setDepth(450);
      const prog = c.flakes.map(function (f, k) { const x = G.W / 2 - 60 + k * 120; return { im: s.add.image(x, 150, 'flake').setScale(2.2).setDepth(450).setTint(k ? 0x777788 : 0x9fe8ff), lk: s.add.image(x + 22, 168, 'ic_lock').setScale(2.6).setDepth(451).setVisible(!!k), ck: s.add.image(x + 24, 168, 'ic_check').setScale(3).setDepth(451).setVisible(false) }; });
      const flakes = c.flakes.map(function (f, k) { const im = s.add.image(FX[k], FY[k], 'flake').setScale(6).setDepth(10).setAlpha(0); s.tweens.add({ targets: im, angle: 360, duration: 12000, repeat: -1 }); return im; });
      const lock2 = s.add.image(FX[1], FY[1], 'ic_lock').setScale(6).setDepth(11).setAlpha(0);
      function setFlake(k, st) { const im = flakes[k], p = prog[k]; if (im.pulse) { im.pulse.stop(); im.pulse = null; } im.setScale(6); if (st === 'locked') { im.setTint(0x777788); p.im.setTint(0x777788); } if (st === 'active') { im.setTint(0x9fe8ff); p.im.setTint(0x9fe8ff); p.lk.setVisible(false); if (k === 1) lock2.setVisible(false); im.pulse = s.tweens.add({ targets: im, scale: 6.6, duration: 600, yoyo: true, repeat: -1 }); } if (st === 'done') { im.setTint(0xffd84a); p.im.setTint(0xffd84a); p.ck.setVisible(true); s.tweens.add({ targets: p.ck, scale: { from: 6, to: 3 }, duration: 300 }); G.burst(s, im.x, im.y, 'spark', 24, { speed: 360, life: 800, scale: 3, depth: 30 }); } }
      function gust() { for (let i = 0; i < 40; i++) { const p = s.add.image(npc.x - 100, gy - 100 - Math.random() * 300, 'snow').setScale(5).setDepth(40); s.tweens.add({ targets: p, x: pl.x - 300 - Math.random() * 200, y: p.y + (Math.random() - 0.5) * 120, alpha: 0.2, duration: 700 + Math.random() * 400, delay: Math.random() * 300, onComplete: function () { p.destroy(); } }); } G.audio.sfx('swoosh'); }
      function ask(k, onRight) {
        const f = c.flakes[k];
        const show = function () {
          ctx.quiz.show({ title: f.name, q: f.q, options: f.options, answer: f.answer, okText: c.okText, badText: c.badText, fill: '#16306a', border: '#9fe8ff', zoomCorrect: k === 1, zoomBtn: 'XEM GIẢI THÍCH', zoomParticle: 'snow', onResult: function (r) {
            ctx.quiz.hide();
            if (r) { nod(s, npc); s.tweens.add({ targets: npc, scaleX: npc.scaleX * 1.12, duration: 300, yoyo: true }); ctx.slides.show({ slides: f.explain, doneLabel: f.doneLabel || 'TIẾP TỤC', color: '#5aa8e8', onDone: onRight }); return; }
            shakeHead(s, npc); gust(); if (hurt(s, ctx)) return;
            const b = G.button(s, G.W / 2, 900, 420, 90, 'THỬ LẠI', function () { b.destroy(); show(); }, { color: 'gold', blink: true, size: 50 }).setDepth(520);
          } });
        };
        show();
      }
      function doFlake(k) {
        if (k >= flakes.length) return solved();
        setFlake(k, 'active'); const ptr = pointer(s, FX[k], FY[k] - 130);
        const z = s.add.zone(FX[k], FY[k], 200, 200).setInteractive({ useHandCursor: true }).setDepth(30);
        z.once('pointerup', function () {
          z.destroy(); ptr.destroy(); G.audio.sfx('select');
          ctx.dlg.say(c.npc, [c.flakes[k].q], function () {
            ask(k, function () {
              setFlake(k, 'done'); pl.cheer();
              if (k + 1 < flakes.length) { lock2.setVisible(false); G.burst(s, FX[k + 1], FY[k + 1], 'snow', 30, { speed: 300, life: 800, scale: 4, depth: 30 }); s.tweens.add({ targets: [npc, pedestal], x: FX[k + 1] + 380, duration: 900, ease: 'Sine.easeInOut' }); walk(s, pl, FX[k + 1] - 330, function () { doFlake(k + 1); }); }
              else s.time.delayedCall(700, function () { doFlake(k + 1); });
            });
          }, npc);
        });
      }
      function solved() {
        // hai bông tuyết hội tụ thành ngôi sao sáu cánh; Hiền Triết bay lên xoay một vòng; cổng băng mở
        const star = s.add.image(G.W / 2 + 80, 300, 'flake').setScale(0).setDepth(35).setTint(0xffd84a);
        flakes.forEach(function (f) { for (let i = 0; i < 10; i++) { const p = s.add.image(f.x, f.y, 'spark').setScale(4).setDepth(36); s.tweens.add({ targets: p, x: star.x, y: star.y, duration: 700, delay: i * 70, onComplete: function () { p.destroy(); } }); } });
        G.audio.sfx('treasure'); s.tweens.add({ targets: star, scale: 12, angle: 180, duration: 1400, delay: 600, ease: 'Back.easeOut' });
        s.tweens.add({ targets: star, alpha: 0, delay: 2600, duration: 600 });
        const gate = s.add.image(1790, gy + 6, 'door').setOrigin(0.5, 1).setScale(4).setDepth(7).setTint(0xbfefff);
        s.time.delayedCall(2200, function () { s.tweens.add({ targets: npc, y: baseY - 120, duration: 600, yoyo: true, hold: 500 }); s.tweens.add({ targets: npc, scaleX: { from: npc.scaleX, to: -npc.scaleX }, duration: 300, yoyo: true, repeat: 1 }); gate.setTexture('door_open'); G.burst(s, gate.x, gy - 150, 'snow', 30, { speed: 400, life: 900, scale: 4, depth: 30 }); });
        s.time.delayedCall(3600, function () {
          ctx.dlg.say(c.npc, c.solved, function () {
            G.ceremony(s, 4, function () {
              ctx.bar.glowAll(); bigText(s, c.allFive, C.gold, 330); G.audio.sfx('win');
              s.time.delayedCall(2000, function () { // năng lượng 5 bảo vật phá phong ấn
                for (let i = 0; i < 5; i++) { const sp = ctx.bar.slotPos(i), p = s.add.image(sp.x, sp.y, 'spark').setScale(6).setDepth(470); s.tweens.add({ targets: p, x: gate.x, y: gy - 160, duration: 900, delay: i * 140, ease: 'Cubic.easeIn', onComplete: function () { p.destroy(); G.burst(s, gate.x, gy - 160, 'spark', 10, { speed: 300, life: 600, scale: 3, depth: 40 }); } }); }
                s.time.delayedCall(1700, function () { s.cameras.main.shake(400, 0.01); G.audio.sfx('roar'); gate.clearTint();
                  ctx.dlg.say(c.npc, c.outro, function () { s.tweens.add({ targets: [npc, pedestal], alpha: 0, duration: 900 }); G.burst(s, npc.x, npc.y - 150, 'snow', 40, { speed: 400, life: 1000, scale: 4, depth: 30 });
                    s.time.delayedCall(900, function () { G.stageComplete(s, 4, 4, { label: c.nextBtn, extra: c.completeExtra, all: true }); }); }, npc); });
              });
            });
          }, npc);
        });
      }
      G.seq([
        function (n) { // vòng phép xanh băng + bông tuyết bay quanh, màn hình chuyển trắng
          const ring = s.add.ellipse(pl.x, gy + 4, 220, 50).setStrokeStyle(8, 0x9fe8ff).setDepth(18); s.tweens.add({ targets: ring, scaleX: 1.3, alpha: 0, duration: 1800, onComplete: function () { ring.destroy(); } });
          for (let i = 0; i < 14; i++) { const p = s.add.image(pl.x, gy - 120, 'snow').setScale(6).setDepth(19); const o = { a: i * 0.45 }; s.tweens.add({ targets: o, a: o.a + 7, duration: 1500, onUpdate: function () { p.x = pl.x + Math.cos(o.a) * 150; p.y = gy - 130 + Math.sin(o.a) * 60; }, onComplete: function () { p.destroy(); } }); }
          G.beam(s, pl.x, gy, '#e8fbff', function () { flash(s, 0xffffff); s.time.delayedCall(800, n); }); s.time.delayedCall(500, function () { pl.alpha = 1; });
        },
        function (n) { // vòng xoáy tuyết, Hiền Triết hiện ra, hai Bông Tuyết Chân Lý xuất hiện
          G.ambient(s, 'snow'); const sw = s.add.image(npc.x, npc.y - 190, 'flake').setScale(1).setDepth(17).setAlpha(0.8); s.tweens.add({ targets: sw, scale: 14, angle: 720, alpha: 0, duration: 1500, onComplete: function () { sw.destroy(); } });
          G.audio.sfx('teleport'); s.tweens.add({ targets: [npc, pedestal], alpha: 1, duration: 1100, delay: 300 });
          s.tweens.add({ targets: npc, scaleX: npc.scaleX * 1.15, scaleY: npc.scaleY * 1.15, duration: 400, yoyo: true, delay: 1300 });
          s.time.delayedCall(1500, function () { flakes.forEach(function (f, k) { s.tweens.add({ targets: f, alpha: 1, duration: 600, delay: k * 300 }); }); s.tweens.add({ targets: lock2, alpha: 1, duration: 600, delay: 300 }); setFlake(1, 'locked'); });
          s.time.delayedCall(2400, n);
        },
        function (n) { ctx.dlg.say(c.npc, c.greeting, n, npc); },
        function (n) { s.tweens.add({ targets: npc, scaleX: npc.scaleX * 1.12, scaleY: npc.scaleY * 1.12, duration: 300, yoyo: true }); setFlake(0, 'active'); G.burst(s, FX[0], FY[0], 'snow', 24, { speed: 300, life: 800, scale: 4, depth: 30 });
          const b = G.button(s, G.W / 2, 900, 560, 96, c.startBtn, function () { b.destroy(); n(); }, { color: 'green', blink: true, size: 50 }).setDepth(520); },
        function (n) { walk(s, pl, FX[0] - 330, n); },
        function () { doFlake(0); },
      ]);
    }
  }
  G.scenes.push(Stage4Maze, Stage5Summit);
})();
