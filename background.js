let creatingOffscreenDocument = null;

async function ensureOffscreenDocument() {
  if (await chrome.offscreen.hasDocument()) {
    return;
  }

  if (!creatingOffscreenDocument) {
    creatingOffscreenDocument = chrome.offscreen.createDocument({
      url: "offscreen.html",
      reasons: ["CLIPBOARD"],
      justification: "Copy the active tab URL to the clipboard."
    });
  }

  try {
    await creatingOffscreenDocument;
  } finally {
    creatingOffscreenDocument = null;
  }
}

async function getActiveTabUrl() {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  });

  return tab?.url ?? "";
}

async function copyToClipboard(text) {
  await ensureOffscreenDocument();

  const response = await chrome.runtime.sendMessage({
    type: "copy-to-clipboard",
    text
  });

  if (!response?.ok) {
    throw new Error(response?.error || "Clipboard copy failed.");
  }
}

chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "copy-current-url") {
    return;
  }

  try {
    const url = await getActiveTabUrl();

    if (!url) {
      throw new Error("No active tab URL found.");
    }

    await copyToClipboard(url);
  } catch (error) {
    console.error("URL, Instant Copy:", error);
  }
});