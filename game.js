const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let turtle = {
  x: 100,
  y: canvas.height - 100,
  radius: 20,
  velocityX: 0,
  velocityY: 0,
  isFlying: false,
};

const gravity = 0.5;
const friction = 0.98;

function drawTurtle() {
  ctx.beginPath();
  ctx.arc(turtle.x, turtle.y, turtle.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.closePath();
}

function updateTurtle() {
  if (turtle.isFlying) {
    turtle.velocityY += gravity;
    turtle.x += turtle.velocityX;
    turtle.y += turtle.velocityY;

    // Bounce off the ground
    if (turtle.y + turtle.radius >= canvas.height) {
      turtle.y = canvas.height - turtle.radius;
      turtle.velocityY *= -0.7; // Lose energy on bounce
      turtle.velocityX *= friction; // Apply friction

      if (Math.abs(turtle.velocityY) < 1) {
        turtle.isFlying = false; // Stop flying if velocity is too low
      }
    }

    // Bounce off walls
    if (turtle.x - turtle.radius <= 0 || turtle.x + turtle.radius >= canvas.width) {
      turtle.velocityX *= -1; // Reverse direction
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawTurtle();
  updateTurtle();

  requestAnimationFrame(gameLoop);
}

document.getElementById('launchButton').addEventListener('click', () => {
  if (!turtle.isFlying) {
    turtle.velocityX = Math.random() * 15 + 10; // Random horizontal velocity
    turtle.velocityY = -(Math.random() * 15 + 10); // Random vertical velocity
    turtle.isFlying = true;
  }
});

gameLoop();
