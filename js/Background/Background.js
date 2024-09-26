import { Layer } from "./Layer.js";
/**
 * Background.js
 * Contém a classe Background que representa o plano de fundo
 * do jogo, que pode ser composto por várias camadas.
 */

export class Background {
  constructor(game) {
    this.game = game;
    this.image1 = document.getElementById("layer1");
    this.layer1 = new Layer(this.game, this.image1, 1.3);
    this.layers = [this.layer1];
  }

  update() {
    this.layers.forEach((layer) => {
      layer.update();
    });
  }

  draw(context) {
    this.layers.forEach((layer) => {
      layer.draw(context);
    });
  }
}
