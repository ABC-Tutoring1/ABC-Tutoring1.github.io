# ABC Tutoring — Prototype

## What's included
- `index.html` — homepage
- `tutors.html` — browse all 6 tutors
- `tutor.html?id=t1` — tutor profile + slot picker + booking form
- `confirmation.html` — on-screen booking confirmation
- `bookings.html` — simple internal list of bookings (for Dana)
- `css/styles.css` — all styling
- `js/data.js` — tutor data + localStorage-based booking logic
- `js/posthog-init.js` — PostHog snippet (shared across all pages)
- `scripts/simulate_traffic.py` — run locally to populate PostHog with demo traffic

## Before you deploy
1. Open `js/posthog-init.js` and replace `YOUR_POSTHOG_PROJECT_API_KEY` with your
   real project token from the setup step.
2. If your PostHog project isn't on US cloud, update `api_host` in the same file.

## How it works (no backend, by design)
- Tutor and booking data lives in the browser's `localStorage`, seeded from
  `js/data.js` on first load. This satisfies the "slot disappears once booked"
  requirement without a server.
- **Caveat to mention to Dana**: because there's no backend, bookings are stored
  per-browser. A booking made on one device won't show up on another. That's a
  fine limitation for a prototype demo, but worth being upfront about.
- `bookings.html` is not linked in the nav (it's meant for Dana, not visitors),
  but note it's not password-protected — anyone with the URL could view it.
  Worth flagging as a "next step" rather than pretending it's secure.

## Deploying
1. Copy everything in this folder into your `<org-name>.github.io` repo (root level).
2. Commit and push to `main`.
3. Visit `https://<org-name>.github.io/` and click through to confirm it renders
   and a test booking works end-to-end.

## Generating demo traffic for your PostHog dashboard
Real dashboard data needs real events. Since a grader/demo probably won't click
around your site enough to populate a meaningful dashboard, use the simulator:

```bash
pip install requests
cd scripts
python simulate_traffic.py
```

Edit `POSTHOG_API_KEY` at the top of the script first. This sends ~120 simulated
visitors' worth of pageviews and events directly to PostHog's capture API — it
does not touch your live site, so it's safe to run anytime.

## Setting up the PostHog dashboard (for your submission)
In PostHog:
1. **Trends insight — "Most viewed tutors"**: event = `tutor_profile_viewed`,
   breakdown by property `tutor_name`.
2. **Funnel insight — "Profile view → booking"**: steps =
   `tutor_profile_viewed` → `booking_started` → `booking_completed`. This
   answers Dana's "do visitors view profiles but not book" question directly —
   the drop-off between steps 1 and 2/3 is your answer.
3. Add both insights to a new Dashboard (e.g. "ABC Tutoring — Visitor Insights").
4. Dashboard → Share → enable public access, and use that link in your submission.
