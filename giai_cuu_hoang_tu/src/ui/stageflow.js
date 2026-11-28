// Khung luồng dùng chung cho các chặng: học → hỏi → bảo vật → hoàn thành
(function () {
  const C = G.C, CT = function () { return window.GAME_CONTENT; };

  // ---- dựng cảnh chung ----
  G.stageSetup = function (scene, cfg) {
    G.state.resetHp(); scene._leaving = false;
    G.bg(scene, cfg.bg); (cfg.ambient || []).forEach(function (a) { G.ambient(scene, a); });
    const gy = cfg.groundY || G.GROUND, st = G.state.data;
    const player = G.makeChar(scene, st.char || 'ngocanh', 440, gy, 4).setDepth(20);
    const npc = cfg.npc ? G.makeNpc(scene, cfg.npc, cfg.npcX, gy, cfg.npcScale || 4).setDepth(19) : null;
    const bar = new G.StatusBar(scene, { noHp: !!cfg.noHp });
    const ctx = { cfg: cfg, gy: gy, player: player, npc: npc, bar: bar, dlg: new G.Dialog(scene), paged: new G.Paged(scene), slides: new G.Slides(scene), quiz: new G.Quiz(scene), name: cfg.npcName };
    scene.ctx = ctx; G.audio.music(cfg.music);
    if (G.DEV) { G.txt(scene, G.W / 2, 24, 'DEV: phím N = bỏ qua chặng', 26, '#ff7a7e').setDepth(950); scene.input.keyboard.on('keydown-N', function () { ctx.dlg.hide(); if (cfg.treasure >= 0) G.state.giveTreasure(cfg.treasure); if (cfg.no < 5) { G.state.complete(cfg.no); G.go(scene, 'MapScene'); } else { G.state.data.bossDone = true; G.state.save(); G.go(scene, 'Victory'); } }); }
    G.fadeIn(scene);
    return ctx;
  };
  // ---- chuỗi bước tuần tự ----
  G.seq = function (steps) { let i = 0; (function next() { if (i < steps.length) steps[i++](next); })(); };

  // ---- bảng thông báo thử thách ----
  G.banner = function (scene, text, btnLabel, cb, color, backCb) { // backCb: nếu có thì hiện nút QUAY LẠI bên trái
    const bx = 330, by = 250, bw = 1260, bh = 330;
    const panel = G.panel(scene, bx, by, bw, bh, { fill: color || '#43260f', border: C.gold, rivets: true }).setDepth(520);
    const t = G.txt(scene, G.W / 2, by + 110, text, 62, C.gold, { wrap: bw - 120, sw: 6 }).setDepth(521);
    const ring = scene.add.image(G.W / 2, by + 110, 'spark').setScale(0).setDepth(519);
    const b = G.button(scene, G.W / 2, by + bh - 76, 480, 84, btnLabel, function () { [panel, t, ring, b, bk].forEach(function (o) { if (o && o.destroy) o.destroy(); }); cb(); }, { color: 'green', blink: true, size: 46 }).setDepth(522);
    const bk = backCb ? G.button(scene, bx + 200, by + bh - 76, 300, 84, 'QUAY LẠI', function () { [panel, t, ring, b, bk].forEach(function (o) { if (o && o.destroy) o.destroy(); }); backCb(); }, { color: 'blue', size: 40 }).setDepth(522) : null;
    panel.setScale(0.6); panel.alpha = 0; scene.tweens.add({ targets: panel, alpha: 1, duration: 160 });
    G.burst(scene, G.W / 2, by + 110, 'spark', 18, { speed: 360, life: 700, scale: 3, depth: 523 }); G.audio.sfx('select');
    t.setAlpha(0); scene.tweens.add({ targets: t, alpha: 1, duration: 300, delay: 120 });
    panel.setScale(1);
  };

  // ---- nhận bảo vật ----
  G.ceremony = function (scene, idx, onDone) {
    const ctx = scene.ctx, T = CT().treasures[idx];
    if (G.state.data.treasures[idx]) { G.toast(scene, 'BẠN ĐÃ CÓ BẢO VẬT NÀY RỒI!', '#2a2060'); scene.time.delayedCall(1200, onDone); return; }
    G.audio.sfx('treasure');
    const cx = G.W / 2, cy = 330, objs = [];
    const dim = scene.add.rectangle(0, 0, G.W, G.H, 0x000000, 0.55).setOrigin(0).setDepth(600); objs.push(dim);
    const ring = scene.add.graphics().setDepth(601); objs.push(ring);
    ring.setPosition(cx, cy).setScale(0); ring.lineStyle(10, 0xffd84a, 1); ring.strokeCircle(0, 0, 190); ring.lineStyle(5, 0xffffff, 0.8); ring.strokeCircle(0, 0, 160);
    scene.tweens.add({ targets: ring, scale: 1, angle: 90, duration: 700, ease: 'Back.easeOut' });
    const it = scene.add.image(cx, cy + 120, 'tr_' + idx).setScale(2).setDepth(602); objs.push(it);
    scene.tweens.add({ targets: it, y: cy, scale: 9, duration: 1100, ease: 'Back.easeOut' });
    scene.tweens.add({ targets: it, angle: { from: -8, to: 8 }, duration: 600, yoyo: true, repeat: -1, delay: 1100 });
    for (let i = 0; i < 6; i++) { const sp = scene.add.image(cx + Math.cos(i) * 230, cy + Math.sin(i) * 230, 'spark').setScale(3).setDepth(603); objs.push(sp); scene.tweens.add({ targets: sp, scale: { from: 1, to: 5 }, alpha: { from: 1, to: 0.2 }, duration: 600, yoyo: true, repeat: -1, delay: i * 120 }); }
    scene.time.delayedCall(1100, function () { G.burst(scene, cx, cy, 'spark', 36, { speed: 520, life: 1000, scale: 3, depth: 604 }); });
    const msg = G.txt(scene, cx, 640, 'CHÚC MỪNG! BẠN ĐÃ NHẬN ĐƯỢC BẢO VẬT ' + T.ordinal + '!', 54, '#ffffff', { sw: 6, wrap: 1500 }).setDepth(605);
    const nm = G.txt(scene, cx, 716, T.name, 74, C.gold, { sw: 8 }).setDepth(605);
    const ds = G.txt(scene, cx, 790, T.desc, 40, C.cream, { wrap: 1300, sw: 4 }).setDepth(605);
    [msg, nm, ds].forEach(function (o) { o.setAlpha(0); scene.tweens.add({ targets: o, alpha: 1, duration: 400, delay: 1200 }); objs.push(o); });
    const btn = G.button(scene, cx, 930, 460, 84, 'NHẬN BẢO VẬT', function () {
      btn.destroy(); [msg, nm, ds, ring, dim].forEach(function (o) { scene.tweens.add({ targets: o, alpha: 0, duration: 300 }); });
      const p = ctx.bar.slotPos(idx); G.audio.sfx('collect');
      scene.tweens.add({ targets: it, x: p.x, y: p.y, scale: 2.2, angle: 0, duration: 900, ease: 'Cubic.easeInOut', onComplete: function () {
        it.destroy(); G.state.giveTreasure(idx); ctx.bar.setTreasure(idx); ctx.player.cheer(); G.audio.sfx('select');
        objs.forEach(function (o) { if (o && o.destroy && o.scene) o.destroy(); }); scene.time.delayedCall(1100, onDone);
      } });
    }, { color: 'gold', blink: true, size: 46 }).setDepth(606);
    btn.setAlpha(0); scene.tweens.add({ targets: btn, alpha: 1, duration: 300, delay: 1500 });
  };

  // ---- màn hoàn thành chặng ----
  G.stageComplete = function (scene, no, idx, o) { // o: { label, extra, all }
    o = o || {}; const ctx = scene.ctx; G.audio.sfx('win'); ctx.player.cheer();
    const t = G.txt(scene, G.W / 2, 230, 'CHẶNG ' + (no + 1) + ' HOÀN THÀNH!', 120, C.gold, { sw: 12 }).setDepth(700);
    t.setScale(0.2); scene.tweens.add({ targets: t, scale: 1, duration: 500, ease: 'Back.easeOut' });
    for (let i = 0; i < 14; i++) { const s = scene.add.image(Math.random() * G.W, -20, 'ic_star').setScale(6 + Math.random() * 4).setDepth(699); scene.tweens.add({ targets: s, y: 800, angle: 360, alpha: 0.3, duration: 2200 + Math.random() * 1800, delay: Math.random() * 1200 }); }
    if (o.extra) G.txt(scene, G.W / 2, 340, o.extra, 64, '#ffffff', { sw: 8 }).setDepth(700);
    if (o.all) { // bảng tổng kết 5 bảo vật
      G.panel(scene, 260, 390, 1400, 240, { fill: '#241848', border: C.gold, rivets: true }).setDepth(699);
      CT().treasures.forEach(function (T, k) { const x = 400 + k * 280, im = scene.add.image(x, 480, 'tr_' + k).setScale(4.4).setDepth(700); G.txt(scene, x, 580, T.name, 26, C.cream, { wrap: 260, sw: 3 }).setDepth(700); scene.tweens.add({ targets: im, y: 470, duration: 600, yoyo: true, repeat: -1, delay: k * 120 }); });
    } else {
      const T = CT().treasures[idx], it = scene.add.image(G.W / 2, 450, 'tr_' + idx).setScale(6).setDepth(700); G.txt(scene, G.W / 2, 560, T.name, 52, '#ffffff', { sw: 6 }).setDepth(700);
      scene.tweens.add({ targets: it, y: 440, duration: 700, yoyo: true, repeat: -1 });
    }
    G.state.complete(no);
    G.button(scene, G.W / 2, 720, 680, 96, o.label || 'TIẾP TỤC HÀNH TRÌNH', function () { G.go(scene, 'MapScene'); }, { color: 'green', blink: true, size: 52 }).setDepth(701);
  };

  // ---- hỏi từng câu (có HP) ----
  G.askQuestions = function (scene, content, hooks, done) {
    const ctx = scene.ctx; const qs = content.questions || []; let i = 0;
    if (!qs.length) { ctx.paged.show({ pages: null, heading: content.quizTitle, warn: { title: 'CHƯA CẤU HÌNH CÂU HỎI', body: 'Người tạo game cần điền câu hỏi vào file content/content.js (mục questions của chặng này).\n\nBấm nút bên dưới để bỏ qua và thử luồng game.' }, onDone: done }); return; }
    function ask() {
      const q = qs[i];
      ctx.quiz.show({ title: content.quizTitle + (qs.length > 1 ? '  (' + (i + 1) + '/' + qs.length + ')' : ''), q: q.q, options: q.options, answer: q.answer, reveal: false, okText: content.okText, badText: content.badText, onResult: function (ok) {
        ctx.quiz.hide();
        if (ok) {
          ctx.player.cheer(); if (hooks && hooks.onCorrect) hooks.onCorrect(i, i === qs.length - 1);
          const after = function () { i++; if (i >= qs.length) { ctx.dlg.say(ctx.name, content.correct, done, ctx.npc); } else { ctx.dlg.say(ctx.name, content.correct.slice(0, 1), ask, ctx.npc); } };
          if (q.explain && q.explain.length) ctx.slides.show({ slides: q.explain, doneLabel: 'TIẾP TỤC', onDone: after }); else after();
        } else {
          G.state.hp--; ctx.bar.setHp(G.state.hp, true); G.audio.sfx('hurt'); ctx.player.sad(); scene.cameras.main.shake(200, 0.006);
          if (G.state.hp <= 0) { scene.time.delayedCall(700, function () { G.go(scene, 'GameOver', { retry: scene.scene.key }); }); return; }
          const lines = content.wrong.slice(); if (q.hint) lines.push('GỢI Ý: ' + q.hint); ctx.dlg.say(ctx.name, lines, ask, ctx.npc);
        }
      } });
    }
    ask();
  };

  // ---- Chặng kiểu "học rồi hỏi" (Chặng 1, 2, 4, 5) ----
  G.runLearnStage = function (scene, cfg) {
    const ctx = G.stageSetup(scene, cfg), c = CT()[cfg.key];
    ctx.name = c.npc;
    // bảng thử thách: QUAY LẠI thì về bản đồ
    const banner = function (n) { G.banner(scene, c.challenge, c.learnBtn, n, cfg.bannerColor, function () { G.go(scene, 'MapScene'); }); };
    // trang giới thiệu: QUAY LẠI ở trang 1 thì về bảng thử thách
    const slidesStep = function (n) {
      ctx.slides.show({ slides: c.pages, heading: c.pageHeading, doneLabel: 'XONG', onDone: n,
        onBack: function () { banner(function () { slidesStep(n); }); },
        warn: { title: 'CHƯA CẤU HÌNH NỘI DUNG BÀI HỌC', body: 'Người tạo game cần điền slide vào file content/content.js (mục pages của chặng này).\n\nBấm nút bên dưới để bỏ qua và thử luồng game.' } });
    };
    G.seq([
      function (n) { ctx.player.alpha = 0; if (ctx.npc) ctx.npc.alpha = 0; G.beam(scene, ctx.player.x, ctx.gy, cfg.beamColor, n); scene.time.delayedCall(500, function () { ctx.player.alpha = 1; if (ctx.npc) ctx.npc.alpha = 1; }); },
      function (n) { if (cfg.onEnter) cfg.onEnter(scene, ctx); ctx.dlg.say(c.npc, c.greeting, n, ctx.npc); },
      banner,
      slidesStep,
      function (n) { ctx.dlg.say(c.npc, c.preQuiz, n, ctx.npc); },
      function (n) { G.banner(scene, c.quizTitle, c.quizBtn, n, '#241848'); },
      function (n) { G.askQuestions(scene, c, cfg.hooks, n); },
      function (n) { G.ceremony(scene, cfg.treasure, n); },
      function (n) { ctx.dlg.say(c.npc, c.outro, n, ctx.npc); },
      function () { G.stageComplete(scene, cfg.no, cfg.treasure); },
    ]);
  };
})();
