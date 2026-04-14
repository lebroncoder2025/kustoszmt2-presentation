/* ── Main JS ─────────────────────────────────────
   KustoszMT2 Presentation – main.js
   ─────────────────────────────────────────────── */

/* ── Countdown ──────────────────────────────────── */
(function () {
  const target = new Date('2026-04-17T19:00:00').getTime();

  function pad(n) { return String(n).padStart(2, '0'); }

  function update() {
    const now  = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      document.getElementById('cd-days').textContent    = '00';
      document.getElementById('cd-hours').textContent   = '00';
      document.getElementById('cd-minutes').textContent = '00';
      document.getElementById('cd-seconds').textContent = '00';
      const label = document.querySelector('.countdown-label');
      if (label) label.textContent = '🔥 Serwer jest już aktywny!';
      return;
    }

    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000)  / 60000);
    const seconds = Math.floor((diff % 60000)    / 1000);

    document.getElementById('cd-days').textContent    = pad(days);
    document.getElementById('cd-hours').textContent   = pad(hours);
    document.getElementById('cd-minutes').textContent = pad(minutes);
    document.getElementById('cd-seconds').textContent = pad(seconds);
  }

  update();
  setInterval(update, 1000);
})();

/* ── Tab System ─────────────────────────────────── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.dataset.tab;

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    const content = document.getElementById(tabId);
    if (content) content.classList.add('active');
  });
});

/* ── Scroll Reveal ──────────────────────────────── */
(function () {
  const els = document.querySelectorAll(
    '.change-card, .boss-card, .step, .tl-item, .info-item'
  );

  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => observer.observe(el));
})();
