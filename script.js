// Scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.eco-card, .program-card, .impact-item, .team-card, .join-option, .tl-item')
      .forEach(el => observer.observe(el));

    // Mobile menu
    function toggleMenu() {
      document.querySelector('.nav-links').classList.toggle('open');
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      });
    });

    // Stat counter animation
    const countUp = (el, target, suffix='') => {
      let count = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = (count >= 1000 ? (count/1000).toFixed(1)+'K' : Math.round(count)) + suffix;
        if (count >= target) clearInterval(timer);
      }, 30);
    };


    // ===== ANIMATED COUNTER ON SCROLL =====
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = true;
      const raw = entry.target.textContent;
      const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
      const suffix = raw.replace(/[0-9.]/g, '');
      let start = 0;
      const duration = 1800;
      const startTime = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = (start + (num - start) * ease);
        entry.target.textContent = (current >= 1000 ? (current / 1000).toFixed(1) + 'K' : current % 1 !== 0 ? current.toFixed(1) : Math.round(current)) + suffix.replace(/\d/g, '');
        if (progress < 1) requestAnimationFrame(tick);
        else entry.target.textContent = raw;
      };
      requestAnimationFrame(tick);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));


// ===== CUSTOM LEAF CURSOR TRAIL =====
const trail = [];
for (let i = 0; i < 8; i++) {
  const dot = document.createElement('div');
  dot.style.cssText = `position:fixed;pointer-events:none;z-index:9999;font-size:${14 - i}px;opacity:${1 - i * 0.12};transition:transform 0.1s;`;
  dot.textContent = '🍃';
  document.body.appendChild(dot);
  trail.push({ el: dot, x: 0, y: 0 });
}
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
(function animateTrail() {
  trail.forEach((dot, i) => {
    const prev = i === 0 ? { x: mouseX, y: mouseY } : trail[i - 1];
    dot.x += (prev.x - dot.x) * 0.35;
    dot.y += (prev.y - dot.y) * 0.35;
    dot.el.style.left = dot.x - 8 + 'px';
    dot.el.style.top = dot.y - 8 + 'px';
  });
  requestAnimationFrame(animateTrail);
})();


// ===== PARALLAX HERO TEXT ON MOUSE MOVE =====
const heroContent = document.querySelector('.hero-content');
document.querySelector('.hero').addEventListener('mousemove', e => {
  const { innerWidth: w, innerHeight: h } = window;
  const dx = (e.clientX / w - 0.5) * 18;
  const dy = (e.clientY / h - 0.5) * 10;
  if (heroContent) heroContent.style.transform = `translate(${dx}px, ${dy}px)`;
});
document.querySelector('.hero').addEventListener('mouseleave', () => {
  if (heroContent) heroContent.style.transform = 'translate(0,0)';
});


// ===== ACTIVE NAV LINK HIGHLIGHT ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current
      ? 'var(--green-light)' : '';
    link.style.fontWeight = link.getAttribute('href') === '#' + current ? '600' : '';
  });
}, { passive: true });


// ===== SCROLL PROGRESS BAR =====
const bar = document.createElement('div');
bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,var(--green-bright),var(--amber));z-index:9999;transition:width 0.1s;width:0%;';
document.body.appendChild(bar);
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  bar.style.width = pct + '%';
}, { passive: true });


// ===== NEWSLETTER BUTTON FEEDBACK =====
const newsletterBtn = document.querySelector('.newsletter-form button');
const newsletterInput = document.querySelector('.newsletter-form input');
if (newsletterBtn) {
  newsletterBtn.addEventListener('click', () => {
    const email = newsletterInput.value.trim();
    if (!email || !email.includes('@')) {
      newsletterInput.style.border = '2px solid #f4a261';
      newsletterInput.placeholder = 'Please enter a valid email';
      setTimeout(() => {
        newsletterInput.style.border = '';
        newsletterInput.placeholder = 'your@email.com';
      }, 2000);
      return;
    }
    newsletterBtn.textContent = '✓ Subscribed!';
    newsletterBtn.style.background = 'var(--amber)';
    newsletterBtn.style.pointerEvents = 'none';
    newsletterInput.value = '';
    newsletterInput.placeholder = 'Thank you for joining us!';
  });
}


// ===== BACK-TO-TOP BUTTON =====
const topBtn = document.createElement('button');
topBtn.innerHTML = '↑';
topBtn.title = 'Back to top';
topBtn.style.cssText = `position:fixed;bottom:2rem;right:2rem;width:44px;height:44px;border-radius:50%;background:var(--green-bright);color:#fff;border:none;font-size:1.2rem;cursor:pointer;z-index:999;opacity:0;pointer-events:none;transition:opacity 0.3s,transform 0.3s;box-shadow:0 4px 16px rgba(64,145,108,0.35);`;
document.body.appendChild(topBtn);
window.addEventListener('scroll', () => {
  const show = window.scrollY > 500;
  topBtn.style.opacity = show ? '1' : '0';
  topBtn.style.pointerEvents = show ? 'auto' : 'none';
}, { passive: true });
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
topBtn.addEventListener('mouseenter', () => topBtn.style.transform = 'scale(1.1)');
topBtn.addEventListener('mouseleave', () => topBtn.style.transform = 'scale(1)');


// ===== TYPING EFFECT ON HERO EYEBROW =====
const eyebrow = document.querySelector('.hero-eyebrow');
if (eyebrow) {
  const originalText = eyebrow.textContent;
  eyebrow.textContent = '';
  let i = 0;
  const type = () => {
    if (i < originalText.length) {
      eyebrow.textContent += originalText[i++];
      setTimeout(type, 38);
    }
  };
  setTimeout(type, 400);
}


// ===== CARD TILT ON HOVER =====
document.querySelectorAll('.eco-card, .program-card, .team-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});