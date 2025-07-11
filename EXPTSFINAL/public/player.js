export function updatePlayer(player, canvas) {
    player.x += player.speedX;
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
  }
  
  export function drawPlayer(player, ctx) {
    let offsetX = 0;
    let offsetY = 0;
    if (player.damaged) {
      offsetX = Math.random() * 6 - 3; 
      offsetY = Math.random() * 6 - 3;
    }
    ctx.drawImage(player.img, player.x + offsetX, player.y + offsetY, player.width, player.height);
  }
  

  export function shoot(player, bullets) {
    const bullet = {
      x: player.x + player.width / 2 - 4,
      y: player.y,
      width: 70,
      height: 70,
      speedY: 7,
      img: new Image()
    };
    bullet.img.src = "assets/chuteira.png";
    bullets.push(bullet);
  }
  