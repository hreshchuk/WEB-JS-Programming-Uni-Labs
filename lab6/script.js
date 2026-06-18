var loadBtn     = document.getElementById("load-btn");
var resetBtn    = document.getElementById("reset-btn");
var levelSelect = document.getElementById("level-select");
var gameArea    = document.getElementById("game-area");
var gridEl      = document.getElementById("grid");
var stepsDisplay = document.getElementById("steps-display");
var winMessage  = document.getElementById("win-message");
var winSteps    = document.getElementById("win-steps");

var currentGrid = [];
var initialGrid = [];
var steps = 0;

// Завантаження рівня через fetch (Ajax)
loadBtn.addEventListener("click", function () {
  var level = levelSelect.value;
  if (level === "") return;

  fetch("data/levels.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      initialGrid = data[level].map(function (row) {
        return row.slice();
      });
      startGame();
    });
});

function startGame() {
  // Копіюємо початковий стан
  currentGrid = initialGrid.map(function (row) {
    return row.slice();
  });
  steps = 0;
  stepsDisplay.textContent = "Steps: 0";

  // Показуємо ігрову область
  gameArea.style.display = "block";
  winMessage.style.display = "none";

  renderGrid();
}

function renderGrid() {
  gridEl.innerHTML = "";

  for (var r = 0; r < 5; r++) {
    for (var c = 0; c < 5; c++) {
      var cell = document.createElement("div");
      cell.className = "cell " + (currentGrid[r][c] === 1 ? "on" : "off");
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener("click", onCellClick);
      gridEl.appendChild(cell);
    }
  }
}

function onCellClick(event) {
  var r = parseInt(event.target.dataset.row);
  var c = parseInt(event.target.dataset.col);

  // Перемикаємо клітинку і сусідів
  toggle(r, c);
  toggle(r - 1, c);
  toggle(r + 1, c);
  toggle(r, c - 1);
  toggle(r, c + 1);

  steps++;
  stepsDisplay.textContent = "Steps: " + steps;

  renderGrid();
  checkWin();
}

function toggle(r, c) {
  if (r < 0 || r >= 5 || c < 0 || c >= 5) return;
  currentGrid[r][c] = currentGrid[r][c] === 1 ? 0 : 1;
}

function checkWin() {
  for (var r = 0; r < 5; r++) {
    for (var c = 0; c < 5; c++) {
      if (currentGrid[r][c] === 1) return;
    }
  }
  // Всі вимкнені — перемога
  winSteps.textContent = steps;
  winMessage.style.display = "block";
}

// Reset
resetBtn.addEventListener("click", function () {
  startGame();
});
