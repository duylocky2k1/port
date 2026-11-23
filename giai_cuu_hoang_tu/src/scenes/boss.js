// Trận Rồng Giáo Sư + màn chiến thắng
(function () {
  const C = G.C, CT = function () { return window.GAME_CONTENT; };

  // bay theo cung parabol: gọi onArrive khi tới nơi
  function fly(s, img, x0, y0, x1, y1, dur, arc, delay, onArrive, spin) {
    img.setPosition(x0, y0).setVisible(false); const p = { t: 0 };
    s.tweens.add({ targets: p, t: 1, duration: dur, delay: delay || 0, onStart: function () { img.setVisible(true); G.audio.sfx('swoosh'); },
      onUpdate: function () { if (!img.scene) return; img.x = x0 + (x1 - x0) * p.t; img.y = y0 + (y1 - y0) * p.t - Math.sin(p.t * Math.PI) * (arc || 0); if (spin) img.angle += spin; },
      onComplete: function () { if (onArrive) onArrive(img); } });
  }
  const SKILL_COLORS = [0xe0383e, 0x4aa3ff, 0xffd84a, 0xff4fa3, 0x3fbf5f];

  // tuyệt chiêu riêng cho 6 nhân vật. hit() = đòn trúng đầu tiên, done() = kết thúc.
  G.charAttack = function (s, ctx, hit, done) {
    const pl = ctx.player, id = pl.charId, tgt = ctx.npc, sk = CT().characters.filter(function (c) { return c.id === id; })[0];
    const ban = G.txt(s, G.W / 2, 220, sk.skillName + '!', 100, '#ffd84a', { sw: 12 }).setDepth(800); ban.setScale(0.3);
    s.tweens.add({ targets: ban, scale: 1, duration: 260, ease: 'Back.easeOut' }); s.tweens.add({ targets: ban, alpha: 0, delay: 1500, duration: 300, onComplete: function () { ban.destroy(); } });
    const x0 = pl.x + 40, y0 = pl.y - 100, x1 = tgt.x - 30, y1 = tgt.y - tgt.displayHeight * 0.55; let hitDone = false;
    const once = function () { if (!hitDone) { hitDone = true; hit(); } };
    pl.weaponImg.setAngle(pl.weaponImg.angle); s.tweens.add({ targets: pl, x: pl.x + 30, duration: 160, yoyo: true });
    let total = 1800;
    if (id === 'ngocanh') {
      for (let i = 0; i < 9; i++) { const b = s.add.image(0, 0, 'wp_ngocanh').setScale(4).setDepth(50); fly(s, b, x0, y0 + (i % 3) * 20, x1 + (i % 3) * 20 - 20, y1 + (i % 4) * 30 - 40, 520, 100, i * 110, function () { once(); G.burst(s, b.x, b.y, 'px', 10, { speed: 220, life: 700, scale: 3, tint: SKILL_COLORS[i % 5], gravity: 120 }); const blob = s.add.rectangle(b.x, b.y, 28, 22, SKILL_COLORS[i % 5]).setDepth(45); s.tweens.add({ targets: blob, alpha: 0, delay: 1000, duration: 500, onComplete: function () { blob.destroy(); } }); b.destroy(); }, 28); }
      total = 2100;
    } else if (id === 'ngocngan') {
      for (let i = 0; i < 5; i++) { const r = s.add.circle(x0, y0, 30).setStrokeStyle(10, 0x4aa3ff).setDepth(50).setVisible(false); fly(s, r, x0 + 40, y0, x1, y1, 650, 0, i * 220, function () { once(); r.destroy(); G.burst(s, x1, y1, 'note', 8, { speed: 260, life: 700, scale: 4 }); }); s.tweens.add({ targets: r, scale: 4, duration: 650, delay: i * 220 }); const nt = s.add.image(0, 0, 'note').setScale(5).setDepth(50); fly(s, nt, x0, y0 - 40, x1, y1 - 60, 800, 60, i * 220 + 100, function () { nt.destroy(); }); }
      s.time.delayedCall(900, function () { s.tweens.add({ targets: tgt, x: tgt.x + 70, duration: 200, yoyo: true, hold: 300 }); }); total = 1900;
    } else if (id === 'ngocgiao') {
      const ck = s.add.image(0, 0, 'wp_ngocgiao').setScale(5).setDepth(50);
      fly(s, ck, x0, y0, x1, y1, 800, 200, 0, function () { once(); G.audio.sfx('roar'); tgt.setTint(0x88ccff); s.cameras.main.shake(500, 0.01); ck.destroy();
        for (let i = 0; i < 12; i++) { const a = s.add.image(x1, y1, 'wp_ngocgiao').setScale(1.6).setDepth(50); s.tweens.add({ targets: a, x: x1 + Math.cos(i) * 220, y: y1 + Math.sin(i) * 220, alpha: 0, angle: 360, duration: 900, onComplete: function () { a.destroy(); } }); }
        const f = G.txt(s, x1, y1 - 200, 'ĐÓNG BĂNG 3s!', 56, '#9fe8ff', { sw: 8 }).setDepth(60); s.tweens.add({ targets: f, y: f.y - 40, alpha: 0, delay: 1000, duration: 500, onComplete: function () { f.destroy(); } }); s.time.delayedCall(1700, function () { if (tgt.scene) tgt.clearTint(); }); }, 12);
      total = 2300;
    } else if (id === 'minhthu') {
      for (let i = 0; i < 14; i++) { const pg = s.add.image(0, 0, 'page').setScale(5).setDepth(50); fly(s, pg, x0, y0 + (i % 3) * 20, x1 + (i % 5) * 14 - 20, y1 + (i % 4) * 30 - 40, 420, 60, i * 90, function () { once(); pg.destroy(); }, 40); }
      s.time.delayedCall(1100, function () { for (let k = 0; k < 6; k++) { const st = s.add.image(x1, y1 - 120, 'ic_star').setScale(6).setDepth(55); const o = { a: k * 1.05 }; s.tweens.add({ targets: o, a: o.a + 8, duration: 1100, onUpdate: function () { st.x = x1 + Math.cos(o.a) * 110; st.y = y1 - 150 + Math.sin(o.a) * 28; }, onComplete: function () { st.destroy(); } }); } });
      total = 2500;
    } else if (id === 'minhhien') {
      const pv = G.txt(s, pl.x + 30, pl.y - 280, 'p < 0.05', 80, '#9be8a6', { sw: 10 }).setDepth(60); s.tweens.add({ targets: pv, scale: { from: 0.5, to: 1.4 }, duration: 500, yoyo: true, hold: 200 }); s.tweens.add({ targets: pv, alpha: 0, delay: 1000, duration: 400, onComplete: function () { pv.destroy(); } });
      for (let i = 0; i < 12; i++) { const n = G.txt(s, 0, 0, ['0.05', '1.96', 'σ', 'β', 'χ²', 'r', 'F', 't', '95%', 'μ', 'α', 'n'][i], 56, '#ffffff', { sw: 6 }).setDepth(50); fly(s, n, x0, y0, x1 + (i % 4) * 14, y1 + (i % 3) * 30 - 30, 520, 90, 300 + i * 90, function () { once(); n.destroy(); }); }
      const ch = s.add.container(0, 0).setDepth(52); [[0, 50], [24, 90], [48, 70], [72, 130]].forEach(function (b) { ch.add(s.add.rectangle(b[0] - 40, 60 - b[1] / 2, 18, b[1], 0xffd84a).setStrokeStyle(4, 0x1b1030)); });
      fly(s, ch, x0, y0, x1, y1, 650, 100, 1500, function () { once(); G.burst(s, x1, y1, 'spark', 30, { speed: 520, life: 800, scale: 4 }); ch.destroy(); }); ch.setScale(1.6);
      s.tweens.add({ targets: ch, scale: 3.2, duration: 650, delay: 1500 }); total = 2800;
    } else { // hoangthien
      const sticks = [];
      for (let i = 0; i < 10; i++) { const fr = s.add.image(0, 0, 'wp_hoangthien').setScale(4).setDepth(50); fly(s, fr, x0, y0, x1 + (i % 5) * 36 - 70, y1 - 60 + (i % 3) * 36, 560, 140, i * 100, function () { once(); sticks.push(fr); }, 0); }
      s.time.delayedCall(1700, function () { sticks.forEach(function (fr) { s.tweens.add({ targets: fr, y: fr.y - 120, alpha: 0, duration: 600, onComplete: function () { fr.destroy(); } }); }); }); total = 2500;
    }
    s.time.delayedCall(total, done);
  };

  class BossLair extends Phaser.Scene {
    constructor() { super('BossLair'); }
    create() {
      const s = this, c = CT().boss, GY = 730;
      const ctx = G.stageSetup(s, { no: 5, key: 'boss', bg: 'lair', music: 'boss', npc: 'dragon', npcX: 1500, npcScale: 4.2, ambient: ['embers'], treasure: -1, groundY: GY });
      ctx.name = c.name; ctx.npc.alpha = 0; ctx.player.alpha = 0; const dragon = ctx.npc;
      // lồng giam Hoàng tử
      const prince = G.makeNpc(s, 'prince', 960, GY, 4.4).setDepth(12); let w = false; s.time.addEvent({ delay: 500, loop: true, callback: function () { w = !w; prince.setTexture('npc_prince_' + (w ? 'b' : 'a')); } });
      const cage = s.add.image(960, GY + 14, 'cage').setOrigin(0.5, 1).setScale(5.6).setDepth(13);
      // thanh máu Rồng
      const N = c.questions.length; let bossHp = N;
      const bw = 640, bx = G.W / 2 - bw / 2 + 40, by = 28;
      G.panel(s, bx, by, bw, 74, { fill: '#241848', border: '#e0383e', b: 6 }).setDepth(450);
      G.txt(s, bx + 22, by + 36, c.name, 34, '#ffffff', { ox: 0 }).setDepth(451);
      const segs = []; for (let i = 0; i < N; i++) { segs.push(s.add.rectangle(bx + 250 + i * (370 / N), by + 37, 370 / N - 8, 28, 0xe0383e).setOrigin(0, 0.5).setDepth(451)); }
      function hurtBar() { bossHp--; if (segs[bossHp]) { s.tweens.add({ targets: segs[bossHp], alpha: 0.15, scaleY: 0.4, duration: 300 }); } }
      function dragonHurt() { G.audio.sfx('hit'); dragon.setTint(0xff6666); s.cameras.main.shake(260, 0.012); s.tweens.add({ targets: dragon, x: dragon.x + 24, duration: 60, yoyo: true, repeat: 4, onComplete: function () { if (dragon.scene) dragon.clearTint(); } }); G.burst(s, dragon.x, dragon.y - 220, 'spark', 16, { speed: 360, life: 700, scale: 3, depth: 70 }); }
      function dragonAttack(cb) {
        dragon.talk(true); G.audio.sfx('roar'); s.cameras.main.shake(300, 0.006);
        for (let i = 0; i < 4; i++) { const pg = s.add.image(0, 0, 'page').setScale(6).setDepth(60); fly(s, pg, dragon.x - 120, dragon.y - 240, ctx.player.x + 20, ctx.player.y - 100, 560, 80, i * 150, function () { pg.destroy(); if (i === 3) { dragon.talk(false); cb(); } }, 36); }
      }
      let idx = 0;
      function ask() {
        const q = c.questions[idx];
        ctx.quiz.show({ title: 'FINAL BOSS – CÂU ' + (idx + 1) + '/' + N, q: q.q, options: q.options, answer: q.answer, onResult: function (ok) {
          ctx.quiz.hide();
          if (ok) {
            G.charAttack(s, ctx, function () { dragonHurt(); hurtBar(); }, function () {
              idx++; if (idx >= N) return defeated();
              ctx.dlg.say(c.name, [c.hitLines[Math.min(idx - 1, c.hitLines.length - 1)]], ask, dragon);
            });
          } else {
            dragonAttack(function () {
              G.state.hp--; ctx.bar.setHp(G.state.hp, true); G.audio.sfx('hurt'); ctx.player.sad(); s.cameras.main.shake(200, 0.008);
              if (G.state.hp <= 0) { s.time.delayedCall(700, function () { G.go(s, 'GameOver', { retry: 'BossLair' }); }); return; }
              const lines = c.missLines.slice(); if (q.hint) lines.push('GỢI Ý: ' + q.hint); ctx.dlg.say(c.name, lines, ask, dragon);
            });
          }
        } });
      }
      function defeated() {
        G.audio.sfx('roar'); dragon.idleTween.stop(); s.tweens.add({ targets: dragon, angle: 90, y: dragon.y + 60, x: dragon.x + 80, duration: 900, ease: 'Bounce.easeOut' }); s.cameras.main.shake(700, 0.02);
        s.time.delayedCall(1200, function () {
          ctx.dlg.say(c.name, c.defeat, function () {
            s.tweens.add({ targets: dragon, alpha: 0, duration: 800 }); G.audio.sfx('treasure'); s.tweens.add({ targets: cage, y: cage.y - 400, alpha: 0, duration: 1200, ease: 'Cubic.easeIn' });
            G.burst(s, cage.x, cage.y - 140, 'spark', 40, { speed: 600, life: 1200, scale: 4, depth: 70 }); prince.setTexture('npc_prince_b'); ctx.player.cheer();
            G.state.data.bossDone = true; G.state.save(); s.time.delayedCall(2300, function () { G.go(s, 'Victory'); });
          }, dragon);
        });
      }
      G.seq([
        function (n) { G.beam(s, ctx.player.x, GY, '#e0383e', n); s.time.delayedCall(500, function () { ctx.player.alpha = 1; }); },
        function (n) { dragon.alpha = 1; dragon.setScale(0.5); s.tweens.add({ targets: dragon, scale: 4.2, duration: 600, ease: 'Back.easeOut', onComplete: function () { G.audio.sfx('roar'); s.cameras.main.shake(500, 0.015); n(); } }); },
        function (n) { // hội thoại mở đầu: nhiều người nói
          let i = 0; (function say() { if (i >= c.intro.length) return n(); const l = c.intro[i++]; ctx.dlg.say(l.who, l.t, say, dragon); })(); },
        function (n) { G.banner(s, 'FINAL BOSS\nCRACK THE CODE', 'VÀO TRẬN', n, '#5a0f1e'); },
        function (n) { ctx.paged.show({ pages: [{ title: 'TÌNH HUỐNG CỦA RỒNG GIÁO SƯ', body: c.scenario }], heading: '', doneLabel: 'CHIẾN ĐẤU!', onDone: n }); },
        function () { ask(); },
      ]);
    }
  }

  class Victory extends Phaser.Scene {
    constructor() { super('Victory'); }
    create() {
      const s = this, v = CT().victory; s._leaving = false; G.bg(s, 'title'); G.ambient(s, 'clouds'); G.audio.music('win'); G.audio.sfx('win');
      for (let i = 0; i < 70; i++) { const r = s.add.rectangle(Math.random() * G.W, -20 - Math.random() * 800, 14, 22, [0xe0383e, 0xffd84a, 0x4aa3ff, 0x3fbf5f, 0xff4fa3][i % 5]).setDepth(50); s.tweens.add({ targets: r, y: G.H + 40, x: r.x + (Math.random() - 0.5) * 300, angle: 720, duration: 3500 + Math.random() * 3000, repeat: -1, delay: Math.random() * 3000, onRepeat: function () { r.y = -30; } }); }
      const ch = G.makeChar(s, G.state.data.char || 'ngocanh', 700, 760, 6).setDepth(10);
      const pr = G.makeNpc(s, 'prince', 1200, 760, 6).setDepth(10); let w = false; s.time.addEvent({ delay: 450, loop: true, callback: function () { w = !w; pr.setTexture('npc_prince_' + (w ? 'b' : 'a')); } });
      const t = G.txt(s, G.W / 2, 190, v.heading, 230, '#ffd84a', { sw: 22 }).setDepth(60); t.setScale(0.2); s.tweens.add({ targets: t, scale: 1, duration: 700, ease: 'Back.easeOut' }); s.tweens.add({ targets: t, y: 175, duration: 900, yoyo: true, repeat: -1, delay: 700 });
      G.txt(s, G.W / 2, 340, v.sub, 56, '#ffffff', { sw: 8 }).setDepth(60);
      const bar = new G.StatusBar(s, { noHp: true }); bar.hearts.forEach(function (h) { h.setVisible(false); });
      G.fadeIn(s); const dlg = new G.Dialog(s);
      s.time.delayedCall(1800, function () {
        dlg.say('HOÀNG TỬ CAMPUCHIA', v.prince, function () {
          const bx = 310, by = 450, bw = 1300, bh = 420; const p = G.panel(s, bx, by, bw, bh, { fill: '#241848', border: C.gold, rivets: true }).setDepth(300);
          G.txt(s, G.W / 2, by + 90, v.message, 54, '#ffd84a', { wrap: bw - 100, sw: 6 }).setDepth(301);
          G.txt(s, G.W / 2, by + 220, v.reward, 36, '#9fb4ff', { wrap: bw - 100, sw: 4 }).setDepth(301);
          G.button(s, G.W / 2 - 300, by + bh - 70, 520, 90, 'CHƠI LẠI TỪ ĐẦU', function () { G.state.reset(); G.go(s, 'Title'); }, { color: 'green', blink: true, size: 50 }).setDepth(302);
          G.button(s, G.W / 2 + 300, by + bh - 70, 520, 90, 'VỀ BẢN ĐỒ', function () { G.go(s, 'MapScene'); }, { color: 'blue', size: 50 }).setDepth(302);
        }, pr);
      });
    }
  }
  G.scenes.push(BossLair, Victory);
})();
