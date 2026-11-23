// Namespace toàn cục (chạy từ file:// nên không dùng ES module)
window.G = window.G || {};
G.W = 1920; G.H = 1080;
G.FONT = 'VT323, monospace';
G.DEV = /[?&]dev=1/.test(location.search);
G.C = { // palette UI
  gold: '#ffd84a', goldDark: '#b8860b', cream: '#fff3c4', ink: '#1b1030', wood: '#6b4423', woodDark: '#43260f',
  red: '#e0383e', green: '#3fbf5f', blue: '#4aa3ff', white: '#ffffff', paper: '#f1dfae', paperDark: '#c9a96a',
};
G.num = function (hex) { return parseInt(hex.replace('#', ''), 16); };
G.rng = function (seed) { let s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; };
G.warnEmpty = 'CHƯA CẤU HÌNH NỘI DUNG\nNgười tạo game cần điền vào file content/content.js';
G.stageOrder = ['stage1', 'stage2', 'stage3', 'stage4', 'stage5'];
G.stageScene = ['Stage1Forest', 'Stage2Library', 'Stage3Stream', 'Stage4Maze', 'Stage5Summit'];
