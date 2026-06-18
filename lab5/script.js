var setupScreen  = document.getElementById("setup-screen");
var gameScreen   = document.getElementById("game-screen");
var diffSelect   = document.getElementById("difficulty");
var colorSelect  = document.getElementById("color");
var startBtn     = document.getElementById("start-btn");
var scoreDisplay = document.getElementById("score-display");
var timerDisplay = document.getElementById("timer-display");
var pixel        = document.getElementById("pixel");

var diffSettings = {
  lazy:    { timeLimit: 4, size: 80 },
  normal:  { timeLimit: 2, size: 50 },
  catchme: { timeLimit: 1, size: 30 }
};

var score      = 0;
var timeLeft   = 0;
var roundTimer = null;
var gameActive = false;

startBtn.addEventListener("click", function () {
  var diff  = diffSelect.value;
  var color = colorSelect.value;
  if (diff === "" || color === "") return;
  startGame(diff, color);
});

function startGame(diff, color) {
  var settings = diffSettings[diff];
  pixel.style.width           = settings.size + "px";
  pixel.style.height          = settings.size + "px";
  pixel.style.backgroundColor = color;
  score = 0;
  scoreDisplay.textContent = "score: 0";
  setupScreen.style.display = "none";
  gameScreen.style.display  = "block";
  gameActive = true;
  nextRound(settings);
}

function nextRound(settings) {
  if (!gameActive) return;
  if (roundTimer !== null) {
    clearInterval(roundTimer);
    roundTimer = null;
  }
  movePixel(settings.size);
  timeLeft = settings.timeLimit;
  timerDisplay.textContent = "time left for click: " + timeLeft;
  roundTimer = setInterval(function () {
    timeLeft--;
    timerDisplay.textContent = "time left for click: " + timeLeft;
    if (timeLeft <= 0) {
      clearInterval(roundTimer);
      roundTimer = null;
      endGame();
    }
  }, 1000);
}

function movePixel(size) {
  var maxX = window.innerWidth  - size;
  var maxY = window.innerHeight - size;
  var x = Math.floor(Math.random() * maxX);
  var y = Math.floor(Math.random() * maxY);
  pixel.style.left = x + "px";
  pixel.style.top  = y + "px";
}

pixel.addEventListener("click", function () {
  if (!gameActive) return;
  score++;
  scoreDisplay.textContent = "score: " + score;
  var diff = diffSelect.value;
  nextRound(diffSettings[diff]);
});

function endGame() {
  gameActive = false;
  alert(
    "Game over! Your score is " + score + ", congratulations!\n" +
    "Please reload the page to start a new game."
  );
}
