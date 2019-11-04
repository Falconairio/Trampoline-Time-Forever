'use strict';

function Game() {
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
}

// Append canvas to the DOM, create a Player and start the Canvas loop
Game.prototype.start = function() {
  // Save reference to canvas and its container. Create ctx
  this.canvasContainer = document.querySelector('.canvas-container');
  this.canvas = this.gameScreen.querySelector('canvas');
  this.ctx = this.canvas.getContext('2d');

  // Save reference to the score 
  this.scoreElement = this.gameScreen.querySelector('.value');

  // Set the canvas dimensions to match the parent `.canvas-container`
  this.containerWidth = this.canvasContainer.offsetWidth;
  this.containerHeight = this.canvasContainer.offsetHeight;
  this.canvas.setAttribute('width', this.containerWidth);
  this.canvas.setAttribute('height', this.containerHeight);

  // Create a new player created trampoline for the current game

  this.character = new Character(this.canvas, 5);
 
  // Add event listener for moving the player
  this.handleMouseDown = function(event) {
    //console.log('mouse down x = ' + event.clientX);
    //console.log('mouse down y = ' + event.clientY);
    this.mouseDownX = event.clientX;
    this.mouseDownY = event.clientY;
  };
  this.handleMouseUp = function(event) {
    //console.log('mouse up x = ' + event.clientX);
    //console.log('mouse up y = ' + event.clientY);
    this.mouseUpX = event.clientX;
    this.mouseUpY = event.clientY;
  };
 
  document.body.addEventListener('mousedown', this.handleMouseDown.bind(this));
  document.body.addEventListener('mouseup', this.handleMouseUp.bind(this));

  this.startLoop();
};

Game.prototype.startLoop = function() {
  var loop = function() {
    //console.log(this.mouseUpX + " " + this.mouseUpY);
    this.trampoline = new Trampoline(this.canvas, this.mouseDownX,this.mouseDownY,this.mouseUpX,this.mouseUpY)
    if(this.mouseDownX != null && this.mouseDownY != null && this.mouseUpX != null && this.mouseUpY != null) {
        this.trampoline.draw();
        this.trampoline.fill();
    }
    // 2. Check if player had hit any enemy (check all enemies)
    this.checkCollisions();
    // 5. Update the characters position 
    this.character.updatePosition();
    // 2. CLEAR THE CANVAS
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 3. UPDATE THE CANVAS
    // Draw the Trampoline in the same position 
    this.character.draw();
    
    // Draw the character continuing the falling animation 
    this.character.handleScreenCollision();
    
    // 4. TERMINATE LOOP IF GAME IS OVER
    if (!this.gameIsOver) {
      window.requestAnimationFrame(loop);
    }
    //  5. Update Game data/stats
    this.updateGameStats();
  }.bind(this);

  window.requestAnimationFrame(loop);
};

Game.prototype.checkCollisions = function() {
  if(this.character.didCollide(this.trampoline)) {
    this.trampoline = null;
    this.mouseDownX = null;
    this.mouseDownY = null; 
    this.mouseUpX = null;
    this.mouseUpY = null;
    this.score +=1;
  }
  if(this.character.isInsideScreen()) {
      this.gameOver();
  }
}

Game.prototype.passGameOverCallback = function(callback) {
  this.onGameOverCallback = callback;
};

Game.prototype.gameOver = function() {
  // flag `gameIsOver = true` stops the loop
  this.gameIsOver = true;
  // Call the gameOver function from `main` to show the Game Over Screen
  this.onGameOverCallback();
};

Game.prototype.removeGameScreen = function() {
  this.gameScreen.remove();
};

Game.prototype.updateGameStats = function() {
  this.scoreElement.innerHTML = this.score;
};