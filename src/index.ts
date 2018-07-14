import Field, { IField } from './Field';
import Game, { IGame } from './Game';
import Piece from './Piece';
import Player, { IPlayer } from './Player';

const canvas: HTMLCanvasElement = document.getElementById('tetris') as HTMLCanvasElement;
export const context: CanvasRenderingContext2D = canvas.getContext('2d');

context.scale(20, 20);

const field: IField = new Field(12, 20);
const player: IPlayer = new Player(new Piece());
const game: IGame = new Game(context, player, field);

document.addEventListener('keydown', player.inputController);
game.run();
