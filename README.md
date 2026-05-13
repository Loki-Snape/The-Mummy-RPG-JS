# The Mummy RPG — Tomb of the Sun King

Step into the sands. Unearth secrets. Survive the curse.

Welcome to *The Mummy RPG*, a small browser-based, ancient-Egypt-themed game prototype that evokes dusty catacombs, flickering torchlight, and the slow, inexorable shuffle of mummified guardians.

**Developer:** Mridul Jha

---

## Table of Contents

- About
- Features
- Getting Started
- Controls
- Project Structure
- Extending & Development
- Art & Assets
- Credits
- No License

---

## About

The Mummy RPG is a lightweight JavaScript/HTML/CSS game built to demonstrate a compact, atmospheric gameplay loop: exploration, simple encounters, and puzzle-like interactions inside an ancient Egyptian tomb. It's intentionally small and easy to run locally in a browser.

Tone & Theme: hieroglyphic motifs, sand-worn scrolls of text, and a cinematic mummy antagonist. The README itself is written to match the mood of the game, offering both practical docs and inspiration for contributors.

## Features

- Single-player, browser-playable (no server required)
- Minimal, accessible controls suitable for keyboard play
- Modular code: clear separation of `index.html`, `styles.css`, and `scripts.js`
- Easily extendable: add rooms, enemies, items, and puzzles
- Thematic UI elements (torches, inventory, status effects)

## Getting Started

Prerequisites: a modern web browser (Chrome, Firefox, Safari, Edge).

To run locally:

1. Clone or download the repository.
2. Open `index.html` in your browser.

Quick command-line example (from repository root):

```bash
# on Linux/macOS
xdg-open index.html || open index.html

# or serve with a tiny static server (recommended for some browser APIs):
python3 -m http.server 8000
# then open http://localhost:8000
```

## Controls

- Movement: Arrow keys or `W` `A` `S` `D`
- Interact / Action: `E` or `Space`
- Open Inventory / Toggle UI: `I`
- Toggle sound (if available): `M`

All controls are configurable by editing `scripts.js` where input handling is centralized.

## Gameplay Overview

You guide an intrepid explorer through the sunless corridors of the Sun King's tomb. Along the way:

- Solve environmental puzzles to unlock passageways
- Avoid or confront mummified guardians
- Collect relics, torches, and ephemeral blessings
- Manage light and sanity — candles burn down over time

The design encourages experimentation: use relics to bypass traps, decipher hieroglyphic clues, and uncover branching endings.

## Project Structure

- `index.html` — game container, DOM structure, and initial markup
- `styles.css` — visual styling, palette, and responsive layout
- `scripts.js` — game logic, input handling, and simple game loop

If you add more code, keep the code modular and document new files in this README.

## Extending & Development

Development workflow suggestions:

- Use the browser DevTools console to inspect runtime state and debug interactions.
- Prefer small, incremental changes: add a new enemy or item as a single module.
- Write clear function-level comments in `scripts.js` for public functions.

Suggested extension points:

- Add a `levels/` folder with JSON maps for rooms and puzzles
- Move rendering into a small `renderer.js` for separation of concerns
- Replace placeholder art with sprite sheets and add a lightweight asset loader

Testing locally:

1. Start a simple static server (see above).
2. Open the game in multiple browser sizes to check responsive UI.

## Art & Assets

This project contains minimal, placeholder visuals and icons. If you introduce new assets:

- Keep source files organized in an `assets/` directory
- Track attributions and sources in a new `ASSETS.md` file

## Credits

- Developer: Mridul Jha
- Inspired by classic adventure and exploration games, and the lore of ancient Egypt.

## No License

This project does not include a license file. By default, all rights are reserved by the author unless you add an explicit open-source license.

If you want to use or contribute to this project, please contact the developer or add a suitable license file (e.g., MIT, Apache-2.0) to clarify permissions.

---

May the sand part and the torches burn bright beneath the vaulted stone.

If you'd like, I can also:

- Add a short `CONTRIBUTING.md` with contribution guidelines
- Scaffold a levels folder or JSON format for maps
- Add example assets and small unit tests for game logic

Tell me which of those you'd like next.
