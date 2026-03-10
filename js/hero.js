/* ============================================================
   HARMONY & BALANCE — hero.js  v5
   The definitive hybrid. All 9 upgrades live here.

   FROM v4 (ours):
   ✅ FIX 1 — Lerp orb: 720px rolling light, lerp 0.065
   ✅ FIX 2 — 3D perspective tilt on hero copy (±2.8°/2.2°)
   ✅ FIX 3 — Blue-gray overlay rgba(237,242,245,0.65)
   ✅ FIX 4 — Overlay opacity 0.65, images breathe

   STOLEN FROM YOUR v2 (upgrades 5-9):
   ✅ UP  5 — Masked curtain word reveal: translateY(110%) inside
              overflow:hidden wrapper — the Vogue/Hermès technique
   ✅ UP  6 — Ken Burns image drift in CSS @keyframes kenBurns
   ✅ UP  7 — Full-width progress bar, resets every slide
   ✅ UP  8 — Letter spacing -0.075em, 9rem ceiling
   ✅ UP  9 — Staggered cascade: title +120ms, body +220ms
   ============================================================ */

(function () {
  'use strict';

  if (!document.getElementById('hero')) return;

  /* ========================================
     SLIDE DATA
  ???????????????????????????????????????? */
  var slides = [
    {
      word:    'Breathe',
      eyebrow: 'Aroma Rituals',
      title:   'Wellness technology for a softer, calmer home.',
      body:    'Diffusers and scent rituals designed to turn everyday space into an atmosphere of ease, quiet, and restoration.',
      image:   'images/DIFFUSER.jpg',
      duration: 3800
    },
    {
      word:    'Restore',
      eyebrow: 'Facial Rejuvenation',
      title:   'Beauty tools that make care feel intentional.',
      body:    'Facial devices inspired by modern beauty rituals and time-honored techniques—crafted to support a more radiant-looking routine.',
      image:   'images/FACE-DEVICES-2.jpg',
      duration: 3800
    },
    {
      word:    'Reflect',
      eyebrow: 'Mirrors',
      title:   'Light, clarity, and a more elevated getting-ready ritual.',
      body:    'Thoughtfully designed mirrors that bring precision, glow, and calm to the moments where beauty begins.',
      image:   'images/MIRRORS.jpg',
      duration: 3800
    },
    {
      word:    'Unwind',
      eyebrow: 'Sleep & Sound',
      title:   'A gentler rhythm for rest, recovery, and reset.',
      body:    'Sleep machines and sound-led rituals that help transform the end of the day into something more grounding and restorative.',
      image:   'images/SOUND-MACHINE.jpg',
      duration: 3800
    },
    {
      word:    'Move',
      eyebrow: 'Yoga & Recovery',
      title:   'Balance in motion, strength in ritual.',
      body:    'Yoga wheels and movement essentials designed to support flexibility, release, alignment, and a more centered daily practice.',
      image:   'images/yoga-wheel.jpg',
      duration: 3800
    },
    {
      word:    'Refresh',
      eyebrow: 'Hydration & Environment',
      title:   'Balanced Air. Elevated Comfort.',
      body:    'Devices designed to restore humidity, calm the air, and support the kind of environment where your body — and your skin — can actually recover.',
      image:   'images/FACE-DEVICES.jpg',
      duration: 3800
    },
    {
      word:    'Balance',
      eyebrow: 'Harmony & Balance',
      title:   'Wellness and beauty for a more harmonious way of life.',
      body:    'A design-forward world of rituals across beauty, sleep, movement, and atmosphere—created to help you feel restored, confident, and radiant.',
      image:   null,
      duration: 10000,
      isFinal: true
    }
  ];

  /* ========================================
     DOM REFS
  ???????????????????????????????????????? */
  var hero             = document.getElementById('hero');
  var heroBg           = document.getElementById('hero-bg');
  var heroFinalBg      = document.getElementById('hero-final-bg');   /* image fallback */
  var heroBottom       = document.getElementById('hero-bottom');      /* dots + progress bar */
  var heroVideoWrap    = document.getElementById('hero-video-wrap');
  var heroVideo        = document.getElementById('hero-video');
  var overlayRadial    = document.getElementById('hero-overlay-radial');
  var overlayBottom    = document.getElementById('hero-overlay-bottom');
  var heroContent      = document.getElementById('hero-content');
  var heroContentInner = document.getElementById('hero-content-inner');
  var finalSlide       = document.getElementById('final-slide');
  var slideEyebrow     = document.getElementById('slide-eyebrow');
  var slideWord        = document.getElementById('slide-word');
  var slideTitle       = document.getElementById('slide-title');
  var slideBody        = document.getElementById('slide-body');
  var dotsEl           = document.getElementById('dots');
  var dotsFinalEl      = document.getElementById('dots-final');
  var slideProgBar     = document.getElementById('slide-progress-bar');  /* UP 7 */
  var finalDivider     = document.getElementById('final-divider');
  var finalTagline     = document.getElementById('final-tagline');
  var finalBodyEl      = document.getElementById('final-body');
  var finalProgWrap    = document.getElementById('final-progress-wrap');
  var finalProgBar     = document.getElementById('final-progress-bar');
  var header           = document.getElementById('site-header');
  var orb              = document.getElementById('mouse-light');
  var cursorDot        = document.getElementById('cursor-dot');

  /* ========================================
     1. MOUSE-LIGHT ORB [FIX 1]
     Lerp-eased 720px soft silk-trailing orb.
  ???????????????????????????????????????? */
  var orbX  = window.innerWidth  / 2;
  var orbY  = window.innerHeight / 2;
  var targX = orbX;
  var targY = orbY;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function orbTick() {
    orbX = lerp(orbX, targX, 0.065);
    orbY = lerp(orbY, targY, 0.065);
    if (hero && orb) {
      var rect = hero.getBoundingClientRect();
      orb.style.left = (orbX - rect.left) + 'px';
      orb.style.top  = (orbY - rect.top)  + 'px';
    }
    requestAnimationFrame(orbTick);
  }

  /* ========================================
     2. 3D TEXT TILT [FIX 2]
     perspective(1400px) rotateX/Y on hero copy.
     Max =2.8= Y, =2.2= X. Off on final slide.
  ???????????????????????????????????????? */
  var tiltActive = true;

  function applyTilt(cx, cy) {
    if (!heroContentInner || !tiltActive) return;
    var r  = hero.getBoundingClientRect();
    var xP = ((cx - r.left) / r.width)  * 100;
    var yP = ((cy - r.top)  / r.height) * 100;
    heroContentInner.style.transform =
      'perspective(1400px) rotateX(' + (((50 - yP) / 50) * 2.2) + 'deg) ' +
      'rotateY(' + (((xP - 50) / 50) * 2.8) + 'deg)';
    heroContentInner.style.transition = 'transform 0.08s linear';
  }

  function resetTilt() {
    if (!heroContentInner) return;
    heroContentInner.style.transform  = 'perspective(1400px) rotateX(0deg) rotateY(0deg)';
    heroContentInner.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
  }

  /* ?? Shared mousemove: orb + tilt + cursor dot ?? */
  document.addEventListener('mousemove', function (e) {
    targX = e.clientX;
    targY = e.clientY;
    if (cursorDot) {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top  = e.clientY + 'px';
    }
    if (hero) {
      var r = hero.getBoundingClientRect();
      var inside = e.clientX >= r.left && e.clientX <= r.right &&
                   e.clientY >= r.top  && e.clientY <= r.bottom;
      if (inside && tiltActive) applyTilt(e.clientX, e.clientY);
    }
  });

  if (hero && orb) {
    hero.addEventListener('mouseenter', function () {
      if (cursorDot) cursorDot.style.opacity = '1';
    });
    hero.addEventListener('mouseleave', function () {
      if (cursorDot) cursorDot.style.opacity = '0';
      resetTilt();
    });
    orbTick();
  }

  function dimOrb()   { if (orb) orb.classList.add('dim-orb'); }
  function undimOrb() { if (orb) orb.classList.remove('dim-orb'); }

  /* ========================================
     3. UP 7 = FULL-WIDTH SLIDE PROGRESS BAR
     Resets per slide using DOM reflow trick
     (void offsetWidth forces repaint).
  ???????????????????????????????????????? */
  function resetSlideProgress(duration) {
    if (!slideProgBar) return;
    /* remove class ? force reflow ? re-add with correct duration */
    slideProgBar.classList.remove('animate');
    slideProgBar.style.setProperty('--slide-dur', duration + 'ms');
    /* also set on the parent so CSS @keyframes picks it up */
    var prog = document.getElementById('slide-progress');
    if (prog) prog.style.setProperty('--slide-dur', duration + 'ms');
    void slideProgBar.offsetWidth;           /* DOM reflow trigger */
    slideProgBar.classList.add('animate');
  }

  function hideSlideProgress() {
    if (slideProgBar) {
      slideProgBar.classList.remove('animate');
      slideProgBar.style.width = '0%';
    }
  }

  /* ========================================
     4. HEADLINE LETTER REVEAL (final slide)
  ???????????????????????????????????????? */
  var finalHeadline = document.getElementById('final-headline');
  var letterSpans   = [];

  if (finalHeadline) {
    var text   = 'Harmony & Balance';
    var chars  = text.split('');
    var ampIdx = chars.indexOf('&');

    chars.forEach(function (ch) {
      var span = document.createElement('span');
      span.classList.add('hl');
      if (ch === ' ') {
        span.classList.add('space');
        span.innerHTML = '&nbsp;';
      } else if (ch === '&') {
        span.classList.add('ampersand');
        span.textContent = ch;
      } else {
        span.textContent = ch;
      }
      finalHeadline.appendChild(span);
      letterSpans.push(span);
    });

    letterSpans.forEach(function (span, i) {
      span._delay = 500 + Math.abs(i - ampIdx) * 80;
    });
  }

  function revealHeadline() {
    letterSpans.forEach(function (span) {
      setTimeout(function () { span.classList.add('revealed'); }, span._delay);
    });
  }
  function resetHeadline() {
    letterSpans.forEach(function (span) { span.classList.remove('revealed'); });
  }

  /* ========================================
     5. DOTS
  ???????????????????????????????????????? */
  function buildDots(container) {
    if (!container) return;
    slides.forEach(function (s, i) {
      var btn = document.createElement('button');
      btn.className = 'dot-btn' + (i === 0 ? ' active' : '');
      btn.setAttribute('aria-label', 'Go to ' + s.word);
      btn.addEventListener('click', function () { goTo(i); });
      container.appendChild(btn);
    });
  }
  buildDots(dotsEl);
  buildDots(dotsFinalEl);

  function updateDots(idx) {
    document.querySelectorAll('.dot-btn').forEach(function (d, i) {
      d.classList.toggle('active', i % slides.length === idx);
    });
  }

  /* ========================================
     6. SLIDE TEXT = UP 5 + UP 9
     Using class-state system (not inline
     style overrides) for clean transitions.
     Hero-content-inner gets:
       .slide-copy-visible  ? everything cascades in
       .slide-copy-exiting  ? word flies up, rest fades
  ???????????????????????????????????????? */
  var copyWrap = heroContentInner; /* same element as tilt target */

  function showCopy()  {
    if (!copyWrap) return;
    copyWrap.classList.remove('slide-copy-exiting');
    copyWrap.classList.add('slide-copy-visible');
  }
  function hideCopy()  {
    if (!copyWrap) return;
    copyWrap.classList.remove('slide-copy-visible');
    copyWrap.classList.add('slide-copy-exiting');
  }
  function resetCopy() {
    if (!copyWrap) return;
    copyWrap.classList.remove('slide-copy-visible', 'slide-copy-exiting');
  }

  /* ========================================
     7. FINAL SLIDE ENTER / EXIT
  ???????????????????????????????????????? */
  function resetFinal() {
    if (finalSlide)    finalSlide.classList.remove('shown');
    if (finalDivider)  finalDivider.classList.remove('in');
    if (finalTagline)  finalTagline.classList.remove('in');
    if (finalBodyEl)   finalBodyEl.classList.remove('in');
    if (finalProgWrap) finalProgWrap.classList.remove('visible');
    if (finalProgBar) {
      finalProgBar.style.transition = 'none';
      finalProgBar.style.width = '0%';
    }
    resetHeadline();
  }

  function animateFinal(duration) {
    requestAnimationFrame(function () {
      if (finalSlide)   finalSlide.classList.add('shown');
      revealHeadline();
      if (finalDivider) finalDivider.classList.add('in');
      if (finalTagline) finalTagline.classList.add('in');
      if (finalBodyEl)  finalBodyEl.classList.add('in');
      setTimeout(function () {
        if (finalProgWrap) finalProgWrap.classList.add('visible');
        var remaining = duration - 4000;
        if (finalProgBar) {
          finalProgBar.style.transition = 'width ' + remaining + 'ms linear';
          requestAnimationFrame(function () { finalProgBar.style.width = '100%'; });
        }
      }, 4000);
    });
  }

  function enterFinalMode() {
    tiltActive = false;
    resetTilt();
    hideSlideProgress();
    if (overlayRadial) overlayRadial.classList.add('dim');
    if (overlayBottom) overlayBottom.classList.add('dim');
    if (header)        header.classList.add('is-dark');
    /* Hide the standard dots + progress bar — final slide has its own */
    if (heroBottom)    heroBottom.style.display = 'none';
    /* Activate image fallback FIRST — video fades in on top of it */
    if (heroFinalBg)   heroFinalBg.classList.add('active');
    if (heroVideoWrap) heroVideoWrap.classList.add('active');
    if (heroVideo)     heroVideo.play().catch(function () {});
    if (dotsEl)        dotsEl.classList.add('dots-light');
    if (dotsFinalEl)   dotsFinalEl.classList.add('dots-light');
    if (heroContent)   heroContent.style.display = 'none';
    /* final-slide is now position:absolute — just make it visible */
    if (finalSlide) {
      finalSlide.classList.add('visible');
    }
    dimOrb();
    animateFinal(slides[slides.length - 1].duration);
  }

  function exitFinalMode() {
    tiltActive = true;
    if (overlayRadial) overlayRadial.classList.remove('dim');
    if (overlayBottom) overlayBottom.classList.remove('dim');
    if (header)        header.classList.remove('is-dark');
    if (heroFinalBg)   heroFinalBg.classList.remove('active');
    if (heroVideoWrap) heroVideoWrap.classList.remove('active');
    /* Restore the standard dots + progress bar */
    if (heroBottom)    heroBottom.style.display = '';
    if (dotsEl)        dotsEl.classList.remove('dots-light');
    if (dotsFinalEl)   dotsFinalEl.classList.remove('dots-light');
    if (heroContent)   heroContent.style.display = '';
    if (finalSlide)    finalSlide.classList.remove('visible');
    undimOrb();
    resetFinal();
  }

  /* ========================================
     8. STANDARD SLIDE = full animation sequence
     FIX 3+4: blue-gray overlay 0.65
     UP 5:    curtain word reveal via class states
     UP 7:    progress bar reset per slide
  ???????????????????????????????????????? */
  function setStandardSlide(idx, animate) {
    var s = slides[idx];
    if (!s) return;

    /* = Image transition = */
    if (heroBg) {
      heroBg.classList.add('exiting');
      heroBg.classList.remove('hidden');
      setTimeout(function () {
        heroBg.style.backgroundImage =
          'linear-gradient(to top, rgba(237,242,245,0.65), rgba(237,242,245,0.08)), url(' + s.image + ')';
        heroBg.classList.remove('exiting');
        heroBg.classList.add('active');
      }, animate ? 380 : 0);
    }

    /* = Text exit ? content swap ? text enter = */
    if (animate) {
      hideCopy();
      setTimeout(function () {
        if (slideEyebrow) slideEyebrow.textContent = s.eyebrow;
        if (slideWord)    slideWord.textContent    = s.word;
        if (slideTitle)   slideTitle.textContent   = s.title;
        if (slideBody)    slideBody.textContent    = s.body;
        resetCopy();
        /* micro-tick so reset state is painted before visible */
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            showCopy();
            setTimeout(function () { transitioning = false; }, 950);
          });
        });
      }, 300);
    } else {
      /* init: no animation, just set content + show */
      if (slideEyebrow) slideEyebrow.textContent = s.eyebrow;
      if (slideWord)    slideWord.textContent    = s.word;
      if (slideTitle)   slideTitle.textContent   = s.title;
      if (slideBody)    slideBody.textContent    = s.body;
      resetCopy();
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { showCopy(); });
      });
    }

    /* = UP 7: reset progress bar for this slide = */
    resetSlideProgress(s.duration);
  }

  /* ========================================
     9. CORE goTo
  ???????????????????????????????????????? */
  var current       = 0;
  var transitioning = false;
  var timer         = null;

  function goTo(idx, animate) {
    if (animate === undefined) animate = true;
    if (transitioning && animate) return;
    transitioning = true;

    var prev      = current;
    current       = idx;
    var slide     = slides[idx];
    var prevFinal = slides[prev] && slides[prev].isFinal;
    var nextFinal = slide.isFinal;

    updateDots(idx);
    clearTimeout(timer);
    timer = setTimeout(function () {
      transitioning = false;
      goTo((current + 1) % slides.length);
    }, slide.duration);

    if (nextFinal) {
      if (heroBg) heroBg.classList.add('hidden');
      setTimeout(function () { enterFinalMode(); }, 200);
      setTimeout(function () { transitioning = false; }, 1600);
    } else {
      if (prevFinal) exitFinalMode();
      setStandardSlide(idx, animate);
    }
  }

  /* ========================================
     10. INIT
  ???????????????????????????????????????? */
  (function init() {
    var first = slides[0];
    if (heroBg) {
      heroBg.style.backgroundImage =
        'linear-gradient(to top, rgba(237,242,245,0.65), rgba(237,242,245,0.08)), url(' + first.image + ')';
      heroBg.classList.add('active');
    }
    setStandardSlide(0, false);

    timer = setTimeout(function () {
      transitioning = false;
      goTo(1);
    }, first.duration);
  })();

})();
