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
}

enum keyCodes {
  Left = 37,
  Right = 39,
  Down = 40,
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
      case keyCodes.Left:
        this.position.x -= 1;
        break;

      case keyCodes.Right:
        this.position.x += 1;
        break;

      case keyCodes.Down:
        this.drop();
        break;

      default:
        break;
    }
  }
}

export default Player;
