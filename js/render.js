export default function render(game) {
  renderStatus(game);
  renderWord(game);
  renderKeyboard(game);
}

function renderStatus(game) {
  document.querySelector(".guesses-remaining").textContent =
    game.guessesRemaining;
  document.querySelector(".header__message").textContent = game.message;
}

function renderWord(game) {
  document.querySelector(".word-display").innerHTML = game.displayWord
    .map((letter) => `<span class="word-display__letter">${letter}</span>`)
    .join("");
}

function renderKeyboard(game) {
  document.querySelectorAll(".keyboard__key").forEach((key) => {
    const letter = key.dataset.letter;
    key.classList.remove(
      "keyboard__key--correct",
      "keyboard__key--wrong",
      "is-success",
      "is-error",
    );

    if (game.alreadyGuessed(letter)) {
      key.disabled = true;
      const correct = game.hasLetter(letter);
      key.classList.add(
        correct ? "keyboard__key--correct" : "keyboard__key--wrong",
        correct ? "is-success" : "is-error",
      );
    } else {
      key.disabled = game.isOver;
    }
  });
}