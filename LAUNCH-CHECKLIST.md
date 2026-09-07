# Delta Kitchen & Grills — Pre-Launch Checklist

Work through this before pointing your domain at the live site. Test on an actual phone, not just a resized browser window — mobile Safari and Chrome both behave differently from desktop dev tools.

## 1. Content — fill in the placeholders
- [ ] Add real prices for all 5 swallow options in `cart.js` (`SWALLOWS` array — currently ₦0 placeholders)
- [ ] Add the real takeaway pack price in `cart.js` (`TAKEAWAY_PACK_PRICE` — currently ₦0)
- [ ] Add opening hours in `contact.html` (currently a placeholder line)
- [ ] Double-check every dish price in `cart.js` is current — menu prices are the #1 thing customers screenshot and hold you to

## 2. Images — the biggest gap right now
- [ ] Every dish in `cart.js` needs its matching photo in `/images/` (check filenames match exactly — case-sensitive on most servers, so `Jollof.jpg` ≠ `jollof.jpg`)
- [ ] Confirm `images/logo2.png` and `images/dkg.jpeg` (hero box) are your real, final files — not placeholders
- [ ] Open every page and look for any tile still showing a plain color gradient with no photo — that means the image is missing or misnamed
- [ ] Compress photos before upload (aim under ~300KB each) — large images are the most common reason a food site feels slow on mobile data

## 3. Links & buttons — click every single one
- [ ] Nav links on all 3 pages (Home, Menu, Gallery, Contact) go to the right place
- [ ] "Call to order" buttons actually dial (test on an actual phone — `tel:` links do nothing on desktop)
- [ ] Every "Order on WhatsApp" button opens WhatsApp with the message pre-filled correctly
- [ ] Footer nav links on all 3 pages
- [ ] Category cards on the homepage jump to the correct menu section (`menu.html#soups` etc.)
- [ ] Email link opens mail app with `deltakitchen9@gmail.com` correctly
- [ ] Address link opens Google Maps to the right spot

## 4. Cart & ordering flow — the core feature
- [ ] Add a soup, pick a swallow, check "takeaway," confirm the price and name shown in the cart drawer are correct
- [ ] Add the same dish twice with *different* swallow choices — confirm they show as two separate lines, not merged
- [ ] Remove an item from the cart (× button) — confirm it disappears and the total updates
- [ ] Close the browser tab, reopen the site — confirm the cart still remembers your items (it's saved in the browser's local storage)
- [ ] Click "Order on WhatsApp" with items in the cart — confirm the message that opens in WhatsApp lists every item, swallow, takeaway note, and the correct total
- [ ] Try it with the cart empty — nothing should break

## 5. Forms
- [ ] Submit the Contact page form with all fields filled — confirm the "Thanks" message appears
- [ ] Try submitting with a field empty — confirm the browser blocks it (required field validation)
- [ ] Note: this form currently only shows a confirmation message, it does **not** email you. If you want actual messages to reach your inbox, that needs a form backend (e.g. Formspree, or a simple server) — flag this if you're expecting to receive these

## 6. Mobile testing (test on a real phone, both iOS and Android if possible)
- [ ] Hamburger menu opens/closes and all links work
- [ ] Menu cards display as the compact row layout, not full-width stacked cards
- [ ] No horizontal scrolling anywhere on any page
- [ ] Text is readable without zooming
- [ ] Cart drawer opens properly and doesn't get cut off by the screen edge
- [ ] All buttons are easy to tap (not too small/close together)

## 7. Cross-browser check
- [ ] Chrome
- [ ] Safari (especially if targeting iPhone users — Safari handles some CSS differently)
- [ ] Firefox
- [ ] One older/low-end Android phone if you can — WhatsApp order flow especially

## 8. Errors & edge cases
- [ ] Open browser dev tools (F12) → Console tab → click through every page, confirm no red errors appear
- [ ] Rename or remove an image temporarily and confirm the fallback (colored gradient box) shows instead of a broken image icon
- [ ] Test what happens on a very slow connection (dev tools → Network tab → throttle to "Slow 3G")
- [ ] Visit a URL that doesn't exist (e.g. `yoursite.com/asdf`) — right now there's no custom 404 page, it'll show your host's default error page. Worth adding one before launch.

## 9. SEO & sharing basics
- [ ] Page titles are correct in each browser tab (Home / Menu / Contact)
- [ ] Add an Open Graph image (`og:image` meta tag) so the site shows a nice preview card when the link is shared on WhatsApp/Facebook/Instagram — right now sharing the link will show no image
- [ ] Submit the site to Google Search Console once live, so it starts showing up in search

## 10. Performance
- [ ] Run the live site through [PageSpeed Insights](https://pagespeed.web.dev) — aim for "Good" on mobile
- [ ] Confirm fonts and page load without a long blank flash

## 11. Hosting & domain
- [ ] Pick a host (Netlify, Vercel, or GitHub Pages are free and easy for a static site like this)
- [ ] Point your domain's DNS at the host once chosen
- [ ] Set up HTTPS (most hosts above do this automatically) — never launch a site collecting customer info over plain HTTP
- [ ] Test the live domain, not just the local file, once it's up — paths and images can behave differently

## 12. After launch
- [ ] Bookmark the site and check it monthly — dead images, wrong prices, and broken links creep in over time
- [ ] Keep a backup copy of all files somewhere outside your laptop (cloud drive, GitHub, etc.)
- [ ] Ask 2–3 friends to order something through the WhatsApp flow as a real test before you announce publicly
