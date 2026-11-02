# ByOwners.com: Phase-by-Phase Build Prompts

Copy each prompt into your AI builder in order. Every phase starts from what the previous phase produced. **Phases 0–8 are already built in this repository.** Phase 9 is the scale-up roadmap.

**Fixed inputs used in every phase:**

- Domain: `byowners.com`. Brand: **ByOwners.com**.
- AdSense publisher: `ca-pub-6620975821265271`. Script: `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6620975821265271" crossorigin="anonymous"></script>`
- Top bar on every page: "Contact, if you are interested in this website / domain name / Sponsorship / Advertisement / Partnership", linking to `https://web.works/contact`.
- One private inbox receives every form submission. Its address must **never** appear in page source, text, links or the repo. Build it at runtime from an obfuscated value and send through a form relay.
- Hosting: GitHub Pages, free plan, `main` branch, repo `webworksa1/byowners-com`.

---

## Phase 0: Strategy and positioning

> You are a marketplace strategist. For the domain ByOwners.com, define the most profitable use: an owner-to-owner marketplace plus education hub. The core is real estate (homes for sale by owner, rentals by owner, vacation homes, land). Expansion verticals are vehicles, boats/RVs, small businesses and commercial property. Define:
> - personas: FSBO seller, DIY landlord, buyer, renter, private vehicle seller, business seller, service pro;
> - revenue stack: AdSense on high-CPC finance and real-estate content, a lead-generation funnel, optional Featured/Spotlight listing upgrades, flat-fee Pro Network advertising, sponsorships, donations;
> - compliance guardrails: Fair Housing Act ad rules; TCPA consent; RESPA §8 (no per-referral fees from settlement-service providers, only flat advertising); AdSense program policies; trademark avoidance for "ByOwner", "ForSaleByOwner", "FSBO.com", "Owners.com" and "Vrbo / Vacation Rentals by Owner".
>
> Output a one-page positioning statement, the sitemap, and a P1/P2/P3 feature list.

## Phase 1: Foundation, design system and compliance pages

> Build a Jekyll site that GitHub Pages can build natively (only the `jekyll-sitemap` plugin, no custom plugins).
> - `_config.yml`: `url: https://byowners.com`, collections `guides` and `listings`.
> - Add `CNAME`, `ads.txt` (`google.com, pub-6620975821265271, DIRECT, f08c47fec0942fa0`), and a templated `robots.txt` that points to the sitemap.
>
> Write one mobile-first CSS design system:
> - tokens for a light and a dark theme, teal/emerald brand plus an amber accent, Inter and Plus Jakarta Sans fonts;
> - buttons, cards, badges, grids, forms, option tiles, wizard, tables, FAQ accordion, modals, toasts, cookie banner, sticky mobile CTA, reading progress bar, print styles;
> - accessibility: skip link, focus rings, `prefers-reduced-motion` support;
> - no horizontal scroll at 390px wide.
>
> Inline an SVG icon sprite (no external icon fonts).
>
> Layouts: `default`, `page`, `prose`, `legal`, `guide`, `listing`, `tool`, `category`.
>
> The `<head>` include must contain:
> - the AdSense script and the `google-adsense-account` meta tag;
> - canonical URL, Open Graph and Twitter cards;
> - JSON-LD for Organization, WebSite + SearchAction, BreadcrumbList, Article, FAQPage and WebApplication.
>
> The header include must contain:
> - the partner top bar above;
> - mega menus for Marketplace, Learn, Tools and Community;
> - search, dark mode, "List free" and "Get started";
> - a mobile drawer.
>
> The footer must contain a newsletter form, link columns, an Equal Housing Opportunity line, and a full trademark and copyright notice stating independence from ByOwner, ForSaleByOwner.com, FSBO.com, Owners.com, Vrbo/Expedia, Zillow, Realtor.com, NAR (REALTOR®) and every MLS.
>
> Legal pages: Privacy, Terms and Disclaimer.
> - Privacy must include Google's required disclosure that third-party vendors, including Google, use cookies to serve ads based on prior visits, with opt-out links to Google Ads Settings and aboutads.info.
> - Terms must cover listing rules, fair housing, "not a broker", DMCA procedure, and contest and donation terms.
> - Disclaimer must cover not-advice, trademarks, copyright, ad disclosure and a fair housing statement.
>
> Also build About, Contact, FAQ (with FAQPage schema), 404, an RSS feed, a PWA manifest and a network-first service worker.

## Phase 2: Marketplace

> Build the listings system on top of the static site.
> - **Listing data:** each `_listings/*.md` front matter holds category, price, city, state, zip, beds, baths, sqft, lot, year, lat/lng, featured, sample, posted and expires.
> - **JSON API:** generate `/api/listings.json` with Liquid.
> - **`listings.js`:** client-side keyword, category, state, price and beds filters; sort; grid, list and map views (Leaflet 1.9.4 from cdnjs with OSM tiles); favorites saved in localStorage with a "Saved" filter; filter state synced to the URL; hide expired listings; an empty state with "List free" and "Create alert" CTAs.
> - **Listing page:** sample banner, fact grid, description, highlights, approximate-area map, a mini mortgage estimate using the live rate, a private "Contact the owner" relay form with a scam warning above the submit button, and a "Report this listing" link.
> - **Category landing pages:** /buy/, /rent/, /land-for-sale-by-owner/, /cars-for-sale-by-owner/, /businesses-for-sale-by-owner/ and /vacation-homes-by-owner/. Each has unique copy, filtered listings, related guides and tools, and a lead CTA card.
> - **/sell/:** Free / Featured $39 / Spotlight $99 pricing cards, then a 4-step listing wizard with an ownership attestation and a fair-housing attestation.
> - **Sample listings:** add 3 clearly labeled SAMPLE listings with `noindex` and `sitemap: false`.

## Phase 3: Lead generation engine

> Build a reusable multi-step wizard, `_includes/lead-wizard.html`, used on /get-started/ (a dedicated landing page with no exit popup) and on the homepage.
>
> Flow:
> 1. **Goal** (9 tiles that auto-advance): sell, rent out, buy, find a rental, sell land, sell a vehicle, sell a business, find a pro, I'm a pro.
> 2. **Branch question** for the chosen goal: property type, vehicle type, industry, profession, or pros needed.
> 3. **Location:** ZIP, with address for sellers only.
> 4. **Timeline.**
> 5. **Goal-specific details:** value range plus help wanted, rent plus beds, budget plus financing, or company plus interests.
> 6. **Contact:**
>    - phone optional;
>    - a required, unchecked Terms consent box;
>    - a separate optional TCPA partner-contact consent box.
>
> Supporting behavior:
> - Conditional steps use `data-if`. Prefill from URL parameters (`?goal=`, `?zip=`, `?cat=`). Save a draft to localStorage. Validate each step. Add a honeypot field.
> - **Lead scoring:** compute HOT / WARM / NURTURE from timeline, phone, help type, value and address. Put the score in the email subject.
> - **Attribution:** capture UTM tags, referrer and landing page.
> - **Delivery:** POST JSON to the FormSubmit AJAX endpoint. Build the endpoint at runtime from the obfuscated inbox value. Send an autoresponse to the lead. If delivery fails, fall back to a mailto link.
> - **Success screen:** personalized next-step links for the chosen goal.
>
> Also build: an exit-intent lead magnet (checklist, at most once per 7 days, never on funnel pages), a sticky mobile CTA, inline CTAs inside guides, and a sidebar CTA.

## Phase 4: Content and SEO (AdSense approval content)

> Write 24 original guides of 1,300–2,000 words each, following GUIDE-SPEC.md. Each guide needs:
> - front matter with takeaways, FAQs (schema) and 3–6 authoritative sources;
> - at least one table and one numbered list;
> - 2–5 internal links and a "Next steps" section;
> - no unverifiable statistics.
>
> Topics:
> - **Selling:** pillar guide, pricing, documents, flat-fee MLS, marketing, negotiating, closing, disclosures, land.
> - **Renting and buying:** landlord pillar, screening (FCRA), rent pricing, lease essentials, fair housing, buying from an owner, owner financing, short-term rentals.
> - **Money and other verticals:** capital gains (Section 121), seller closing costs, commission rule changes (2024 NAR settlement), selling a car, selling a business, scams, staging and photos.
>
> The guide layout needs breadcrumbs, a byline with updated date, reading time and source count, a key-takeaways box, an auto table of contents, reading progress, a mid-article lead CTA, an optional in-article ad slot, FAQs, related videos, sources, a disclaimer, share/print/save buttons and related guides.
>
> Also build:
> - a guides hub with category chips and a filter;
> - an interactive 50-step checklist saved in localStorage;
> - a 60+ term A–Z glossary with filter;
> - an official resources directory;
> - a Trust & Safety center with a red-flags table and a report form;
> - a search index (`/search.json`) with a Ctrl+K search modal and a /search/ page.

## Phase 5: Calculators

> Build 8 dependency-free tools, each on its own page with 300–500 words of explanation, a worked example, FAQs and WebApplication schema:
> - commission savings (bar chart);
> - seller net proceeds (donut);
> - mortgage with taxes, insurance, HOA and PMI (donut, SVG amortization chart and yearly table, prefilled with the live Freddie Mac rate);
> - affordability (28/36 rule, iterating for PMI);
> - rental property (NOI, cap rate, cash-on-cash, DSCR, 1% rule);
> - rent vs. buy with opportunity cost and break-even year (line chart);
> - closing-cost estimator with a buyer/seller toggle;
> - an 8-question sell-by-owner readiness quiz with a scored recommendation.
>
> Every tool needs synced range and number inputs, a "copy link with my numbers" button, print and reset, plus a homepage savings widget.

## Phase 6: Community and monetization pages

> - **/support/:** donation tiers $5 / $25 / $50 / $100 / $500, a custom amount, and a purpose selector (operations, promotion, hiring, prizes). Build the PayPal Donate link at runtime from the hidden inbox. Show optional Buy Me a Coffee, Ko-fi, Stripe and Patreon buttons only when links are configured. Add an allocation bar chart, a "not tax-deductible" notice, and a pledge / sponsorship / in-kind form.
> - **/contests/:** 4 skill-based contests (listing photo, success story, creator challenge, ambassador referrals), an entry form with rights and rules consent, Official Rules (no purchase necessary, 18+, US, judging, prizes funded by sponsors only when announced), and a "sponsor a prize" CTA.
> - **/careers/:** 6 roles and an application form.
> - **/pros/:** 10 pro categories with "Get matched" deep links into the wizard, a Pro Network application, and RESPA-safe flat-fee wording.
> - **/advertise/:** 6 ad products, a media-kit form, and a web.works/contact CTA for website, domain and partnership inquiries.

## Phase 7: Automation (self-updating site)

> - **`scripts/update-content.mjs`** (Node 20, no dependencies) refreshes:
>   - `_data/news.json` from Google News RSS for 5 topics (7-day window, deduplicated, 40 items);
>   - `_data/rates.json` from FRED CSVs MORTGAGE30US and MORTGAGE15US;
>   - `_data/videos.json` by checking every candidate in `scripts/video-candidates.json` against YouTube oEmbed and keeping only embeddable videos;
>   - `_data/channel_videos.json` from YouTube channel RSS feeds.
>
>   Write a file only when its items change, and keep the previous data if a source fails.
> - **`scripts/render-images.sh`** renders the OG image and PNG icons with the runner's headless Chrome when they're missing.
> - **`.github/workflows/update-content.yml`** runs daily, on manual dispatch, and on pushes that change `scripts/`. It needs `contents: write` and `pages: write`, commits only on change, and then requests a Pages rebuild.
> - The site renders this data at build time: a homepage market-pulse ticker, the /news/ page, rate pills, the default mortgage rate, and the video hub. Empty states must degrade gracefully.

## Phase 8: QA and launch

> Build with `jekyll build` (github-pages gem).
>
> With Playwright, check:
> - every page has zero JS errors;
> - the wizard works end to end with the relay endpoint mocked;
> - each calculator's output matches the worked example in its copy;
> - listings filter correctly;
> - search returns results;
> - there is no horizontal overflow at 390px.
>
> Then grep the repo and the build output to confirm the inbox address appears nowhere. Validate `search.json` and `api/listings.json`.
>
> Launch:
> 1. Enable Pages (`main`, `/`).
> 2. Add the DNS A/AAAA records and the `www` CNAME.
> 3. Enforce HTTPS.
> 4. Activate FormSubmit.
> 5. Set Actions to read/write and run the workflow once.
> 6. Submit the sitemap in Search Console.
> 7. Apply to AdSense and turn on Auto ads and the Privacy & messaging CMP.

## Phase 9: Scale-up roadmap (next)

> 1. **Self-serve marketplace:**
>    - move listings to Supabase (free tier: Postgres, auth, storage);
>    - add owner accounts, photo uploads, edit and renew, and saved searches with email alerts;
>    - keep the static front end and read listings via the Supabase JS client.
> 2. **Payments:** Stripe Payment Links or Checkout for Featured and Spotlight, plus recurring Pro Network subscriptions.
> 3. **Programmatic SEO done right:** 50 state hubs ("Sell your house by owner in Texas") with real state-specific data — disclosure forms, attorney-closing states, transfer tax tables — reviewed for accuracy. Then the top 100 metro rent and price pages from public data (Census ACS, FRED, HUD Fair Market Rents).
> 4. **Lead monetization upgrades:**
>    - investor cash-offer marketplace (flat price per lead);
>    - lender pre-approval partnerships (flat advertising only);
>    - optionally partner with or form a licensed brokerage to earn legal agent-referral fees in states that allow them.
> 5. **Email engine:** a double-opt-in newsletter on a free ESP tier, a 5-email owner nurture sequence, and listing alerts.
> 6. **Spanish edition** (`/es/`) for the top 10 guides and the wizard.
> 7. **Trust layer:** owner verification badges (county-record match), a review system for pros, and a fraud-pattern blocklist.
