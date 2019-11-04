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
  var AboutScreen;//About the programmer
  var NameScreen;//Screen where you enter your name
  var name = " ";
  var HowTo; //How to Play Screen 

  // -- splash screen

  function createSplashScreen() {
    splashScreen = buildDom(`
    <main class = "bigwords">
    <div id = "title">
      <img src = "../images/TrampolineTime.png">
      <img src = "../images/Forever.png" alt = "bruh">
    </div>
    <div class = bottomoptions>
      <button id = "aboutcreator">About the programmer</button>
      <button id = "entername">Enter your name</button>
      <button id = "howtoplay">How to play</button>
      <button id = "startbutton">Begin</button>
    </div>
    </main>
  `);
    
    document.body.appendChild(splashScreen);

    var aboutButton = splashScreen.querySelector('#aboutcreator');
    aboutButton.addEventListener('click', function() {
        removeSplashScreen();
        createAboutScreen();
    })

    var nameButton = splashScreen.querySelector('#entername');
    nameButton.addEventListener('click', function() {
        removeSplashScreen();
        createNameScreen();
    })

    var howToButton = splashScreen.querySelector('#howtoplay');
    howToButton.addEventListener('click', function() {
      removeSplashScreen();
      createHowToScreen();
    });

    var startButton = splashScreen.querySelector('#startbutton');
    startButton.addEventListener('click', function() {
      startGame();
    });
  }

  function removeSplashScreen() {
    splashScreen.remove();
  }

  function createAboutScreen() {
    AboutScreen = buildDom(`
        <main class = 'aboutmain'>
        <div class = "test">
            <div class = "abouttext">
                <h2>About the Programmer</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique deserunt quas itaque, eligendi dolore, saepe quae doloribus quaerat odio, placeat adipisci quisquam consectetur voluptates nam accusamus aperiam hic alias provident? Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique deserunt quas itaque, eligendi dolore, saepe quae doloribus quaerat odio, placeat adipisci quisquam consectetur voluptates nam accusamus aperiam hic alias provident?</p>
            </div>
            <img src = "../images/newMan.png">
        </div>
            <button class = 'backbutton'>Back</button>
        </main>
    `)
    document.body.appendChild(AboutScreen);
    var backButton = AboutScreen.querySelector('.backbutton');
    backButton.addEventListener('click', function() {
      removeAboutScreen();
      createSplashScreen();
    });
  }

  function removeAboutScreen() {
    AboutScreen.remove();
  }

  function createNameScreen() {
    NameScreen = buildDom(`
    <main class = 'namemain'>
        <div id = "nameform">
            <h2>Enter your name to be put on the Leaderboard</h2>
            <form>
                <input type = "text">
                <button id = "namesubmit">Submit Name</button>
            </form>
        </div>
        <button class = 'backbutton'>Back</button>
    </main>
    `)
    document.body.appendChild(NameScreen);
    var submitValue = NameScreen.getElementsByTagName('input').value
    var submitButton = NameScreen.querySelector('#namesubmit');
    submitButton.addEventListener('click', function() {
        name = submitValue;
        console.log(name);
    })
    var backButton = NameScreen.querySelector('.backbutton');
    backButton.addEventListener('click', function() {
      removeNameScreen();
      createSplashScreen();
    });
  }

  function removeNameScreen() {
    NameScreen.remove();
  }

  function createHowToScreen() {
    HowTo = buildDom(`
    <main class = 'mainhowto'>
        <div class = "howtotext">
            <h2>How To Play</h2>
            <p>Keep the falling red square from touching the bottom. You do this by drawing a (currently invisible) line, which will bounce the red square in a random direction, it will also rebound on the walls. You gain points for every bounce and you instantly lose if the red square touches the bottom.</br> Updates will be made to this page.</p>
        </div>
        <button class = 'backbutton'>Back</button>
    </main>
    `)
    document.body.appendChild(HowTo);
    var backButton = HowTo.querySelector('.backbutton');
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
        <div class ="goButtons">
            <button>Back to Main Menu</button>
            <button>See the Leaderboards</button>
        </div>
    </main>
    `);

    var button = gameOverScreen.querySelector('button');
    button.addEventListener('click', function() {
        removeGameOverScreen();
        createSplashScreen();
    });

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

