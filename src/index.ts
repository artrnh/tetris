import Piece, { IPiece } from './Piece';
import Player, { IPlayer, IPosition } from './Player';

const canvas: HTMLCanvasElement = document.getElementById('tetris') as HTMLCanvasElement;
export const context: CanvasRenderingContext2D = canvas.getContext('2d');

context.scale(20, 20);

const player: IPlayer = new Player(new Piece(), { x: 5, y: 5 });

const drawPiece = (piece: IPiece, position: IPosition): void => {
  piece.matrix.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        context.fillStyle = 'red';
        context.fillRect(x + position.x, y + position.y, 1, 1);
      }
    });
  });
};

const draw = (): void => {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawPiece(player.piece, player.position);
};

const dropInterval: number = 1000;

let lastTime: number = 0;
const gameLoop = (time = 0) => {
  const deltaTime: number = time - lastTime;
  lastTime = time;

  player.dropCounter += deltaTime;
  if (player.dropCounter > dropInterval) {
    player.drop();
  }

  draw();
  requestAnimationFrame(gameLoop);
};

document.addEventListener('keydown', player.inputController);

gameLoop();
