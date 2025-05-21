const board = document.getElementById("gameBoard");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");

let cells = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // baris
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // kolom
  [0, 4, 8], [2, 4, 6]             // diagonal
];

function initializeGame() {
  board.innerHTML = "";
  cells = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  statusText.textContent = `Giliran: ${currentPlayer}`;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

function handleCellClick(e) {
  const index = e.target.getAttribute("data-index");

  if (cells[index] !== "" || !isGameActive) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkWinner();
}

function checkWinner() {
  let roundWon = false;

  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Pemain ${currentPlayer} menang!`;
    isGameActive = false;
    return;
  }

  if (!cells.includes("")) {
    statusText.textContent = "Seri!";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Giliran: ${currentPlayer}`;
}

restartBtn.addEventListener("click", initializeGame);

// Mulai game saat halaman dimuat
initializeGame();
