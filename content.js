const SITE_KEY = location.hostname;
const START_TIME = Date.now();

const overlay = document.createElement("div");
overlay.id = "time-distortion-overlay";
document.body.appendChild(overlay);

function updateOverlay(minutes) {
  const messages = [
    `You've been here for ${minutes} minutes.`,
    `This was supposed to be 5 minutes.`,
    `${minutes} minutes gone. Just saying.`,
    `You could've done something useful.`
  ];

  overlay.textContent = messages[minutes % messages.length];
}

setInterval(() => {
  const minutes = Math.floor((Date.now() - START_TIME) / 60000);
  updateOverlay(minutes);

  chrome.storage.local.get([SITE_KEY], (data) => {
    const prev = data[SITE_KEY] || 0;
    chrome.storage.local.set({
      [SITE_KEY]: prev + 1
    });
  });
}, 60000);
