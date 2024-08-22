const cells = document.querySelectorAll('.cell');
const gameContainer = document.querySelector('.game-container');
const prompt = document.querySelector('.prompt');
const resultContainer = document.querySelector('.result');
const resultIcon = document.getElementById('result-icon');
const resultText = document.getElementById('result-text');
const startGameBtn = document.getElementById('start-game');

let playerSymbol = '';
let computerSymbol = '';
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'player';

startGameBtn.addEventListener('click', startGame);

function startGame() {
    playerSymbol = prompt('Choose your symbol: Dagger or Heart?').toLowerCase() === 'dagger' ? 'dagger' : 'heart';
    computerSymbol = playerSymbol === 'dagger' ? 'heart' : 'dagger';
    prompt.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    currentPlayer = 'player';
    resetBoard();
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

function handleClick(event) {
    const index = Array.from(cells).indexOf(event.target);
    if (board[index] === '') {
        board[index] = currentPlayer === 'player' ? playerSymbol : computerSymbol;
        event.target.textContent = currentPlayer === 'player' ? getSymbolIcon(playerSymbol) : getSymbolIcon(computerSymbol);
        if (checkWin()) {
            endGame(`${currentPlayer === 'player' ? playerSymbol : computerSymbol} wins!`);
        } else if (board.every(cell => cell !== '')) {
            endGame('It\'s a draw!');
        } else {
            currentPlayer = currentPlayer === 'player' ? 'computer' : 'player';
            if (currentPlayer === 'computer') {
                computerMove();
            }
        }
    }
}

function computerMove() {
    let availableCells = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
    let move = availableCells[Math.floor(Math.random() * availableCells.length)];
    board[move] = computerSymbol;
    cells[move].textContent = getSymbolIcon(computerSymbol);
    if (checkWin()) {
        endGame(`${computerSymbol} wins!`);
    } else if (board.every(cell => cell !== '')) {
        endGame('It\'s a draw!');
    } else {
        currentPlayer = 'player';
    }
}

function checkWin() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombos.some(combo => {
        return board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]];
    });
}

function getSymbolIcon(symbol) {
    return symbol === 'dagger' ? '🗡️' : '❤️'; // Use a historical fantasy-themed dagger and heart icon
}

function endGame(message) {
    resultIcon.src = currentPlayer === 'player' ? getSymbolIcon(playerSymbol) : getSymbolIcon(computerSymbol);
    resultText.textContent = message;
    resultContainer.classList.remove('hidden');
    setTimeout(() => {
        if (confirm('PLAY AGAIN?')) {
            resultContainer.classList.add('hidden');
            resetBoard();
            currentPlayer = 'player';
        }
    }, 1000);
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
