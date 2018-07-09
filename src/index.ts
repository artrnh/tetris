import Piece from './Piece';

const canvas: HTMLCanvasElement = document.getElementById('tetris') as HTMLCanvasElement;
const context: CanvasRenderingContext2D = canvas.getContext('2d');

context.scale(20, 20);

context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);

const piece = new Piece();
piece.draw(context);
