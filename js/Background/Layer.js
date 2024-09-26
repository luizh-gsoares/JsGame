/**
 * Layer.js
 * Contém a classe Layer que representa uma camada de fundo,
 * que pode ser um plano de fundo, um paralax, ou qualquer
 * outro elemento que seja renderizado atrás dos elementos.
 */
export class Layer {
  constructor(game, image, speedModifier, initialX = 0) {
    this.game = game;
    this.image = image;
    this.speedModifier = speedModifier;
    this.width = this.game.width;
    this.height = this.game.height;
    this.x = initialX;
    this.y = 0;
  }

  //
  update() {
    this.x -= this.game.speed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = 0;
    }
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}
