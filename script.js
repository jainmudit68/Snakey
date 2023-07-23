let snake = [{ top: 200, left: 200 }];
let direction = { dx: 20, dy: 0 };
let food = null;
let score = 0;
let highScore = 0;

window.addEventListener("keydown", (e) => {
  const newDirection = getDirection(e.key);
  const allowedChange = Math.abs(direction.dx) !== Math.abs(newDirection.dx);
  if (allowedChange) 
  direction = newDirection;
});

function getDirection(key) {
  switch (key) {
    case "ArrowUp":
      return { dx: 0, dy: -20 };
    case "ArrowDown":
      return { dx: 0, dy: 20 };
    case "ArrowLeft":
      return { dx: -20, dy: 0 };
    case "ArrowRight":
      return { dx: 20, dy: 0 };
    default:
      return direction;
  }
}

function moveSnake() {
  const head = Object.assign({}, snake[0]); 
  head.top += direction.dy;
  head.left += direction.dx;
  snake.unshift(head);

  if (snake[0].top < 0) snake[0].top = 380;
  if (snake[0].left < 0) snake[0].left = 380;
  if (snake[0].top > 380) snake[0].top = 0;
  if (snake[0].left > 380) snake[0].left = 0;

  if (!eatFood()) 
  snake.pop(); 
}

function randomFood() {
  food = {
    top: Math.floor(Math.random() * 20) * 20,
    left: Math.floor(Math.random() * 20) * 20,
  };
}

function eatFood() {
  if (snake[0].top === food.top && snake[0].left === food.left) {
    food = null;
    return true;
  }
  return false;
}

function gameOver() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].top === snake[0].top && snake[i].left === snake[0].left)
      return true;
  }
  return false;
}

function updateScore() {
  document.getElementById("score").innerText = "Current Score : " + score;
  document.getElementById("high-score").innerText = "High Score : " + highScore;
}

function gameLoop() {
  if (gameOver()) {
    alert("Game over!");
    
    if (score > highScore) {
      highScore = score;
    }
    score = 0;
    snake = [{ top: 200, left: 200 }];
    direction = { dx: 20, dy: 0 };
    food = null;
    randomFood();
  }

  setTimeout(() => {
    document.getElementById("game-screen").innerHTML = "";
    moveSnake();
    if (!food) {
      randomFood();
      score++;
    }
    updateScore();
    drawSnake();
    drawFood();
    gameLoop();
  }, 100);
}

drawSnake();
randomFood();
gameLoop();

function drawSnake() {
  snake.forEach((item, index) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.top = `${item.top}px`;
    snakeElement.style.left = `${item.left}px`;
    snakeElement.classList.add("snake");
    if (index === 0) snakeElement.classList.add("head");
    document.getElementById("game-screen").appendChild(snakeElement);
  });
}

function drawFood() {
  const foodElement = document.createElement("div");
  foodElement.style.top = `${food.top}px`;
  foodElement.style.left = `${food.left}px`;
  foodElement.classList.add("food");
  document.getElementById("game-screen").appendChild(foodElement);
}