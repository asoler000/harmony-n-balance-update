/* ============================================================
   HARMONY & BALANCE — nav.js
   Header scroll state, mobile menu, dropdowns,
   scroll-progress bar, reveal-on-scroll observer.
   ============================================================ */

(function () {
  'use strict';

  /* ── DOM refs ── */
  const header       = document.getElementById('site-header');
  const hamburger    = document.getElementById('hamburger');
  const mobileMenu   = document.getElementById('mobile-menu');
  const progressBar  = document.getElementById('scroll-progress');
  const mobileLinks  = document.querySelectorAll('.mobile-nav__toggle');

  if (!header) return; // guard — nav.js loaded on every page

  /* ── Scroll state: transparent → frosted ── */
  let lastY = 0;

  function onScroll() {
    const y = window.scrollY;

    // Frosted glass after 60px scroll
    if (y > 60) {
      header.classList.add('is-scrolled');
      header.classList.remove('is-top');
    } else {
      header.classList.remove('is-scrolled');
      header.classList.add('is-top');
    }

    // Scroll progress bar (only on blog posts / long pages)
    if (progressBar) {
      const docH   = document.documentElement.scrollHeight - window.innerHeight;
      const pct    = docH > 0 ? (y / docH) * 100 : 0;
      progressBar.style.width = pct + '%';
    }

    lastY = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  /* ── Mobile menu toggle ── */
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (
        mobileMenu.classList.contains('is-open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMobileMenu();
      }
    });
  }

  function closeMobileMenu() {
    hamburger.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  /* ── Mobile accordion sub-menus ── */
  mobileLinks.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      const subId = toggle.getAttribute('data-sub');
      const sub   = document.getElementById(subId);
      if (!sub) return;
      const isOpen = sub.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
  });

  /* ── Mark active nav link based on current path ── */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav__link, .footer__nav-link').forEach(function (link) {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('is-active');
    }
  });

  /* ── Reveal-on-scroll (IntersectionObserver) ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // Fallback: just show everything
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ── Smooth anchor scroll (handles offset for fixed header) ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = header.offsetHeight + 16;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
      closeMobileMenu();
    });
  });


  /* ── Desktop dropdown: click-to-stay-open ──────────────────── */
  document.querySelectorAll('.nav__item').forEach(function (item) {
    var trigger = item.querySelector('[aria-haspopup="true"]');
    if (!trigger) return;
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      var isOpen = item.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(isOpen));
      /* close all siblings */
      document.querySelectorAll('.nav__item.is-open').forEach(function (other) {
        if (other !== item) {
          other.classList.remove('is-open');
          var t = other.querySelector('[aria-haspopup]');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });

  /* Close desktop dropdowns on outside click */
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav__item')) {
      document.querySelectorAll('.nav__item.is-open').forEach(function (item) {
        item.classList.remove('is-open');
        var t = item.querySelector('[aria-haspopup]');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });

  /* Close desktop dropdowns on Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav__item.is-open').forEach(function (item) {
        item.classList.remove('is-open');
        var t = item.querySelector('[aria-haspopup]');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });

})();
