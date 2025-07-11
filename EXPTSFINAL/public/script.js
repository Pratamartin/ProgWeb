import { startGame, restartGame } from './game.js';
import { shoot } from './player.js';
import { loadTeamSelection } from './menu.js';

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

export const setup = {
  canvas,
  ctx,
  selectedPlayer: null,
  selectedEnemy: null,
  player: {
    x: 0,
    y: 0,
    width: 64,
    height: 64,
    speedX: 0,
    damaged: false,
    img: new Image(),
    damagedImg: new Image()
  },
  bullets: [],
  obstacles: [],
  score: 0,
  lives: 3,
  loadTeamSelection
};

setup.player.img = new Image();
setup.player.damagedImg = new Image();

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") setup.player.speedX = -5;
  if (e.code === "ArrowRight") setup.player.speedX = 5;
  if (e.code === "Space") shoot(setup.player, setup.bullets);
  if (e.key === "p") {
    import('./game.js').then(mod => {
      mod.paused = !mod.paused;
      if (!mod.paused) mod.updateGame(setup);
    });
  }
});

document.addEventListener("keyup", (e) => {
  if (["ArrowLeft", "ArrowRight"].includes(e.code)) {
    setup.player.speedX = 0;
  }
});

window.startGame = () => {
  setup.score = 0;
  setup.lives = 3;
  startGame({
    ...setup,
    selectedPlayer: setup.selectedPlayer,
    selectedEnemy: setup.selectedEnemy,
    playerImg: setup.player.img,
    playerDamagedImg: setup.player.damagedImg,
    player: setup.player
  });
};

window.restartGame = () => {
  restartGame(setup);
};

loadTeamSelection(setup);
