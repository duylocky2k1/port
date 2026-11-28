// Bước 1–3 + màn hình Game Over
(function () {
  const C = G.C, CT = function () { return window.GAME_CONTENT; };

  class Boot extends Phaser.Scene {
    constructor() { super('Boot'); }
    create() {
      this.cameras.main.setBackgroundColor('#0b0820');
      const t = G.txt(this, G.W / 2, G.H / 2, 'ĐANG TẢI...', 60, '#ffd84a');
      const self = this; let started = false;
      function go() {
        if (started) return; started = true;
        G.art.buildCharacters(self); G.art.buildWorld(self); G.art.buildProps(self); G.audio.music(null);
        if (G.DEV) { // ?dev=1&scene=Stage1Forest&char=minhthu&done=2  → nhảy thẳng tới cảnh để thử (không ghi lưu)
          const q = function (k) { const m = new RegExp('[?&]' + k + '=(\\w+)').exec(location.search); return m && m[1]; };
          if (q('scene')) { const d = G.state.data; d.char = q('char') || d.char || 'ngocanh'; const n = parseInt(q('done') || '0'); for (let i = 0; i < 5; i++) { d.completed[i] = i < n; d.treasures[i] = i < n; } d.newUnlock = -1; self.scene.start(q('scene')); return; }
        }
        self.scene.start('Title');
      }
      try { document.fonts.load('40px VT323', 'Ả Ử Đ ạ ế ộ').then(go, go); } catch (e) { go(); }
      setTimeout(go, 1800);
    }
  }

  // ---------- BƯỚC 1: màn hình mở đầu ----------
  class Title extends Phaser.Scene {
    constructor() { super('Title'); }
    create() {
      const s = this; s._leaving = false;
      G.bg(s, 'title'); G.ambient(s, 'clouds'); G.audio.music('title');
      // 5 công chúa + cây nấm trên các bục đất
      const spots = [['ngocanh', 262, 600], ['ngocngan', 520, 520], ['ngocgiao', 760, 752], ['minhthu', 960, 752], ['minhhien', 1152, 552], ['hoangthien', 1330, 752]];
      spots.forEach(function (p, i) { const ch = G.makeChar(s, p[0], p[1], p[2], 4).setDepth(10 + i); ch.idleTween.timeScale = 0.8 + i * 0.07; });
      // Hoàng tử bị giam ở lâu đài + Rồng Giáo Sư canh giữ
      const prince = G.makeNpc(s, 'prince', 1592, 560, 4, { idle: false }).setDepth(8); let w = false;
      s.time.addEvent({ delay: 450, loop: true, callback: function () { w = !w; prince.setTexture('npc_prince_' + (w ? 'b' : 'a')); } });
      const dragon = G.makeNpc(s, 'dragon', 1745, 370, 2.7).setDepth(9);
      s.tweens.add({ targets: dragon, y: 345, duration: 700, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      // logo
      const shadow = G.txt(s, G.W / 2 + 6, 156, CT().title, 160, '#7a1d1d', { sw: 0 }).setDepth(30);
      const logo = G.txt(s, G.W / 2, 150, CT().title, 160, '#ffd84a', { sw: 14 }).setDepth(31);
      s.tweens.add({ targets: [logo, shadow], y: '-=10', duration: 900, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      G.txt(s, G.W / 2, 262, 'MỘT CUỘC PHIÊU LƯU CÙNG GAMIFICATION', 46, '#ffffff', { sw: 6 }).setDepth(31);
      // nút
      const has = G.state.hasSave();
      if (!has) { G.button(s, G.W / 2, 920, 560, 130, 'PLAY', function () { G.go(s, 'CharacterSelect'); }, { color: 'red', blink: true, size: 90 }).setDepth(40); }
      else {
        G.button(s, G.W / 2 - 330, 920, 560, 120, 'TIẾP TỤC', function () { G.go(s, 'MapScene'); }, { color: 'green', blink: true, size: 80 }).setDepth(40);
        G.button(s, G.W / 2 + 330, 920, 560, 120, 'CHƠI MỚI', function () { G.state.reset(); G.go(s, 'CharacterSelect'); }, { color: 'red', size: 80 }).setDepth(40);
      }
      G.txt(s, G.W / 2, 1040, 'F: toàn màn hình   •   M: bật/tắt âm thanh', 30, '#ffffff', { sw: 4 }).setDepth(40);
      G.fadeIn(s);
    }
  }

  // ---------- BƯỚC 2: chọn nhân vật ----------
  class CharacterSelect extends Phaser.Scene {
    constructor() { super('CharacterSelect'); }
    create() {
      const s = this; s._leaving = false; G.bg(s, 'title').setTint(0x8888aa); G.audio.music('title'); G.ambient(s, 'clouds');
      G.txt(s, 760, 70, 'LỰA CHỌN NHÂN VẬT', 100, '#ffd84a', { sw: 10 }).setDepth(30);
      const chars = CT().characters, cards = [], self = this; let sel = -1;
      const x0 = 160, dx = 195, cy = 560;
      // bảng thông tin bên phải (35%)
      const ix = 1330, iy = 130, iw = 540, ih = 800;
      G.panel(s, ix, iy, iw, ih, { fill: '#241848', border: C.gold, rivets: true }).setDepth(20);
      const hint = G.txt(s, ix + iw / 2, iy + ih / 2, 'HÃY CHỌN MỘT\nNHÂN VẬT', 56, '#ffffff', { wrap: iw - 60 }).setDepth(22);
      const info = { name: G.txt(s, ix + iw / 2, iy + 60, '', 42, '#ffffff', { wrap: iw - 50 }).setDepth(22), title: G.txt(s, ix + iw / 2, iy + 128, '', 44, C.gold, { wrap: iw - 50 }).setDepth(22),
        weapon: G.txt(s, ix + 36, iy + 180, '', 34, C.cream, { ox: 0, oy: 0, align: 'left', wrap: iw - 70, sw: 3 }).setDepth(22),
        skill: G.txt(s, ix + 36, iy + 232, '', 32, '#ffffff', { ox: 0, oy: 0, align: 'left', wrap: iw - 70, sw: 3 }).setDepth(22), lbl1: G.txt(s, ix + 36, iy + ih - 150, '', 36, '#ffffff', { ox: 0, sw: 3 }).setDepth(22), lbl2: G.txt(s, ix + 36, iy + ih - 90, '', 36, '#ffffff', { ox: 0, sw: 3 }).setDepth(22) };
      const stars = [[], []];
      for (let r = 0; r < 2; r++) for (let i = 0; i < 5; i++) { stars[r].push(s.add.image(ix + 300 + i * 46, iy + ih - 150 + r * 60, 'ic_star_g').setScale(4.4).setDepth(22).setVisible(false)); }
      function showInfo(c) {
        hint.setVisible(false); info.name.setText(c.name); info.title.setText(c.title); info.weapon.setText('VŨ KHÍ: ' + c.weapon);
        info.skill.setText('TUYỆT CHIÊU – ' + c.skillName + ': ' + c.skill); let fs = 32; info.skill.setFontSize(fs); while (info.skill.height > ih - 232 - 190 && fs > 20) { fs -= 2; info.skill.setFontSize(fs); }
        info.lbl1.setText('CHIẾN ĐẤU'); info.lbl2.setText('KINH NGHIỆM');
        [c.fight, c.exp].forEach(function (v, r) { stars[r].forEach(function (st, i) { st.setVisible(true).setTexture(i < v ? 'ic_star' : 'ic_star_g'); }); });
        Object.keys(info).forEach(function (k) { s.tweens.add({ targets: info[k], alpha: { from: 0, to: 1 }, duration: 200 }); });
      }
      const confirm = G.button(s, 1600, 1000, 520, 84, 'XÁC NHẬN', function () {
        if (sel < 0) return; const ch = cards[sel].ch; G.audio.sfx('confirm'); ch.cheer(); G.burst(s, ch.x, cards[sel].y - 100, 'spark', 30, { speed: 500, life: 900, scale: 3 });
        G.state.data.char = chars[sel].id; G.state.save(); s.time.delayedCall(900, function () { G.go(s, 'Decree'); });
      }, { color: 'green', size: 54 }).setDepth(40);
      confirm.setEnabled(false);
      G.button(s, 330, 1000, 420, 84, 'QUAY LẠI', function () { G.go(s, 'Title'); }, { color: 'blue', size: 50 }).setDepth(40);
      chars.forEach(function (c, i) {
        const x = x0 + i * dx; const g = s.add.graphics().setDepth(12);
        function frame(on) { g.clear(); g.fillStyle(0x1b1030, 1); g.fillRect(x - 90, cy - 250, 180, 420); g.fillStyle(on ? 0xffd84a : 0x6a60a8, 1); g.fillRect(x - 86, cy - 246, 172, 412); g.fillStyle(on ? 0x6a50c8 : 0x3a2d6e, 1); g.fillRect(x - 80, cy - 240, 160, 400); }
        frame(false);
        const glow = s.add.image(x, cy - 30, 'spark').setScale(0).setTint(0xffd84a).setDepth(13).setAlpha(0.6);
        const ch = G.makeChar(s, c.id, x, cy + 100, 4).setDepth(14);
        G.txt(s, x, cy + 205, c.short, c.short.length > 9 ? 30 : 34, '#ffffff', { wrap: 170, sw: 4 }).setDepth(15);
        const zone = s.add.zone(x, cy - 40, 180, 420).setInteractive({ useHandCursor: true }).setDepth(16);
        cards.push({ x: x, y: cy, g: g, frame: frame, ch: ch, glow: glow });
        zone.on('pointerup', function () {
          if (sel === i) return; sel = i; G.audio.sfx('select'); confirm.setEnabled(true);
          cards.forEach(function (cd, k) { const on = k === i; cd.frame(on); s.tweens.killTweensOf(cd.ch); s.tweens.killTweensOf(cd.glow); cd.ch.setScale(on ? 1.18 : 1); cd.ch.setAlpha(on ? 1 : 0.7); cd.glow.setScale(on ? 16 : 0); if (on) { s.tweens.add({ targets: cd.glow, scale: 20, alpha: 0.3, duration: 600, yoyo: true, repeat: -1 }); } });
          const w = ch.weaponImg; s.tweens.add({ targets: w, angle: w.angle - 50, duration: 160, yoyo: true, repeat: 1 });
          G.burst(s, x, cy - 100, 'spark', 10, { speed: 220, life: 600, scale: 2 }); showInfo(c);
        });
      });
      G.fadeIn(s);
    }
  }

  // ---------- BƯỚC 3: sắc lệnh hoàng gia ----------
  class Decree extends Phaser.Scene {
    constructor() { super('Decree'); }
    create() {
      const s = this; s._leaving = false; G.bg(s, 'decree'); G.ambient(s, 'clouds'); G.ambient(s, 'pages'); G.audio.music('library');
      const d = CT().decree; G.fadeIn(s);
      // núi + rồng (trang trí) và hoàng tử mệt mỏi
      const dragon = G.makeNpc(s, 'dragon', 1690, 330, 3).setDepth(5); s.tweens.add({ targets: dragon, y: 305, duration: 800, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      const prince = G.makeNpc(s, 'prince', 200, 790, 5).setDepth(6); let w = false; s.time.addEvent({ delay: 500, loop: true, callback: function () { w = !w; prince.setTexture('npc_prince_' + (w ? 'b' : 'a')); } });
      G.txt(s, G.W / 2, 74, d.heading, 100, '#ffd84a', { sw: 10 }).setDepth(30); G.txt(s, G.W / 2, 156, d.sub, 46, '#ffffff', { sw: 6 }).setDepth(30);
      // cuộn giấy mở ra sau 0.5s
      const sw = 1560, sh = 700, cx = G.W / 2, cy = 520;
      const scroll = G.panel(s, -sw / 2, -sh / 2, sw, sh, { fill: C.paper, border: C.gold, rivets: true }).setPosition(cx, cy).setDepth(20).setScale(1, 0.02);
      const txt = G.txt(s, cx - sw / 2 + 70, cy - sh / 2 + 36, '', 34, '#2a1a10', { ox: 0, oy: 0, align: 'left', wrap: sw - 120, sw: 0, ls: 4 }).setDepth(22);
      const full = d.paragraphs.join('\n\n'); txt.setText(full); let fs = 46; txt.setFontSize(fs); while (txt.height > sh - 80 && fs > 20) { fs -= 1; txt.setFontSize(fs); } txt.setText('');
      const btn = G.button(s, G.W / 2, 930, 560, 110, d.button, function () { G.go(s, 'MapScene'); }, { color: 'red', blink: true, size: 72 }).setDepth(40); btn.setEnabled(false); btn.alpha = 0.6;
      // QUAY LẠI về màn chọn nhân vật (đối xứng với nút SẴN SÀNG)
      G.button(s, 380, 930, 440, 110, 'CHỌN NHÂN VẬT', function () { G.go(s, 'CharacterSelect'); }, { color: 'blue', size: 40 }).setDepth(40);
      let tw = null;
      s.time.delayedCall(500, function () {
        G.audio.sfx('page'); s.tweens.add({ targets: scroll, scaleY: 1, duration: 650, ease: 'Back.easeOut', onComplete: function () {
          tw = G.typewrite(s, txt, full, 60, function () { btn.setEnabled(true); btn.alpha = 1; });
        } });
      });
      s.input.on('pointerdown', function () { if (tw && !tw.done) tw.skip(); });
    }
  }

  // ---------- GAME OVER ----------
  class GameOver extends Phaser.Scene {
    constructor() { super('GameOver'); }
    init(data) { this.retry = data && data.retry; this.boss = !!(data && data.boss); }
    create() {
      const s = this; s._leaving = false; G.audio.music(null); s.cameras.main.setBackgroundColor('#120a24'); G.bg(s, 'maze').setTint(0x442244); G.audio.sfx('gameover');
      const t = G.txt(s, G.W / 2, 250, 'GAME OVER', 220, '#e0383e', { sw: 20 }).setDepth(10); t.setScale(0.3); s.tweens.add({ targets: t, scale: 1, duration: 600, ease: 'Back.easeOut' });
      const ch = G.makeChar(s, G.state.data.char || 'ngocanh', G.W / 2, 700, 6).setDepth(10); ch.bodyImg.setTint(0x8888aa); ch.idleTween.stop();
      const retry = this.retry, boss = this.boss, cb = window.GAME_CONTENT.boss;
      if (boss) { // [SPEC] Rồng Giáo Sư chế nhạo; chơi lại ngay tại Tổ Tri Thức
        G.bg(s, 'lair').setTint(0x553355); const d = G.makeNpc(s, 'dragon', 1560, 760, 3.6).setDepth(9); d.talk(true);
        G.txt(s, G.W / 2, 430, cb.gameOver.join('\n'), 44, '#ffb3b3', { wrap: 1500 }).setDepth(10);
      } else G.txt(s, G.W / 2, 440, 'Bạn đã hết 5 trái tim. Bảo vật đã nhận vẫn được giữ nguyên!', 44, '#ffffff', { wrap: 1500 }).setDepth(10);
      if (retry) G.button(s, G.W / 2 - 330, 900, 580, 110, boss ? cb.gameOverBtn : 'CHƠI LẠI CHẶNG', function () { G.go(s, retry); }, { color: 'green', blink: true, size: 64 }).setDepth(10);
      G.button(s, G.W / 2 + (retry ? 330 : 0), 900, 580, 110, 'VỀ BẢN ĐỒ', function () { G.go(s, 'MapScene'); }, { color: 'blue', size: 64 }).setDepth(10);
      G.fadeIn(s);
    }
  }
  G.scenes = G.scenes || []; G.scenes.push(Boot, Title, CharacterSelect, Decree, GameOver);
})();
