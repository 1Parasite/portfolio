// Adam Chorfi — Cybersecurity Portfolio
// Vanilla JS + GSAP ScrollTrigger animations (power3.out easing)

(() => {
  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  navToggle?.addEventListener('click', () => {
    const open = navMenu?.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(!!open));
  });

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Credentials form behavior + subtitle transition
  const credForm = document.getElementById('credForm');
  const credStatus = document.getElementById('credStatus');
  const subtitle = document.querySelector('#credentials .muted');
  credForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (credStatus) credStatus.textContent = '';
    if (window.gsap && subtitle) {
      gsap.to(subtitle, { opacity: 0, duration: 0.3, ease: 'power3.out', onComplete() {
        subtitle.textContent = "Alright, let’s get set up first.";
        gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power3.out' });
      }});
    } else if (subtitle) {
      subtitle.textContent = "Alright, let’s get set up first.";
    }
  });

  // Certifications section is now a static grid + list (no carousel behavior).

  // GSAP + ScrollTrigger animations
  if (window.gsap) {
    const { gsap } = window;
    gsap.registerPlugin(ScrollTrigger);

    // HERO: fade-in up (text) + scale-in (icon)
    gsap.from('.hero-content', { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out' });
    gsap.from('.cyber-orb', { scale: 0.9, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.1 });

    // ABOUT: image from left, text from right
    gsap.from('.about-media', {
      x: -40,
      opacity: 0,
      ease: 'power3.out',
      duration: 0.8,
      scrollTrigger: { trigger: '.about', start: 'top 75%' }
    });
    gsap.from('.about-text', {
      x: 40,
      opacity: 0,
      ease: 'power3.out',
      duration: 0.8,
      scrollTrigger: { trigger: '.about', start: 'top 75%' }
    });

    // ARSENAL: staggered fade-up (0.15s stagger)
    gsap.from('.arsenal .card', {
      y: 24,
      opacity: 0,
      ease: 'power3.out',
      duration: 0.6,
      stagger: 0.15,
      scrollTrigger: { trigger: '.arsenal .grid', start: 'top 80%' }
    });

    // PROJECTS alternating: image zoom-in, text from side
    document.querySelectorAll('.project').forEach((proj) => {
      const img = proj.querySelector('.p-media img');
      const text = proj.querySelector('.p-text');
      const fromLeft = proj.classList.contains('alt-0');

      if (img) {
        gsap.from(img, {
          scale: 0.96,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: proj, start: 'top 70%' }
        });
      }
      if (text) {
        gsap.from(text, {
          x: fromLeft ? 40 : -40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: proj, start: 'top 70%' }
        });
      }
    });

    // TIMELINE: line grows, cards slide alternating
    const line = document.querySelector('.timeline .line');
    if (line) {
      gsap.to(line, {
        height: () => document.querySelector('.t-items')?.scrollHeight || 400,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.timeline', start: 'top 80%' }
      });
    }

    gsap.from('.t-item.left .card', {
      x: -40, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: '.timeline', start: 'top 80%' }
    });
    gsap.from('.t-item.right .card', {
      x: 40, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: '.timeline', start: 'top 80%' }
    });
  }
})();
