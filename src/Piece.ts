import { Direction } from './Player';

export interface IPiece {
  matrix: number[][];

  rotate(direction: Direction): void;
}

class Piece implements IPiece {
  public matrix: number[][] = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ];

  public rotate = (direction: Direction = Direction.Right): void => {
    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < y; x++) {
        [this.matrix[x][y], this.matrix[y][x]] = [this.matrix[y][x], this.matrix[x][y]];
      }
    }

    if (direction === Direction.Right) {
      this.matrix.forEach((row) => row.reverse());
    } else {
      this.matrix.reverse();
    }
  }
}

export default Piece;
