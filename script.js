const toggleBtn = document.getElementById('toggleThemeBtn');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(mode) {
  if (mode === 'dark') {
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = "Switch to Light Mode";
  } else {
    document.body.classList.remove('dark-mode');
    toggleBtn.textContent = "Switch to Dark Mode";
  }
}

// Initialize theme on first load
(function () {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') {
    setTheme(stored);
  } else {
    setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
  }
})();

// Listen for toggle button clicks
toggleBtn.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-mode');
  const newMode = isDark ? 'light' : 'dark';
  setTheme(newMode);
  localStorage.setItem('theme', newMode);
});

// Listen to system preference changes (only if no user preference stored)
prefersDarkScheme.addEventListener('change', (event) => {
  const stored = localStorage.getItem('theme');
  if (stored !== 'light' && stored !== 'dark') {
    setTheme(event.matches ? 'dark' : 'light');
  }
});
