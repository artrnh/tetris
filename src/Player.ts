import { IPiece } from './Piece';

export interface IPosition {
  x: number;
  y: number;
}

export interface IPlayer {
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

  constructor(public piece: IPiece, public position: IPosition) {}

  public drop = (): void => {
    this.position.y += 1;
    this.dropCounter = 0;
  }

  public inputController = (e: KeyboardEvent) => {
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
