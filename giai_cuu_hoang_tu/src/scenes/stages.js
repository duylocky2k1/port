// Chặng 1–5
(function () {
  const C = G.C, CT = function () { return window.GAME_CONTENT; };

  class Stage1Forest extends Phaser.Scene {
    constructor() { super('Stage1Forest'); }
    create() {
      G.runLearnStage(this, { no: 0, key: 'stage1', bg: 'forest', music: 'forest', npc: 'tree', npcX: 1420, npcScale: 4, ambient: ['leaves', 'flies'], treasure: 0, beamColor: '#ffd84a',
        onEnter: function (s, ctx) { // Cây nhắm mắt, ~1s sau mở mắt, lá rơi
          ctx.npc.setTexture('npc_tree_c'); ctx.npc.blinkEv.paused = true;
          s.time.delayedCall(1000, function () { ctx.npc.setTexture('npc_tree_a'); ctx.npc.blinkEv.paused = false; G.burst(s, ctx.npc.x, ctx.npc.y - 400, 'leaf', 12, { speed: 200, life: 1200, scale: 4, gravity: 300 }); });
        } });
    }
  }
  class Stage2Library extends Phaser.Scene {
    constructor() { super('Stage2Library'); }
    create() {
      G.runLearnStage(this, { no: 1, key: 'stage2', bg: 'library', music: 'library', npc: 'librarian', npcX: 1450, npcScale: 5, ambient: ['dust', 'pages'], treasure: 1, beamColor: '#ffd84a',
        onEnter: function (s, ctx) { const x = ctx.npc.x; ctx.npc.x = x + 120; s.tweens.add({ targets: ctx.npc, x: x, duration: 700, ease: 'Sine.easeOut' }); } });
    }
  }
  class Stage4Maze extends Phaser.Scene {
    constructor() { super('Stage4Maze'); }
    create() {
      let gate;
      G.runLearnStage(this, { no: 3, key: 'stage4', bg: 'maze', music: 'maze', npc: 'owl', npcX: 1280, npcScale: 5, ambient: ['dust'], treasure: 3, beamColor: '#7fe8ff', bannerColor: '#241848',
        onEnter: function (s, ctx) { gate = s.add.image(1700, ctx.gy + 6, 'gate').setOrigin(0.5, 1).setScale(5).setDepth(8); },
        hooks: { onCorrect: function (i, last) { const s = gate.scene; gate.setTexture('gate_open'); G.burst(s, gate.x, gate.y - 140, 'spark', 22, { speed: 420, life: 800, scale: 3, depth: 60 }); if (!last) s.time.delayedCall(2600, function () { if (gate.scene) gate.setTexture('gate'); }); } } });
    }
  }
  class Stage5Summit extends Phaser.Scene {
    constructor() { super('Stage5Summit'); }
    create() {
      G.runLearnStage(this, { no: 4, key: 'stage5', bg: 'summit', music: 'summit', npc: 'sage', npcX: 1440, npcScale: 5, ambient: ['clouds'], treasure: 4, beamColor: '#fff3c4', groundY: 700,
        onEnter: function (s, ctx) { s.tweens.add({ targets: ctx.npc, y: ctx.npc.y - 14, duration: 1100, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' }); } });
    }
  }

  // ---------- Chặng 3: Suối Thực Hành (câu hỏi mở, nội dung trình bày cấu hình sẵn, mặc định ĐẠT) ----------
  class Stage3Stream extends Phaser.Scene {
    constructor() { super('Stage3Stream'); }
    create() {
      const s = this, c = CT().stage3;
      const ctx = G.stageSetup(s, { no: 2, key: 'stage3', bg: 'stream', music: 'stream', npc: 'spirit', npcX: 1450, npcScale: 5, ambient: ['drops'], treasure: 2, groundY: 704 });
      ctx.name = c.npc; ctx.npc.alpha = 0; ctx.player.alpha = 0;
      // sóng nước lăn nhẹ
      const wave = s.add.tileSprite(0, 776, G.W / 4, 8, 'wave').setOrigin(0).setScale(4).setDepth(3); s.tweens.add({ targets: wave, tilePositionX: 32, duration: 3200, repeat: -1 });
      // đá cầu (ẩn dưới nước, nổi lên khi hoàn thành)
      const stones = []; for (let i = 0; i < 4; i++) { const st = s.add.image(850 + i * 78, 960, 'stone').setScale(5).setDepth(6).setAlpha(0); stones.push(st); }
      G.seq([
        function (n) { G.beam(s, ctx.player.x, ctx.gy, '#7fe8ff', n); s.time.delayedCall(500, function () { ctx.player.alpha = 1; }); },
        function (n) { // vòng xoáy nước, Tinh Linh xuất hiện
          const sw = s.add.image(ctx.npc.x, 790, 'spark').setTint(0x7fe8ff).setScale(2).setDepth(10); s.tweens.add({ targets: sw, scale: 14, angle: 360, alpha: 0, duration: 1400 });
          G.burst(s, ctx.npc.x, 780, 'drop', 30, { speed: 400, life: 1000, scale: 3, gravity: 200 }); G.audio.sfx('teleport');
          ctx.npc.y = ctx.gy + 120; s.tweens.add({ targets: ctx.npc, alpha: 1, y: ctx.gy, duration: 1000, delay: 300, onComplete: n });
        },
        function (n) { ctx.dlg.say(c.npc, c.greeting, n, ctx.npc); },
        function (n) { ctx.paged.show({ pages: [{ title: c.questionTitle, body: c.question }], heading: '', doneLabel: c.presentBtn, tone: 'water', onDone: n }); },
        function (n) { ctx.paged.show({ pages: c.presentation, heading: 'PHƯƠNG ÁN CỦA NHÓM', doneLabel: 'HOÀN THÀNH TRÌNH BÀY', tone: 'water', onDone: n,
            warn: { title: 'CHƯA CẤU HÌNH PHẦN TRÌNH BÀY', body: 'Người tạo game cần điền nội dung trình bày vào file content/content.js (mục stage3.presentation):\nsản phẩm, ý tưởng chiến dịch, cơ chế tham gia, hoạt động chính, động lực, hiệu quả kỳ vọng.\n\nBấm nút bên dưới để bỏ qua và thử luồng game.' } }); },
        function (n) { // Tinh Linh suy nghĩ → đánh giá mặc định ĐẠT
          ctx.player.talkPose(); const q = [0, 1, 2].map(function (i) { return s.add.image(ctx.npc.x - 60 + i * 60, ctx.gy - 330, 'ic_q').setScale(5).setDepth(30); });
          q.forEach(function (o, i) { s.tweens.add({ targets: o, y: o.y - 20, duration: 400, yoyo: true, repeat: 2, delay: i * 120 }); });
          s.time.delayedCall(1800, function () { q.forEach(function (o) { G.burst(s, o.x, o.y, 'spark', 8, { speed: 160, life: 600, scale: 3 }); o.setTexture('ic_star').setScale(6); }); G.audio.sfx('correct'); });
          s.time.delayedCall(2900, function () { q.forEach(function (o) { o.destroy(); }); n(); });
        },
        function (n) { G.banner(s, c.verdict, 'TIẾP TỤC', n, '#0e5a78'); },
        function (n) { ctx.dlg.say(c.npc, c.praise, n, ctx.npc); },
        function (n) { // cây cầu đá được dựng lại
          G.audio.sfx('swoosh'); stones.forEach(function (st, i) { s.tweens.add({ targets: st, alpha: 1, y: 722, duration: 700, delay: i * 250, ease: 'Back.easeOut', onStart: function () { G.burst(s, st.x, 760, 'drop', 8, { speed: 200, life: 600, scale: 3, gravity: 200 }); } }); });
          s.time.delayedCall(1700, n);
        },
        function (n) { G.ceremony(s, 2, n); },
        function (n) { ctx.dlg.say(c.npc, c.outro, n, ctx.npc); },
        function () { G.stageComplete(s, 2, 2); },
      ]);
    }
  }
  G.scenes.push(Stage1Forest, Stage2Library, Stage3Stream, Stage4Maze, Stage5Summit);
})();
