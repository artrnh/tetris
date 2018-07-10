export interface IPosition {
  x: number;
  y: number;
}

export interface IPiece {
  matrix: number[][];
  width?: number;
  height?: number;

  draw(context: CanvasRenderingContext2D, offset: IPosition): void;
}

class Piece implements IPiece {
  public width = 3;
  public height = 3;
  public matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ];

  constructor(width?, height?) {
    this.width = width;
    this.height = height;
    // this.matrix = new Array(height).fill(new Array(width).fill(0));
  }

  public draw(context: CanvasRenderingContext2D, offset: IPosition = { x: 5, y: 5 }): void {
    context.fillStyle = '#000';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    this.matrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          context.fillStyle = 'red';
          context.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  }
}

export default Piece;
