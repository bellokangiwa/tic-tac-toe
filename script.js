const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const resultScreen = document.getElementById("resultScreen");
const resultMessage = document.getElementById("resultMessage");

const clickSound = new Audio("sounds/click.mp3");
const winSound = new Audio("sounds/win.mp3");
const drawSound = new Audio("sounds/draw.mp3");

let cells = Array(9).fill(null);
let currentPlayer = "X";
let isGameOver = false;

function createBoard() {
  board.innerHTML = "";
  cells = Array(9).fill(null);
  isGameOver = false;
  currentPlayer = "X";
  statusText.textContent = "Player X's turn";
  resultScreen.classList.remove("active");

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (cells[index] || isGameOver) return;

  cells[index] = currentPlayer;
  e.target.innerHTML = `<span>${currentPlayer}</span>`;
  clickSound.play();

  if (checkWinner()) {
    winSound.play();
    showResult(`🎉 Player ${currentPlayer} wins!`);
  } else if (!cells.includes(null)) {
    drawSound.play();
    showResult("It's a draw! 🤝");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[b] === cells[c];
  });
}

function showResult(message) {
  statusText.textContent = "";
  resultMessage.textContent = message;
  resultScreen.classList.add("active");
  isGameOver = true;
}

restartBtn.addEventListener("click", createBoard);
createBoard();
