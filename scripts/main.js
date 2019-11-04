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

  // -- splash screen

  function createSplashScreen() {
    splashScreen = buildDom(`
    <main class = "bigwords">
      <h1>Trampoline Time</h1>
      <img src = "./images/Forever.png" alt = "bruh">
      <button id = "startbutton">Begin</button>
    </main>
  `);
    

    document.body.appendChild(splashScreen);
    var startButton = splashScreen.querySelector('button');
    startButton.addEventListener('click', function() {
      startGame();
    });
  }

  function removeSplashScreen() {
    splashScreen.remove();
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

