# northernsky.app

Marketing and legal site for **Northern Sky**, a morning check-in for iPhone (the app lives in
`mastermeise/attaboy`, under `ios/`). Static, no build step, hosted on GitHub Pages at
<https://northernsky.app>.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | The whole landing page above the fold: headline, one sentence, email capture. Coming-soon state; the App Store button replaces the form at launch. |
| `privacy.html` | Privacy policy. Required by App Store Connect and by Google's OAuth brand verification. Linked from the app's paywall and Settings (`Legal` in `Store/Subscription.swift`). |
| `terms.html` | Terms of use. Same links. |
| `support.html` | Support URL for the App Store listing. |
| `site.css` | One stylesheet for all four pages. |
| `img/` | Favicons and the touch icon, downsized from the app icon. |

## Where the values come from

The ground is the app's Daybreak **day** station — C2 Deep, ruled 2026-09-06: cobalt overhead,
butter along the horizon, the sun a radial whose centre sits below the frame — and its breath
drift; `day` is a light station, so the ink, line and placeholder colours are the day set and the
pill is ink with white text; the face is Plus Jakarta Sans 400/500/600. All of it mirrors
`src/lib/tokens.ts` in the app repo (`daybreak.stations.day`, `.predawn` for the wake's night) —
change there first, then here. The favicons and the touch icon are the app icon, downsized
(`npm run icon` in the app repo draws it from the same tokens). The copy follows the
app's register (`src/lib/copy.ts`): sentence case, no exclamation marks, never cheerful at you.
Draft status: the headline, the lede, the button label, and the expectation sentence are DRAFT
pending sign-off, like the app's own door copy.

## The sky wakes

The landing page plays a four-second wake on load (`body.wake`, ruled 2026-09-05 from the
"First light" concept, re-choreographed 2026-09-06 as a sunrise): the page opens on a deep night
with 150 stars out, the night thins into the app's **predawn** sky, predawn thins into the day, the
sun rises at the horizon, the stars dim to a faint twinkle that stays, Polaris blooms high right
with a warm glow, the wordmark resolves letter by letter, then each block rises in order.
Afterwards the twinkle, the sun's drift, the glow's pulse and the breath never stop. The star in
the mark is white on every page; the wordmark takes the page's ink.

- Transform and opacity only, like the app: layers crossfade, nothing animates a gradient stop.
- The mark sits high right on every page, where the star sits on the icon. The other pages get
  the resting glow and no intro.
- Stars are seeded by the script in `index.html`; each carries its numbers as custom properties
  the stylesheet reads. They are at full strength on the night and dim with it to a faint field
  that never goes out. Under `prefers-reduced-motion` every intro is skipped and the page sits at
  rest, in daylight with the faint stars.
- The glow was ruled at about a third under the first cut; the concepts and the tuning live in
  the "Northern Sky Wake-Up" artifact.

## Email capture

The form POSTs to the app's Supabase project (`waitlist` table, migration
`supabase/migrations/20260905000003_waitlist.sql` in the app repo). The key on the page is the
project's publishable identifier: the table grants `anon` insert only and RLS lets nothing be read
back, so the page cannot list addresses. A duplicate address returns 409 and reads as success.
No JavaScript, no honeypot trip, or a network failure all fall to the same calm line.

## Deploying

Push to `main`. `.app` is HSTS-preloaded, so HTTPS is mandatory: **Enforce HTTPS** stays on once
the certificate exists.

## DNS

Registrar and DNS are Porkbun. Apex `A` records → GitHub Pages IPs, `www` CNAME →
`mastermeise.github.io`. No mail on this domain: the contact address is a Gmail account.

## Analytics

GoatCounter, site code `northernsky`, snippet on every page. Disclosed in `privacy.html` under
"This website" — change both in the same commit.
