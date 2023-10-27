const cells = document.querySelectorAll("[data-cell]");
const classX = 'x';
const classCircle = 'circle';
let circleTurn;
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const buttonStart = document.querySelector(".button-start");
const buttonRestart = document.querySelector(".button-restart");
const namePlayerOne = document.querySelector(".namePlayer1");
const namePlayerTwo = document.querySelector(".namePlayer2");
const winner = document.querySelector(".winner");

function startGame() {
    circleTurn = false;
    cells.forEach(cell => {
        cell.addEventListener("click", handleClick, {once: true})
    });
}

function resetGame() {
    if (winner.innerHTML != "") {
        cells.forEach(cell => {
            cell.classList.remove(classCircle)
            cell.classList.remove(classX)
        })
        winner.innerHTML = "";
        namePlayerOne.textContent = "";
        namePlayerTwo.textContent = "";
    }
}

buttonStart.addEventListener("click", () => {
    namePlayerOne.innerHTML = prompt("Type the name of Player 1:");
    namePlayerTwo.innerHTML = prompt("Type the name of Player 2:");
    startGame();
})

buttonRestart.addEventListener("click", () => {
    resetGame();
})

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? classCircle : classX;
    addMark(cell, currentClass);
    swapTurn();
    if (checkWin(currentClass)) {
        endGame(false);
    }
    else if (isDraw()) {
        endGame(true);
    }
}

function endGame(draw) {
    if (draw) {
        winner.innerHTML = "Draw!";
    }
    else {
        winner.innerHTML = `${circleTurn ? `${namePlayerOne.textContent} wins!` : `${namePlayerTwo.textContent} wins!`}`
    }
}

function addMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurn() {
    circleTurn = !circleTurn;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    })
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(classX) || cell.classList.contains(classCircle);
    })
}


