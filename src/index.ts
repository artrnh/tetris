import Piece from './Piece';
import Player from './Player';

const canvas: HTMLCanvasElement = document.getElementById('tetris') as HTMLCanvasElement;
export const context: CanvasRenderingContext2D = canvas.getContext('2d');

context.scale(20, 20);

const currentPiece = new Piece();
const player = new Player(currentPiece);

let dropCounter = 0;
const dropInterval = 1000;

let lastTime = 0;
const gameLoop = (time: number = 0) => {
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    player.position.y++;
    dropCounter = 0;
  }

  player.piece.draw(context, player.position);
  requestAnimationFrame(gameLoop);
};

gameLoop();
