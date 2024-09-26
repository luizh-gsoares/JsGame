import { InputHandler } from "./InputHandler.js";
import { Player } from "./Player.js";
import { UI } from "./UI.js";
import { Background } from "./Background/Background.js";
import { Fox } from "./Enemies/Fox.js";

// Classe Game
// Realiza toda a comunicação com o restante do jogo
export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    // Adiciona o canvas ao DOM
    this.background = new Background(this);
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.ui = new UI(this);

    // Inimigos do jogo
    this.enemies = [];
    this.enemyTimer = 0;
    this.enemyInterval = 2000;

    // Inicializa as variáveis de jogo
    this.keys = [];
    this.ammo = 20;
    this.maxAmmo = 50;
    this.ammoTimer = 0;
    this.ammoInterval = 350;
    this.gameTime = 10000;

    this.speed = 1;

    this.gameOver = false;
    this.score = 0;
    this.winningScore = 80;

    this.playerLives = 3;
  }

  update(deltaTime) {
    // Verifica se o jogo acabou
    if (!this.gameOver) {
      this.gameTime += deltaTime;
    }

    this.background.update();

    this.player.update(deltaTime);

    // Verifica a quantidade de munição e adiciona mais munição
    // se o tempo de intervalo for atingido
    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) this.ammo++;
      this.ammoTimer = 0;
    } else {
      this.ammoTimer += deltaTime;
    }

    // Verifica se o jogador ainda tem vidas
    if (this.playerLives <= 0) {
      this.gameOver = true;
    }

    // Verifica se o jogador colidiu com algum inimigo
    this.enemies.forEach((enemy) => {
      enemy.update();
      if (this.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true;
        this.playerLives--;
      }

      // Reduz a vida do inimigo se ele colidir com um projétil
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          enemy.lives--;
          projectile.markedForDeletion = true;

          if (enemy.lives <= 0) {
            enemy.markedForDeletion = true;

            if (!this.gameOver) {
              this.score += enemy.score;
            }

            if (this.score > this.winningScore) {
              this.gameOver = true;
            }
          }
        }
      });
    });

    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
  }

  // Função para desenhar o jogo
  // Recebe o contexto 2D do canvas
  draw(context) {
    this.background.draw(context);
    this.ui.draw(context);
    this.player.draw(context);

    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });
  }

  addEnemy() {
    this.enemies.push(new Fox(this));
  }

  checkCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.height + rect1.y > rect2.y
    );
  }
}
