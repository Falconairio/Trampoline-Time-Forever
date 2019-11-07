'use strict'
function Character(canvas, speed) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
  
    this.size = 20;
  
    this.x = this.canvas.width/2 - 25;
    this.y = this.x - 500;
    this.speed = speed;
    this.xspeed = 0;
    this.yspeed = 1;
    this.soundeffect = document.getElementById('bounceSound');
  }
  Character.prototype.draw = function() {
  
    this.ctx.fillStyle = "red";
  
    this.ctx.fillRect(this.x,this.y,this.size,this.size);
  
  };
  
  Character.prototype.updatePosition = function() {
    //console.log(this.x + " " + this.y);
    this.y = this.y + (this.yspeed * this.speed);
    this.x = this.x + (this.speed * this.xspeed)
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
  
    if ((crossLeft || crossRight) && (crossBottom)) {
        let randomNum = Math.random();
        if(randomNum > 0.66) {
            this.xspeed = 1;
            this.yspeed = -1;
        } else if(randomNum > 0.33) {
            this.xspeed = 0;
            this.yspeed = -1;
        } else {
            this.xspeed = -1;
            this.yspeed = -1;
        }
      return true;
    } else if((crossLeft || crossRight) && crossTop) {
        let randomNum = Math.random();
        if(randomNum > 0.66) {
            this.xspeed = 1;
            this.yspeed = 1;
        } else if(randomNum > 0.33) {
            this.xspeed = 0;
            this.yspeed = 1;
        } else {
            this.xspeed = -1;
            this.yspeed = 1;
        }
      return true;
    }
    return false;
  };
  Character.prototype.handleScreenCollision = function() {  
    var screenTop = 0; 
    var screenLeft = 15;
    var screenRight = this.canvas.width - 25;
    if(this.y < screenTop) {
        this.yspeed = 1;
        var soundFlag = true;
        if(soundFlag) {
            this.soundeffect.pause();
            this.soundeffect.currentTime = 0;
            this.soundeffect.play();
        }
    }
    else if(this.x >= screenRight) {
        this.xspeed = -1;
        var soundFlag = true;
        if(soundFlag) {
            this.soundeffect.pause();
            this.soundeffect.currentTime = 0;
            this.soundeffect.play();
        }
    }
    else if(this.x <= screenLeft) { 
        this.xspeed = 1;
        var soundFlag = true;
        if(soundFlag) {
            this.soundeffect.pause();
            this.soundeffect.currentTime = 0;
            this.soundeffect.play();
        }
    }
  };