export class BombGame {
  constructor(word, maxGuesses) {
    this.word = word;
    this.guessedLetters = [];
    this.maxGuesses = maxGuesses;
    this.numberOfLettersToGuess = [...new Set(this.word.split(""))].length;
    this.timeUp = false;
  }

  guess(letter) {
    // no guesses if the game is already won or lost
    if (this.isLost || this.isWon) return;
    // ignore letters that have already been guessed
    if (this.guessedLetters.includes(letter)) return;
    this.guessedLetters.push(letter);
  }

  loseByTime() {
    this.timeUp = true;
  }

  get displayWord() {
    return this.word
      .split("")
      .map((letter) => (this.guessedLetters.includes(letter) ? letter : "_"));
  }

  get correctGuesses() {
    return this.guessedLetters.filter((letter) => this.word.includes(letter));
  }

  get wrongGuesses() {
    return this.guessedLetters.filter((letter) => !this.word.includes(letter));
  }

  get guessesRemaining() {
    return this.maxGuesses - this.wrongGuesses.length;
  }

  get isWon() {
    return this.word
      .split("")
      .every((letter) => this.guessedLetters.includes(letter));
  }

  get isLost() {
    return this.timeUp || this.guessesRemaining <= 0;
  }

  get status() {
    if (this.isWon) return "DEFUSED";
    if (this.isLost) return "EXPLODED";
    if (this.guessedLetters.length === 0) return "DORMANT";
    return "ACTIVE";
  }

  get message() {
    switch (this.status) {
      case "DEFUSED":
        return "Bomb defused. Nice work.";
      case "EXPLODED":
        return this.timeUp ? "Time's up — boom." : "Boom. The bomb went off.";
      default:
        return "Defuse the bomb: guess the word.";
    }
  }
}
