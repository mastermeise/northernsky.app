# northernsky.app

Marketing and legal site for **Northern Sky**, a morning check-in for iPhone (the app lives in
`mastermeise/attaboy`, under `ios/`). Static, no build step, hosted on GitHub Pages at
<https://northernsky.app>.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | The whole landing page above the fold: headline, the two questions, the App Store link. The email capture it launched with came down on launch day, 2026-09-30. |
| `privacy.html` | Privacy policy. Required by App Store Connect. Linked from the app's Settings (`Legal` in `Lib/Legal.swift`). Rewritten 2026-09-19 for the free, local app: no accounts, no sync, TelemetryDeck named as the one analytics service. Any change to what the app sends changes this page in the same sitting. |
| `terms.html` | Terms of use. Same link. No subscription section since 2026-09-19. |
| `support.html` | Support URL for the App Store listing. Its FAQ carries the question-shaped queries (missed day, streaks, price). |
| `without-streaks.html` | Why there is no streak. The one page built to rank ("habit tracker without streaks", "journaling app without streaks") and the piece to share on Reddit. Added 2026-09-06 from the landscape study (`listing/competitive-landscape.md` in the app repo, §7). |
| `did-you.html` | The morning-after question, for the long-tail phrase "an app that asks if you did what you said you would". |
| `one-thing.html` | Why one question, not a list. |
| `five-minute-journal-alternative.html` | Honest comparison with the Five Minute Journal app; the proven "alternative to X" page type. Facts about their app are from its App Store listing, September 2026; re-check when it changes. |
| `sitemap.xml`, `robots.txt` | Submit the sitemap to Google Search Console and Bing Webmaster Tools (Brian's accounts) once; re-check `site:northernsky.app` at 30 and 90 days. |
| `site.css` | One stylesheet for every page. |
| `store.js` | The per-channel campaign handler for the App Store link; loaded by every page that carries the link. See below. |
| `img/` | Favicons and the touch icon, downsized from the app icon. |

Internal links are extensionless (`support`, not `support.html`): GitHub Pages serves `/support` from `support.html`, the canonical tags, the sitemap and the app all use that form, and one spelling keeps search engines from seeing two addresses per page. Every page carries the same footer, with a link to every page.

Every page carries the Smart App Banner (`apple-itunes-app`, app id 6809014456); it has shown in Safari since the app went live on 2026-09-30. No `apple-app-site-association`: nothing needs a universal link. The app is free (ruled 2026-09-19; it was $2.99 a month / $19.99 a year with a free week until then), and every page that named a price now says so in one word. The four search pages' copy is DRAFT like the rest, pending Brian's read.

The lede's "Tomorrow, it asks whether you did it." is deliberately not a third question
(2026-09-06): it is a handwritten margin note in Caveat with a drawn arrow pointing back at
the first question. Caveat is the one face off Plus Jakarta Sans on the site, loaded on
`index.html` alone, and it exists only for that note. Don't set anything else in it.

## Where the values come from

The ground is the app's Daybreak **day** station — C2 Deep, ruled 2026-09-06: cobalt overhead,
butter along the horizon, the sun a radial whose centre sits below the frame — and its breath
drift; `day` is a light station, so the ink, line and placeholder colours are the day set and the
pill is ink with white text; the face is Plus Jakarta Sans 400/500/600. All of it mirrors
`src/lib/tokens.ts` in the app repo (`daybreak.stations.day`, `.predawn` for the wake's night) —
change there first, then here. The favicons and the touch icon are the app icon, downsized
(`npm run icon` in the app repo draws it from the same tokens). The copy follows the
app's register (`src/lib/copy.ts`): sentence case, no exclamation marks, never cheerful at you.
Draft status: the headline, the lede, the eyebrow ("For iPhone"), the store button's label and the
line under it are DRAFT pending sign-off, like the app's own door copy.

## The sky wakes

The landing page plays a four-second wake on load (`body.wake`, ruled 2026-09-05 from the
"First light" concept, re-choreographed 2026-09-06 as a sunrise): the page opens on a deep night
with 150 stars out, the night thins into the app's **predawn** sky, predawn thins into the day, the
sun rises at the horizon, the stars dim to a faint twinkle that stays, Polaris blooms high right
with a warm glow, the wordmark resolves letter by letter, then each block rises in order.
Afterwards the twinkle, the sun's drift, the glow's pulse and the breath never stop. The mark,
wordmark and star, is white on every page.

- Transform and opacity only, like the app: layers crossfade, nothing animates a gradient stop.
- The mark sits high right on every page, where the star sits on the icon. The other pages get
  the resting glow and no intro.
- Stars are seeded by the script in `index.html`; each carries its numbers as custom properties
  the stylesheet reads. They are at full strength on the night and dim with it to a faint field
  that never goes out. Under `prefers-reduced-motion` every intro is skipped and the page sits at
  rest, in daylight with the faint stars.
- The glow was ruled at about a third under the first cut; the concepts and the tuning live in
  the "Northern Sky Wake-Up" artifact.

## The App Store link

The landing page's one ask, and the close of the four search pages: an ink pill with Apple's mark
to `https://apps.apple.com/app/apple-store/id6809014456?pt=129208576&ct=website&mt=8`, the same
pattern as greenonions.app. `pt` is the account's provider token (same Apple team as Green Onions);
`ct=website` is the default campaign. Hand out short `northernsky.app/?s=<channel>` addresses (any
page takes it: `/without-streaks?s=reddit`) and `store.js` rewrites `ct` to the channel; anything
outside `[a-z0-9-]{1,30}` falls back to `website`. With JavaScript off the baked-in link still
works. `data-goatcounter-click="cta-appstore"` counts the tap in GoatCounter, with the page it came
from as the referrer. Per-channel conversion = GoatCounter visits for `?s=` → taps → App Store
Connect's product page views and downloads for that campaign.

The email capture it replaced (launch list, 2026-09-05 → 2026-09-30) posted to the `waitlist`
table in the app's Supabase project (migration `supabase/migrations/20260905000003_waitlist.sql`
in the app repo). The table and its addresses are still there; `privacy.html` describes them and
must keep doing so until the list is deleted.

## Deploying

Push to `main`. `.app` is HSTS-preloaded, so HTTPS is mandatory: **Enforce HTTPS** stays on once
the certificate exists.

## DNS

Registrar and DNS are Porkbun. Apex `A` records → GitHub Pages IPs, `www` CNAME →
`mastermeise.github.io`. No mail on this domain: the contact address is a Gmail account.

## Analytics

GoatCounter, site code `northernsky`, snippet on every page. Disclosed in `privacy.html` under
"This website" — change both in the same commit.
