import { IGame } from './Game';
import { IPiece } from './Piece';
import { Type } from './Piece';

export interface IPosition {
  x: number;
  y: number;
}

export interface IPlayer {
  game: IGame;
  piece: IPiece;
  position: IPosition;
  dropCounter: number;
  score: number;

  drop(): void;
  inputController(e: KeyboardEvent): void;
  move(direction: number): void;
  reset(): void;
  rotate(): void;
  updateScore(): void;
}

export const enum Direction {
  Left = -1,
  Right = 1,
}

export const enum KeyCode {
  Space = 32,
  Left = 37,
  Up,
  Right,
  Down,
  W = 87,
  A = 65,
  S = 83,
  D = 68,
}

class Player implements IPlayer {
  public dropCounter: number = 0;
  public game: IGame;
  public position: IPosition = { x: 0, y: 0 };
  public score: number = 0;

  constructor(public piece: IPiece) {}

  public drop = (): void => {
    this.position.y += 1;
    if (this.game.field.collides(this)) {
      this.position.y -= 1;
      this.game.field.merge(this);
      this.reset();
      this.game.field.sweep(this);
      this.updateScore();
    }
    this.dropCounter = 0;
  }

  public inputController = (e: KeyboardEvent): void => {
    switch (e.keyCode) {
      case KeyCode.Left:
      case KeyCode.A:
        this.move(Direction.Left);
        break;

      case KeyCode.Right:
      case KeyCode.D:
        this.move(Direction.Right);
        break;

      case KeyCode.Down:
      case KeyCode.S:
        this.drop();
        break;

      case KeyCode.Up:
      case KeyCode.W:
      case KeyCode.Space:
        this.rotate();

      default:
        break;
    }
  }

  public move = (direction: Direction): void => {
    this.position.x += direction;
    if (this.game.field.collides(this)) this.position.x -= direction;
  }

  public reset = () => {
    const typesCount = Object.keys(Type).length / 2;
    const type = Math.floor(typesCount * Math.random());
    this.piece.matrix = this.piece.createMatrix(type);

    this.position.y = 0;
    this.position.x = Math.floor(this.game.field.width / 2) - Math.floor(this.piece.matrix.length / 2);

    if (this.game.field.collides(this)) {
      this.game.field.clear();
      this.score = 0;
      this.updateScore();
    }
  }

  public rotate = (): void => {
    const initialX = this.position.x;
    let offset: number = 1;
    this.piece.rotate(Direction.Right);

    while (this.game.field.collides(this)) {
      this.position.x += offset;
      offset = -(offset > 0 ? offset + 1 : offset - 1);

      if (offset > this.piece.matrix.length) {
        this.piece.rotate(Direction.Left);
        this.position.x = initialX;
        return;
      }
    }
  }

  public updateScore = (): void =>  {
    document.getElementById('score').innerText = `Score: ${this.score}`;
  }
}

export default Player;
