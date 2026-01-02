(() => {
  const els = Array.from(document.querySelectorAll('.xp-reveal'));
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('is-visible');
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
  );

  els.forEach((el) => io.observe(el));
})();
