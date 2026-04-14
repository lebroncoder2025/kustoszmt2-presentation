/* ── Particle System ─────────────────────────────
   KustoszMT2 Presentation – particles.js
   ─────────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomRange(a, b) { return a + Math.random() * (b - a); }

  function createParticle() {
    return {
      x:     randomRange(0, W),
      y:     randomRange(0, H),
      size:  randomRange(0.5, 2.5),
      vx:    randomRange(-0.3, 0.3),
      vy:    randomRange(-0.6, -0.1),
      alpha: randomRange(0.1, 0.9),
      fade:  randomRange(0.003, 0.008),
      color: Math.random() < 0.7 ? '#C8A020' : '#8B0A0A',
    };
  }

  function initParticles() {
    particles = [];
    const count = Math.floor((W * H) / 8000);
    for (let i = 0; i < count; i++) particles.push(createParticle());
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.fade;

      if (p.alpha <= 0 || p.y < -10) {
        Object.assign(p, createParticle(), { y: H + 5, alpha: 0.05 });
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      const c = p.color === '#C8A020'
        ? `rgba(200,160,32,${p.alpha})`
        : `rgba(139,10,10,${p.alpha})`;
      ctx.fillStyle = c;
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', () => { resize(); initParticles(); });
  resize();
  initParticles();
  tick();
})();
