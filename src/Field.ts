import { IPlayer } from './Player';

export interface IField {
  width: number;
  height: number;
  matrix: number[][];

  merge(player: IPlayer): void;
}

class Field implements IField {
  public matrix: number[][];
  constructor(public width: number, public height: number) {
    this.matrix = new Array(height).fill(new Array(width).fill(0));
  }

  public merge = (player: IPlayer): void => {
    const { piece, position } = player;

    piece.matrix.forEach((row: number[], y: number) => {
      row.forEach((cell: number, x: number) => {
        if (cell) {
          this.matrix[y + position.y][x + position.x] = cell;
        }
      });
    });
  }
}

export default Field;
