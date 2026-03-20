async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch (error) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    const success = document.execCommand("copy");

    document.body.removeChild(textarea);

    if (!success) {
      throw error || new Error("document.execCommand('copy') failed.");
    }
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type !== "copy-to-clipboard") {
    return;
  }

  copyText(message.text)
    .then(() => {
      sendResponse({ ok: true });
    })
    .catch((error) => {
      sendResponse({
        ok: false,
        error: error?.message || "Clipboard copy failed."
      });
    });

  return true;
});