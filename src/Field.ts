import { IPlayer } from './Player';

export interface IField {
  width: number;
  height: number;
  matrix: number[][];

  clear(): void;
  collides(player: IPlayer): boolean;
  merge(player: IPlayer): void;
  sweep(): void;
}

class Field implements IField {
  public matrix: number[][];
  constructor(public width: number, public height: number) {
    const matrix = [];
    while (height--) { matrix.push(new Array(width).fill(0)); }
    this.matrix = matrix;
  }

  public clear = (): void => {
    this.matrix.forEach((row) => row.fill(0));
  }

  public collides = (player: IPlayer): boolean => {
    const { piece, position } = player;

    return piece.matrix.some((row: number[], y: number) => row.some((cell: number, x: number) =>
      cell && (this.matrix[y + position.y] && this.matrix[y + position.y][x + position.x]) !== 0));
  }

  public merge = (player: IPlayer): void => {
    const { piece, position } = player;

    piece.matrix.forEach((row: number[], y: number) => {
      row.forEach((cell: number, x: number) => {
        if (cell) this.matrix[y + position.y][x + position.x] = cell;
      });
    });
  }

  public sweep = (): void => {
    for (let y = this.matrix.length - 1; y > 0; y--) {
      if (this.matrix[y].every((cell: number) => cell !== 0)) {
        const row = this.matrix.splice(y, 1)[0].fill(0);
        this.matrix.unshift(row);
        y += 1;
      }
    }
  }
}

export default Field;
