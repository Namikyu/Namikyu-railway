
(() => {
  const STORAGE_KEY = "namikyuTheme";
  const root = document.documentElement;
  const button = document.querySelector("[data-theme-toggle]");

  // 保存済みテーマを読み込む
  let theme = "light";

  try {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === "dark" || savedTheme === "light") {
      theme = savedTheme;
    }
  } catch (error) {
    console.warn("テーマ設定を読み込めませんでした。", error);
  }

  // テーマを反映
  function applyTheme(nextTheme, save = true) {
    theme = nextTheme;
    root.setAttribute("data-theme", theme);

    if (button) {
      button.textContent = theme === "dark" ? "☀️" : "🌙";
      button.setAttribute(
        "aria-label",
        theme === "dark" ? "通常モードに切り替え" : "ダークモードに切り替え"
      );
      button.title = theme === "dark" ? "通常モード" : "ダークモード";
    }

    if (save) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (error) {
        console.warn("テーマ設定を保存できませんでした。", error);
      }
    }
  }

  // 初期テーマを反映
  applyTheme(theme, false);

  // ボタンを押したときに切り替え
  if (button) {
    button.addEventListener("click", () => {
      applyTheme(theme === "dark" ? "light" : "dark");
    });
  }

  // 別タブでテーマが変更された場合も同期
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      applyTheme(
        event.newValue === "dark" ? "dark" : "light",
        false
      );
    }
  });
})();
