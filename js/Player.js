import { Projectile } from "./Projectile.js";

/**
 * Classe Player
 * Define as propriedades do jogador
 */
export class Player {
  constructor(game) {
    this.game = game;
    this.width = 32;
    this.height = 32;
    this.x = 32;
    this.y = 32;
    this.speedY = 0;
    this.maxSpeed = 4;
    this.projectiles = [];
    this.frameX = 0;
    this.frameY = 1;
    this.maxFrame = 5;
    this.image = document.getElementById("player");
    this.frameInterval = 5;
    this.frameTimer = 0;
  }

  // Atualiza a posição do jogador
  update() {
    if (this.game.keys.includes("ArrowUp")) this.speedY = -this.maxSpeed;
    else if (this.game.keys.includes("ArrowDown")) this.speedY = this.maxSpeed;
    else this.speedY = 0;
    this.y += this.speedY;

    //handle projectile
    this.projectiles.forEach((projectile) => {
      projectile.update();
    });

    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    );

    // Animação do sprite
    if (this.frameTimer % this.frameInterval === 0) {
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    }
    this.frameTimer++;
  }

  draw(context) {
    context.fillStyle = "transparent";
    context.fillRect(this.x, this.y, this.width, this.height);

    const offsetX = 0; // Ajuste conforme necessário
    const offsetY = 0; // Ajuste conforme necessário

    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.projectiles.forEach((projectile) => {
      projectile.draw(context);
    });
  }

  shootTop() {
    if (this.game.ammo > 0) {
      this.projectiles.push(new Projectile(this.game, this.x, this.y));
      this.game.ammo--;
    }
  }
}
