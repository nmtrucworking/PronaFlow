/* =====================================================================================
 * ====================         FUNCTION FOR THEME MANAGEMENT       ====================
 * ===================================================================================== */
export function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme();
}

export function applyTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    const isDarkMode = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDarkMode);
    const bulbScene = document.querySelector('.toggle-scene');
    if (bulbScene) {
        document.documentElement.style.setProperty('--on', isDarkMode ? 1 : 0);
    }
}