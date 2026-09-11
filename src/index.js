import "./styles.css";
import { Player } from "./player";
import { Ship } from "./ship";

const humanPlayer = new Player(false);
const computerPlayer = new Player(true);

function renderBoard(boardInstance, containerId, isPlayerBoard) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";
    const board = boardInstance.getBoard();
    const attackMap = boardInstance.getAttackMap();

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = x;
            cell.dataset.y = y;

            if (isPlayerBoard && board[y][x] !== null) {
                cell.classList.add("ship");
            }

            if (attackMap[y][x] === "o") cell.classList.add("miss");
            if (attackMap[y][x] === "x") cell.classList.add("hit");

            if (!isPlayerBoard) {
                cell.addEventListener("click", () => handleAttack(x, y));
            }

            container.appendChild(cell);
        }
    }
}

const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const gameUI = document.getElementById("game-ui");
const gameOverScreen = document.getElementById("game-over-screen");
const winnerText = document.getElementById("winner-text");

startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    gameUI.style.display = "block";
    initGame();
});

function updateScores() {
    document.getElementById("human-score").textContent = computerPlayer.board.numberOfShipsSunk();
    document.getElementById("computer-score").textContent = humanPlayer.board.numberOfShipsSunk();
}

function handleAttack(x, y) {
    if (computerPlayer.board.getAttackMap()[y][x] !== null) return;

    humanPlayer.makeMove(computerPlayer.board, x, y);
    computerPlayer.makeMove(humanPlayer.board);

    renderBoard(humanPlayer.board, "human-board", true);
    renderBoard(computerPlayer.board, "computer-board", false);
    updateScores();

    if (computerPlayer.board.isAllShipsSunk()) showGameOver("You won!");
    if (humanPlayer.board.isAllShipsSunk()) showGameOver("Computer won!");
}

function showGameOver(message) {
    gameUI.style.display = "none";
    gameOverScreen.style.display = "block";
    winnerText.textContent = message;
}

function initGame() {
    const shipLengths = [5, 4, 3, 3, 2];

    shipLengths.forEach(len => {
        humanPlayer.board.placeShipRandomly(new Ship(len));
        computerPlayer.board.placeShipRandomly(new Ship(len));
    });

    renderBoard(humanPlayer.board, "human-board", true);
    renderBoard(computerPlayer.board, "computer-board", false);
}
