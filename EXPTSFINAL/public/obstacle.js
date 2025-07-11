let lastObstacleTime = 0;
const obstacleInterval = 1000;

export function generateObstacles(setup) {
  const { obstacles, canvas, selectedEnemy } = setup;

  const now = Date.now();
  if (now - lastObstacleTime < obstacleInterval) return;
  lastObstacleTime = now;

  const types = ['enemy', 'referee', 'ballBig', 'ballSmall'];
  const type = types[Math.floor(Math.random() * types.length)];

  const obstacle = {
    type,
    x: Math.random() * (canvas.width - 60),
    y: -50,
    width: 40,
    height: 40,
    speedY: 2 + Math.random() * 3,
    img: new Image()
  };

  switch (type) {
    case 'enemy':
      obstacle.img.src = selectedEnemy
        ? `assets/teams/${selectedEnemy}`
        : 'assets/cartaoVermelho.png';
      obstacle.width = 64;
      obstacle.height = 64;
      break;

    case 'referee':
      obstacle.img.src = "assets/bolaVermelha.png";
      break;

    case 'ballBig':
      obstacle.img.src = "assets/ball.png";
      obstacle.width = 60;
      obstacle.height = 90;
      break;

    case 'ballSmall':
      obstacle.img.src = "assets/ball.png";
      obstacle.width = 30;
      obstacle.height = 30;
      break;
  }

  obstacle.img.onerror = () => {
    obstacle.img.src = 'assets/cartaoVermelho.png'; // fallback se imagem falhar
  };

  obstacles.push(obstacle);
}

export function updateObstacles(obstacles, canvas) {
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].y += obstacles[i].speedY;
    if (obstacles[i].y > canvas.height) obstacles.splice(i, 1);
  }
}

export function drawObstacles(obstacles, ctx) {
  obstacles.forEach(obs => {
    ctx.drawImage(obs.img, obs.x, obs.y, obs.width, obs.height);
  });
}
