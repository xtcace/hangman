import { BombGame } from "./class";

describe("BombGame", () => {
  describe("constructor", () => {
    it("initialiazes with the given word and max guesses", () => {
      const game = new BombGame("hello", 5);
      expect(game.word).toBe("hello");
      expect(game.maxGuesses).toBe(5);
      expect(game.guessedLetters).toEqual([]);
    });

    it("counts the number of unique letters to guess", () => {
      const game = new BombGame("hello", 5);
      expect(game.numberOfLettersToGuess).toBe(4); // h, e, l, o
    });
  });

  describe("displayWord", () => {
    it("shows all underscores before any guesses", () => {
      const game = new BombGame("dog", 3);
      expect(game.displayWord).toEqual(["_", "_", "_"]);
    });

    it("reveals correctly guessed letters", () => {
      const game = new BombGame("papaya", 6);
      game.guess("p");
      expect(game.displayWord).toEqual(["p", "_", "p", "_", "_", "_"]);
    });
  });

  describe("guess", () => {
    it("ignores duplicate guesses", () => {
      const game = new BombGame("dog", 3);
      game.guess("d");
      game.guess("d");
      expect(game.guessedLetters).toEqual(["d"]);
    });

    it("reduces guessesRemaining on a wrong guess", () => {
      const game = new BombGame("dog", 3);
      game.guess("z");
      expect(game.guessesRemaining).toBe(2);
    });

    it("does not reduce guessesRemaining on a correct guess", () => {
      const game = new BombGame("dog", 3);
      game.guess("d");
      expect(game.guessesRemaining).toBe(3);
    });
  });

  describe("status", () => {
    it("returns DORMANT upon game initialisation", () => {
      const game = new BombGame("dog", 3);
      expect(game.status).toBe("DORMANT");
    });

    it("returns ACTIVE after the first guess", () => {
      const game = new BombGame("dog", 3);
      game.guess("d");
      expect(game.status).toBe("ACTIVE");
    });

    it("returns DEFUSED when the whole word is guessed", () => {
      const game = new BombGame("dog", 3);
      game.guess("d");
      game.guess("o");
      game.guess("g");
      expect(game.status).toBe("DEFUSED");
      expect(game.isWon).toBe(true);
    });

    it("returns EXPLODED when guesses run out", () => {
      const game = new BombGame("dog", 2);
      game.guess("x");
      game.guess("y");
      expect(game.status).toBe("EXPLODED");
      expect(game.isLost).toBe(true);
    });

    it("returns EXPLODED when time runs out", () => {
      const game = new BombGame("dog", 3);
      game.loseByTime();
      expect(game.status).toBe("EXPLODED");
      expect(game.isLost).toBe(true);
    });
  });
});
