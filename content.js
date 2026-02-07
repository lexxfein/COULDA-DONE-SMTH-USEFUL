// Identify the site (used as a storage key)
const SITE_KEY = location.hostname;

// Record when this page session started
const START_TIME = Date.now();

let overlay = null;

/**
 * Create overlay only when needed
 */
function createOverlay() {
  overlay = document.createElement("div");
  overlay.id = "time-distortion-overlay";
  document.body.appendChild(overlay);
}

/**
 * Decide which visual mode the overlay should be in
 * based on how many minutes have passed.
 */
function setOverlayMode(minutes) {
  overlay.className = "";

  if (minutes < 3) {
    overlay.classList.add("overlay-small");
  } else if (minutes < 10) {
    overlay.classList.add("overlay-medium");
  } else if (minutes < 15) {
    overlay.classList.add("overlay-large");
  } else {
    overlay.classList.add("overlay-blocking");
  }
}

/**
 * Decide what text should be shown.
 */
function getOverlayMessage(minutes) {
  if (minutes < 3) {
    return `You've been here for ${minutes} minute${minutes !== 1 ? "s" : ""}.`;
  }

  if (minutes < 10) {
    return `It's been ${minutes} minutes. This wasn't the plan.`;
  }

  if (minutes < 15) {
    return `Good job! There goes ${minutes} minutes worth of work done.`;
  }

  return `Alexander was 16 when he was leading armies.\nNewton reshaped physics in his early 20s.\nYou opened this app again.`;
}

/**
 * Save time spent on this site
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
 */
function updateOverlay() {
  const elapsedMs = Date.now() - START_TIME;
  const minutesSpent = Math.floor(elapsedMs / 60000);

  // 🔴 DO NOTHING for the first minute
  if (minutesSpent < 1) return;

  // Create overlay lazily
  if (!overlay) createOverlay();

  setOverlayMode(minutesSpent);
  overlay.textContent = getOverlayMessage(minutesSpent);
  saveTimeSpent();
}

// First call still happens, but exits early
updateOverlay();

// Update every 60 seconds
setInterval(updateOverlay, 60000);
