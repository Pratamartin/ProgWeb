let obstacles = [];
let lastObstacleTime = 0;
let obstacleInterval = 1000; 


let selectedPlayer = null;
let selectedEnemy = null;

let canvas, ctx;
let player = null;
let bullets = [];
let score = 0;
let lives = 3;
let gameRunning = false;
let paused = false;

const canvasWidth = 800;
const canvasHeight = 600;
const playerSpeed = 5;
let playerImg = new Image();
let playerDamagedImg = new Image();

window.onload = () => {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  document.addEventListener("keydown", handleKeyPress);
  document.addEventListener("keyup", handleKeyRelease);

  loadTeamSelection(); 
};

function startGame() {
  if (!selectedPlayer || !selectedEnemy) return;

  document.getElementById("menu").style.display = "none";
  gameRunning = true;
  paused = false;
  score = 0;
  lives = 3;
  updateHUD();

  playerImg.src = `assets/teams/${selectedPlayer}`;
  playerDamagedImg.src = "assets/playerDamaged.png";

  player = {
    x: canvas.width / 2 - 32,
    y: canvas.height - 100,
    width: 64,
    height: 64,
    speedX: 0,
    damaged: false,
    damagedTime: 0,
  };

  requestAnimationFrame(updateGame);
}

function updateGame() {
  if (!gameRunning || paused) return;

  clearCanvas();
  updatePlayer();
  updateBullets();
  drawBullets();
  drawPlayer();
  generateObstacles();
  updateObstacles();
  drawObstacles();
  checkCollisions();
  requestAnimationFrame(updateGame);
}

function handleKeyPress(e) {
  if (e.code === "ArrowLeft") player.speedX = -playerSpeed;
  if (e.code === "ArrowRight") player.speedX = playerSpeed;
  if (e.code === "Space") {
    if (!paused && gameRunning) shoot();
  }
  if (e.key === "p" && gameRunning) {
    paused = !paused;
    if (!paused) requestAnimationFrame(updateGame);
  }
}

function handleKeyRelease(e) {
  if (["ArrowLeft", "ArrowRight"].includes(e.code)) player.speedX = 0;
}

function updatePlayer() {
  player.x += player.speedX;
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

function drawPlayer() {
  const img = player.damaged ? playerDamagedImg : playerImg;
  ctx.drawImage(img, player.x, player.y, player.width, player.height);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateHUD() {
  document.getElementById("score").textContent = `Pontos: ${score}`;
  const livesContainer = document.getElementById("lives");
  livesContainer.innerHTML = "";
  for (let i = 0; i < lives; i++) {
    const lifeImg = document.createElement("img");
    lifeImg.src = "assets/life.png";
    lifeImg.className = "life";
    livesContainer.appendChild(lifeImg);
  }
}

function shoot() {
  const bullet = {
    x: player.x + player.width / 2 - 4,
    y: player.y,
    width: 8,
    height: 20,
    speedY: 7,
    img: new Image()
  };
  bullet.img.src = "assets/bullet.png";
  bullets.push(bullet);
}

function updateBullets() {
  bullets.forEach((bullet, index) => {
    bullet.y -= bullet.speedY;
    if (bullet.y + bullet.height < 0) {
      bullets.splice(index, 1); // remove bala fora da tela
    }
  });
}

function drawBullets() {
  bullets.forEach(bullet => {
    ctx.drawImage(bullet.img, bullet.x, bullet.y, bullet.width, bullet.height);
  });
}


function loadTeamSelection() {
  const teams = ['team1.png', 'team2.png', 'team3.png', 'team4.png', 'team5.png', 'team6.png', 'team7.png', 'team8.png'];
  const teamContainer = document.getElementById('team-selection');

  teams.forEach(team => {
    const img = document.createElement('img');
    img.src = `assets/teams/${team}`;
    img.alt = team;
    img.addEventListener('click', () => {
      selectedPlayer = team;
      document.querySelectorAll('#team-selection img').forEach(i => i.classList.remove('selected'));
      img.classList.add('selected');
      loadEnemySelection(teams.filter(t => t !== team));
    });
    teamContainer.appendChild(img);
  });
}

function loadEnemySelection(enemyTeams) {
  const label = document.getElementById('enemy-label');
  const enemyContainer = document.getElementById('enemy-selection');
  enemyContainer.innerHTML = '';
  label.style.display = 'block';
  enemyContainer.style.display = 'flex';

  enemyTeams.forEach(team => {
    const img = document.createElement('img');
    img.src = `assets/teams/${team}`;
    img.alt = team;
    img.addEventListener('click', () => {
      selectedEnemy = team;
      document.querySelectorAll('#enemy-selection img').forEach(i => i.classList.remove('selected'));
      img.classList.add('selected');
      document.getElementById('start-button').style.display = 'block';
    });
    enemyContainer.appendChild(img);
  });
}

function generateObstacles() {
  const now = Date.now();
  if (now - lastObstacleTime < obstacleInterval) return;
  lastObstacleTime = now;

  const types = ['enemy', 'referee', 'ballBig', 'ballSmall'];
  const type = types[Math.floor(Math.random() * types.length)];

  const obstacle = {
    type: type,
    x: Math.random() * (canvas.width - 50),
    y: -50,
    width: 40,
    height: 40,
    speedY: 2 + Math.random() * 3,
    img: new Image()
  };

  switch (type) {
    case 'enemy':
      obstacle.img.src = `assets/teams/${selectedEnemy}`;
      obstacle.width = 64;
      obstacle.height = 64;
      break;
    case 'referee':
      obstacle.img.src = "assets/ufo.png";
      break;
    case 'ballBig':
      obstacle.img.src = "assets/asteroid_large.png";
      break;
    case 'ballSmall':
      obstacle.img.src = "assets/asteroid_small.png";
      break;
  }

  obstacles.push(obstacle);
}

function updateObstacles() {
  obstacles.forEach((obs, index) => {
    obs.y += obs.speedY;
    if (obs.y > canvas.height) obstacles.splice(index, 1);
  });
}

function drawObstacles() {
  obstacles.forEach(obs => {
    ctx.drawImage(obs.img, obs.x, obs.y, obs.width, obs.height);
  });
}

function checkCollisions() {
  // Bala x obstáculo
  bullets.forEach((bullet, bIndex) => {
    obstacles.forEach((obs, oIndex) => {
      if (isColliding(bullet, obs)) {
        bullets.splice(bIndex, 1);
        obstacles.splice(oIndex, 1);
        addScore(obs.type);
      }
    });
  });

  // Jogador x obstáculo
  obstacles.forEach((obs, oIndex) => {
    if (isColliding(player, obs)) {
      obstacles.splice(oIndex, 1);
      loseLife();
    }
  });
}

function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function addScore(type) {
  switch (type) {
    case 'ballBig': score += 10; break;
    case 'referee': score += 20; break;
    case 'enemy': score += 50; break;
    case 'ballSmall': score += 100; break;
  }
  updateHUD();
}

function loseLife() {
  lives--;
  player.damaged = true;
  setTimeout(() => player.damaged = false, 500);
  updateHUD();
  if (lives <= 0) gameOver();
}


window.startGame = startGame;


function gameOver() {
  gameRunning = false;
  document.getElementById("game-over").style.display = "block";
}

function restartGame() {
  obstacles = [];
  bullets = [];
  selectedPlayer = null;
  selectedEnemy = null;
  document.getElementById("game-over").style.display = "none";
  document.getElementById("menu").style.display = "block";
  document.getElementById("start-button").style.display = "none";
  document.getElementById("team-selection").innerHTML = '';
  document.getElementById("enemy-selection").innerHTML = '';
  document.getElementById("enemy-label").style.display = 'none';
  loadTeamSelection();
}

window.restartGame = restartGame;
