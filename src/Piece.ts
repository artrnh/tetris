import { IField } from './Field';
import { IPosition } from './Player';

export interface IPiece {
  matrix: number[][];

  collides(field: IField, position: IPosition): boolean;
}

class Piece implements IPiece {
  public matrix: number[][] = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ];

  public collides = (field: IField, position: IPosition): boolean => {

    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < this.matrix[y].length; x++) {
        if (
          this.matrix[y][x]
          && (field.matrix[y + position.y]
          && field.matrix[y + position.y][x + position.x]) !== 0
        ) return true;
      }
    }

    return false;
  }
}

export default Piece;
