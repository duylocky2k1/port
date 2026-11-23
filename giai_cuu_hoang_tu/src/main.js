// Khởi động Phaser
(function () {
  const game = new Phaser.Game({
    type: Phaser.AUTO, parent: 'game', width: G.W, height: G.H, backgroundColor: '#0b0820', pixelArt: true, antialias: false, roundPixels: true,
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    scene: G.scenes, input: { keyboard: true },
  });
  G.game = game;
  window.addEventListener('keydown', function (e) {
    if (e.code === 'KeyF') { game.scale.toggleFullscreen(); }
    if (e.code === 'KeyM') { G.audio.toggle(); }
  });
  if (G.DEV) window.__G = G;
})();
