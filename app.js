/**
 * BuildIQ Projects — PMC & Civil Contractors
 * Interactive Application Script
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Initialize Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Navigation & Sticky Behavior
  const header = document.getElementById('main-header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const closeMobileMenuBtn = document.getElementById('close-mobile-menu');

  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuDrawer.classList.remove('hidden');
      mobileMenuDrawer.classList.add('flex');
      document.body.style.overflow = 'hidden';
      if (window.lucide) window.lucide.createIcons();
    });
  }

  if (closeMobileMenuBtn && mobileMenuDrawer) {
    closeMobileMenuBtn.addEventListener('click', () => {
      mobileMenuDrawer.classList.add('hidden');
      mobileMenuDrawer.classList.remove('flex');
      document.body.style.overflow = '';
    });
  }

  if (mobileMenuDrawer) {
    mobileMenuDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuDrawer.classList.add('hidden');
        mobileMenuDrawer.classList.remove('flex');
        document.body.style.overflow = '';
      });
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // =============================================================
  // 3. HERO IMAGE & CONTENT SLIDER
  // =============================================================

  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  let currentHeroSlide = 0;
  let heroInterval = null;

  function showHeroSlide(index) {
    heroSlides.forEach((slide, i) => {
      slide.classList.remove('opacity-100', 'pointer-events-auto');
      slide.classList.add('opacity-0', 'pointer-events-none');

      if (heroDots[i]) {
        heroDots[i].classList.remove('bg-brand-cyan', 'w-4');
        heroDots[i].classList.add('bg-white/50', 'w-2');
      }
    });

    if (heroSlides[index]) {
      heroSlides[index].classList.remove('opacity-0', 'pointer-events-none');
      heroSlides[index].classList.add('opacity-100', 'pointer-events-auto');
    }

    if (heroDots[index]) {
      heroDots[index].classList.remove('bg-white/50', 'w-2');
      heroDots[index].classList.add('bg-brand-cyan', 'w-4');
    }

    currentHeroSlide = index;
  }

  // Allow clicking on navigation dots
  heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showHeroSlide(index);
      resetHeroInterval();
    });
  });

  function startHeroInterval() {
    if (heroSlides.length > 1) {
      heroInterval = setInterval(() => {
        const nextSlide = (currentHeroSlide + 1) % heroSlides.length;
        showHeroSlide(nextSlide);
      }, 4000);
    }
  }

  function resetHeroInterval() {
    clearInterval(heroInterval);
    startHeroInterval();
  }

  if (heroSlides.length > 0) {
    showHeroSlide(0);
    startHeroInterval();
  }

  // 3. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // 4. Portfolio Filter System
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('bg-brand-navy', 'text-white', 'shadow-md');
        b.classList.add('text-slate-600', 'bg-slate-50', 'border', 'border-slate-200');
      });

      btn.classList.add('bg-brand-navy', 'text-white', 'shadow-md');
      btn.classList.remove('text-slate-600', 'bg-slate-50', 'border', 'border-slate-200');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
          card.classList.add('flex');
        } else {
          card.classList.add('hidden');
          card.classList.remove('flex');
        }
      });

      if (window.lucide) window.lucide.createIcons();
    });
  });

  // 5. Lead Form Submission Directly to WhatsApp (+91 86522 23456)
  const leadForm = document.getElementById('consultation-lead-form');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('lead-name')?.value.trim() || 'Client';
      const phone = document.getElementById('lead-phone')?.value.trim() || 'Not provided';
      const location = document.getElementById('lead-location')?.value.trim() || 'Mumbai';
      const service = document.getElementById('lead-service')?.value || 'Civil Contracting';
      const message = document.getElementById('lead-message')?.value.trim() || 'Discussion on project scope';

      const waText = 
        `*New Site Inquiry — BuildIQ Projects*\n` +
        `• *Client Name:* ${name}\n` +
        `• *Phone:* ${phone}\n` +
        `• *Location:* ${location}\n` +
        `• *Required Scope:* ${service}\n` +
        `• *Details:* ${message}\n\n` +
        `Please connect with me to review the site drawings/requirements.`;

      const waUrl = `https://wa.me/918652223456?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      leadForm.reset();
    });
  }

});