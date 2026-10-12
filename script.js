// ============================================================
// 极简交互脚本
// 目前只做两件事：主题切换 + 自动填当前年份
// ============================================================

(function () {
  // ---------- 1. 主题切换（亮 / 暗） ----------
  const KEY = "theme-preference";
  const toggle = document.getElementById("theme-toggle");

  function getInitialTheme() {
    // 优先用用户上次选择，其次跟随系统
    const saved = localStorage.getItem(KEY);
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (toggle) toggle.textContent = theme === "dark" ? "◑" : "◐";
  }

  applyTheme(getInitialTheme());

  if (toggle) {
    toggle.addEventListener("click", () => {
      const current =
        document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(KEY, next);
    });
  }

  // ---------- 2. 页脚年份自动更新 ----------
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
