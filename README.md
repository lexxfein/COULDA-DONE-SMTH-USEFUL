# Time Distortion

Time Distortion is a lightweight Chrome extension that subtly reminds you how long you’ve been spending on distracting websites like YouTube, Instagram, and Twitter/X.

Instead of blocking content or forcing productivity, it uses gentle (and sometimes passive-aggressive) on-screen reminders to make you more aware of time passing.

---

## Features

- Automatically tracks time spent on selected websites
- Displays a floating overlay with time-based messages
- Updates every minute in real time
- Persists time using Chrome’s local storage
- No backend, no tracking, no accounts

---

## How It Works

Time Distortion is built using **content scripts**.

1. When you open a supported website, Chrome injects the extension’s script into the page.
2. The script starts a timer when the page loads.
3. A small overlay is added to the page using DOM manipulation.
4. Every minute:
   - The elapsed time is calculated
   - The overlay text is updated
   - Time spent is saved using `chrome.storage.local`
5. Time is tracked per website and persists across page reloads.

The extension does **not** block content or interfere with site functionality — it only observes and displays information.

---

## Tech Stack

- JavaScript (Vanilla)
- Chrome Extensions API (Manifest V3)
- HTML / CSS
- Chrome Storage API

---


## Installation (Developer Mode)

1. Clone or download this repository
2. Open Chrome and go to:
    chrome://extensions
3. Enable **Developer mode** (top-right)
4. Click **Load unpacked**
5. Select the `time-distortion` folder
6. Open YouTube, Instagram, or Twitter/X to see it in action

---

## 🔒 Permissions Explained

- `storage`  
Used to save time spent per website locally in the browser.  
No data is sent anywhere.