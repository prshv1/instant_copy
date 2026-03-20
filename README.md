<div align="center">

# URL, Instant Copy

**No icons. No clutter. Just the shortcut.**

[![Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-Available-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](#)
[![Version](https://img.shields.io/badge/Version-1.0.0-FF6B6B?style=for-the-badge)](#version-log)
[![Vibe Coded](https://img.shields.io/badge/100%25-Vibe_Coded-9B59B6?style=for-the-badge)](#)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-34A853?style=for-the-badge&logo=googlechrome&logoColor=white)](#)

---

*A zero-UI Chrome extension that copies your current tab URL to the clipboard with a single keyboard shortcut. No popups. No confirmations. No friction.*

</div>

---

## How It Works

The extension is intentionally dead simple:

1. **Command Listener**: A background service worker listens for the `Alt+Shift+C` (`Option+Shift+C` on Mac) keyboard shortcut.
2. **Tab Query**: It queries the active, last-focused tab to grab the current URL.
3. **Offscreen Clipboard**: An offscreen document is spun up to handle clipboard access via the `navigator.clipboard` API, with a `document.execCommand` fallback for edge cases.
4. **Done**: The URL is in your clipboard. That's it.

---

## Architecture

```
URL-Instant-Copy/
├── manifest.json       # Extension manifest (v3)
├── background.js       # Service worker — command listener + tab query
├── offscreen.html      # Offscreen document shell
├── offscreen.js        # Clipboard write logic (with fallback)
└── popup.html          # Static UI — just the shortcut reminder
```

---

## Quick Start

### Load Unpacked (Dev)

1. Navigate to `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the project directory

### Keyboard Shortcut

| OS      | Shortcut             |
|:-------:|:--------------------:|
| Mac     | `Option + Shift + C` |
| Windows | `Alt + Shift + C`    |

---

## Permissions

| Permission      | Reason |
|:----------------|:-------|
| `tabs`          | Read the active tab URL |
| `offscreen`     | Spawn offscreen document for clipboard access |
| `clipboardWrite`| Write the URL to the user's clipboard |

No host permissions. No data collection. No network requests.

---

## Edge Case Handling

- **Clipboard API blocked**: Falls back to `document.execCommand('copy')` via a hidden `textarea` element.
- **No active tab**: Throws a caught error and logs silently — no user-facing crash.
- **Offscreen doc race condition**: A `creatingOffscreenDocument` mutex prevents duplicate document creation on rapid successive triggers.

---

## Version Log

| Version | Milestone |
|:-------:|:----------|
| `v1.0.0` | Initial release — shortcut-based URL copy with offscreen clipboard |

---

<div align="center">

Built by [Parshva](https://linktr.ee/prshv1)

</div>