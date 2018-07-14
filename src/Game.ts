import { IField } from './Field';
import { IPlayer, IPosition } from './Player';

export interface IGame {
  context: CanvasRenderingContext2D;
  player: IPlayer;
  field: IField;

  draw(): void;
  drawMatrix(matrix: number[][], position: IPosition): void;
  loop(time?: number): void;
}

const colors = [
  null,
  '#e5282e',
  '#f8d517',
  '#df2384',
  '#274696',
  '#ef7e18',
  '#5cad2c',
  '#2cb099',
];

class Game implements IGame {
  public static dropInterval: number = 1000;
  private lastTime: number = 0;
  constructor(
    public context: CanvasRenderingContext2D,
    public player: IPlayer,
    public field: IField,
  ) {
    player.game = this;
    player.reset();
    player.updateScore();
  }

  public draw = (): void => {
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.drawMatrix(this.field.matrix, { x: 0, y: 0 });
    this.drawMatrix(this.player.piece.matrix, this.player.position);
  }

  public drawMatrix = (matrix: number[][], position: IPosition): void => {
    matrix.forEach((row: number[], y: number) => {
      row.forEach((cell: number, x: number) => {
        if (cell) {
          this.context.fillStyle = colors[cell];
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
