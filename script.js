// set const
const dataCells = document.querySelectorAll("[data-cell]");
// console.log(dataCells);
const board = document.getElementById("board");

const crossClass = "cross";
const circleClass = "circle";
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

startGame();

function startGame() {
  dataCells.forEach(function (cell) {
    cell.addEventListener("click", addMark, { once: true });
  });
  board.classList.add(currentClass);
}

function addMark(e) {
  e.target.classList.add(currentClass);

  if (checkWin(currentClass)) {
    console.log("win");
  }

  if (currentClass === crossClass) {
    currentClass = circleClass;
  } else {
    currentClass = crossClass;
  }
  addHoverMark();
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
