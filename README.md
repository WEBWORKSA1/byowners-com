# ByOwners.com

**The owner-to-owner marketplace and learning hub.** Free listings for homes, rentals, vacation homes, land, vehicles, boats/RVs and businesses. Includes 24 sourced guides, 8 calculators, an interactive checklist, a lead-generation funnel, donations, contests, careers, and content that updates itself every day.

Static site built with **Jekyll** and hosted free on **GitHub Pages** from the `main` branch. No server and no build step on your side.

---

## Launch checklist (one-time)

1. **Turn on GitHub Pages:** go to Repo → **Settings → Pages**. Under **Source**, choose *Deploy from a branch*, then select `main` and `/ (root)`. Save.
2. **Point the domain to GitHub.** At your DNS provider for `byowners.com`, add these records:

   | Type | Host | Value |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | AAAA | @ | 2606:50c0:8000::153 |
   | AAAA | @ | 2606:50c0:8001::153 |
   | AAAA | @ | 2606:50c0:8002::153 |
   | AAAA | @ | 2606:50c0:8003::153 |
   | CNAME | www | webworksa1.github.io |

   The `CNAME` file in this repo already sets the custom domain to `byowners.com`. Once DNS resolves, go to **Settings → Pages** and tick **Enforce HTTPS**.
3. **Activate the forms (important):** all forms post through FormSubmit to the site's private inbox, and that address is never shown on the site. After the site is live, submit any form once (the newsletter box in the footer is fine). FormSubmit then emails the inbox an **"Activate Form"** link. Click it. Submissions are delivered after activation.
4. **Switch on the automation (about 2 minutes):**
   1. In the repo, click **Add file → Create new file**, name it `.github/workflows/update-content.yml`, and paste in the contents of [`project-docs/automation/update-content.yml`](project-docs/automation/update-content.yml). Commit it. (GitHub only lets the repo owner add workflow files, which is why it isn't already in place.)
   2. Go to **Settings → Actions → General → Workflow permissions**, select **Read and write permissions**, and save.
   3. Open **Actions → "Auto-update content" → Run workflow** once. This run:
      - renders the social share image and PNG icons,
      - pulls the latest housing, mortgage, rental and scam headlines,
      - pulls the Freddie Mac 30- and 15-year mortgage rate averages,
      - checks the curated YouTube videos and the latest uploads from trusted channels.

      After that it runs daily on its own.
5. **Google AdSense:**
   - The AdSense script (`ca-pub-6620975821265271`) is in the `<head>` of every page.
   - `ads.txt` is at the site root.
   - The `google-adsense-account` meta tag is present.

   In AdSense, add the site `byowners.com`, request review, and turn on **Auto ads**. Optionally create display units and paste their slot IDs into `_data/ads.yml` to add fixed in-article and sidebar units. Units with no slot ID are not rendered, so there are no empty boxes. For EEA/UK traffic, turn on Google's consent message under **Privacy & messaging**.
6. **Google Search Console:** add the domain and submit `https://byowners.com/sitemap.xml`.

## Everyday operations

| Task | How |
|---|---|
| Publish a listing | Copy a file in `_listings/`. Rename it, edit the front matter (category, price, city, state, lat/lng, `posted`, `expires`), remove `sample: true`, and commit. It appears on the site, the map, search and the API automatically. |
| Remove an old listing | Delete the file, or let `expires` pass. Expired listings are hidden from browse automatically. |
| Add a guide | Add `_guides/<slug>.md` following `project-docs/GUIDE-SPEC.md`. |
| Change listing prices or plans | Edit `_data/pricing.yml`. |
| Donation links | Edit `assets/js/config.js` → `donate`. PayPal works by default. Paste Buy Me a Coffee, Ko-fi, Stripe or Patreon links to show those buttons. |
| Contests, roles, pro categories | Edit `_data/contests.yml`, `_data/roles.yml`, `_data/pros.yml`. |
| Videos | Add YouTube IDs to `scripts/video-candidates.json`. Each video is checked before it appears. |
| Analytics | Put a GA4 ID in `assets/js/config.js` → `ga4`. It loads only after the visitor accepts cookies. |

## Lead handling

Every form arrives in the inbox as a formatted table. The subject line helps you triage:

- `[ByOwners Lead · HOT] sell · 30301 · ASAP (0–30 days)` comes from the owner-plan wizard and is auto-scored HOT, WARM or NURTURE.
- `[ByOwners Listing · FEATURED] home-sale · Austin, TX 78704` is a listing submission with the chosen plan.
- `[ByOwners] Listing inquiry: …` is a buyer or renter messaging an owner. You relay it.

Each lead also includes the landing page, the referrer and any UTM tags, so you know which page and campaign produced it.

## Structure

```
_config.yml            site settings
_layouts/              default, page, guide, listing, tool, category, legal, prose
_includes/             header (with partner bar), footer, wizard, calculators, cards, schema
_guides/               24 long-form guides (Markdown)
_listings/             listings (Markdown front matter = data)
_data/                 navigation data, pricing, tools, contests, roles + auto-updated JSON
assets/                css/main.css, js/{config,main,calculators,listings}.js, img/
scripts/               daily update job + image renderer (not published)
.github/workflows/     GitHub Actions automation
project-docs/          research, phase-wise build prompts, business plan (not published)
```

## Notices

© ByOwners.com. All rights reserved. ByOwners.com is independent and is not affiliated with any other "by owner" brand, listing portal, MLS or trade association. See `/disclaimer/` on the site for the full trademark and copyright notice.

For website, domain, sponsorship, advertising or partnership inquiries, go to <https://web.works/contact>.
