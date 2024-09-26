import { Enemy } from "./Enemy.js";

// Classe Fox
// Inimigo do jogo
export class Fox extends Enemy {
  constructor(game) {
    super(game);

    this.image = document.getElementById("fox");
    this.width = 32;
    this.height = 32;
    this.maxFrame = 7;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image = document.getElementById("fox");
    this.frameY = 2;
    this.lives = 5;
    this.score = this.lives;
    this.frameInterval = 6;
    this.frameTimer = 6;
  }
}
