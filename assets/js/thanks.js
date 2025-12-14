(function () {
    const THEME_KEY = 'theme';
    const BTN_IDS = ['theme-toggle', 'theme-toggle-mobile'];

    function updateButtonIcon(btn, theme) {
        if (!btn) return;
        btn.textContent = theme === 'dark' ? '☀️' : '🌙';
        btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        // update all toggle buttons
        BTN_IDS.forEach(id => updateButtonIcon(document.getElementById(id), theme));
    }

    function getInitialTheme() {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored === 'dark' || stored === 'light') return stored;
        return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem(THEME_KEY, next);
    }

    document.addEventListener('DOMContentLoaded', function () {
        applyTheme(getInitialTheme());
        // BTN_IDS.forEach(id => {
        //     const b = document.getElementById(id);
        //     if (b) b.addEventListener('click', toggleTheme);
        // });
    });
})();