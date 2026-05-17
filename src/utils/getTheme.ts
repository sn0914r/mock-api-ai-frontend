export const getTheme = (): "dark" | "light" => {
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return isDark ? "dark" : "light";
};
