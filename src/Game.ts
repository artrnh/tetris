import { IPiece } from './Piece';
import { IPlayer, IPosition } from './Player';

export interface IGame {
  context: CanvasRenderingContext2D;
  player: IPlayer;

  loop(time?: number): void;
  draw(): void;
  drawPiece(piece: IPiece, position: IPosition): void;
}

class Game implements IGame {
  public static dropInterval: number = 1000;
  private lastTime: number = 0;
  constructor(public context: CanvasRenderingContext2D, public player: IPlayer) {}

  public loop = (time: number = 0): void => {
    const deltaTime: number = time - this.lastTime;
    this.lastTime = time;

    this.player.dropCounter += deltaTime;
    if (this.player.dropCounter > Game.dropInterval) {
      this.player.drop();
    }

    this.draw();
    requestAnimationFrame(this.loop);
  }

  public draw = (): void => {
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.drawPiece(this.player.piece, this.player.position);
  }

  public drawPiece = (piece: IPiece, position: IPosition): void => {
    piece.matrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          this.context.fillStyle = 'red';
          this.context.fillRect(x + position.x, y + position.y, 1, 1);
        }
      });
    });
  }
}

export default Game;
