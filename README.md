# TRAMPOLINE TIME FOREVER

## Game Description
This game is based off Trampoline Time from New Super Mario Bros DS. In this game there is a falling characters, who you must keep from touching the bottom of the screen. You do this by drawing a trampoline with the mouse to make the character continue to stay above the bottom of the screen. 

![Image description](https://www.mariowiki.com/images/thumb/f/ff/Trampoline_Time.PNG/200px-Trampoline_Time.PNG)

### But this game wont be quite so complicated!

---

## Game Instructions
- Use your mouse to draw a line by dragging and releasing.

- The line acts as a trampoline which bounces the character onscreen

- Trampolines disappear when bounced on 

- The character bounces off the sides of the walls

- You gain one point per bounce

- You lose when your character touches the bottom of the screen

---

## MVP (DOM - CANVAS)
In its base form, the game is drawing a trampoline to keep a character from hitting the bottom screen. Racking up points along the way. 

---

## Backlog
- Lives
- More characters on screen
- Name input on menu -> Leaderboard
- Realistic Bouncing
- Obstacles to hinder the character
- Randomly generated items to increase the score
- styling the character with sprites
- Nice looking backgrounds for the start and game over screens

---

## Data structure

#### main.js

```javascript
buildStartScreen(){}

removeStartScreen(){}

buildGameScreen(){}

removeGameScreen(){}

buildGOScreen(){}

removeGOScreen(){}

startGame(){}

gameOver(){}
```

#### game.js

```javascript
Game() {
  this.canvas;
  this.ctx;
  this.man;
  this.trampoline;
  this.gameIsOver;
  this.gameScreen;
  this.score;
}

Game.prototype.start(){}

Game.prototype.startLoop(){
}

Game.prototype.checkCollisions{
}

Game.prototype.clearCanvas = function(){
}

Game.prototype.updateCanvas = function(){
}

Game.prototype.drawCanvas = function(){ 
}

Game.prototype.setGameOver = function(){
}

Game.prototype.removeGameScreen = function(){}
```

#### trampoline.js

```javascript
function Trampoline(canvas) {
    this.canvas;
    this.ctx;

    this.size;
    this.x;
    this.y
}

Trampoline.prototype.didCollide() {}

Trampoline.prototype.draw() {}
```

#### character.js

```javascript
function Character(canvas,speed,x,y) {
    this.canvas;
    this.ctx;

    this.size;
    this.x;
    this.y;
    this.direction;
    this.speed;
}
Character.prototype.draw() {}

Character.prototype.updatePosition() {}

Character.prototype.setDirection() {}

Character.prototype.isWithinLimits() {}
```
---

## States and Transitions
These are the functions that transition between the three states 

-buildDOM(HTMLstring)

- startScreen()
    - buildStartScreen()
    - addEventListener(startGame)

- startGame()
    - new Game()
    - Game.start()

- gameoverScreen()
    -buildGOScreen
    -addEventListener(startGame)

---

## Task
List of methods that need to be written.

- Main - buildDom
- Main - buildStartScreen
- Main - removeStartScreen
- Main - addEventListener
- Main - buildGameScreen
- Main - removeGameScreen
- Main - buildGOScreen
- Main - removeGOScreen
- Game - Constructor
- Game - buildCanvas
- Game - clearCanvas
- Game - updateCanvas
- Game - startLoop
- Game - addEventListener * 2
- Man - Constructor
- Man - fallGravity
- Man - collisionCheck
- Man - remove
- Trampoline - Constructor
- Trampoline - Collision 
- Trampoline - dissappear

---

## Links


### Trello
[Link url](https://trello.com)


### Git
URls for the project repo and deploy
[Link Repo](http://github.com)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)
