import { Game } from "./Game.js";
import { Enemy } from "./Enemies/Enemy.js";
import { UI } from "./UI.js";
import { Background } from "./Background/Background.js";
import { InputHandler } from "./InputHandler.js";
import { Player } from "./Player.js";
/**
 * Classe Projectile
 * Responsável por definir as propriedades dos projetéis disparados no jogo, bem como
 * suas caractéristicas físicas.
 */

export class Projectile {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.speed = 3;
    this.markedForDeletion = false;
  }

  update() {
    this.x += this.speed;
    if (this.x > this.game.width * 0.85) this.markedForDeletion = true;
  }

  draw(context) {
    context.fillStyle = "yellow";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
