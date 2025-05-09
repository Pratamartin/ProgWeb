import { updateHUD } from './hud.js';
import { gameOver } from './game.js';

export function checkCollisions(setup) {
  const { bullets, obstacles, player, score } = setup;

  bullets.forEach((bullet, bIndex) => {
    obstacles.forEach((obs, oIndex) => {
      if (isColliding(bullet, obs)) {
        bullets.splice(bIndex, 1);
        obstacles.splice(oIndex, 1);
        addScore(obs.type, setup);
      }
    });
  });

    obstacles.forEach((obs, oIndex) => {
    if (isColliding(player, obs)) {
      obstacles.splice(oIndex, 1);
      loseLife(setup);
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

function addScore(type, setup) {
  switch (type) {
    case 'ballBig': setup.score += 10; break;
    case 'referee': setup.score += 20; break;
    case 'enemy': setup.score += 50; break;
    case 'ballSmall': setup.score += 100; break;
  }
  updateHUD(setup);
}

function loseLife(setup) {
  setup.lives--;
  setup.player.damaged = true;
  setTimeout(() => setup.player.damaged = false, 500);
  updateHUD(setup);
  if (setup.lives <= 0) gameOver();
}