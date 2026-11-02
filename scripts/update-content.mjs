#!/usr/bin/env node
/**
 * ByOwners.com — self-updating content job (runs daily in GitHub Actions; Node 20+, no dependencies)
 *
 *  1. Housing/mortgage/rental/consumer-protection headlines  → _data/news.json   (Google News RSS)
 *  2. Weekly average mortgage rates (Freddie Mac PMMS)        → _data/rates.json  (FRED public CSV)
 *  3. Curated YouTube videos, verified embeddable via oEmbed  → _data/videos.json
 *  4. Latest uploads from trusted YouTube channels            → _data/channel_videos.json
 *
 * Each file is only rewritten when its items actually change, so the repo isn't spammed with commits.
 * Any source that fails keeps its previous data (the site never goes blank).
 */
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DATA = path.join(ROOT, "_data");
const UA = "Mozilla/5.0 (compatible; ByOwnersBot/1.0; +https://byowners.com/about/)";

const NEWS_QUERIES = [
  { topic: "By owner", q: '"for sale by owner" OR FSBO home' },
  { topic: "Housing market", q: "housing market home sales prices" },
  { topic: "Mortgage rates", q: "mortgage rates this week" },
  { topic: "Rental market", q: "rental market rents landlords" },
  { topic: "Consumer protection", q: "real estate scam OR rental scam OR wire fraud closing" },
];

async function get(url, { type = "text", timeout = 20000 } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeout);
  try {
    const r = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9" }, signal: ctrl.signal });
    if (!r.ok) { const e = new Error(`HTTP ${r.status} for ${url}`); e.status = r.status; throw e; }
    return type === "json" ? await r.json() : await r.text();
  } finally { clearTimeout(t); }
}

const decode = (s = "") => s
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
  .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).trim();
const tag = (xml, name) => { const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`)); return m ? decode(m[1]) : ""; };

async function readJson(file, fallback) {
  try { return JSON.parse(await fs.readFile(path.join(DATA, file), "utf8")); } catch { return fallback; }
}
async function writeIfChanged(file, obj, compareKey = "items") {
  const prev = await readJson(file, null);
  const same = prev && JSON.stringify(prev[compareKey]) === JSON.stringify(obj[compareKey]);
  if (same) { console.log(`= ${file} unchanged`); return false; }
  await fs.writeFile(path.join(DATA, file), JSON.stringify(obj, null, 2) + "\n");
  console.log(`✓ ${file} updated`);
  return true;
}

/* ---------- 1. News ---------- */
async function news() {
  const all = [];
  for (const { topic, q } of NEWS_QUERIES) {
    try {
      const xml = await get(`https://news.google.com/rss/search?q=${encodeURIComponent(q + " when:7d")}&hl=en-US&gl=US&ceid=US:en`);
      const items = xml.split("<item>").slice(1).map((chunk) => {
        let title = tag(chunk, "title");
        const source = tag(chunk, "source");
        if (source && title.endsWith(" - " + source)) title = title.slice(0, -(source.length + 3));
        return { title, link: tag(chunk, "link"), source: source || "News", date: new Date(tag(chunk, "pubDate") || Date.now()).toISOString(), topic };
      }).filter((i) => i.title && i.link);
      all.push(...items.slice(0, 10));
      console.log(`  news: ${topic} → ${items.length}`);
    } catch (e) { console.warn(`  news: ${topic} failed: ${e.message}`); }
  }
  if (!all.length) return console.warn("! news: no items, keeping previous");
  const seen = new Set();
  const items = all
    .filter((i) => { const k = i.title.toLowerCase().replace(/\W+/g, " ").slice(0, 80); if (seen.has(k)) return false; seen.add(k); return true; })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 40);
  await writeIfChanged("news.json", { updated: new Date().toISOString(), items });
}

/* ---------- 2. Mortgage rates (FRED: MORTGAGE30US, MORTGAGE15US) ---------- */
async function latestFred(series) {
  const csv = await get(`https://fred.stlouisfed.org/graph/fredgraph.csv?id=${series}`);
  const rows = csv.trim().split(/\r?\n/).slice(1).map((l) => l.split(",")).filter((r) => r[1] && r[1] !== ".");
  const last = rows[rows.length - 1];
  return { date: last[0], value: parseFloat(last[1]) };
}
async function rates() {
  try {
    const [r30, r15] = await Promise.all([latestFred("MORTGAGE30US"), latestFred("MORTGAGE15US")]);
    const obj = { updated: new Date().toISOString(), rate30: r30.value, rate15: r15.value, date: r30.date, source: "Freddie Mac Primary Mortgage Market Survey via FRED (St. Louis Fed)" };
    const prev = await readJson("rates.json", {});
    if (prev.rate30 === obj.rate30 && prev.rate15 === obj.rate15 && prev.date === obj.date) return console.log("= rates.json unchanged");
    await fs.writeFile(path.join(DATA, "rates.json"), JSON.stringify(obj, null, 2) + "\n");
    console.log(`✓ rates.json updated (${obj.rate30}% / ${obj.rate15}% week of ${obj.date})`);
  } catch (e) { console.warn(`! rates failed: ${e.message}`); }
}

/* ---------- 3. Curated videos (verify via oEmbed) ---------- */
async function videos() {
  const candidates = JSON.parse(await fs.readFile(path.join(ROOT, "scripts", "video-candidates.json"), "utf8"));
  const prev = await readJson("videos.json", { items: [] });
  const prevById = Object.fromEntries((prev.items || []).map((v) => [v.id, v]));
  const perCat = {};
  const out = [];
  let networkOk = 0;
  for (const c of candidates) {
    if ((perCat[c.category] || 0) >= 4) continue;
    try {
      const j = await get(`https://www.youtube.com/oembed?url=${encodeURIComponent("https://www.youtube.com/watch?v=" + c.id)}&format=json`, { type: "json", timeout: 12000 });
      networkOk++;
      out.push({ id: c.id, title: j.title, channel: j.author_name, category: c.category, featured: false });
      perCat[c.category] = (perCat[c.category] || 0) + 1;
    } catch (e) {
      if (e.status && e.status < 500) { console.log(`  video ${c.id} not embeddable (${e.status}) — skipped`); continue; }
      if (prevById[c.id]) { out.push(prevById[c.id]); perCat[c.category] = (perCat[c.category] || 0) + 1; }
    }
  }
  if (!out.length && !networkOk) return console.warn("! videos: YouTube unreachable, keeping previous");
  // feature the first verified video of the six most important categories
  const featuredCats = ["selling", "renting", "buying", "safety", "money", "marketing"];
  for (const cat of featuredCats) { const v = out.find((x) => x.category === cat); if (v) v.featured = true; }
  await writeIfChanged("videos.json", { updated: new Date().toISOString(), items: out });
}

/* ---------- 4. Latest uploads from trusted channels ---------- */
async function channelVideos() {
  const channels = JSON.parse(await fs.readFile(path.join(ROOT, "scripts", "youtube-channels.json"), "utf8"));
  const items = [];
  for (const ch of channels) {
    try {
      const xml = await get(`https://www.youtube.com/feeds/videos.xml?channel_id=${ch.channel_id}`);
      const entries = xml.split("<entry>").slice(1).slice(0, 3).map((e) => ({
        id: tag(e, "yt:videoId"),
        title: tag(e, "title"),
        channel: tag(tag(e, "author") ? e.match(/<author>[\s\S]*?<\/author>/)[0] : "", "name") || ch.name,
        published: tag(e, "published"),
        category: ch.category || "money",
      })).filter((v) => v.id && v.title && !/#shorts/i.test(v.title));
      items.push(...entries);
      console.log(`  channel ${ch.name} → ${entries.length}`);
    } catch (e) { console.warn(`  channel ${ch.name} failed: ${e.message}`); }
  }
  if (!items.length) return console.warn("! channel videos: none fetched, keeping previous");
  items.sort((a, b) => new Date(b.published) - new Date(a.published));
  await writeIfChanged("channel_videos.json", { updated: new Date().toISOString(), items: items.slice(0, 18) });
}

const tasks = { news, rates, videos, channelVideos };
const only = process.argv[2];
for (const [name, fn] of Object.entries(tasks)) {
  if (only && only !== name) continue;
  console.log(`▶ ${name}`);
  try { await fn(); } catch (e) { console.warn(`! ${name} crashed: ${e.message}`); }
}
