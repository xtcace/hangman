// main entry point - this file wires everything together:
// the game logic (class), the screen (render), the keyboard and the timer.
import { HangmanBombGame } from "./js/class.js";
import render from "./js/render.js";
import { buildKeyboard } from "./js/keyboard.js";
import { Timer } from "./js/timer.js";
import words from "./example-words.json" with { type: "json" };

// game settings - kept up here so they're easy to tweak
const MAX_GUESSES = 6;
const START_TIME = 60;

// grab the bits of the page we need to talk to
const keyboardEl = document.querySelector(".keyboard");
const resetBtn = document.querySelector(".reset-btn");
const timerDisplay = document.querySelector(".timer__display");
const timerProgress = document.querySelector(".timer__progress");

// audio is optional - if a sound file is missing this just returns a
// dummy object so the game never crashes trying to play a sound
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

// little helper to play a sound from the start, ignoring any errors
const play = (audio) => {
  try {
    audio.currentTime = 0;
    audio.play();
  } catch {
    // assets are optional, so we just ignore failures here
  }
};

// these hold the current game + timer. they get rebuilt every new round
let game;
let timer;
let timerStarted = false;

// pick a random word from the list
function pickWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// start a fresh round - new word, fresh timer, reset the screen
function newGame() {
  game = new HangmanBombGame(pickWord(), MAX_GUESSES);
  timerStarted = false;

  if (timer) timer.reset();
  timer = new Timer({
    duration: START_TIME,
    onTick: updateTimer,
    onExpire: () => {
      // time ran out, so the player loses
      game.loseByTime();
      finishGame();
    },
  });

  resetBtn.classList.add("is-hidden");
  updateTimer(START_TIME, START_TIME);
  render(game);
  enableKeyboard();
}

// update the timer number + the progress bar width each second
function updateTimer(remaining, total) {
  if (timerDisplay) timerDisplay.textContent = remaining;
  if (timerProgress) {
    timerProgress.style.width = `${(remaining / total) * 100}%`;
  }
}

// runs every time the player guesses a letter (click or keyboard)
function handleGuess(letter) {
  // ignore anything that isn't a single a-z letter
  if (!/^[a-z]$/.test(letter)) return;
  // ignore guesses once the game is over or if it's a repeat
  if (game.isOver || game.alreadyGuessed(letter)) return;

  // the timer only starts on the very first guess
  if (!timerStarted) {
    timer.start();
    timerStarted = true;
  }

  // check before guessing so we know which sound to play
  const wasCorrect = game.hasLetter(letter);
  game.guess(letter);
  play(wasCorrect ? clickAudio : errorAudio);

  render(game);

  // if that guess ended the game, wrap it up
  if (game.isOver) finishGame();
}

// stop the timer, lock the keyboard, show the play-again button
function finishGame() {
  timer.stop();
  render(game);
  disableKeyboard();
  resetBtn.classList.remove("is-hidden");
  play(game.isWon ? winAudio :