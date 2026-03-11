/* ============================================================
   HARMONY & BALANCE — components.js
   Shared header, mobile menu, newsletter, and footer components.
   Include this script on every page for consistent navigation.
   
   Usage: 
   1. Add <div id="header-placeholder"></div> where header should appear
   2. Add <div id="newsletter-placeholder"></div> where newsletter should appear
   3. Add <div id="footer-placeholder"></div> where footer should appear
   4. Include this script: <script src="js/components.js"></script>
   
   The script auto-detects if page is in /pages/ subfolder and adjusts paths.
   ============================================================ */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  // PATH DETECTION
  // ═══════════════════════════════════════════════════════════════
  
  // Detect if we're in a subfolder (pages/, pages/blog/, etc.)
  const path = window.location.pathname;
  const inPages = path.includes('/pages/');
  const inBlog = path.includes('/pages/blog/');
  
  // Set path prefixes based on location
  let rootPath = '';
  let pagesPath = 'pages/';
  let imagesPath = 'images/';
  let blogPath = 'pages/blog/';
  
  if (inBlog) {
    rootPath = '../../';
    pagesPath = '../';
    imagesPath = '../../images/';
    blogPath = '';
  } else if (inPages) {
    rootPath = '../';
    pagesPath = '';
    imagesPath = '../images/';
    blogPath = 'blog/';
  }

  // ═══════════════════════════════════════════════════════════════
  // SITE-WIDE SETTINGS (Edit these to update across all pages)
  // ═══════════════════════════════════════════════════════════════
  
  const CONTACT = {
    address: '530 7th Ave, Floor 21<br>New York, NY 10018',
    phone: '212.221.1863',
    phoneLink: 'tel:+12122211863',
    email: 'support@golifeworks.com',
    hours: 'Mon – Fri, 9am – 6pm EST'
  };

  const NEWSLETTER = {
    formspreeId: 'xaqpooky',
    eyebrow: 'Stay in the World',
    heading: 'New arrivals, thoughtful stories,<br>and moments of inspiration.',
    placeholder: 'Your email address',
    buttonText: 'Subscribe'
  };

  const SOCIAL = {
    instagram: '#',
    pinterest: '#',
    tiktok: '#'
  };

  // ═══════════════════════════════════════════════════════════════
  // HEADER COMPONENT
  // ═══════════════════════════════════════════════════════════════
  
  const headerHTML = `
<!-- SITE HEADER -->
<header id="site-header" class="is-top">
  <div class="header__inner">

    <a href="${rootPath}index.html" class="header__logo" aria-label="Harmony & Balance home">
      <img src="${imagesPath}h_n_b_logo.svg" alt="Harmony & Balance" class="header__logo-svg" />
    </a>

    <nav class="header__nav" aria-label="Main navigation">
      <ul class="nav__list">
        <li class="nav__item">
          <a href="${rootPath}index.html" class="nav__link">Home</a>
        </li>

        <li class="nav__item">
          <a href="#" class="nav__link" aria-haspopup="true" aria-expanded="false">
            Collections
            <svg class="nav__caret" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 1l4 4 4-4"/>
            </svg>
          </a>
          <div class="nav__dropdown" role="menu">
            <a href="${pagesPath}beauty.html" class="nav__dropdown-link" role="menuitem"><span class="nav__dropdown-icon">✨</span> Beauty Technology</a>
            <a href="${pagesPath}sleep.html" class="nav__dropdown-link" role="menuitem"><span class="nav__dropdown-icon">🌙</span> Sleep & Sound</a>
            <a href="${pagesPath}movement.html" class="nav__dropdown-link" role="menuitem"><span class="nav__dropdown-icon">🧘</span> Yoga & Movement</a>
            <a href="${pagesPath}atmosphere.html" class="nav__dropdown-link" role="menuitem"><span class="nav__dropdown-icon">🌿</span> Aromatherapy</a>
            <a href="${pagesPath}hydration.html" class="nav__dropdown-link" role="menuitem"><span class="nav__dropdown-icon">💧</span> Hydration</a>
          </div>
        </li>

        <li class="nav__item">
          <a href="${pagesPath}${blogPath}index.html" class="nav__link">Journal</a>
        </li>

        <li class="nav__item">
          <a href="${rootPath}index.html#about" class="nav__link">About</a>
        </li>

        <li class="nav__item">
          <a href="${rootPath}index.html#contact" class="nav__link">Contact</a>
        </li>
      </ul>
    </nav>

    <div class="header__actions">
      <a href="${rootPath}index.html#contact" class="btn btn--dark">Request Line Sheet</a>
      <button class="header__hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
      </button>
    </div>

  </div>
</header>

<!-- MOBILE MENU -->
<nav id="mobile-menu" aria-label="Mobile navigation">
  <ul class="mobile-nav__list">
    <li><a href="${rootPath}index.html" class="mobile-nav__link">Home</a></li>

    <li>
      <button class="mobile-nav__link mobile-nav__toggle" data-sub="mobile-sub-collections" aria-expanded="false">
        Collections
        <svg width="14" height="14" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 1l4 4 4-4"/>
        </svg>
      </button>
      <div id="mobile-sub-collections" class="mobile-nav__sub">
        <a href="${pagesPath}beauty.html" class="mobile-nav__sub-link">✨ Beauty Technology</a>
        <a href="${pagesPath}sleep.html" class="mobile-nav__sub-link">🌙 Sleep & Sound</a>
        <a href="${pagesPath}movement.html" class="mobile-nav__sub-link">🧘 Yoga & Movement</a>
        <a href="${pagesPath}atmosphere.html" class="mobile-nav__sub-link">🌿 Aromatherapy</a>
        <a href="${pagesPath}hydration.html" class="mobile-nav__sub-link">💧 Hydration</a>
      </div>
    </li>

    <li><a href="${pagesPath}${blogPath}index.html" class="mobile-nav__link">Journal</a></li>
    <li><a href="${rootPath}index.html#about" class="mobile-nav__link">About</a></li>
    <li><a href="${rootPath}index.html#contact" class="mobile-nav__link">Contact</a></li>
  </ul>

  <div class="mobile-nav__footer">
    <a href="${rootPath}index.html#contact" class="btn btn--dark" style="width:100%; justify-content:center;">Request Line Sheet</a>
  </div>
</nav>
`;

  // ═══════════════════════════════════════════════════════════════
  // NEWSLETTER COMPONENT
  // ═══════════════════════════════════════════════════════════════
  
  const newsletterHTML = `
<!-- NEWSLETTER STRIP -->
<div class="newsletter-strip">
  <div class="newsletter-strip__inner">
    <div class="newsletter-strip__copy">
      <div class="newsletter-strip__eyebrow">${NEWSLETTER.eyebrow}</div>
      <h3 class="newsletter-strip__heading">${NEWSLETTER.heading}</h3>
    </div>
    <form class="newsletter-strip__form" action="https://formspree.io/f/${NEWSLETTER.formspreeId}" method="POST">
      <input class="newsletter-input" type="email" name="email" placeholder="${NEWSLETTER.placeholder}" aria-label="Email address" required />
      <button class="btn btn--gold" type="submit">${NEWSLETTER.buttonText}</button>
    </form>
  </div>
</div>
`;

  // ═══════════════════════════════════════════════════════════════
  // FOOTER COMPONENT
  // ═══════════════════════════════════════════════════════════════
  
  const footerHTML = `
<!-- SITE FOOTER -->
<footer id="site-footer">
  <div class="footer__inner">
    <div class="footer__grid">

      <div class="footer__brand">
        <img src="${imagesPath}h_n_b_logo.svg" alt="Harmony & Balance" class="footer__logo-svg" />
        <p class="footer__tagline">A refined world of beauty, sleep, movement, hydration, and atmosphere—designed to bring calm, confidence, and balance into everyday life.</p>

        <div class="footer__social">
          <a href="${SOCIAL.instagram}" class="social-icon" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
          <a href="${SOCIAL.pinterest}" class="social-icon" aria-label="Pinterest">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 3.132-1.867 3.132-4.562 0-2.387-1.715-4.055-4.163-4.055-2.836 0-4.5 2.126-4.5 4.323 0 .856.33 1.773.741 2.274a.3.3 0 0 1 .069.286c-.076.313-.244.995-.277 1.134-.044.183-.146.222-.337.134C6.41 15.21 5.5 13.42 5.5 11.98 5.5 8.955 7.7 6.2 12.2 6.2c3.568 0 6.34 2.541 6.34 5.937 0 3.542-2.233 6.392-5.333 6.392-1.042 0-2.023-.542-2.359-1.181l-.641 2.397c-.232.894-.859 2.013-1.28 2.695A10 10 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
            </svg>
          </a>
          <a href="${SOCIAL.tiktok}" class="social-icon" aria-label="TikTok">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.26 8.26 0 0 0 4.84 1.55V6.79a4.85 4.85 0 0 1-1.07-.1z"/>
            </svg>
          </a>
        </div>
      </div>

      <div>
        <div class="footer__col-label">Collections</div>
        <ul class="footer__nav-list">
          <li><a href="${pagesPath}beauty.html" class="footer__nav-link">Beauty Technology</a></li>
          <li><a href="${pagesPath}sleep.html" class="footer__nav-link">Sleep & Sound</a></li>
          <li><a href="${pagesPath}movement.html" class="footer__nav-link">Yoga & Movement</a></li>
          <li><a href="${pagesPath}atmosphere.html" class="footer__nav-link">Aromatherapy</a></li>
          <li><a href="${pagesPath}hydration.html" class="footer__nav-link">Hydration</a></li>
        </ul>
      </div>

      <div>
        <div class="footer__col-label">Company</div>
        <ul class="footer__nav-list">
          <li><a href="${rootPath}index.html#about" class="footer__nav-link">About Us</a></li>
          <li><a href="${pagesPath}${blogPath}index.html" class="footer__nav-link">Journal</a></li>
          <li><a href="${rootPath}index.html#contact" class="footer__nav-link">Contact</a></li>
          <li><a href="#" class="footer__nav-link">Press</a></li>
        </ul>
      </div>

      <div>
        <div class="footer__col-label">Retailers</div>
        <ul class="footer__nav-list">
          <li><a href="${rootPath}index.html#contact" class="footer__nav-link">Request Line Sheet</a></li>
          <li><a href="${rootPath}index.html#contact" class="footer__nav-link">Wholesale Enquiries</a></li>
        </ul>
      </div>

    </div>

    <div class="footer__bottom">
      <p class="footer__copy">harmony & balance — © 2026 all rights reserved</p>
      <div class="footer__legal-links">
        <a href="#" class="footer__legal-link">Privacy</a>
        <a href="#" class="footer__legal-link">Terms</a>
        <a href="#" class="footer__legal-link">Accessibility</a>
      </div>
    </div>
  </div>
</footer>
`;

  // ═══════════════════════════════════════════════════════════════
  // INJECT COMPONENTS
  // ═══════════════════════════════════════════════════════════════
  
  // Inject header
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    headerPlaceholder.outerHTML = headerHTML;
  }

  // Inject newsletter
  const newsletterPlaceholder = document.getElementById('newsletter-placeholder');
  if (newsletterPlaceholder) {
    newsletterPlaceholder.outerHTML = newsletterHTML;
  }

  // Inject footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = footerHTML;
  }

  // ═══════════════════════════════════════════════════════════════
  // MARK ACTIVE NAV LINK
  // ═══════════════════════════════════════════════════════════════
  
  // Get current page filename
  const currentPage = path.split('/').pop() || 'index.html';
  
  // Mark active links in nav
  document.querySelectorAll('.nav__dropdown-link, .mobile-nav__sub-link').forEach(function(link) {
    const href = link.getAttribute('href');
    if (href && href.endsWith(currentPage)) {
      link.classList.add('active');
    }
  });

  // Mark Home as active on index
  if (currentPage === 'index.html' || currentPage === '') {
    document.querySelectorAll('.nav__link').forEach(function(link) {
      if (link.getAttribute('href')?.includes('index.html') && !link.getAttribute('href')?.includes('#')) {
        link.classList.add('is-active');
      }
    });
  }

})();
