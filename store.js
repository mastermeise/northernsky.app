// Per-channel App Store attribution, on every page that carries the store link.
//
// Apple ignores utm_* entirely: it reads its own pt/ct/mt tokens, and a campaign link is far
// too long to post anywhere a person has to read it. So we hand out short
// northernsky.app/?s=<channel> addresses (or /without-streaks?s=reddit) and rewrite the store
// link's campaign token here. GoatCounter gives the visits App Store Connect can't see, Apple's
// per-campaign product page views give the other end, and dividing them is the channel's
// conversion. The link's data-goatcounter-click counts the tap in between.
//
// The default campaign is baked into the href, so with JavaScript off, a mangled parameter or
// this file failing to load, the link is still a valid attributed App Store link. This can only
// ever change which campaign, never break the link. Same handler as greenonions.app.
(function () {
  var DEFAULT_CAMPAIGN = 'website';

  var raw = new URLSearchParams(window.location.search).get('s') || '';
  // Apple's campaign tokens are a restricted set. Anything outside it is junk or someone
  // poking at the query string: fall back rather than mint a campaign that pollutes the report.
  var campaign = /^[a-z0-9-]{1,30}$/.test(raw.toLowerCase())
    ? raw.toLowerCase()
    : DEFAULT_CAMPAIGN;

  var links = document.querySelectorAll('a[data-store-link]');
  for (var i = 0; i < links.length; i++) {
    try {
      var u = new URL(links[i].href);
      u.searchParams.set('ct', campaign);
      links[i].href = u.toString();
    } catch (e) {
      /* Leave the href exactly as authored. */
    }
  }
})();
