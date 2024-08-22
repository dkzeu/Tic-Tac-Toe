document.addEventListener('DOMContentLoaded', () => {
    const startGameBtn = document.getElementById('start-game');
    const cells = document.querySelectorAll('.cell');
    const resultContainer = document.querySelector('.result');
    const resultIcon = document.getElementById('result-icon');
    const resultText = document.getElementById('result-text');

    let playerSymbol = '';
    let computerSymbol = '';
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'player';

    // Show the game container from the start
    document.querySelector('.game-container').classList.remove('hidden');

    startGameBtn.addEventListener('click', startGame);

    function startGame() {
        const choice = prompt('Choose your symbol: Dagger or Heart? (type "dagger" or "heart")').toLowerCase();
        if (choice === 'dagger' || choice === 'heart') {
            playerSymbol = choice;
            computerSymbol = playerSymbol === 'dagger' ? 'heart' : 'dagger';
            startGameBtn.textContent = `You chose ${playerSymbol.toUpperCase()}!`;
            resetBoard();
        } else {
            alert('Invalid choice! Please type "dagger" or "heart".');
        }
    }

    function resetBoard() {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.textContent = '';
            cell.addEventListener('click', handleClick, { once: true });
        });
    }

    function handleClick(event) {
        const index = Array.from(cells).indexOf(event.target);
        if (board[index] === '') {
            board[index] = currentPlayer === 'player' ? playerSymbol : computerSymbol;
            event.target.textContent = currentPlayer === 'player' ? getSymbolIcon(playerSymbol) : getSymbolIcon(computerSymbol);
            if (checkWin()) {
                endGame(`${getSymbolIcon(currentPlayer === 'player' ? playerSymbol : computerSymbol)} WINS!`);
            } else if (board.every(cell => cell !== '')) {
                endGame('IT\'S A DRAW!');
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
            endGame(`${getSymbolIcon(computerSymbol)} WINS!`);
        } else if (board.every(cell => cell !== '')) {
            endGame('IT\'S A DRAW!');
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
        return symbol === 'dagger' ? '🗡️' : '❤️'; // You can replace these with custom images/icons
    }

    function endGame(message) {
        resultText.textContent = message;
        resultIcon.src = currentPlayer === 'player' ? getSymbolIcon(playerSymbol) : getSymbolIcon(computerSymbol);
        resultContainer.classList.remove('hidden');
        setTimeout(() => {
            if (confirm('PLAY AGAIN?')) {
                resultContainer.classList.add('hidden');
                resetBoard();
                currentPlayer = 'player';
            }
        }, 1000);
    }
});
