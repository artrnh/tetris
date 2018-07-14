import { IGame } from './Game';
import { IPiece } from './Piece';

export interface IPosition {
  x: number;
  y: number;
}

export interface IPlayer {
  game: IGame;
  piece: IPiece;
  position: IPosition;
  dropCounter: number;

  drop(): void;
  inputController(e: KeyboardEvent): void;
  move(direction: number): void;
  rotate(): void;
}

export enum Direction {
  Left = -1,
  Right = 1,
}

export enum KeyCode {
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

  constructor(public piece: IPiece, public position: IPosition) {}

  public drop = (): void => {
    this.position.y += 1;
    if (this.game.field.collides(this)) {
      this.position.y -= 1;
      this.game.field.merge(this);
      this.position.y = 0;
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
}

export default Player;
