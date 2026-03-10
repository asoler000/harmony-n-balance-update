HARMONY & BALANCE — Website File Structure
===========================================

harmony-balance/
├── index.html                  ← Homepage (hero slider, about, categories, CTA)
│
├── css/
│   ├── global.css              ← Design tokens, reset, typography, buttons, cards, utilities
│   ├── header.css              ← Sticky header, nav, dropdown, mobile hamburger
│   ├── hero.css                ← Hero slideshow, mouse-light orb, final video slide, letter reveal
│   ├── home.css                ← Homepage sections (brand story, category grid, CTA)
│   ├── category.css            ← Category pages (hero, product grid, feature highlights)
│   ├── blog.css                ← Blog listing + single post layout
│   └── footer.css              ← Newsletter strip, footer columns, bottom bar
│
├── js/
│   ├── nav.js                  ← Scroll state, mobile menu, reveal-on-scroll observer
│   └── hero.js                 ← Slide engine, mouse-light orb, letter reveal animation
│
├── pages/
│   ├── beauty.html             ← Beauty collection page
│   ├── sleep.html              ← Sleep collection page
│   ├── movement.html           ← Movement collection page
│   ├── atmosphere.html         ← Atmosphere collection page
│   └── blog/
│       ├── index.html          ← Blog listing (featured + card grid + pagination)
│       └── post-template.html  ← Single blog post template
│
└── images/                     ← Drop all your images here
    ├── h_n_b_logo.svg
    ├── brand-ethos.mp4
    ├── DIFFUSER.png
    ├── FACE-DEVICES.png
    ├── MIRRORS.jpeg
    ├── SOUND-MACHINE.png
    └── yoga-wheel.jpeg

NEXT STEPS
──────────
1. Drop your image files into the /images/ folder
2. Open index.html in a browser — everything links relatively
3. To add a new category page: duplicate beauty.html, rename, update content
4. To add a new blog post: duplicate post-template.html, update text + images
5. To add new CSS: create a new file in /css/ and link it in the relevant HTML <head>
6. When ready for a real web host: upload the whole folder as-is (no build step needed)

FUTURE UPGRADES (when you're ready)
────────────────────────────────────
→ WordPress / Webflow: convert these HTML templates into theme templates
→ CMS: connect a headless CMS (Contentful, Sanity) for blog post management
→ E-commerce: add Shopify Buy Button SDK or migrate to Shopify theme
→ Analytics: add Google Analytics / Meta Pixel script tag before </body>
