import { IField } from './Field';
import { IPiece } from './Piece';
import { IPlayer, IPosition } from './Player';

export interface IGame {
  context: CanvasRenderingContext2D;
  player: IPlayer;
  field: IField;

  draw(): void;
  drawPiece(piece: IPiece, position: IPosition): void;
  loop(time?: number): void;
}

class Game implements IGame {
  public static dropInterval: number = 1000;
  private lastTime: number = 0;
  constructor(
    public context: CanvasRenderingContext2D,
    public player: IPlayer,
    public field: IField,
  ) {
    player.game = this;
  }

  public draw = (): void => {
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.drawPiece(this.field, { x: 0, y: 0 });
    this.drawPiece(this.player.piece, this.player.position);
  }

  public drawPiece = (piece: IPiece, position: IPosition): void => {
    piece.matrix.forEach((row: number[], y: number) => {
      row.forEach((cell: number, x: number) => {
        if (cell) {
          this.context.fillStyle = 'red';
          this.context.fillRect(x + position.x, y + position.y, 1, 1);
        }
      });
    });
  }

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
}

export default Game;
