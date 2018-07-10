import { IPiece, IPosition } from './Piece';

interface IPlayer {
  piece: IPiece;
  position?: IPosition;
}

class Player implements IPlayer {
  constructor(public piece, public position = { x: 5, y: 5 }) {
    this.piece = piece;
    this.position = position;
  }
}

export default Player;
