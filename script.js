// ! set const
const dataCells = document.querySelectorAll("[data-cell]");
//  console.log(dataCells);
const board = document.getElementById("board");

const crossClass = "cross";
const circleClass = "circle";
// *** when play for the first time, 'cross' play first
let currentClass = crossClass;

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const result = document.getElementById("result");
const dataResultText = document.querySelector("[data-result-text]");
const restartBtn = document.getElementById("restartBtn");

// ! set function
startGame();

restartBtn.addEventListener("click", startGame);

function startGame() {
  result.classList.remove("show");
  dataResultText.classList.remove(crossClass);
  dataResultText.classList.remove(circleClass);
  dataCells.forEach((cell) => {
    cell.classList.remove(crossClass);
    cell.classList.remove(circleClass);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  board.classList.add(currentClass);
}

function handleClick(e) {
  addMark(e.target, currentClass);
  // *** display result (win or tie)
  if (checkWin(currentClass)) {
    displayResult(false);
  } else if (checkTie()) {
    displayResult(true);
    // *** prevent change hands
    return;
  }
  // *** change hands
  if (currentClass === crossClass) {
    currentClass = circleClass;
  } else {
    currentClass = crossClass;
  }
  addHoverMark();
}

function addMark(cell, currentClass) {
  return cell.classList.add(currentClass);
}

function addHoverMark() {
  board.classList.remove(crossClass);
  board.classList.remove(circleClass);
  board.classList.add(currentClass);
}

function checkWin(currentClass) {
  return winCombinations.some((combination) => {
    return combination.every((index) => {
      return dataCells[index].classList.contains(currentClass);
    });
  });
}

function checkTie() {
  return [...dataCells].every((cell) => {
    return (
      cell.classList.contains(crossClass) ||
      cell.classList.contains(circleClass)
    );
  });
}

function displayResult(tie) {
  result.classList.add("show");
  // *** when tie
  if (tie) {
    dataResultText.textContent = "It's a tie.";
    // *** when someone wins
  } else {
    // console.log(currentClass);
    let winner;
    if (currentClass === "cross") {
      winner = "X";
    } else {
      winner = "O";
    }
    dataResultText.classList.add(currentClass);
    dataResultText.textContent = `${winner}'s Wins!`;
  }
}
