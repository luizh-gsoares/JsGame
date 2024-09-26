import { Game } from "./Game.js";

// Load Event inicia quando a página inteira foi carregada, incluindo todos os recursos
// dependentes como stylesheets e imagens.
window.addEventListener("load", function () {
  // Setup do canvas
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d"); // Cria um objeto 2D, representando uma rendenização bidimensional
  canvas.width = 800; // Tamanho em Largura
  canvas.height = 448; // Tamanho em Altura

  // Instância da classe Game (jogo) com o tamanho do canvas
  const game = new Game(canvas.width, canvas.height);

  // Animation Loop
  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.draw(ctx);
    game.update(deltaTime);
    requestAnimationFrame(animate);
  }

  animate(0);
});
