// Công cụ vẽ pixel art bằng code: mỗi texture được vẽ ở độ phân giải thấp rồi phóng to (nearest) khi hiển thị.
G.art = G.art || {};
(function () {
  // vẽ hình chữ nhật pixel
  G.P = function (c, col, x, y, w, h) { c.fillStyle = col; c.fillRect(x | 0, y | 0, (w || 1) | 0, (h || 1) | 0); };
  // vẽ theo "ma trận chuỗi": mỗi ký tự là 1 màu theo bảng pal ('.' hoặc ' ' = trong suốt)
  G.M = function (c, rows, pal, ox, oy) {
    rows.forEach(function (r, y) { for (let x = 0; x < r.length; x++) { const k = r[x]; if (k === '.' || k === ' ') continue; const col = pal[k]; if (col) { c.fillStyle = col; c.fillRect((ox || 0) + x, (oy || 0) + y, 1, 1); } } });
  };
  // viền đậm 1px quanh toàn bộ hình (tạo cảm giác sprite 16-bit)
  G.outline = function (c, w, h, col) {
    const img = c.getImageData(0, 0, w, h), d = img.data, out = new Uint8ClampedArray(d);
    const rgb = col || [27, 16, 48];
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4; if (d[i + 3] > 0) continue;
      const n = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(function (o) { const nx = x + o[0], ny = y + o[1]; return nx >= 0 && ny >= 0 && nx < w && ny < h && d[(ny * w + nx) * 4 + 3] > 0; });
      if (n) { out[i] = rgb[0]; out[i + 1] = rgb[1]; out[i + 2] = rgb[2]; out[i + 3] = 255; }
    }
    img.data.set(out); c.putImageData(img, 0, 0);
  };
  // tạo texture canvas: fn(ctx,w,h). opts.outline = true để thêm viền
  G.mk = function (scene, key, w, h, fn, opts) {
    if (scene.textures.exists(key)) return key;
    const t = scene.textures.createCanvas(key, w, h), c = t.getContext();
    c.imageSmoothingEnabled = false; fn(c, w, h);
    if (opts && opts.outline) G.outline(c, w, h);
    t.refresh(); return key;
  };
  // hình chữ nhật có bo góc pixel (dùng cho thân/đầu)
  G.blob = function (c, col, x, y, w, h) { G.P(c, col, x + 1, y, w - 2, h); G.P(c, col, x, y + 1, w, h - 2); };
  G.ellipse = function (c, col, cx, cy, rx, ry) { for (let y = -ry; y <= ry; y++) { const half = Math.round(rx * Math.sqrt(1 - (y * y) / (ry * ry + 0.0001))); G.P(c, col, cx - half, cy + y, half * 2 + 1, 1); } };
  G.shade = function (hex, amt) { // sáng/tối màu hex
    const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    r = Math.max(0, Math.min(255, r + amt)); g = Math.max(0, Math.min(255, g + amt)); b = Math.max(0, Math.min(255, b + amt));
    return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  };
})();
