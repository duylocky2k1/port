// BƯỚC 4: bản đồ 5 chặng + Tổ Tri Thức
(function () {
  const C = G.C, CT = function () { return window.GAME_CONTENT; };

  class MapScene extends Phaser.Scene {
    constructor() { super('MapScene'); }
    create() {
      const s = this; s._leaving = false; s.info = []; s.busy = false;
      G.bg(s, 'map'); G.audio.music('forest'); G.ambient(s, 'clouds');
      const st = G.state.data, N = G.mapNodes, ct = CT();
      G.txt(s, G.W / 2, 150, 'BẢN ĐỒ GIẢI CỨU HOÀNG TỬ', 96, '#ffffff', { sw: 12 }).setDepth(50);
      s.bar = new G.StatusBar(s, { noHp: true });
      G.button(s, G.W - 190, 70, 300, 70, 'TRANG CHỦ', function () { G.go(s, 'Title'); }, { color: 'gray', size: 38 }).setDepth(60);
      // trạng thái mở khóa (mở khóa chặng mới sau khi vừa hoàn thành → hiệu ứng)
      const nu = st.newUnlock; s.nuLive = nu;
      const unlocked = function (i) { return i === 5 ? st.completed[4] : (i === 0 || st.completed[i - 1]); }; // i: 0..4 chặng, 5 = Tổ
      // đường đi
      s.road = s.add.graphics().setDepth(5);
      function drawRoad() {
        s.road.clear();
        for (let i = 0; i < N.length - 1; i++) {
          const a = N[i], b = N[i + 1]; const lit = i === 0 ? true : (i < 6 ? st.completed[i - 1] : false);
          const litNow = (i === 0) || (i - 1 < 5 && st.completed[i - 1]); // đường từ node i → i+1 sáng nếu node i (chặng i) đã hoàn thành (i≥1) hoặc i=0
          const cut = (s.nuLive >= 0 && i === s.nuLive); // đường vừa mở: sẽ sáng sau animation
          const on = litNow && !cut;
          const n = Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 22);
          for (let k = 1; k < n; k++) { const t = k / n, x = a.x + (b.x - a.x) * t, y = a.y + (b.y - a.y) * t + Math.sin(t * Math.PI) * -26; s.road.fillStyle(0x1b1030, 1); s.road.fillRect(x - 13, y - 13, 26, 26); s.road.fillStyle(on ? 0xffd84a : 0xc9a96a, 1); s.road.fillRect(x - 10, y - 10, 20, 20); s.road.fillStyle(on ? 0xfff08a : 0xe8d09a, 1); s.road.fillRect(x - 10, y - 10, 20, 6); }
        }
      }
      drawRoad(); s.drawRoad = drawRoad;
      const pt = function (a, b, t) { return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t + Math.sin(t * Math.PI) * -26 }; };
      // điểm xuất phát
      const flag = s.add.rectangle(N[0].x, N[0].y - 40, 8, 100, 0x5a3a1a).setDepth(8); s.add.rectangle(N[0].x + 30, N[0].y - 78, 60, 36, 0xe0383e).setDepth(8);
      G.txt(s, N[0].x, N[0].y + 62, 'XUẤT PHÁT', 36, '#ffffff', { sw: 6 }).setDepth(9);
      // 5 chặng + tổ rồng
      s.nodes = [];
      for (let i = 0; i < 6; i++) {
        const p = N[i + 1], isLair = i === 5; const sc = isLair ? 7 : 5.2;
        const cont = s.add.container(p.x, p.y).setDepth(10);
        const glow = s.add.image(0, -40, 'spark').setTint(0xffd84a).setScale(0).setAlpha(0.7);
        const icon = s.add.image(0, -40, 'node_' + i).setScale(sc);
        const nameT = G.txt(s, 0, 60, isLair ? ct.lair.name : String(i + 1), isLair ? 38 : 44, '#ffffff', { sw: 6 });
        const plate = s.add.rectangle(0, 60, isLair ? 240 : 64, 54, 0x1b1030, 0.85); const lock = s.add.image(0, -40, 'ic_lock').setScale(5.5); const check = s.add.image(50, -92, 'ic_check').setScale(4.2);
        cont.add([glow, icon, plate, nameT, lock, check]); cont.setSize(140, 170);
        const node = { cont: cont, icon: icon, glow: glow, lock: lock, check: check, i: i };
        s.nodes.push(node);
        cont.setInteractive({ useHandCursor: true }); cont.on('pointerup', function () { s.onNode(i); });
        cont.on('pointerover', function () { if (!s.busy) s.tweens.add({ targets: cont, scale: 1.1, duration: 100 }); }); cont.on('pointerout', function () { s.tweens.add({ targets: cont, scale: 1, duration: 100 }); });
      }
      s.refreshNodes = function (skipNew) {
        s.nodes.forEach(function (n) {
          const un = unlocked(n.i) && !(skipNew && s.nuLive === n.i); const done = n.i < 5 ? st.completed[n.i] : st.bossDone;
          n.lock.setVisible(!un); n.check.setVisible(!!done); n.icon.setTint(un ? 0xffffff : 0x555566); n.glow.setScale(un && !done ? 9 : 0);
          s.tweens.killTweensOf(n.glow); if (un && !done) s.tweens.add({ targets: n.glow, scale: 12, alpha: 0.35, duration: 700, yoyo: true, repeat: -1 });
        });
      };
      s.refreshNodes(true);
      // nhân vật: đứng ở nút của chặng đã hoàn thành cao nhất (hoặc xuất phát)
      const last = G.state.lastDone(), idx = last + 1; // idx trong N
      const from = nu >= 0 ? N[nu] : N[idx];
      s.player = G.makeChar(s, st.char || 'ngocanh', from.x - 110, from.y + 20, 3).setDepth(30);
      s.playerNodeIdx = idx;
      G.fadeIn(s);
      if (nu >= 0) {
        s.busy = true; const a = N[nu], b = N[nu + 1]; // từ chặng vừa xong → chặng vừa mở
        s.time.delayedCall(900, function () {
          G.audio.sfx('select'); st.newUnlock = -1; s.nuLive = -1; G.state.save();
          drawRoad(); s.refreshNodes(false);
          const nd = s.nodes[nu]; if (nd) { G.burst(s, nd.cont.x, nd.cont.y - 40, 'spark', 28, { speed: 380, life: 900, scale: 3, depth: 60 }); s.tweens.add({ targets: nd.icon, scale: { from: 8, to: 5.2 }, duration: 500, ease: 'Back.easeOut' }); }
          // đường sáng + nhân vật di chuyển
          const prog = { t: 0 }; s.tweens.add({ targets: prog, t: 1, duration: 1400, delay: 400, onUpdate: function () { const p = pt(a, b, prog.t); s.player.x = p.x - 110; s.player.y = p.y + 20; }, onComplete: function () { s.busy = false; } });
        });
      }
      s.player.x = from.x - 110; s.player.y = from.y + 20;
    }
    onNode(i) {
      const s = this, ct = CT(), st = G.state.data; if (s.busy) return;
      const un = i === 5 ? st.completed[4] : (i === 0 || st.completed[i - 1]);
      const n = s.nodes[i];
      if (!un) { G.audio.sfx('locked'); G.toast(s, 'BẠN CẦN VƯỢT QUA CHẶNG TRƯỚC!'); s.tweens.add({ targets: n.lock, angle: { from: -18, to: 18 }, duration: 60, yoyo: true, repeat: 4, onComplete: function () { n.lock.angle = 0; } }); return; }
      G.audio.sfx('select'); s.closeInfo();
      const isLair = i === 5, d = isLair ? { name: ct.lair.name, en: '', diff: 5, mission: ct.lair.mission } : ct.stages[i], done = isLair ? st.bossDone : st.completed[i];
      const bx = 330, by = 730, bw = 1260, bh = 310, o = [];
      o.push(G.panel(s, bx, by, bw, bh, { fill: '#241848', border: C.gold, rivets: true }).setDepth(200));
      o.push(G.txt(s, bx + 60, by + 54, (isLair ? 'TỔ TRI THỨC' : 'CHẶNG ' + (i + 1) + ' – ' + d.name), 58, C.gold, { ox: 0, sw: 6 }).setDepth(201));
      if (d.en) o.push(G.txt(s, bx + 60, by + 104, d.en, 34, '#9fb4ff', { ox: 0, sw: 3 }).setDepth(201));
      o.push(G.txt(s, bx + bw - 60, by + 62, 'ĐỘ KHÓ', 34, '#ffffff', { ox: 1, sw: 3 }).setDepth(201));
      for (let k = 0; k < 5; k++) o.push(s.add.image(bx + bw - 300 + k * 46 + 0, by + 112, k < d.diff ? 'ic_star' : 'ic_star_g').setScale(4.4).setDepth(201));
      o.push(G.txt(s, bx + 60, by + 150, 'NHIỆM VỤ: ' + d.mission, 34, '#ffffff', { ox: 0, oy: 0, align: 'left', wrap: bw - 120, sw: 3 }).setDepth(201));
      const lbl = done ? 'CHƠI LẠI' : (isLair && ct.lair.startBtn ? ct.lair.startBtn : 'BẮT ĐẦU'), lw = lbl.length > 12 ? 720 : 400;
      o.push(G.button(s, bx + bw - 50 - lw / 2, by + bh - 50, lw, 70, lbl, function () { s.start(i); }, { color: isLair ? 'red' : 'green', blink: true, size: lbl.length > 12 ? 40 : 48 }).setDepth(202));
      o.push(G.button(s, bx + 150, by + bh - 50, 220, 70, 'ĐÓNG', function () { s.closeInfo(); }, { color: 'gray', size: 38 }).setDepth(202));
      s.info = o; n.cont.setScale(1.1);
    }
    closeInfo() { this.info.forEach(function (o) { if (o && o.destroy) o.destroy(); }); this.info = []; }
    start(i) {
      const s = this; s.busy = true; s.closeInfo(); const p = G.mapNodes[i + 1]; G.audio.sfx('teleport');
      s.tweens.add({ targets: s.player, x: p.x - 110, y: p.y + 20, duration: 700, ease: 'Sine.easeInOut', onComplete: function () {
        G.beam(s, s.player.x, s.player.y, ['#ffd84a', '#ffd84a', '#7fe8ff', '#b98aff', '#bfefff', '#e0383e'][i], function () { G.go(s, i === 5 ? 'BossLair' : G.stageScene[i]); });
      } });
    }
  }
  G.scenes.push(MapScene);
})();
