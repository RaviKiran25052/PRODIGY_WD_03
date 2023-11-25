let currentPlayer = 'X';
let gameActive = false;
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const cells = document.querySelectorAll('.cell');

const startBtn = document.getElementById('startBtn');
let gameStarted = false;

function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    startBtn.innerText = 'Restart Game';

    cells.forEach(cell => {
      cell.innerText = '';
      cell.classList.remove('win', 'blink'); // Reset classes
      cell.addEventListener('click', handleCellClick, { once: true });
    });
    gameActive = true;
  } else {
    // Restart the game
    cells.forEach(cell => {
      cell.innerText = '';
      cell.classList.remove('win', 'blink'); // Reset classes
      cell.addEventListener('click', handleCellClick, { once: true });
    });
    gameActive = true;
    currentPlayer = 'X';
  }
}

function handleCellClick(e) {
  if (!gameStarted) {
    alert('Please click the "Start Game" button first!');
    return;
  }

  const cell = e.target;
  const index = parseInt(cell.getAttribute('data-cell'));

  if (gameActive && !cell.innerText) {
    cell.innerText = currentPlayer;

    if (checkWin()) {
      gameActive = false;
      setTimeout(() => {
        alert(`${currentPlayer} wins!`);
      }, 0);
    } else if (checkDraw()) {
      gameActive = false;
      setTimeout(() => {
        alert('It\'s a draw!');
      }, 0);
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkWin() {
  let isWin = false;
  winningCombos.forEach(combo => {
    const [a, b, c] = combo;
    if (
      cells[a].innerText &&
      cells[a].innerText === cells[b].innerText &&
      cells[a].innerText === cells[c].innerText
    ) {
      cells[a].classList.add('win');
      cells[b].classList.add('win');
      cells[c].classList.add('win');
      isWin = true;
    }
  });
  return isWin;
}

function checkDraw() {
  const isDraw = [...cells].every(cell => cell.innerText !== '');

  if (isDraw) {
    cells.forEach(cell => cell.classList.add('blink'));
    setTimeout(() => {
      cells.forEach(cell => cell.classList.remove('blink'));
    }, 3000);
    return true;
  }
  return false;
}
