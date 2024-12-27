const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to start the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    // Empty all boxes and reset pointer events
    boxes.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "all"; // Enable clicking
        box.classList.remove("win"); // Remove the "win" class if any
        box.classList = `box box${index + 1}`;
    });
    
    newGameBtn.classList.remove("active"); // Hide the new game button
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// Handle box click
function handleClick(index) {
    if (gameGrid[index] === "") { // Only allow move if box is empty
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none"; // Disable further clicks on this box

        swapTurn();
        checkGameOver();
    }
}

// Swap player turn
function swapTurn() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// Check if the game is over (winner or tie)
function checkGameOver() {
    let winner = "";
    winningPositions.forEach((position) => {
        if (gameGrid[position[0]] && 
            gameGrid[position[0]] === gameGrid[position[1]] && 
            gameGrid[position[1]] === gameGrid[position[2]]) {

            winner = gameGrid[position[0]]; // X or O is the winner

            // Disable further clicks on the grid
            boxes.forEach((box) => box.style.pointerEvents = "none");

            // Highlight the winning combination
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if (winner) {
        gameInfo.innerText = `Winner: ${winner}`;
        newGameBtn.classList.add("active"); // Show new game button
        return;
    }

    // Check for tie (grid is full)
    if (gameGrid.every(cell => cell !== "")) {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active"); // Show new game button
    }
}

// Add event listeners for each box
boxes.forEach((box, index) => {
    box.addEventListener("click", () => handleClick(index));
});

// Reset the game on new game button click
newGameBtn.addEventListener("click", initGame);

// Initialize the game
initGame();
