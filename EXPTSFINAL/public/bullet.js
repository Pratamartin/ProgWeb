export function updateBullets(bullets) {
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].y -= bullets[i].speedY;
      if (bullets[i].y + bullets[i].height < 0) bullets.splice(i, 1);
    }
  }
  
  export function drawBullets(bullets, ctx) {
    bullets.forEach(bullet => {
      ctx.drawImage(bullet.img, bullet.x, bullet.y, bullet.width, bullet.height);
    });
  }
  