'use strict';
class Game {
  constructor(difficulty) {
    this.canvas = null;
    this.ctx = null;
    this.character = null;
    this.trampoline = null;
    this.gameIsOver = false;
    this.gameScreen = null;
    this.score = 0;
    this.mouseDownX = null;
    this.mouseDownY = null;
    this.mouseUpX = null;
    this.mouseUpY = null;
    this.difficulty = difficulty;
    this.soundeffect = document.getElementById('bounceSound');
  }

  start() {
    this.canvasContainer = document.querySelector('.canvas-container');
    this.canvas = this.gameScreen.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
  
    this.scoreElement = this.gameScreen.querySelector('.value');
  
    this.containerWidth = this.canvasContainer.offsetWidth;
    this.containerHeight = this.canvasContainer.offsetHeight;
    this.canvas.setAttribute('width', this.containerWidth);
    this.canvas.setAttribute('height', this.containerHeight);
  
    this.character = new Character(this.canvas, 5, this.difficulty);

    this.handleMouseDown = (event) => {
      this.mouseDownX = event.clientX;
      this.mouseDownY = event.clientY;
    };
    this.handleMouseUp = (event) => {
      this.mouseUpX = event.clientX;
      this.mouseUpY = event.clientY;
    };
   
    document.body.addEventListener('mousedown', this.handleMouseDown.bind(this));
    document.body.addEventListener('mouseup', this.handleMouseUp.bind(this));
  
    this.startLoop();
  };

  startLoop() {
    var loop = function() {
      this.trampoline = new Trampoline(this.canvas, this.mouseDownX,this.mouseDownY,this.mouseUpX,this.mouseUpY,this.difficulty)
      if(this.difficulty === 3) {
          this.trampoline.draw();
      }

      this.checkCollisions();

      this.character.updatePosition();

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.character.draw();
      if(this.mouseDownX != null && this.mouseDownY != null && this.mouseUpX != null && this.mouseUpY != null && this.difficulty != 3) {
          this.trampoline.draw();
      }
      
      this.character.handleScreenCollision();

      if (!this.gameIsOver) {
        window.requestAnimationFrame(loop);
      }

      this.updateGameStats();
    }.bind(this);
  
    window.requestAnimationFrame(loop);
  };

  checkCollisions() {
    var soundFlag = true;
  if(this.character.didCollide(this.trampoline)) {
    this.trampoline = null;
    this.mouseDownX = null;
    this.mouseDownY = null; 
    this.mouseUpX = null;
    this.mouseUpY = null;
    if(this.difficulty === 0) this.score +=1;
     else if(this.difficulty === 1) this.score += 2;
     else if(this.difficulty === 2) this.score += 3;
     else {
        let ranScore = Math.floor(Math.random() * 10);
        this.score += ranScore;
    }
    if(soundFlag) {
        this.soundeffect.pause();
        this.soundeffect.currentTime = 0;
        this.soundeffect.play();
    }
  }
  if(this.character.isInsideScreen()) this.gameOver();
}
passGameOverCallback(callback) {
  this.onGameOverCallback = callback;
};

gameOver() {  
  this.gameIsOver = true;
  this.onGameOverCallback();
};

removeGameScreen() {
  this.gameScreen.remove();
};

updateGameStats() {
  this.scoreElement.innerHTML = this.score;
};

}