import { Direction } from './Player';

export interface IPiece {
  matrix: number[][];
  type: Type;

  createMatrix(type: Type): number[][];
  rotate(direction: Direction): void;
}

export enum Type {
  I = 0, J, L, O, S, T, Z,
}

class Piece implements IPiece {
  public type: Type;
  public matrix: number[][];

  constructor() {
    const typesCount = Object.keys(Type).length / 2;
    this.type = Math.floor(typesCount * Math.random());
    this.matrix = this.createMatrix(this.type);
  }

  public createMatrix = (type: Type): number[][] => {
    switch (type) {
      case Type.I:
        return [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
        ];

      case Type.J:
        return [
          [0, 2, 0],
          [0, 2, 0],
          [2, 2, 0],
        ];

      case Type.L:
        return [
          [0, 3, 0],
          [0, 3, 0],
          [0, 3, 3],
        ];

      case Type.O:
      default:
        return [
          [4, 4],
          [4, 4],
        ];

      case Type.S:
        return [
          [0, 5, 5],
          [5, 5, 0],
          [0, 0, 0],
        ];

      case Type.T:
        return [
          [6, 6, 6],
          [0, 6, 0],
          [0, 0, 0],
        ];

      case Type.Z:
        return [
          [7, 7, 0],
          [0, 7, 7],
          [0, 0, 0],
        ];
    }
  }

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
