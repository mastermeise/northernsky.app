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

The ground is the app's Daybreak **predawn** station and its breath drift; the ink, line, and
placeholder colours are the `*OnDark` set; the face is Plus Jakarta Sans 400/500/600. All of it
mirrors `src/lib/tokens.ts` in the app repo — change there first, then here. The copy follows the
app's register (`src/lib/copy.ts`): sentence case, no exclamation marks, never cheerful at you.
Draft status: the headline, the lede, the button label, and the expectation sentence are DRAFT
pending sign-off, like the app's own door copy.

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
