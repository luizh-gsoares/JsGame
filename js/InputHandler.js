import { Game } from "./Game.js";
import { Enemy } from "./Enemies/Enemy.js";
import { UI } from "./UI.js";
import { Background } from "./Background/Background.js";
import { Player } from "./Player.js";
import { Projectile } from "./Projectile.js";

/**
 * Classe InputHandler
 * Responsável por tratar as entradas do usuário. Ele recebe as teclas pressionadas pelo usuário
 * utilizando o EventListener e trata para a aplicação.
 */
export class InputHandler {
  constructor(game) {
    this.game = game;

    // Verifica se a tecla foi pressionada, adiciona no array keys e torna disponivel
    // em todo o jogo. As teclas possiveis são Spacebar, ArrowUp e ArrowDown.
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowUp" || e.key === "ArrowDown") &&
        this.game.keys.indexOf(e.key) === -1
      ) {
        this.game.keys.push(e.key);
      } else if (e.key === " ") {
        this.game.player.shootTop();
      }
    });

    // Verifica se a tecla já foi pressionada anteriormente, caso sim, limpa o array utilizando o método splice;
    window.addEventListener("keyup", (e) => {
      if (this.game.keys.indexOf(e.key) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
      }
    });
  }
}
