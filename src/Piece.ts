import { IField } from './Field';
import { IPosition } from './Player';

export interface IPiece {
  matrix: number[][];
}

class Piece implements IPiece {
  public matrix: number[][] = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ];
}

export default Piece;
