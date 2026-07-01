# Hangman

A take on the classic Hangman game. Guess the hidden word one letter at a time
before you run out of guesses or the timer hits zero.

Built with vanilla JavaScript (ES modules), SCSS, and [NES.css](https://nostalgic-css.github.io/NES.css/)
for the retro look. Game logic is fully unit-tested with Jest.

## Features

- Random word chosen each round from `example-words.json`
- On-screen qeerty keyboard plus physical keyboard input
- Letters reveal in place when guessed correctly; wrong guesses cost you
- 60-second countdown — let it expire and the round is lost
- Win / loss states with a play-again reset
- Correct/wrong keys are colour-coded and disabled once used

## How it's structured

| File | Responsibility |
|------|----------------|
| `js/class.js` | `HangmanBombGame` class — all game state and rules (no DOM) |
| `js/render.js` | Paints the current game state onto the page |
| `js/keyboard.js` | Builds the on-screen keyboard |
| `js/timer.js` | `Timer` class wrapping `setInterval` |
| `script.js` | Entry point — wires the class, render, keyboard and timer together |
| `js/class.test.js` | Jest tests for the game logic |

Keeping the rules in a class with no DOM access is what makes the logic
testable — `class.test.js` can check wins, losses and edge cases without a
browser.

## Running it

This thing uses ES modules and a JSON import, so it must be served over HTTP — opening
`index.html` directly from the file system (file://) will not work.

1. Install dependencies (one time):
```bash
   npm install
```
2. Compile the styles:
```bash
   npm run scss
```
3. Serve the folder, e.g.:
```bash
   npx serve
```
   then open the URL it prints.

## Running the tests

```bash
npm test
```