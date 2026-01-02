// Adam Chorfi Portfolio - main interactivity + scroll reveal
(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const yearEl = document.getElementById('year');

  // Dynamic year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme handling
  const storedTheme = localStorage.getItem('theme') || 'dark';
  if (storedTheme === 'light') root.classList.add('light');
  updateThemeIcon();

  themeToggle?.addEventListener('click', () => {
    root.classList.toggle('light');
    const isLight = root.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeIcon();
  });

  function updateThemeIcon() {
    const span = themeToggle?.querySelector('.icon');
    if (!span) return;
    const isLight = root.classList.contains('light');
    span.textContent = isLight ? '☀️' : '🌙';
  }

  // Mobile nav toggle
  navToggle?.addEventListener('click', () => {
    const isOpen = navMenu?.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(!!isOpen));
  });

  // Close nav on link click (mobile)
  navMenu?.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    })
  );

  // Simple form validation and fake submit
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = (fd.get('name') || '').toString().trim();
    const email = (fd.get('email') || '').toString().trim();
    const message = (fd.get('message') || '').toString().trim();

    let valid = true;
    clearFieldMsg('name');
    clearFieldMsg('email');
    clearFieldMsg('message');

    if (name.length < 2) { setFieldMsg('name', 'Please enter your name.'); valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setFieldMsg('email', 'Please enter a valid email.'); valid = false; }
    if (message.length < 10) { setFieldMsg('message', 'Message should be at least 10 characters.'); valid = false; }

    if (!valid) return;

    // Fake async submit
    status.textContent = 'Sending...';
    setTimeout(() => {
      status.textContent = 'Message sent! I will get back to you soon.';
      form.reset();
    }, 900);
  });

  function setFieldMsg(field, msg) {
    const p = document.querySelector(`.field-msg[data-for="${field}"]`);
    if (p) p.textContent = msg;
  }
  function clearFieldMsg(field) { setFieldMsg(field, ''); }

  // Scroll reveal animations using IntersectionObserver
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('show');
          obs.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    revealEls.forEach((el) => obs.observe(el));
  } else {
    // Fallback: show immediately
    document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => el.classList.add('show'));
  }
})();
