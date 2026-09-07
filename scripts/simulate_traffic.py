"""
Simulates visitor traffic for the ABC Tutoring PostHog project so the
dashboard has realistic data to show Dana.

This does NOT run on the website itself — run it locally, once, from your
machine (or as part of your demo prep). It sends events directly to
PostHog's capture API, so it works even though the site is a static
GitHub Pages page with no backend.

Setup:
    pip install requests
    python simulate_traffic.py

Before running, set POSTHOG_API_KEY below to your project token
(the same one used in js/posthog-init.js).
"""

import random
import time
import uuid
import requests

POSTHOG_API_KEY = "YOUR_POSTHOG_PROJECT_API_KEY"
POSTHOG_HOST = "https://us.i.posthog.com"  # change to eu.i.posthog.com if on EU cloud

TUTORS = [
    {"id": "t1", "name": "Sarah Chen", "subjects": ["Elementary Math", "Algebra I"]},
    {"id": "t2", "name": "James Rodriguez", "subjects": ["Algebra I", "Algebra II"]},
    {"id": "t3", "name": "Priya Patel", "subjects": ["Science (Bio & Chem)"]},
    {"id": "t4", "name": "David Kim", "subjects": ["Elementary Reading"]},
    {"id": "t5", "name": "Emily Johnson", "subjects": ["Elementary Math", "Science"]},
    {"id": "t6", "name": "Marcus Lee", "subjects": ["Algebra II", "Science"]},
]

# Give some tutors more views than others so the "most viewed" insight is meaningful
TUTOR_VIEW_WEIGHTS = [30, 15, 22, 10, 18, 8]

GRADES = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]


def capture(event_name, distinct_id, properties=None):
    payload = {
        "api_key": POSTHOG_API_KEY,
        "event": event_name,
        "distinct_id": distinct_id,
        "properties": properties or {},
    }
    resp = requests.post(f"{POSTHOG_HOST}/capture/", json=payload, timeout=10)
    if resp.status_code != 200:
        print(f"  [!] {event_name} failed: {resp.status_code} {resp.text}")


def simulate_visitor():
    visitor_id = str(uuid.uuid4())

    # Every simulated visitor "lands" on the homepage, then browses tutors
    capture("$pageview", visitor_id, {"$current_url": "https://your-org.github.io/"})
    capture("$pageview", visitor_id, {"$current_url": "https://your-org.github.io/tutors.html"})

    # Pick a tutor to view, weighted
    tutor = random.choices(TUTORS, weights=TUTOR_VIEW_WEIGHTS, k=1)[0]
    capture("$pageview", visitor_id, {"$current_url": f"https://your-org.github.io/tutor.html?id={tutor['id']}"})
    capture("tutor_profile_viewed", visitor_id, {
        "tutor_id": tutor["id"],
        "tutor_name": tutor["name"],
    })

    # ~35% of visitors who view a profile go on to start a booking
    if random.random() < 0.35:
        capture("booking_started", visitor_id, {
            "tutor_id": tutor["id"],
            "tutor_name": tutor["name"],
        })

        # Of those, ~70% complete the booking (rest abandon the form)
        if random.random() < 0.70:
            capture("booking_completed", visitor_id, {
                "tutor_id": tutor["id"],
                "tutor_name": tutor["name"],
                "subject": random.choice(tutor["subjects"]),
                "student_grade": random.choice(GRADES),
            })


if __name__ == "__main__":
    NUM_VISITORS = 120
    print(f"Simulating {NUM_VISITORS} visitors...")
    for i in range(NUM_VISITORS):
        simulate_visitor()
        if i % 20 == 0:
            print(f"  ...{i} visitors sent")
        time.sleep(0.05)  # be gentle on the API
    print("Done. Give PostHog a minute or two to process events, then check your dashboard.")
