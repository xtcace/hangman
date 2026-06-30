export function buildKeyboard(keyboardEl) {
  const rows = [
    "qwertyuiop".split(""),
    "asdfghjkl".split(""),
    "zxcvbnm".split(""),
  ];

  rows.forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.classList.add("keyboard__row");

    row.forEach((letter) => {
      const key = document.createElement("button");
      key.classList.add("keyboard__key", "nes-btn");
      key.dataset.letter = letter;

      const span = document.createElement("span");
      span.textContent = letter.toUpperCase();

      key.appendChild(span);
      rowEl.appendChild(key);
    });

    keyboardEl.appendChild(rowEl);
  });
}
