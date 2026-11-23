G.state = (function () {
  const KEY = 'gchd_save_v1';
  const fresh = () => ({ char: null, completed: [false, false, false, false, false], treasures: [false, false, false, false, false], bossDone: false, newUnlock: -1 });
  let s = fresh();
  function load() { try { const r = localStorage.getItem(KEY); if (r) s = Object.assign(fresh(), JSON.parse(r)); } catch (e) {} }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  load();
  const api = {
    get data() { return s; },
    hp: 5, // HP chỉ tồn tại trong một chặng, luôn reset về 5
    save, load,
    reset() { s = fresh(); api.hp = 5; save(); },
    hasSave() { return !!s.char; },
    isUnlocked(i) { return i === 0 || s.completed[i - 1]; },
    complete(i) { if (!s.completed[i]) { s.completed[i] = true; s.newUnlock = i + 1; } save(); },
    giveTreasure(i) { if (s.treasures[i]) return false; s.treasures[i] = true; save(); return true; },
    resetHp() { api.hp = 5; },
    lastDone() { let n = -1; s.completed.forEach((c, i) => { if (c) n = i; }); return n; },
  };
  return api;
})();
