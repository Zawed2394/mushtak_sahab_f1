function toggleMenu() {
  const menu = document.getElementById('nav-menu');
  menu.classList.toggle('active');
}

function toggleTheme() {
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  body.classList.toggle('dark-mode');
  themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
  localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
}

function toggleLanguage() {
  const body = document.body;
  const langToggle = document.getElementById('lang-toggle');
  body.classList.toggle('urdu');
  langToggle.textContent = body.classList.contains('urdu') ? '🇬🇧 English' : '🇵🇰 Urdu';
  localStorage.setItem('language', body.classList.contains('urdu') ? 'urdu' : 'english');
}

// Load saved theme and language
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const savedLanguage = localStorage.getItem('language');
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const langToggle = document.getElementById('lang-toggle');

  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️ Light Mode';
  } else {
    themeToggle.textContent = '🌙 Dark Mode';
  }

  if (savedLanguage === 'urdu') {
    body.classList.add('urdu');
    langToggle.textContent = '🇬🇧 English';
  } else {
    langToggle.textContent = '🇵🇰 Urdu';
  }
});