/**
 * UI.js
 * Classe responsável por desenhar a interface do usuário.
 * Aqui, são desenhados elementos como pontuação, tempo e munição.
 */

export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 25;
    this.fontFamily = "Minecraft";
    this.color = "white";
  }

  // Método draw
  // Desenha a interface do usuário
  draw(context) {
    context.save();
    context.fillStyle = this.color;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "black";
    context.font = `${this.fontSize}px Minecraft`;
    // score
    context.fillText(`Pontuação: ${this.game.score}`, 20, 40);
    // timer
    const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
    context.fillText(`Tempo: ${formattedTime}`, 20, 100);

    // mensagem de game over
    if (this.game.gameOver) {
      context.textAlign = "center";
      let message1;
      let message2;
      if (this.game.score > this.game.winningScore) {
        message1 = "Isso aí!";
        message2 = "Bom trabalho!";
      } else {
        message1 = "Ops!";
        message2 = "Tente novamente...";
      }
      context.font = `80px ${this.fontFamily}`;
      context.fillText(
        message1,
        this.game.width * 0.5,
        this.game.height * 0.5 - 20
      );
      context.font = `25px Helvetica`;
      context.fillText(
        message2,
        this.game.width * 0.5,
        this.game.height * 0.5 + 20
      );
    }
    // munição
    if (this.game.player.powerUp) {
      context.fillStyle = "#ffffbd";
    }
    for (let i = 0; i < this.game.ammo; i++) {
      context.fillRect(20 + 5 * i, 50, 3, 20);
    }
    context.restore();
  }
}
