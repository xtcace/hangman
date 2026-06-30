export class BombGame {
  constructor(word, maxGuesses) {
    this.word = word;
    this.maxGuesses = maxGuesses;
    this.guessedLetters = [];
    this.timeUp = false;
  }

  // --- helpers ---
  hasLetter(letter) {
    return this.word.includes(letter);
  }

  alreadyGuessed(letter) {
    return this.guessedLetters.includes(letter);
  }

  // --- actions ---
  guess(letter) {
    if (this.isOver || this.alreadyGuessed(letter)) return;
    this.guessedLetters.push(letter);
  }

  loseByTime() {
    this.timeUp = true;
  }

  // --- derived state ---
  get numberOfLettersToGuess() {
    return new Set(this.word).size;
  }

  get displayWord() {
    return [...this.word].map((l) => (this.alreadyGuessed(l) ? l : "_"));
  }

  get wrongGuesses() {
    return this.guessedLetters.filter((l) => !this.hasLetter(l));
  }

  get guessesRemaining() {
    return this.maxGuesses - this.wrongGuesses.length;
  }

  get isWon() {
    return [...this.word].every((l) => this.alreadyGuessed(l));
  }

  get isLost() {
    return this.timeUp || this.guessesRemaining <= 0;
  }

  get isOver() {
    return this.isWon || this.isLost;
  }

  get status() {
    if (this.isWon) return "DEFUSED";
    if (this.isLost) return "EXPLODED";
    return this.guessedLetters.length ? "ACTIVE" : "DORMANT";
  }

  get message() {
    if (this.isWon) return "Bomb defused. Nice work.";
    if (this.isLost) return "Bomb exploded. Unlucky.";
    return "Defuse the bomb: guess the word.";
  }
}