BOMB DEFUSER

A good fucking take on the classic Hangman game. Instead of drawing a stick figure, you're
defusing a bomb: guess the hidden word one letter at a time before you run out
of guesses or the timer hits zero.

Built with vanilla JavaScript (ES modules), SCSS, and [NES.css](https://nostalgic-css.github.io/NES.css/)
for the retro look. Game logic is fully unit-tested with Jest.

THE FEATURES

- Random word chosen each round from `example-words.json`
- On-screen QWERTY keyboard plus physical keyboard input
- Letters reveal in place when guessed correctly; wrong guesses cost you
- 60-second countdown — let it expire and the bomb goes off
- Win ("DEFUSED") / loss ("EXPLODED") states with a play-again reset
- Correct/wrong keys are colour-coded and disabled once used

Keeping the rules in a class with no DOM access is what makes the logic
testable — `class.test.js` can check wins, losses and edge cases without a
browser.
