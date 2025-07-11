import { updatePlayer, drawPlayer } from './player.js';
import { updateBullets, drawBullets } from './bullet.js';
import { generateObstacles, updateObstacles, drawObstacles } from './obstacle.js';
import { checkCollisions } from './collision.js';
import { updateHUD } from './hud.js';

export let gameRunning = false;
export let paused = false;

export function startGame(setup) {
  const { canvas, selectedPlayer, playerImg, playerDamagedImg, player } = setup;

  document.getElementById("menu").style.display = "none";
  gameRunning = true;
  paused = false;
  updateHUD(setup);

  playerImg.src = `assets/teams/${selectedPlayer}`;

  player.x = canvas.width / 2 - 32;
  player.y = canvas.height - 100;

  requestAnimationFrame(() => updateGame(setup));
}

export function updateGame(setup) {
  const { ctx, canvas, player, bullets, obstacles } = setup;
  if (!gameRunning || paused) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updatePlayer(player, canvas);
  updateBullets(bullets);
  drawBullets(bullets, ctx);
  drawPlayer(player, ctx);
  generateObstacles(setup);
  updateObstacles(obstacles, canvas);
  drawObstacles(obstacles, ctx);
  checkCollisions(setup);

  requestAnimationFrame(() => updateGame(setup));
}

export function gameOver() {
  gameRunning = false;
  document.getElementById("game-over").style.display = "block";
}

export function restartGame(setup) {
  const { obstacles, bullets } = setup;
  obstacles.length = 0;
  bullets.length = 0;
  document.getElementById("game-over").style.display = "none";
  document.getElementById("menu").style.display = "block";
  document.getElementById("start-button").style.display = "none";
  document.getElementById("team-selection").innerHTML = '';
  document.getElementById("enemy-selection").innerHTML = '';
  document.getElementById("enemy-label").style.display = 'none';
  setup.loadTeamSelection(setup);
}


