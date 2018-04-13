import { SVG_NS, KEYS } from '../settings.js';

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;

    document.addEventListener('keydown', event => {
         
      switch (event.key) {
        case up:
          this.up();
          break;
        case down:
          this.down();        
          break;
          case KEYS.g:
          this.biggerSize();
          break;
      }
    });
   
  }

  biggerSize(){
    if (this.height === 56){
      this.height = 123;
      this.speed = 5;
      this.width = 10;
    }
      else{
        this.height = 56;
        this.speed = 10;
        this.width = 8;
      }

    
  }

  up(){
    this.y = Math.max(0, (this.y - this.speed));
  }
  

  down(){
    this.y = Math.min(this.boardHeight - this.height, this.y + this.speed);
  }

  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return { leftX, rightX, topY, bottomY };
  }
  

  render(svg) {
    let rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttributeNS(null, 'fill', 'black');
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);
    rect.setAttributeNS(null, 'x', this.x);
    rect.setAttributeNS(null, 'y', this.y);
    svg.appendChild(rect);
  }
}