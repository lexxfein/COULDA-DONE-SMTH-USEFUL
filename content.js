// Identify the site (used as a storage key)
const SITE_KEY = location.hostname;

// Record when this page session started
const START_TIME = Date.now();

// Create the overlay element
const overlay = document.createElement("div");
overlay.id = "time-distortion-overlay";
document.body.appendChild(overlay);

/**
 * Decide which visual mode the overlay should be in
 * based on how many minutes have passed.
 */
function setOverlayMode(minutes) {
  // Reset all classes first
  overlay.className = "";

  if (minutes < 3) {
    overlay.classList.add("overlay-small");
  } else if (minutes < 10) {
    overlay.classList.add("overlay-medium");
  } else {
    overlay.classList.add("overlay-blocking");
  }
}

/**
 * Decide what text should be shown.
 * Message tone escalates with time.
 */
function getOverlayMessage(minutes) {
  if (minutes < 3) {
    return `You've been here for ${minutes} minute${minutes !== 1 ? "s" : ""}.`;
  }

  if (minutes < 10) {
    return `It's been ${minutes} minutes. This wasn't the plan.`;
  }

  return `Good job! There goes ${minutes} minutes worth of work done.`;
}

/**
 * Save time spent on this site using Chrome storage.
 * This persists even if the page reloads.
 */
function saveTimeSpent() {
  chrome.storage.local.get([SITE_KEY], (data) => {
    const previousMinutes = data[SITE_KEY] || 0;

    chrome.storage.local.set({
      [SITE_KEY]: previousMinutes + 1
    });
  });
}

/**
 * Main update loop
 * Runs once every minute.
 */
function updateOverlay() {
  const elapsedMs = Date.now() - START_TIME;
  const minutesSpent = Math.floor(elapsedMs / 60000);

  setOverlayMode(minutesSpent);
  overlay.textContent = getOverlayMessage(minutesSpent);
  saveTimeSpent();
}

// Initial render (shows immediately)
updateOverlay();

// Update every 60 seconds
setInterval(updateOverlay, 60000);
