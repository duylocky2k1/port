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
    // chữ bay theo tuyệt chiêu [SPEC]: "Trên Cao", "Tới deadline rồi!", "Zhang et al.,"...
    const words = (CT().boss.attackWords || {})[id];
    // chữ bay chậm (2900 ms mỗi chữ, cách nhau 350 ms) để người xem kịp đọc; lượt chỉ kết thúc khi chữ cuối đã bay tới
    const WORD_DUR = 2900, WORD_STEP = 350, WORD_START = 150;
    if (words) for (let i = 0; i < 8; i++) { const w = G.txt(s, 0, 0, words[i % words.length], 46, ['#ffd84a', '#ffffff', '#9fe8ff'][i % 3], { sw: 6 }).setDepth(55); fly(s, w, x0, y0 - 40, x1 + (i % 3) * 30 - 30, y1 - 40 + (i % 4) * 40, WORD_DUR, 120, WORD_START + i * WORD_STEP, function () { once(); G.burst(s, w.x, w.y, 'spark', 6, { speed: 160, life: 500, scale: 3 }); w.destroy(); }); }
    const wordsEnd = WORD_START + 7 * WORD_STEP + WORD_DUR;
    s.time.delayedCall(words ? Math.max(total, wordsEnd) : total, done);
  };


  // ======================= TRẬN CHIẾN CUỐI CÙNG [SPEC Bước 10] =======================
  class BossLair extends Phaser.Scene {
    constructor() { super('BossLair'); }
    create() {
      const s = this, c = CT().boss, GY = 740, N = c.questions.length, TR = CT().treasures;
      const ctx = G.stageSetup(s, { no: 5, key: 'boss', bg: 'lair', music: 'boss', npc: 'dragon', npcX: 1650, npcScale: 4.4, ambient: ['embers', 'pages'], treasure: -1, groundY: GY });
      ctx.name = c.name; const dragon = ctx.npc, pl = ctx.player; dragon.alpha = 0; pl.alpha = 0; pl.x = 300;
      // Hoàng tử trong lồng sắt phía sau Rồng, cạnh những chồng Journal
      const prince = G.makeNpc(s, 'prince', 1200, GY, 4.2).setDepth(12); let w = false; const waveEv = s.time.addEvent({ delay: 500, loop: true, callback: function () { w = !w; prince.setTexture('npc_prince_' + (w ? 'b' : 'a')); } });
      const cage = s.add.image(1200, GY + 14, 'cage').setOrigin(0.5, 1).setScale(5.6).setDepth(13);
      for (let k = 0; k < 7; k++) { s.add.image(1040 - (k % 2) * 10, GY - 14 - k * 40, 'journal' + (k % 4)).setScale(4).setAngle(90).setDepth(11); s.add.image(1360 + (k % 2) * 8, GY - 14 - (k % 5) * 40, 'journal' + ((k + 1) % 4)).setScale(4).setAngle(90).setDepth(11); }
      // thanh máu Rồng (5 phần) + tiến độ câu hỏi
      const hb = s.add.container(0, 0).setDepth(450).setAlpha(0), bw = 700, bx = G.W / 2 - bw / 2, by = 22;
      hb.add(G.panel(s, bx, by, bw, 84, { fill: '#2a0f2e', border: '#d0306a', b: 6 })); hb.add(G.txt(s, bx + 24, by + 42, c.name, 36, '#ffffff', { ox: 0 }));
      const segs = []; for (let i = 0; i < N; i++) { const r = s.add.rectangle(bx + 270 + i * (400 / N), by + 42, 400 / N - 8, 34, 0xc03a7a).setOrigin(0, 0.5); segs.push(r); hb.add(r); }
      const progT = G.txt(s, G.W / 2, by + 120, '', 38, C.gold, { sw: 5 }); hb.add(progT);
      let bossHp = N, idx = 0, quizOpen = false, busy = true; const used = [false, false, false, false, false];
      function setProg() { progT.setText('CÂU HỎI ' + Math.min(idx + 1, N) + '/' + N); }
      function hurtBar() { bossHp--; const sg = segs[bossHp]; if (sg) s.tweens.add({ targets: sg, alpha: 0.15, scaleY: 0.4, duration: 300 }); }
      function dragonHurt() { G.audio.sfx('hit'); dragon.setTint(0xff9999); s.cameras.main.shake(260, 0.012); s.tweens.add({ targets: dragon, x: dragon.x + 24, duration: 60, yoyo: true, repeat: 4, onComplete: function () { if (dragon.scene) dragon.clearTint(); } }); G.burst(s, dragon.x, dragon.y - 220, 'spark', 16, { speed: 360, life: 700, scale: 3, depth: 70 }); }
      // ---- 5 bảo vật làm gợi ý (mỗi bảo vật dùng 1 lần mỗi lượt) ----
      ctx.bar.onSlot(function (i) {
        if (!quizOpen || busy) return; if (!G.state.data.treasures[i]) { G.toast(s, 'BẠN CHƯA CÓ BẢO VẬT NÀY!'); return; }
        if (used[i]) { G.audio.sfx('locked'); G.toast(s, 'BẢO VẬT NÀY ĐÃ ĐƯỢC SỬ DỤNG!', '#46445a'); return; }
        const hint = (c.questions[idx].hints || [])[i];
        if (!hint) { G.toast(s, 'CHƯA CÓ GỢI Ý CHO CÂU NÀY', '#46445a'); return; }
        used[i] = true; ctx.bar.setUsed(i, true); G.audio.sfx('treasure'); busy = true;
        const fx = [];
        if (i === 0) { const sh = s.add.image(pl.x + 110, pl.y - 90, 'si_shieldfull').setScale(1).setTint(0xffd84a).setDepth(760); s.tweens.add({ targets: sh, scale: 9, duration: 400, ease: 'Back.easeOut' }); fx.push(sh); }
        else { const it = s.add.image(G.W / 2, 300, 'tr_' + i).setScale(1).setDepth(760); fx.push(it); s.tweens.add({ targets: it, scale: 8, duration: 500, ease: 'Back.easeOut' });
          if (i === 1) s.tweens.add({ targets: it, scaleX: { from: 8, to: -8 }, duration: 260, yoyo: true, repeat: 2, delay: 500 });
          if (i === 2) s.tweens.add({ targets: it, alpha: 0.5, duration: 260, yoyo: true, repeat: 3, delay: 500 });
          if (i === 3) s.tweens.add({ targets: it, angle: 1080, duration: 1000, ease: 'Cubic.easeOut', delay: 300 });
          if (i === 4) s.tweens.add({ targets: it, y: 240, duration: 600, yoyo: true, delay: 400 }); }
        G.burst(s, fx[0].x, fx[0].y, 'spark', 24, { speed: 360, life: 800, scale: 3, depth: 761 });
        s.time.delayedCall(1000, function () {
          const o = [], px = 460, py = 400, pw = 1000, ph = 380;
          o.push(s.add.rectangle(0, 0, G.W, G.H, 0x000000, 0.35).setOrigin(0).setInteractive().setDepth(765));
          o.push(G.panel(s, px, py, pw, ph, { fill: '#241848', border: C.gold, rivets: true }).setDepth(766));
          o.push(G.txt(s, G.W / 2, py + 54, 'GỢI Ý TỪ ' + TR[i].name, 44, C.gold, { sw: 5 }).setDepth(767));
          const ht = G.txt(s, G.W / 2, py + 175, hint, 42, '#ffffff', { wrap: pw - 100, sw: 4 }).setDepth(767); o.push(ht); let fs = 42; while (ht.height > 190 && fs > 26) { fs -= 2; ht.setFontSize(fs); }
          const b = G.button(s, G.W / 2, py + ph - 56, 360, 76, c.hintBtn || 'ĐÃ HIỂU', function () { o.concat(fx).forEach(function (x) { if (x && x.destroy) x.destroy(); }); b.destroy(); busy = false; }, { color: 'green', size: 42 }).setDepth(768);
        });
      });
      // ---- hỏi ----
      function ask() {
        setProg(); quizOpen = true; busy = false; ctx.bar.raise(650);
        const q = c.questions[idx];
        ctx.quiz.show({ title: c.quizTitle + ' ' + (idx + 1) + '/' + N, q: q.q, options: q.options, answer: q.answer, box: { x: 470, y: 150, w: 1120, h: 850 }, rowMax: 130, fill: '#2a0f2e', border: '#d0306a', dim: 0.3, okText: c.okText, badText: c.badText, onResult: function (ok) {
          quizOpen = false; busy = true; ctx.quiz.hide(); ctx.bar.raise(450);
          if (ok) {
            G.charAttack(s, ctx, function () { dragonHurt(); hurtBar(); G.toast(s, c.hitToast, '#1d7a36'); }, function () { idx++; if (idx >= N) finale(); else ask(); });
          } else counter();
        } });
      }
      // ---- Rồng phản công bằng 40 bài Journal ----
      function counter() {
        dragon.talk(true); dragon.setTint(0xff6060); G.audio.sfx('roar'); s.cameras.main.shake(300, 0.006);
        s.tweens.add({ targets: dragon, y: dragon.y - 30, duration: 300, yoyo: true });
        for (let i = 0; i < 12; i++) { const j = s.add.image(0, 0, 'journal' + (i % 4)).setScale(3 + (i % 4) * 1.4).setDepth(60); fly(s, j, dragon.x - 120, dragon.y - 260, pl.x + 20 + (i % 3) * 16, pl.y - 100 + (i % 4) * 20, 520, 90, 300 + i * 110, function () { G.burst(s, j.x, j.y, 'px', 4, { speed: 120, life: 400, scale: 3 }); j.destroy(); }, 30); }
        (c.journalWords || []).forEach(function (wd, k) { const t = G.txt(s, pl.x, pl.y - 140, wd, 40, '#ffb3d9', { sw: 5 }).setDepth(62).setAlpha(0); const o = { a: k * 1.6 }; s.tweens.add({ targets: o, a: o.a + 9, duration: 2000, delay: 900, onStart: function () { t.setAlpha(1); }, onUpdate: function () { t.x = pl.x + Math.cos(o.a) * 200; t.y = pl.y - 150 + Math.sin(o.a) * 70; }, onComplete: function () { t.destroy(); } }); });
        s.time.delayedCall(1700, function () {
          dragon.talk(false); dragon.clearTint(); G.toast(s, c.missToast, '#7a1d1d');
          G.state.hp--; ctx.bar.setHp(G.state.hp, true); G.audio.sfx('hurt'); ctx.player.sad(); s.tweens.add({ targets: pl, x: pl.x - 40, duration: 150, yoyo: true });
          if (G.state.hp <= 0) return lose();
          s.time.delayedCall(1300, function () { const b = G.button(s, G.W / 2, 900, 420, 96, c.retryBtn || 'THỬ LẠI', function () { b.destroy(); ask(); }, { color: 'gold', blink: true, size: 54 }).setDepth(520); });
        });
      }
      // ---- thua: ngã xuống, sao xoay quanh đầu, Rồng cười ----
      function lose() {
        busy = true; pl.idleTween && pl.idleTween.stop(); s.tweens.add({ targets: pl, angle: -90, y: pl.y + 20, duration: 600, ease: 'Bounce.easeOut' });
        for (let k = 0; k < 4; k++) { const st = s.add.image(pl.x, pl.y - 60, 'ic_star').setScale(5).setDepth(60); const o = { a: k * 1.57 }; s.tweens.add({ targets: o, a: o.a + 20, duration: 3000, onUpdate: function () { st.x = pl.x - 40 + Math.cos(o.a) * 60; st.y = pl.y - 70 + Math.sin(o.a) * 16; } }); }
        s.time.delayedCall(700, function () { G.audio.sfx('roar'); dragon.talk(true); for (let k = 0; k < 3; k++) { const t = G.txt(s, dragon.x - 60 + k * 70, dragon.y - 420 - k * 30, 'HA', 70, '#ff7a7e', { sw: 8 }).setDepth(70).setAlpha(0); s.tweens.add({ targets: t, alpha: 1, y: t.y - 40, duration: 400, delay: k * 250 }); } });
        s.time.delayedCall(2600, function () { dragon.talk(false); G.go(s, 'GameOver', { retry: 'BossLair', boss: true }); });
      }
      // ---- thắng: đòn tri thức cuối cùng, Rồng gục, giải cứu Hoàng tử ----
      function finale() {
        busy = true; G.audio.music(null);
        for (let k = 0; k < 3; k++) { const r = s.add.circle(pl.x, pl.y - 90, 60, 0xffd84a, 0.25).setDepth(19); s.tweens.add({ targets: r, scale: 3, alpha: 0, duration: 900, delay: k * 300, repeat: 1 }); }
        s.time.delayedCall(1500, function () {
          const beam = s.add.rectangle(pl.x + 60, pl.y - 110, 10, 70, 0xfff3c4).setOrigin(0, 0.5).setDepth(60); G.audio.sfx('teleport');
          s.tweens.add({ targets: beam, width: dragon.x - pl.x - 60, duration: 350, onComplete: function () {
            s.tweens.add({ targets: beam, alpha: 0, duration: 500, onComplete: function () { beam.destroy(); } });
            G.audio.sfx('hit'); s.cameras.main.shake(800, 0.025); dragon.idleTween.stop(); dragon.setTint(0xffb0b0);
            s.tweens.add({ targets: dragon, x: dragon.x - 300, angle: 78, y: dragon.y - 20, duration: 900, ease: 'Bounce.easeOut', onComplete: function () { s.tweens.add({ targets: dragon, angle: 72, duration: 160, yoyo: true, repeat: 3 }); } });
            for (let k = 0; k < 30; k++) { const pg = s.add.image(dragon.x, dragon.y - 200, 'page').setScale(5).setDepth(65); s.tweens.add({ targets: pg, x: pg.x + (Math.random() - 0.5) * 1400, y: pg.y + (Math.random() - 0.7) * 700, angle: 720, alpha: 0, duration: 1800 + Math.random() * 800, onComplete: function () { pg.destroy(); } }); }
            s.time.delayedCall(1300, function () { G.audio.music('win'); G.audio.sfx('win'); pl.cheer();
              const t = G.txt(s, G.W / 2, 330, c.defeatTitle, 92, C.gold, { sw: 10, wrap: 1700 }).setDepth(700); t.setScale(0.3); s.tweens.add({ targets: t, scale: 1, duration: 500, ease: 'Back.easeOut' });
              s.time.delayedCall(2400, function () { t.destroy(); hb.setVisible(false); ctx.dlg.say(c.name, c.defeat, rescue, dragon); });
            });
          } });
        });
      }
      function rescue() {
        G.state.data.bossDone = true; G.state.save();
        dragon.clearTint(); s.tweens.add({ targets: dragon, angle: 0, x: 1650, y: GY, duration: 700, ease: 'Back.easeOut' });
        s.time.delayedCall(900, function () {
          const ray = s.add.rectangle(dragon.x - 40, GY - 270, 10, 26, 0xffd84a).setOrigin(1, 0.5).setDepth(30); s.tweens.add({ targets: ray, width: dragon.x - 40 - cage.x, duration: 400 });
          s.time.delayedCall(600, function () {
            ray.destroy(); G.audio.sfx('treasure'); G.burst(s, cage.x, GY - 150, 'spark', 40, { speed: 600, life: 1200, scale: 4, depth: 70 });
            s.tweens.add({ targets: cage, y: cage.y - 600, alpha: 0, duration: 1200, ease: 'Cubic.easeIn' }); waveEv.remove(); prince.setTexture('npc_prince_b');
            s.time.delayedCall(900, function () {
              s.tweens.add({ targets: prince, x: pl.x + 190, duration: 1400, ease: 'Sine.easeInOut' }); s.tweens.add({ targets: prince, y: prince.y - 12, duration: 160, yoyo: true, repeat: 8 });
              s.time.delayedCall(1600, function () {
                pl.cheer(); for (let k = 0; k < 6; k++) s.time.delayedCall(k * 300, function () { G.burst(s, 300 + Math.random() * 1300, 150 + Math.random() * 300, 'spark', 30, { speed: 420, life: 1000, scale: 4, tint: [0xff7a7e, 0xffd84a, 0x7ab4ff, 0x7ae09a][k % 4], depth: 70 }); G.audio.sfx('collect'); });
                ctx.dlg.say(c.princeName, c.prince, function () { G.go(s, 'Victory'); }, prince);
              });
            });
          });
        });
      }
      G.seq([
        function (n) { // ánh sáng đỏ tím, Journal bay quanh, sét pixel
          for (let i = 0; i < 12; i++) { const p = s.add.image(pl.x, GY - 120, 'page').setScale(5).setDepth(19); const o = { a: i * 0.52 }; s.tweens.add({ targets: o, a: o.a + 7, duration: 1600, onUpdate: function () { p.x = pl.x + Math.cos(o.a) * 160; p.y = GY - 130 + Math.sin(o.a) * 60; }, onComplete: function () { p.destroy(); } }); }
          for (let k = 0; k < 3; k++) s.time.delayedCall(300 + k * 450, function () { s.cameras.main.flash(120, 255, 230, 255); s.cameras.main.shake(150, 0.004); });
          G.beam(s, pl.x, GY, '#d0306a', n); s.time.delayedCall(500, function () { pl.alpha = 1; });
        },
        function (n) { // Rồng đáp xuống, dang cánh, Journal bay tứ tung
          s.cameras.main.shake(900, 0.008); G.audio.sfx('roar'); const ty = dragon.y; dragon.y = -200; dragon.alpha = 1;
          s.tweens.add({ targets: dragon, y: ty, duration: 900, ease: 'Bounce.easeOut', onComplete: function () {
            s.cameras.main.shake(500, 0.02); s.tweens.add({ targets: dragon, scaleX: dragon.scaleX * 1.12, duration: 250, yoyo: true, repeat: 1 });
            for (let k = 0; k < 18; k++) { const pg = s.add.image(dragon.x, dragon.y - 200, 'page').setScale(4).setDepth(40); s.tweens.add({ targets: pg, x: pg.x - 400 - Math.random() * 1000, y: pg.y + (Math.random() - 0.5) * 500, angle: 540, alpha: 0, duration: 1500 + Math.random() * 600, onComplete: function () { pg.destroy(); } }); }
            s.time.delayedCall(900, n);
          } });
        },
        function (n) { ctx.dlg.say(c.name, c.intro, n, dragon); },
        function (n) { // thanh máu Rồng xuất hiện, nhân vật vào thế chiến đấu
          s.tweens.add({ targets: dragon, scaleY: dragon.scaleY * 1.08, duration: 300, yoyo: true }); s.tweens.add({ targets: hb, alpha: 1, duration: 500 }); pl.talkPose(); setProg();
          ctx.bar.slots.forEach(function (sl, i) { if (G.state.data.treasures[i]) ctx.bar.setUsed(i, false); });
          const t1 = G.txt(s, G.W / 2, 360, c.battleTitle, 120, '#ff7a7e', { sw: 12 }).setDepth(700), t2 = G.txt(s, G.W / 2, 470, c.battleSub, 50, '#ffffff', { sw: 6, wrap: 1600 }).setDepth(700);
          t1.setScale(0.3); s.tweens.add({ targets: t1, scale: 1, duration: 400, ease: 'Back.easeOut' }); G.audio.sfx('select');
          const b = G.button(s, G.W / 2, 900, 560, 96, c.battleBtn, function () { [t1, t2, b].forEach(function (o) { o.destroy(); }); n(); }, { color: 'red', blink: true, size: 50 }).setDepth(701);
        },
        function () { ask(); },
      ]);
    }
  }

  // ======================= MÀN CHIẾN THẮNG =======================
  class Victory extends Phaser.Scene {
    constructor() { super('Victory'); }
    create() {
      const s = this, v = CT().victory, st = G.state.data, ch = CT().characters.filter(function (x) { return x.id === st.char; })[0] || CT().characters[0];
      s._leaving = false; G.bg(s, 'lair'); s.add.rectangle(0, 0, G.W, G.H, 0xffd84a, 0.28).setOrigin(0).setDepth(1); G.ambient(s, 'pages'); G.audio.music('win'); G.audio.sfx('win');
      for (let i = 0; i < 70; i++) { const r = s.add.rectangle(Math.random() * G.W, -20 - Math.random() * 800, 14, 22, [0xe0383e, 0xffd84a, 0x4aa3ff, 0x3fbf5f, 0xff4fa3][i % 5]).setDepth(50); s.tweens.add({ targets: r, y: G.H + 40, x: r.x + (Math.random() - 0.5) * 300, angle: 720, duration: 3500 + Math.random() * 3000, repeat: -1, delay: Math.random() * 3000, onRepeat: function () { r.y = -30; } }); }
      s.time.addEvent({ delay: 900, loop: true, callback: function () { G.burst(s, 200 + Math.random() * 1500, 120 + Math.random() * 300, 'spark', 24, { speed: 380, life: 900, scale: 4, tint: [0xff7a7e, 0xffd84a, 0x7ab4ff, 0x7ae09a][Math.floor(Math.random() * 4)], depth: 40 }); } });
      const p1 = G.makeChar(s, st.char || 'ngocanh', 300, 1040, 4.6).setDepth(10), pr = G.makeNpc(s, 'prince', 520, 1040, 4.8).setDepth(10), dr = G.makeNpc(s, 'dragon', 1660, 1040, 3.4).setDepth(9);
      let w = false; s.time.addEvent({ delay: 450, loop: true, callback: function () { w = !w; pr.setTexture('npc_prince_' + (w ? 'b' : 'a')); } });
      s.time.addEvent({ delay: 1400, loop: true, callback: function () { p1.cheer(); } });
      const t = G.txt(s, G.W / 2, 96, v.heading, 66, C.gold, { sw: 8, wrap: 1800 }).setDepth(60); t.setScale(0.2); s.tweens.add({ targets: t, scale: 1, duration: 700, ease: 'Back.easeOut' });
      G.txt(s, G.W / 2, 190, v.sub, 46, '#ffffff', { sw: 6 }).setDepth(60);
      // bảng tổng kết
      const bx = 560, by = 250, bw = 800, sm = v.summary, rows = [[sm.char, ch.name], [sm.stages, '5/5'], [sm.boss, CT().boss.questions.length + '/' + CT().boss.questions.length], [sm.treasures, st.treasures.filter(Boolean).length + '/5'], [sm.result, sm.resultText]];
      const bh = 110 + rows.length * 66 + (v.reward ? 70 : 0) + 120;
      G.panel(s, bx, by, bw, bh, { fill: '#241848', border: C.gold, rivets: true }).setDepth(60);
      G.txt(s, G.W / 2, by + 52, 'BẢNG TỔNG KẾT', 50, C.gold, { sw: 5 }).setDepth(61);
      rows.forEach(function (r, i) { const y = by + 120 + i * 66; G.txt(s, bx + 50, y, r[0] + ':', 38, C.cream, { ox: 0, sw: 3 }).setDepth(61); G.txt(s, bx + bw - 50, y, r[1], 40, i === rows.length - 1 ? '#7ae09a' : '#ffffff', { ox: 1, sw: 4 }).setDepth(61); });
      if (v.reward) G.txt(s, G.W / 2, by + 120 + rows.length * 66 + 10, v.reward, 34, '#9fb4ff', { wrap: bw - 80, sw: 3 }).setDepth(61);
      G.button(s, G.W / 2, by + bh - 64, 560, 90, v.endBtn, function () {
        if (v.endAction === 'title') { G.go(s, 'Title'); return; }
        const o = s.add.rectangle(0, 0, G.W, G.H, 0x0b0820, 1).setAlpha(0).setOrigin(0).setInteractive().setDepth(900); s.tweens.add({ targets: o, alpha: 0.95, duration: 700 });
        const m = G.txt(s, G.W / 2, 380, v.message, 62, C.gold, { sw: 6, wrap: 1500 }).setDepth(901), m2 = G.txt(s, G.W / 2, 620, v.completed, 52, '#ffffff', { sw: 6, wrap: 1700 }).setDepth(901);
        [m, m2].forEach(function (x, i) { x.setAlpha(0); s.tweens.add({ targets: x, alpha: 1, duration: 800, delay: 600 + i * 700 }); });
        const b1 = G.button(s, G.W / 2 - 320, 820, 560, 96, 'VỀ MÀN HÌNH CHÍNH', function () { G.go(s, 'Title'); }, { color: 'blue', size: 46 }).setDepth(902);
        const b2 = G.button(s, G.W / 2 + 320, 820, 560, 96, 'CHƠI LẠI TỪ ĐẦU', function () { G.state.reset(); G.go(s, 'Title'); }, { color: 'green', size: 46 }).setDepth(902);
        [b1, b2].forEach(function (b) { b.setAlpha(0); s.tweens.add({ targets: b, alpha: 1, duration: 500, delay: 2000 }); });
      }, { color: 'gold', blink: true, size: 48 }).setDepth(62);
      G.fadeIn(s);
    }
  }
  G.scenes.push(BossLair, Victory);
})();
