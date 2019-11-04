'use strict'
function Character(canvas, speed) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
  
    this.size = 20;
  
    this.x = this.canvas.width/2 - 25;
    this.y = this.x - 500;
    this.speed = speed;
  }
  Character.prototype.draw = function() {
  
    this.ctx.fillStyle = "red";
  
    this.ctx.fillRect(this.x,this.y,this.size,this.size);
  
  };
  
  Character.prototype.updatePosition = function() {
    //console.log(this.x + " " + this.y);
    this.y = this.y + this.speed;
  };
  
  Character.prototype.isInsideScreen = function() {
    return this.y + (this.size/2) > this.canvas.height;
  };
  Character.prototype.didCollide = function(char) {
    var trampLeft = char.x;
    var trampRight = char.x + char.sizewidth;
    var trampTop = char.y;
    var trampBottom = char.y + char.sizeheight;
  
    var charLeft = this.x;
    var charRight = this.x + this.size;
    var charTop = this.y;
    var charBottom = this.y + this.size;
  
    // Check if the char intersects any of the Trampoline's sides
    var crossLeft = charLeft <= trampRight && charLeft >= trampLeft;
      
    var crossRight = charRight >= trampLeft && charRight <= trampRight;
    
    var crossBottom = charBottom >= trampTop && charBottom <= trampBottom;
    
    var crossTop = charTop <= trampBottom && charTop >= trampTop;
  
    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
        this.speed = -5;
      return true;
    }
    return false;
  };
  Character.prototype.handleScreenCollision = function() {  
    var screenTop = 0; 

    if(this.y < screenTop) this.speed = 5;
  };