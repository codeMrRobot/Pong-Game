import { SVG_NS } from '../settings.js';

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;
    console.log("test");
    document.addEventListener("keydown", event => {
      console.log(event);    
      switch (event.key) {
        case up:
          this.up();
          console.log("up");
          break;
        case down:
          this.down();        
          console.log("down");
          break;
      }
    });
    // document.addEventListener('keydown,', event => {
    //   console.log(event);
    //   switch(event.key) {
    //     case up:
    //     console.log(event);
        
    //       this.up();
    //       break;
    //     case down:
    //       this.down();
    //       break;
    //     default:
    //       console.log(event);
    //   }
    
    // });
  
  }

  up(){
    this.y = Math.max(0, (this.y - this.speed));
  }
  

  down(){
    this.y = Math.min(this.boardHeight - this.height, this.y + this.speed);
  }
  

  render(svg) {
    let rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttributeNS(null, 'fill', 'white');
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);
    rect.setAttributeNS(null, 'x', this.x);
    rect.setAttributeNS(null, 'y', this.y);

    svg.appendChild(rect);
  }
}