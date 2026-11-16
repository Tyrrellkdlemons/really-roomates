# REALLY ROOMATES
### Grace & Strings — California Transitional Housing & Roommate Launchpad

> *"A Fresh Season. A Place to Rest. Songs in the Night."*

**REALLY ROOMATES** is a purpose-built web application designed for anyone navigating a housing transition in California — built specifically to help move fast, eliminate predatory lease barriers, secure security deposit and downpayment grants, and find a peaceful, respectful living environment.

Live Target: [really-roomates.netlify.app](https://really-roomates.netlify.app) (or connected Netlify instance)  
Source Directory: `site/`  
Deployment: Hardened Netlify Pipeline (`netlify.toml` + edge `_headers`)

---

## 🌟 Why REALLY ROOMATES is 100x Better

Standard apartment portals (Apartments.com, Zillow, Craigslist) fail transitioners: they require 12-month lease commitments, proof of 3x rent income, 700+ credit scores, and up to 2–3 months of deposit upfront. 

**REALLY ROOMATES** flips the script:

1. **PadSplit Fast-Track California Engine**:
   - Private furnished rooms rented on a predictable weekly cadence ($180–$260/week).
   - Zero minimum credit score barrier (approval is based on income verification).
   - All utilities (electric, gas, water, high-speed Wi-Fi) 100% included.
   - Rapid approval and move-in within 24 to 48 hours.

2. **California AB 12 Security Deposit Protection**:
   - Enforces **California Assembly Bill 12** (Civil Code § 1950.5, effective July 1, 2024), which strictly limits residential security deposits to **MAX 1 MONTH'S RENT** across California.
   - Slashes upfront move-in cash requirements by 50% immediately.

3. **California Downpayment & Deposit Assistance Directory**:
   - Direct links, intake instructions, and phone contacts for **California 2-1-1 Coordinated Entry System (CES)** rapid re-housing funds.
   - Orange County assistance: **Welcome Home OC**, **Pathways of Hope (The HUB)**, **Share Ourselves (SOS)**.
   - Los Angeles County: **LAHSA Rapid Re-Housing Network**, **PATH**.
   - State programs: **CalHFA Downpayment (MyHome, Dream For All)** and ADU grant financing.
   - Faith & charitable relief: **St. Vincent de Paul Conferences**, **Salvation Army Adult Rehabilitation Centers**.

4. **Interactive Move-In Cash & Gap Calculator**:
   - Sliders and inputs for monthly rent, security deposit (auto-capped by AB 12), application fees, moving transport/fuel, emergency food buffer, and current savings.
   - Computes total cash needed vs. cash on hand and reveals your exact **Assistance Gap**.
   - Dynamically recommends matching grant programs tailored to close the specific gap.

5. **7-Day & 30-Day Move Fast Action Checklist**:
   - 11 high-impact responsibilities categorized by phase (Urgent Days 1–3, Targeted Search Days 4–7, Move-In Week 2+).
   - Interactive check-off system with local browser persistence (`localStorage`).
   - Add custom moving tasks, track overall completion percentage, and export to JSON backup.

6. **Grace & Strings Sanctuary (Faith & Musician Harmony)**:
   - **Pure Web Audio Acoustic Guitar Strummer**: Synthesizes authentic acoustic guitar string harmonics (Cmaj9, Gadd9, Dadd9, Em7, Am7, Cadd9) and an ambient peaceful chord progression using zero external audio files.
   - **Daily Scriptures of Promise**: Curated reflections and prayers for housing transitions (Jeremiah 29:11, Philippians 4:6-7, Isaiah 43:18-19, Psalm 121).
   - **Musician Roommate Pitch Script**: 1-click copyable script assuring prospective roommates of quiet practice hours, headphone usage, and respectful habits.
   - **Musician Gear Care Tips**: California heat safeguards, soundhole mutes, and floor isolation.

7. **Optional 60-Second Guided Tour**:
   - First-time visitors receive an interactive multi-step modal tour explaining how to move fast. Can be restarted anytime via the header button.

8. **Hardened Netlify Pipeline & Universal Standards**:
   - Strict Content Security Policy (CSP), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`.
   - Single Page App (SPA) redirect `/* -> /index.html`.
   - Mobile-first responsive optimization (`viewport-fit=cover`, safe area insets, minimum 44x44px touch targets).
   - Print-ready stylesheet (`@media print`).
   - Mandatory `@media (prefers-reduced-motion: reduce)` accessibility compliance.

---

## 🛠 Local Development & Testing

Run the site locally with any static web server:

```bash
# Using Python:
python3 -m http.server 8080 --directory site

# Or run the automated static verification test suite:
python3 scripts/verify-site.py
```

Open `http://localhost:8080` in your browser.

---

## 🚀 Netlify Deployment

This project publishes from the `site/` directory:

1. **Via Netlify CLI**:
   ```bash
   netlify deploy --prod --dir=site
   ```
2. **Via GitHub Auto-Deploy**:
   - Connect repository `Tyrrellkdlemons/really-roomates` to Netlify.
   - Build settings: Publish directory = `site`, Build command = `python3 scripts/verify-site.py` (or blank).

---

## ⚖️ California Legal Notice
California Assembly Bill 12 (Civil Code § 1950.5) took effect on July 1, 2024. Except for certain small landlords who own no more than two residential rental properties with four or fewer units total and are not organized as an LLC or corporation, landlords cannot demand a security deposit exceeding one month's rent.

*Soli Deo Gloria.*
