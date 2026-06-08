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



/* ============================================================
   EarthKeep — Impact Page JavaScript
   ============================================================ */

'use strict';

/* ---------- SCROLL PROGRESS BAR ---------- */
const scrollBar = document.createElement('div');
scrollBar.id = 'scrollBar';
document.body.prepend(scrollBar);
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  scrollBar.style.width = pct + '%';
}, { passive: true });


/* ---------- INTERSECTION OBSERVER UTILITY ---------- */
const revealOnScroll = (selector, className = 'visible', threshold = 0.12) => {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add(className); obs.unobserve(e.target); } });
  }, { threshold });
  els.forEach((el, i) => {
    el.style.transitionDelay = (i * 0.08) + 's';
    obs.observe(el);
  });
};

revealOnScroll('.kpi-card');
revealOnScroll('.result-card');
revealOnScroll('.species-card');


/* ---------- ANIMATED COUNTER (KPI numbers) ---------- */
const animateCount = (el, rawText) => {
  const num = parseFloat(rawText.replace(/[^0-9.]/g, ''));
  const suffix = rawText.replace(/[0-9.]/g, '').trim();
  const duration = 1800;
  const start = performance.now();
  const tick = now => {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    const val = num * ease;
    const display = val >= 1000
      ? (val / 1000).toFixed(1) + 'K'
      : val % 1 !== 0
        ? val.toFixed(1)
        : Math.round(val);
    el.textContent = display + suffix;
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = rawText;
  };
  requestAnimationFrame(tick);
};

const kpiObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.counted) {
      e.target.dataset.counted = '1';
      const span = e.target.querySelector('.count-target');
      if (span) animateCount(span, span.textContent);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.kpi-card').forEach(c => kpiObserver.observe(c));


/* ---------- DONUT CHART ANIMATION ---------- */
const donutData = [
  { pctEl: 'donutPct1', targetPct: 50, segs: ['.seg1', '.seg2', '.seg3', '.seg4'], dashArrays: ['157 314', '100 314', '62.8 314', '47 314'], dashOffsets: ['157', '57', '-5.8', '-68.8'] },
  { pctEl: 'donutPct2', targetPct: 60, segs: ['.seg5', '.seg6', '.seg7'], dashArrays: ['188 314', '126 314', '75 314'], dashOffsets: ['157', '-31', '-157'] },
  { pctEl: 'donutPct3', targetPct: 70, segs: ['.seg8', '.seg9'], dashArrays: ['220 314', '94 314'], dashOffsets: ['157', '-63'] },
];

const donutObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.animated) {
      e.target.dataset.animated = '1';
      const idx = parseInt(e.target.dataset.chart);
      const d = donutData[idx];
      d.segs.forEach((sel, i) => {
        const seg = e.target.querySelector(sel);
        if (!seg) return;
        setTimeout(() => {
          seg.style.strokeDasharray = d.dashArrays[i];
          seg.style.strokeDashoffset = d.dashOffsets[i];
        }, 200 + i * 150);
      });
      const pctEl = document.getElementById(d.pctEl);
      if (pctEl) {
        let n = 0;
        const interval = setInterval(() => {
          n = Math.min(n + 2, d.targetPct);
          pctEl.textContent = n;
          if (n >= d.targetPct) clearInterval(interval);
        }, 30);
      }
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.chart-wrap').forEach((el, i) => {
  el.dataset.chart = i;
  donutObserver.observe(el);
});


/* ---------- TIMELINE REVEAL ---------- */
const tlObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelector('.tl-bubble')?.classList.add('reveal-done');
      tlObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.tl-event').forEach((el, i) => {
  const bubble = el.querySelector('.tl-bubble');
  if (bubble) bubble.style.transitionDelay = (i * 0.12) + 's';
  tlObserver.observe(el);
});


/* ---------- RESULTS DATA + FILTER ---------- */
const resultsData = [
  { region: 'africa', year: '2019–Present', title: 'Great Rift Restoration', desc: 'Over 200,000 hectares of savannah woodland rehabilitated across Kenya, Tanzania, and Uganda with community co-management.', stat: '200K ha', statLabel: 'Restored' },
  { region: 'americas', year: '2015–Present', title: 'Amazon Canopy Watch', desc: 'Satellite monitoring of 800,000 km² of Brazilian Amazon; 14 deforestation injunctions secured through legal partnerships.', stat: '800K km²', statLabel: 'Monitored' },
  { region: 'asia', year: '2017–Present', title: 'Coral Triangle Initiative', desc: 'Six-nation reef monitoring network covering 30% of global coral reefs, with 12 no-take marine zones established.', stat: '12 zones', statLabel: 'Protected' },
  { region: 'europe', year: '2021–Present', title: 'Northern Boreal Shield', desc: 'Legal designation of 1.4M hectares of boreal forest in Canada and Scandinavia from industrial logging.', stat: '1.4M ha', statLabel: 'Designated' },
  { region: 'africa', year: '2014–Present', title: 'Lamu Marine Reserve', desc: 'East Africa\'s largest Marine Protected Area: 45,000 km² of ocean off the Kenyan coast, safeguarding dugongs and whale sharks.', stat: '45K km²', statLabel: 'Ocean Protected' },
  { region: 'americas', year: '2020–Present', title: 'Andes Cloud Forest Belt', desc: 'Reforestation of 18,000 hectares of Colombian cloud forest with 97 native species, restoring critical freshwater catchments.', stat: '18K ha', statLabel: 'Reforested' },
  { region: 'asia', year: '2022–Present', title: 'Mekong Wetland Corridor', desc: 'Cross-border wetland restoration supporting 340 waterbird species across Vietnam, Cambodia, and Laos.', stat: '340 spp.', statLabel: 'Species Supported' },
  { region: 'africa', year: '2016–Present', title: 'Virunga Gorilla Refuge', desc: 'Anti-poaching units and community benefit programmes protecting 1,000+ mountain gorillas in the Albertine Rift.', stat: '1,000+', statLabel: 'Gorillas Protected' },
  { region: 'europe', year: '2022–Present', title: 'Urban Rewilding Labs', desc: 'Pollinator corridors, urban wetlands, and native plantings across 14 European and African city governments.', stat: '14 cities', statLabel: 'Partnered' },
];

const grid = document.getElementById('resultsGrid');

const renderResults = (filter = 'all') => {
  grid.innerHTML = '';
  const filtered = filter === 'all' ? resultsData : resultsData.filter(r => r.region === filter);
  filtered.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.style.animationDelay = (i * 0.06) + 's';
    card.innerHTML = `
      <div class="result-card-top">
        <span class="result-region">${r.region.charAt(0).toUpperCase() + r.region.slice(1)}</span>
        <span class="result-year">${r.year}</span>
      </div>
      <h4>${r.title}</h4>
      <p>${r.desc}</p>
      <div class="result-stat">${r.stat}</div>
      <div class="result-stat-label">${r.statLabel}</div>
    `;
    grid.appendChild(card);
  });
};

renderResults();

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderResults(btn.dataset.filter);
  });
});


/* ---------- TESTIMONIAL CAROUSEL ---------- */
const cards = document.querySelectorAll('.testimonial-card');
const dotsWrap = document.getElementById('carouselDots');
let current = 0;
let autoTimer;

const buildDots = () => {
  dotsWrap.innerHTML = '';
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
};

const goTo = (idx) => {
  cards[current].classList.remove('active');
  dotsWrap.children[current].classList.remove('active');
  current = (idx + cards.length) % cards.length;
  cards[current].classList.add('active');
  dotsWrap.children[current].classList.add('active');
  resetTimer();
};

const resetTimer = () => {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => goTo(current + 1), 5000);
};

buildDots();
document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));
document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
resetTimer();

// Swipe support
let touchStartX = 0;
document.getElementById('carousel').addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
document.getElementById('carousel').addEventListener('touchend', e => {
  const dx = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
}, { passive: true });


/* ---------- SPECIES SPOTLIGHT DATA ---------- */
const speciesData = [
  { emoji: '🐘', name: 'African Forest Elephant', latin: 'Loxodonta cyclotis', status: 'CR', statusLabel: 'Critically Endangered', recovery: '62%' },
  { emoji: '🦏', name: 'Black Rhinoceros', latin: 'Diceros bicornis', status: 'CR', statusLabel: 'Critically Endangered', recovery: '55%' },
  { emoji: '🐅', name: 'Sumatran Tiger', latin: 'Panthera tigris sumatrae', status: 'CR', statusLabel: 'Critically Endangered', recovery: '48%' },
  { emoji: '🦅', name: 'Philippine Eagle', latin: 'Pithecophaga jefferyi', status: 'CR', statusLabel: 'Critically Endangered', recovery: '71%' },
  { emoji: '🐢', name: 'Leatherback Sea Turtle', latin: 'Dermochelys coriacea', status: 'EN', statusLabel: 'Endangered', recovery: '78%' },
  { emoji: '🦈', name: 'Whale Shark', latin: 'Rhincodon typus', status: 'EN', statusLabel: 'Endangered', recovery: '66%' },
  { emoji: '🦁', name: 'West African Lion', latin: 'Panthera leo leo', status: 'EN', statusLabel: 'Endangered', recovery: '59%' },
  { emoji: '🐒', name: 'Mountain Gorilla', latin: 'Gorilla beringei beringei', status: 'EN', statusLabel: 'Endangered', recovery: '83%' },
];

const speciesGrid = document.getElementById('speciesGrid');
speciesData.forEach(s => {
  const card = document.createElement('div');
  card.className = 'species-card';
  card.style.setProperty('--recovery', s.recovery);
  card.innerHTML = `
    <span class="species-emoji">${s.emoji}</span>
    <h4>${s.name}</h4>
    <span class="species-name">${s.latin}</span>
    <span class="species-status status-${s.status.toLowerCase()}">${s.statusLabel}</span>
    <div class="species-progress"><div class="species-progress-fill"></div></div>
    <span class="species-recovery-label">Population recovery: ${s.recovery}</span>
  `;
  speciesGrid.appendChild(card);
});
revealOnScroll('.species-card');


/* ---------- LEAF CURSOR TRAIL ---------- */
const trail = [];
for (let i = 0; i < 7; i++) {
  const dot = document.createElement('div');
  dot.style.cssText = `position:fixed;pointer-events:none;z-index:9999;font-size:${13 - i}px;opacity:${1 - i * 0.13};will-change:left,top;`;
  dot.textContent = i % 2 === 0 ? '🍃' : '🌿';
  document.body.appendChild(dot);
  trail.push({ el: dot, x: -100, y: -100 });
}
let mx = -100, my = -100;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
(function loopTrail() {
  trail.forEach((t, i) => {
    const prev = i === 0 ? { x: mx, y: my } : trail[i - 1];
    t.x += (prev.x - t.x) * 0.3;
    t.y += (prev.y - t.y) * 0.3;
    t.el.style.left = t.x - 8 + 'px';
    t.el.style.top = t.y - 8 + 'px';
  });
  requestAnimationFrame(loopTrail);
})();


/* ---------- BACK TO TOP ---------- */
const topBtn = document.createElement('button');
topBtn.innerHTML = '&#8593;';
topBtn.title = 'Back to top';
topBtn.style.cssText = 'position:fixed;bottom:2rem;right:2rem;width:44px;height:44px;border-radius:50%;background:var(--green-bright);color:#fff;border:none;font-size:1.1rem;cursor:pointer;z-index:999;opacity:0;pointer-events:none;transition:opacity 0.3s,transform 0.3s;box-shadow:0 4px 16px rgba(64,145,108,0.4);';
document.body.appendChild(topBtn);
window.addEventListener('scroll', () => {
  const show = window.scrollY > 600;
  topBtn.style.opacity = show ? '1' : '0';
  topBtn.style.pointerEvents = show ? 'auto' : 'none';
}, { passive: true });
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
topBtn.addEventListener('mouseenter', () => { topBtn.style.transform = 'scale(1.1)'; });
topBtn.addEventListener('mouseleave', () => { topBtn.style.transform = 'scale(1)'; });


/* ---------- NAV ACTIVE HIGHLIGHT ON SCROLL ---------- */
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  const fromTop = window.scrollY + 140;
  document.querySelectorAll('section[id], header[class]').forEach(sec => {
    const top = sec.offsetTop, bottom = top + sec.offsetHeight;
    if (fromTop >= top && fromTop <= bottom) {
      navLinks.forEach(a => a.classList.remove('active'));
    }
  });
}, { passive: true });


/* ---------- HERO PARALLAX ORBS ON MOUSE ---------- */
const orbs = document.querySelectorAll('.floating-orb');
document.querySelector('.impact-hero')?.addEventListener('mousemove', e => {
  const { innerWidth: w, innerHeight: h } = window;
  const dx = (e.clientX / w - 0.5);
  const dy = (e.clientY / h - 0.5);
  orbs.forEach((orb, i) => {
    const depth = (i + 1) * 14;
    orb.style.transform = `translate(${dx * depth}px, ${dy * depth}px) scale(1.05)`;
  });
});
document.querySelector('.impact-hero')?.addEventListener('mouseleave', () => {
  orbs.forEach(orb => { orb.style.transform = ''; });
});


/* ---------- CARD 3D TILT ---------- */
document.querySelectorAll('.kpi-card, .result-card, .species-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -12;
    card.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${y}deg) translateY(-5px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});


/* ---------- TYPING EFFECT ON EYEBROW ---------- */
const eyebrow = document.querySelector('.eyebrow');
if (eyebrow) {
  const orig = eyebrow.textContent;
  eyebrow.textContent = '';
  let i = 0;
  const type = () => { if (i < orig.length) { eyebrow.textContent += orig[i++]; setTimeout(type, 36); } };
  setTimeout(type, 500);
}

// Team page 
// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.1
});

document
.querySelectorAll(".stat-card, .impact-card, .tl-item")
.forEach(item => observer.observe(item));


// Mobile Menu
function toggleMenu(){
  document
  .querySelector(".nav-links")
  .classList.toggle("open");
}


// Counter Animation
const counters = document.querySelectorAll(".counter");

const runCounter = (counter) => {

  const target = Number(counter.dataset.target);

  let current = 0;

  const step = target / 100;

  const timer = setInterval(() => {

    current += step;

    if(current >= target){
      current = target;
      clearInterval(timer);
    }

    if(target >= 1000000){
      counter.textContent =
      (current / 1000000).toFixed(1) + "M";
    }
    else if(target >= 1000){
      counter.textContent =
      (current / 1000).toFixed(0) + "K";
    }
    else{
      counter.textContent =
      Math.floor(current);
    }

  }, 20);
};

const statObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if(entry.isIntersecting){

      const counter =
      entry.target.querySelector(".counter");

      if(counter && !counter.classList.contains("started")){

        counter.classList.add("started");

        runCounter(counter);
      }

    }

  });

}, {threshold:0.5});

document.querySelectorAll(".stat-card")
.forEach(card => statObserver.observe(card));