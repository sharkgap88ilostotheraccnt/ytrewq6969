const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Turtle object
let turtle = {
  x: 100,
  y: canvas.height - 50,
  radius: 20,
  velocityX: 0,
  velocityY: 0,
  isFlying: false,
};

const gravity = 0.5; // Gravity effect
const groundFriction = 0.8; // Friction when on the ground
const airFriction = 0.99; // Friction when in the air

function drawTurtle() {
  ctx.beginPath();
  ctx.arc(turtle.x, turtle.y, turtle.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.closePath();
}

function updateTurtle() {
  if (turtle.isFlying) {
    // Apply gravity
    turtle.velocityY += gravity;

    // Update position
    turtle.x += turtle.velocityX;
    turtle.y += turtle.velocityY;

    // Apply air friction
    turtle.velocityX *= airFriction;
    turtle.velocityY *= airFriction;

    // Bounce off the ground
    if (turtle.y + turtle.radius >= canvas.height) {
      turtle.y = canvas.height - turtle.radius;
      turtle.velocityY *= -0.7; // Lose energy on bounce
      turtle.velocityX *= groundFriction; // Apply ground friction

      // Stop flying if velocity is too low
      if (Math.abs(turtle.velocityY) < 1) {
        turtle.isFlying = false;
      }
    }

    // Bounce off walls
    if (turtle.x - turtle.radius <= 0 || turtle.x + turtle.radius >= canvas.width) {
      turtle.velocityX *= -1; // Reverse horizontal direction
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw and update turtle
  drawTurtle();
  updateTurtle();

  requestAnimationFrame(gameLoop);
}

// Launch button functionality
document.getElementById('launchButton').addEventListener('click', () => {
  if (!turtle.isFlying) {
    // Set random velocities for launch
    turtle.velocityX = Math.random() * 10 + 10; // Horizontal velocity
    turtle.velocityY = -(Math.random() * 10 + 10); // Vertical velocity
    turtle.isFlying = true; // Set flying state
  }
});

// Start game loop
gameLoop();
