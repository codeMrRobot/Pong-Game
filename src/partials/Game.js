import{ SVG_NS, KEYS, } from '../settings.js';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
import Message from './Message';

export default class Game {

  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;
    this.pause = false;

    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);
    this.boardGap = 10;
    this.paddleWidth = 8;
    this.paddleHeight = 56;

    this.paddle1 = new Paddle(this.height, this.paddleWidth, this.paddleHeight, this.boardGap, ((this.height - this.paddleHeight) /2), KEYS.p1up, KEYS.p1down);

    this.paddle2 = new Paddle(this.height, this.paddleWidth, this.paddleHeight, (this.width - this.boardGap - this.paddleWidth), ((this.height - this.paddleHeight) /2), KEYS.p2up, KEYS.p2down);

    this.radius = 8;
		this.ball = new Ball(
			this.radius,
			this.width,
			this.height,
    );

    this.radius = 6;
    this.ball2 = new Ball(
			this.radius,
			this.width,
      this.height,
    );
    
    this.score1 = new Score(200, 25, 25);
    this.score2 = new Score(290, 25, 25);
    this.winner = new Message(80, 130, 40);
    
   
    document.addEventListener('keydown', event => {
			if (event.key === KEYS.spaceBar) {
        this.pause = !this.pause;
        
        
      }
    });
 
  }

  render() {
    
    if(this.pause){
      return;
    }
    
    this.gameElement.innerHTML = '';
    let svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttributeNS(null, 'width', this.width);
    svg.setAttributeNS(null, 'height', this.height);
    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
    
    this.gameElement.appendChild(svg);
    this.board.render(svg);
    this.paddle1.render(svg);
    this.paddle2.render(svg);
    this.ball.render(svg, this.paddle1, this.paddle2);
    this.ball2.render(svg, this.paddle1, this.paddle2);
    this.score1.render(svg, this.paddle1.score);
    this.score2.render(svg, this.paddle2.score);
    
    
    const paddle1Msg = 'Player 1 Wins! :)';
    const paddle2Msg = 'Player 2 Wins! :)';
    if (this.paddle1.score === 15) {
      this.winner.render(svg, paddle1Msg);
      this.paddle1.set(this.height, this.paddleWidth, this.paddleHeight, this.boardGap, ((this.height - this.paddleHeight) /2));
      this.paddle2.set(this.height, this.paddleWidth, this.paddleHeight, (this.width - this.boardGap - this.paddleWidth), ((this.height - this.paddleHeight) /2));
      this.ball.reset();
      this.ball2.reset();
    } else if (this.paddle2.score === 15) {
      this.winner.render(svg, paddle2Msg);
      this.paddle1.set(this.height, this.paddleWidth, this.paddleHeight, this.boardGap, ((this.height - this.paddleHeight) /2));
      this.paddle2.set(this.height, this.paddleWidth, this.paddleHeight, (this.width - this.boardGap - this.paddleWidth), ((this.height - this.paddleHeight) /2));
      this.ball.reset();
      this.ball2.reset();
    }
  }
}
      
let audio;
document.addEventListener('keydown', event => {
	switch (event.key) {
		case 'm':
			audio = new Audio('public/sounds/yodeling.mp3');
			break;
	}
	audio.play();
});



  

