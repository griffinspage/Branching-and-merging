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