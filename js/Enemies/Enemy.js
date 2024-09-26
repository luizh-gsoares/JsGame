export class Enemy {
  constructor(game) {
    this.game = game;
    this.x = this.game.width;
    this.speedX = Math.random() * -1.5 - 0.5;

    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 0;
    this.frameInterval = 0;
    this.frameTimer = 0;
  }

  update() {
    // Atualiza a posição do inimigo e verifica se ele saiu da tela
    this.x += this.speedX - this.game.speed;
    if (this.x + this.width < 0) this.markedForDeletion = true;

    // Animação
    // Se o frame atual for menor que o máximo de frames permitidos para o inimigo
    // incrementa o frame atual em 1 para passar para o próximo frame da animação
    // Animação do sprite
    if (this.frameTimer % this.frameInterval === 0) {
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    }
    this.frameTimer++;
  }

  draw(context) {
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
  }
}
