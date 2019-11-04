'use strict';

function buildDom(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString;
  return div.children[0];
}

function main() {
  var game; // instance of the Game
  var splashScreen; // Start Screen
  var gameOverScreen; // Game Over Screen
  var HowTo; //How to Play Screen 

  // -- splash screen

  function createSplashScreen() {
    splashScreen = buildDom(`
    <main class = "bigwords">
    <div id = "title">
      <img src = "../images/TrampolineTime.png">
      <img src = "../images/Forever.png" alt = "bruh">
    </div>
    <div id = bottomoptions>
      <label>Enter Your Name</label><input type = "text" name = "yourname">
      <button id = "howtoplay">How to play</button>
      <button id = "startbutton">Begin</button>
    </div>
    </main>
  `);
    
    document.body.appendChild(splashScreen);
    var startButton = splashScreen.querySelector('#startbutton');
    startButton.addEventListener('click', function() {
      startGame();
    });
    var howToButton = splashScreen.querySelector('#howtoplay');
    howToButton.addEventListener('click', function() {
      removeSplashScreen();
      createHowToScreen();
    });
  }

  function removeSplashScreen() {
    splashScreen.remove();
  }
  function createHowToScreen() {
    HowTo = buildDom(`
    <main class = 'mainhowto'>
        <div class = "howtotext">
            <h2>How To Play</h2>
            <p>Keep the falling red square from touching the bottom. You do this by drawing a (currently invisible) line, which will bounce the red square in a random direction, it will also rebound on the walls. You gain points for every bounce and you instantly lose if the red square touches the bottom.</br> Updates will be made to this page.</p>
        </div>
        <button id = 'backbutton'>Back</button>
    </main>
    `)
    document.body.appendChild(HowTo);
    var backButton = HowTo.querySelector('#backbutton');
    backButton.addEventListener('click', function() {
        console.log('cringe');
      removeHowToScreen();
      createSplashScreen();
    });
  }
function removeHowToScreen() {
    HowTo.remove();
}
  // -- game screen

  function createGameScreen() {
    var gameScreen = buildDom(`
    <main class="game-container">
      <div>
        <div id = "left-bar">
          <span class="label">Score<strong>↓</strong></span>
          <span class="value"></span>
        </div>
      </div>
      <div class="canvas-container">
        <canvas></canvas>
      </div>
      <div>
        <div id = "right-bar">
        </div>
      </div>
    </main>
  `);
    document.body.appendChild(gameScreen);
    return gameScreen;
  }

  function removeGameScreen() {
    game.removeGameScreen();
  }

  // -- game over screen

  function createGameOverScreen(score) {
    gameOverScreen = buildDom(`
      <main id = "gameovermain">
        <h1>Game Over</h1>
        <p>Your score: <span></span></p>
        <button>Restart</button>
    </main>
    `);

    var button = gameOverScreen.querySelector('button');
    button.addEventListener('click', startGame);

    var span = gameOverScreen.querySelector('span');
    span.innerText = score;

    document.body.appendChild(gameOverScreen);
  }

  function removeGameOverScreen() {
    if (gameOverScreen) {
      gameOverScreen.remove();
    }
  }

  // -- Setting the game state

  function startGame() {
    removeSplashScreen();
    // later we need to add clearing of the gameOverScreen
    removeGameOverScreen();

    game = new Game();
    game.gameScreen = createGameScreen();

    game.start();
    // End the game
    game.passGameOverCallback(function() {
      gameOver(game.score);
    });
  }

  function gameOver(score) {
    removeGameScreen();
    createGameOverScreen(score);
  }
  // -- initialize Splash screen on initial start

  createSplashScreen();
}

window.addEventListener('load', main);

