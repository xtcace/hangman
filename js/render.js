export default function render(game) {
  const wordDisplay = document.querySelector(".word-display");
  const guessesRemaining = document.querySelector(".guesses-remaining");
  const headerMessage = document.querySelector(".header__message");

  guessesRemaining.textContent = game.guessesRemaining;
  headerMessage.textContent = game.message;

  // rebuild the word as a row of letter slots
  wordDisplay.innerHTML = `${game.displayWord
    .map((el) => {
      return `<span class="word-display__letter">${el}</span>`;
    })
    .join("")}`;

  // update keyboard button states
  document.querySelectorAll(".keyboard__key").forEach((key) => {
    const letter = key.dataset.letter;

    key.classList.remove(
      "keyboard__key--correct",
      "keyboard__key--wrong",
      "is-success",
      "is-error",
    );

    if (game.guessedLetters.includes(letter)) {
      key.disabled = true;
      if (game.word.includes(letter)) {
        key.classList.add("keyboard__key--correct", "is-success");
      } else {
        key.classList.add("keyboard__key--wrong", "is-error");
      }
    } else {
      key.disabled = game.isWon || game.isLost;
    }
  });
}
