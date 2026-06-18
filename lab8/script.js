// HAMBURGER
var hamburger = document.getElementById("hamburger");
var navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", function () {
  navMenu.classList.toggle("open");
});

// CAROUSEL
var track = document.querySelector(".carousel-track");
var slides = document.querySelectorAll(".slide");
var prevBtn = document.getElementById("prev");
var nextBtn = document.getElementById("next");
var indicatorsEl = document.getElementById("indicators");

var current = 0;
var total = slides.length;
var autoTimer = null;

// Створюємо індикатори
for (var i = 0; i < total; i++) {
  var dot = document.createElement("button");
  dot.className = "dot" + (i === 0 ? " active" : "");
  dot.dataset.index = i;
  dot.addEventListener("click", function () {
    goTo(parseInt(this.dataset.index));
    resetTimer();
  });
  indicatorsEl.appendChild(dot);
}

function getDots() {
  return document.querySelectorAll(".dot");
}

function goTo(index) {
  current = (index + total) % total;
  track.style.transform = "translateX(-" + (current * 100) + "%)";
  var dots = getDots();
  for (var i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  dots[current].classList.add("active");
}

function goNext() { goTo(current + 1); }
function goPrev() { goTo(current - 1); }

prevBtn.addEventListener("click", function () {
  goPrev();
  resetTimer();
});

nextBtn.addEventListener("click", function () {
  goNext();
  resetTimer();
});

function startTimer() {
  autoTimer = setInterval(goNext, 3000);
}

function resetTimer() {
  clearInterval(autoTimer);
  startTimer();
}

// Запуск автоперемикання
startTimer();
