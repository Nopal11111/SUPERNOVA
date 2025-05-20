const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const restartBtn = document.getElementById("restartBtn");
const scoreDisplay = document.getElementById("score");
const jumpBtn = document.getElementById("jumpBtn");

let isJumping = false;
let gameRunning = true;
let moveInterval;
let scoreInterval;
let score = 0;

document.addEventListener("keydown", function(event) {
  if (event.code === "Space" && !isJumping && gameRunning) {
    jump();
  }
});

jumpBtn.addEventListener("touchstart", () => {
  if (!isJumping && gameRunning) {
    jump();
  }
});

jumpBtn.addEventListener("click", () => {
  if (!isJumping && gameRunning) {
    jump();
  }
});

function jump() {
  isJumping = true;
  let position = 0;

  let upInterval = setInterval(() => {
    if (position >= 100) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 5;
          dino.style.bottom = position + "px";
        }
      }, 20);

    } else {
      position += 5;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

function moveCactus() {
  if (!gameRunning) return;

  let cactusLeft = parseInt(window.getComputedStyle(cactus).left);
  if (cactusLeft < -20) {
    cactus.style.left = "600px";
  } else {
    cactus.style.left = cactusLeft - 5 + "px";
  }

  let dinoBottom = parseInt(window.getComputedStyle(dino).bottom);
  if (cactusLeft < 90 && cactusLeft > 50 && dinoBottom < 50) {
    gameOver();
  }
}

function updateScore() {
  if (gameRunning) {
    score++;
    scoreDisplay.textContent = "Skor: " + score;
  }
}

function gameOver() {
  gameRunning = false;
  restartBtn.style.display = "block";
  clearInterval(moveInterval);
  clearInterval(scoreInterval);
}

restartBtn.addEventListener("click", () => {
  cactus.style.left = "600px";
  dino.style.bottom = "0px";
  restartBtn.style.display = "none";
  score = 0;
  scoreDisplay.textContent = "Skor: 0";
  gameRunning = true;

  moveInterval = setInterval(moveCactus, 20);
  scoreInterval = setInterval(updateScore, 100);
});

// Start game
moveInterval = setInterval(moveCactus, 20);
scoreInterval = setInterval(updateScore, 100);
