function toggleMenu() {
  const menu = document.getElementById('nav-menu');
  if (menu) {
    menu.classList.toggle('active');
    const menuToggle = document.querySelector('.menu-toggle');
    const isActive = menu.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isActive);
    console.log('Menu toggled:', isActive ? 'Open' : 'Closed');
  } else {
    console.error('Error: #nav-menu element not found');
  }
}

function toggleTheme() {
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    body.classList.toggle('dark-mode');
    themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    console.log('Theme toggled:', body.classList.contains('dark-mode') ? 'Dark' : 'Light');
  } else {
    console.error('Error: #theme-toggle element not found');
  }
}

function toggleLangDropdown() {
  const langMenu = document.getElementById('lang-menu');
  if (langMenu) {
    langMenu.classList.toggle('active');
    const langToggle = document.getElementById('lang-toggle');
    langToggle.setAttribute('aria-expanded', langMenu.classList.contains('active'));
    console.log('Language dropdown toggled:', langMenu.classList.contains('active') ? 'Open' : 'Closed');
  } else {
    console.error('Error: #lang-menu element not found');
  }
}

function setLanguage(lang) {
  const body = document.body;
  const langToggle = document.getElementById('lang-toggle');
  const langMenu = document.getElementById('lang-menu');
  if (langToggle && langMenu) {
    body.classList.remove('urdu', 'hindi');
    if (lang === 'ur') body.classList.add('urdu');
    if (lang === 'hi') body.classList.add('hindi');
    langToggle.textContent = lang === 'ur' ? 'اردو' : lang === 'hi' ? 'हिन्दी' : 'Eng';
    langMenu.classList.remove('active');
    langToggle.setAttribute('aria-expanded', 'false');
    localStorage.setItem('language', lang);
    console.log('Language set to:', lang);
  } else {
    console.error('Error: #lang-toggle or #lang-menu element not found');
  }
}

function setActiveNavLink() {
  const navLinks = document.querySelectorAll('#nav-menu a');
  const sections = document.querySelectorAll('main section');
  let currentSection = '';

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
      currentSection = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });

  console.log('Active section:', currentSection || 'none');
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing...');
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const langToggle = document.getElementById('lang-toggle');
  const form = document.getElementById('contact-form');
  const navLinks = document.querySelectorAll('#nav-menu a');

  // Initialize theme
  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-mode');
      themeToggle.textContent = '☀️';
    } else {
      themeToggle.textContent = '🌙';
    }
    themeToggle.addEventListener('click', toggleTheme);
    console.log('Theme initialized:', savedTheme || 'light');
  } else {
    console.error('Error: #theme-toggle element not found on load');
  }

  // Initialize language
  if (langToggle) {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'ur') {
      body.classList.add('urdu');
      langToggle.textContent = 'اردو';
    } else if (savedLanguage === 'hi') {
      body.classList.add('hindi');
      langToggle.textContent = 'हिन्दी';
    } else {
      langToggle.textContent = 'Eng';
    }
    console.log('Language initialized:', savedLanguage || 'english');
  } else {
    console.error('Error: #lang-toggle element not found on load');
  }

  // Form submission handler
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          alert('Message sent successfully!');
          form.reset();
        } else {
          alert('Error sending message. Please try again.');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        alert('An error occurred. Please try again later.');
      } finally {
        submitButton.disabled = false;
      }
    });
  } else {
    console.error('Error: #contact-form element not found');
  }

  // Initialize active nav link
  if (navLinks.length) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const menu = document.getElementById('nav-menu');
        if (menu && window.innerWidth <= 600) {
          menu.classList.remove('active');
          const menuToggle = document.querySelector('.menu-toggle');
          menuToggle.setAttribute('aria-expanded', 'false');
          console.log('Mobile menu closed after nav link click');
        }
        console.log('Nav link clicked:', link.getAttribute('href'));
      });
    });
    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink();
    console.log('Active nav initialized');
  } else {
    console.error('Error: #nav-menu a elements not found');
  }
});