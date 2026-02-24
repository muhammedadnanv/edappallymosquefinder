

# Feature Suggestions for "ചോറുള്ള പള്ളി" Platform

Here is a prioritized list of features to take your mosque finder platform to the next level:

---

## 1. User Authentication and Mosque Submission (High Priority)

Your database already has `profiles` and `submitted_mosques` tables ready. You need:
- Login/Signup pages with email verification
- A "Submit a Mosque" form where logged-in users can add mosques with name, address, prayer times, and facilities
- An admin review flow (approve/reject submissions)
- A "My Submissions" page for users to track their entries

**Why:** This crowdsources mosque data beyond the 12 hardcoded entries, making the platform genuinely useful across Kerala.

---

## 2. Dynamic Prayer Times via API (High Priority)

Currently all prayer times are hardcoded. You should:
- Fetch real prayer times from the Aladhan API based on the user's location or the mosque's coordinates
- Auto-update daily so times are always accurate
- Show today's date and highlight the current/next prayer

**Why:** Hardcoded times become inaccurate quickly, especially across different locations.

---

## 3. Dark Mode Toggle (Medium Priority)

- Add a theme switcher (sun/moon icon) in the hero or navbar
- You already have `next-themes` installed -- just wire it up
- Ensure all components respect dark mode variables

**Why:** Many users prefer dark mode, especially during night prayers.

---

## 4. Mosque Detail Page (Medium Priority)

- Create a `/mosque/:id` route with a full detail view
- Show a map embed (Google Maps or OpenStreetMap), full prayer timetable, photo gallery, and contact info
- Add a "Share" button to send the mosque link via WhatsApp or copy link

**Why:** The card view is compact; a detail page gives a richer experience and is more shareable.

---

## 5. Ramadan Special Features (Medium Priority)

- **Iftar Countdown Timer**: Show a live countdown to Maghrib (iftar time) at the top of the page
- **Sehri/Iftar Timetable**: A full month Ramadan calendar with daily sehri and iftar times
- **Taraweeh Info**: Add a field to mosques indicating if they hold Taraweeh prayers and at what time

**Why:** During Ramadan, users need quick access to iftar timing and Taraweeh availability.

---

## 6. PWA / Installable App (Low-Medium Priority)

- You already have a `sw.js` service worker file. Enhance it with proper caching
- Add a web app manifest for "Add to Home Screen"
- Enable offline access to cached mosque data

**Why:** Many users in Kerala access via mobile; an installable app feels native and works offline.

---

## 7. Multi-Language Support (Low-Medium Priority)

- Add a language toggle: Malayalam / English / Arabic
- Use an i18n library or simple context-based translations
- Translate UI labels, prayer names, and static content

**Why:** Your audience spans Malayalam, English, and Arabic speakers.

---

## 8. Juma (Friday Prayer) Khutbah Schedule (Low Priority)

- Add Juma khutbah topic and speaker info per mosque
- Show a dedicated "This Friday" section highlighting upcoming Juma details

**Why:** Friday prayers are the most attended; knowing the speaker/topic helps users choose.

---

## Recommended Implementation Order

| Priority | Feature | Effort |
|----------|---------|--------|
| 1 | User Auth + Mosque Submission | Medium |
| 2 | Dynamic Prayer Times (Aladhan API) | Low |
| 3 | Dark Mode Toggle | Low |
| 4 | Iftar Countdown Timer | Low |
| 5 | Mosque Detail Page | Medium |
| 6 | PWA Enhancement | Medium |
| 7 | Multi-Language Support | High |
| 8 | Juma Khutbah Schedule | Low |

I recommend starting with **User Auth + Mosque Submission** since the database is already prepared, followed by **Dynamic Prayer Times** and **Dark Mode** as quick wins.

