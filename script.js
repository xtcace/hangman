import { BombGame } from "./js/class.js";
import render from "./js/render.js";
import { buildKeyboard } from "./js/keyboard.js";
import { Timer } from "./js/timer.js";
import words from "./example-words.json" with { type: "json" };

const MAX_GUESSES = 6;
const START_TIME = 60;

// --- DOM refs ---
const keyboardEl = document.querySelector(".keyboard");
const resetBtn = document.querySelector(".reset-btn");
const timerDisplay = document.querySelector(".timer__display");
const timerProgress = document.querySelector(".timer__progress");

// --- optional audio (won't crash if files are missing) ---
const sound = (src) => {
  try {
    return new Audio(src);
  } catch {
    return { play() {}, pause() {} };
  }
};
const winAudio = sound("assets/audio/defused.mp3");
const loseAudio = sound("assets/audio/lose.mp3");
const clickAudio = sound("assets/audio/click_1.mp3");
const errorAudio = sound("assets/audio/click_error.mp3");

const play = (audio) => {
  try {
    audio.currentTime = 0;
    audio.play();
  } catch {
    /* assets are optional */
  }
};

// --- game state ---
let game;
let timer;
let timerStarted = false;

function pickWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function newGame() {
  game = new BombGame(pickWord(), MAX_GUESSES);
  timerStarted = false;

  if (timer) timer.reset();
  timer = new Timer({
    duration: START_TIME,
    onTick: updateTimer,
    onExpire: () => {
      game.loseByTime();
      finishGame();
    },
  });

  resetBtn.classList.add("is-hidden");
  updateTimer(START_TIME, START_TIME);
  render(game);
  enableKeyboard();
}

function updateTimer(remaining, total) {
  if (timerDisplay) timerDisplay.textContent = remaining;
  if (timerProgress) {
    timerProgress.style.width = `${(remaining / total) * 100}%`;
  }
}

function handleGuess(letter) {
  if (!/^[a-z]$/.test(letter)) return;
  if (game.isWon || game.isLost) return;
  if (game.guessedLetters.includes(letter)) return;

  // start the countdown on the first guess
  if (!timerStarted) {
    timer.start();
    timerStarted = true;
  }

  const wasCorrect = game.word.includes(letter);
  game.guess(letter);
  play(wasCorrect ? clickAudio : errorAudio);

  render(game);

  if (game.isWon || game.isLost) finishGame();
}

function finishGame() {
  timer.stop();
  render(game);
  disableKeyboard();
  resetBtn.classList.remove("is-hidden");
  play(game.isWon ? winAudio : loseAudio);
}

function enableKeyboard() {
  document.querySelectorAll(".keyboard__key").forEach((key) => {
    key.disabled = false;
  });
}

function disableKeyboard() {
  document.querySelectorAll(".keyboard__key").forEach((key) => {
    key.disabled = true;
  });
}

// --- events ---
buildKeyboard(keyboardEl);

keyboardEl.addEventListener("click", (e) => {
  const key = e.target.closest(".keyboard__key");
  if (key) handleGuess(key.dataset.letter);
});

// bonus: keyboard input
document.addEventListener("keydown", (e) => {
  handleGuess(e.key.toLowerCase());
});

resetBtn.addEventListener("click", newGame);

newGame();
