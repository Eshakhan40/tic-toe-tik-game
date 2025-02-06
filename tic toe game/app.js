

class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = "X";
        this.boardElement = document.getElementById("board");
        this.statusElement = document.getElementById("status");
        this.resetButton = document.getElementById("reset");

        this.resetButton.addEventListener("click", () => this.resetGame());
        this.createBoard();
    }

    createBoard() {
        this.boardElement.innerHTML = "";
        this.board.forEach((_, index) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = index;
            cell.addEventListener("click", () => this.makeMove(index));
            this.boardElement.appendChild(cell);
        });
    }

    makeMove(position) {
        if (this.board[position] || this.checkWinner()) return;

        this.board[position] = this.currentPlayer;
        this.updateBoard();

        if (this.checkWinner()) {
            this.statusElement.innerText = `Player ${this.currentPlayer} wins!`;
            return;
        }

        if (this.isDraw()) {
            this.statusElement.innerText = "It's a draw!";
            return;
        }

        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        this.statusElement.innerText = `Player ${this.currentPlayer}'s Turn`;
    }

    updateBoard() {
        this.board.forEach((value, index) => {
            this.boardElement.children[index].innerText = value || "";
        });
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winPatterns.some(pattern =>
            this.board[pattern[0]] &&
            this.board[pattern[0]] === this.board[pattern[1]] &&
            this.board[pattern[1]] === this.board[pattern[2]]
        );
    }

    isDraw() {
        return this.board.every(cell => cell !== null);
    }

    resetGame() {
        this.board = Array(9).fill(null);
        this.currentPlayer = "X";
        this.statusElement.innerText = "Player X's Turn";
        this.createBoard();
    }
}

// Initialize the game when the page loads
window.onload = () => new TicTacToe();
