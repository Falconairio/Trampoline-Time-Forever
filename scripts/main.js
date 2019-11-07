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
  var DifficultyScreen;//Difficulty select screen
  var LBscreen;//The screen for the leaderboard 
  var difficulty; //The difficulty for purposes of displaying on the leaderboard
  var name = "Anonymous";//The name for purposes of displaying on the leaderboard 
  var scorePlayer; //The score for the game session
  var toLeaderboard = [];
  var HowTo; //How to Play Screen 
  var bgm = document.getElementById('bgm');
  var buttons = document.querySelectorAll('button');
  var select = document.getElementById('select');

  
  function createSplashScreen() {
    splashScreen = buildDom(`
    <main class = "bigwords">
    <div id = "title">
      <img src = "./images/TrampolineTime.png">
      <img src = "./images/Forever.png" alt = "bruh">
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
    document.body.classList.add('startandend')
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
      removeSplashScreen();
      createDifficultyScreen();
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
            <img src = "./images/newMan.png">
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
            <div class = "submitandbutton">
            <form>
                <input type = "text" class="name">
                <button id = "namesubmit">Submit Name</button>
            </form>
            </div>
        </div>
        <span></span>
        <button class = 'backbutton'>Back</button>
    </main>
    `)
    document.body.appendChild(NameScreen);
    var submitButton = NameScreen.querySelector('#namesubmit');
    submitButton.addEventListener('click', function(event) {
        event.preventDefault();
        var submitValue = NameScreen.querySelector('.name').value;
        var success = NameScreen.querySelector('span'); 
        if(submitValue === "") {
            success.classList.remove('success');
            success.innerHTML = "failure";
            success.classList.add('failure')
        } 
        if(submitValue === 'bruh' || submitValue === 'BRUH' || submitValue === 'Bruh') {
            removeNameScreen();
            document.body.classList.remove('startandend');
            document.body.classList.add('secretdifficulty');
            difficulty = "Secret"
            startGame(3);
        }
        if(submitValue != "") {
            success.classList.remove('falure');
            success.innerHTML = "success";
            success.classList.add('success')
            name = submitValue;
            console.log(name);
        }
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
            <p>Keep the falling red square from touching the bottom. You do this by drawing a white line by clicking and dragging, which will bounce the red square in a random direction, you can bounce the object on either side of the trampoline, and it will also rebound on the walls. You gain points for every bounce and you instantly lose if the red square touches the bottom. Changing the Difficulty will reduce the maximum size of your trampoline. Entering your name will make you eligible for leaderboard status. Entering a certain name will trigger secret mode</br> Updates will be made to this page.</p>
        </div>
        <button class = 'backbutton'>Back</button>
    </main>
    `)
    document.body.appendChild(HowTo);
    var backButton = HowTo.querySelector('.backbutton');
    backButton.addEventListener('click', function() {
      removeHowToScreen();
      createSplashScreen();
    });
  }
function removeHowToScreen() {
    HowTo.remove();
}

function createDifficultyScreen() {
    DifficultyScreen = buildDom(`
        <main class = "difficultycontainer">
            <div class ="difficultybuttons">
                <button class = "easybutton">Easy</button>
                <button class = "mediumbutton">Medium</button>
                <button class = "hardbutton">Hard</button>
            </div>
        </main>
    `)
    document.body.appendChild(DifficultyScreen);

    var easyButton = DifficultyScreen.querySelector('.easybutton');
    easyButton.addEventListener('click', function() {
      difficulty = 'Easy';
      removeDifficultyScreen();
      //document.body.classList.add('startandend');
        startGame(0);
    });
    var mediumButton = DifficultyScreen.querySelector('.mediumbutton');
    mediumButton.addEventListener('click', function() {
        difficulty = 'Medium';
        removeDifficultyScreen();
        startGame(1);
    });
    var hardButton = DifficultyScreen.querySelector('.hardbutton');
    hardButton.addEventListener('click', function() {
        difficulty = 'Hard';
        removeDifficultyScreen();
        //document.body.classList.add('startandend');
        startGame(2);
    });
}

function removeDifficultyScreen() {
    DifficultyScreen.remove();
}

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
        <span class = "playername"></span>
        </div>
      </div>
    </main>
  `);
    document.body.appendChild(gameScreen);
    let span = document.querySelector('.playername');
    if(name === " ") {
        span.innerHTML = "Anonymous <strong class = \"playsession\">playsession</strong>"
    } else {
        span.innerHTML = name + '\'s <strong class = \"playsession\">playsession</strong>'
    }
    
    return gameScreen;
  }

  function removeGameScreen() {
    document.body.classList.remove('easydifficulty');
    document.body.classList.remove('mediumdifficulty');
    document.body.classList.remove('harddifficulty');
    game.removeGameScreen();
  }

  // -- game over screen

  function createGameOverScreen(score) {
    gameOverScreen = buildDom(`
      <main id = "gameovermain">
        <div class = "gameovertext">
            <img src = "./images/GameOver.png">
            <p>Your score: <span></span></p>
        </div>
        <div class ="goButtons">
            <button>Back to Main Menu</button>
            <button class = "LBbutton">See the Leaderboards</button>
        </div>
    </main>
    `);
    document.body.classList.add('startandend');
    document.body.classList.remove('secretdifficulty');
    var Menubutton = gameOverScreen.querySelector('button');
    Menubutton.addEventListener('click', function() {
        removeGameOverScreen();
        createSplashScreen();
    });

    var LBbutton = gameOverScreen.querySelector('.LBbutton');
    LBbutton.addEventListener('click', function() {
        removeGameOverScreen();
        createLeaderboard();
    });
    var span = gameOverScreen.querySelector('span');
    span.innerText = score;
    scorePlayer = score;
    document.body.appendChild(gameOverScreen);
  }

  function removeGameOverScreen() {
    if (gameOverScreen) {
      gameOverScreen.remove();
    }
  }

  // -- Setting the game state

  function startGame(difficulty) {
    if(NameScreen) {
        removeNameScreen();
    }
    if(DifficultyScreen){
        removeDifficultyScreen();
    }
    removeGameOverScreen();

    game = new Game(difficulty);
    game.gameScreen = createGameScreen();

    game.start();
    // End the game
    game.passGameOverCallback(function() {
      gameOver(game.score);
      updateScore();
    });
  }

  function gameOver(score) {
    removeGameScreen();
    createGameOverScreen(score);
  }
  function updateScore() {
    var lastPlayer = {name: name, score: scorePlayer, difficulty: difficulty};
    var scoreString = localStorage.getItem('score');
    
    if(!scoreString) {
        var scoreArray = []
        scoreArray.push(lastPlayer);
        var leaderboardString = JSON.stringify(scoreArray);
        localStorage.setItem('score',leaderboardString);
    } else if (scoreString) { 
        var scoreArray = JSON.parse(scoreString);
        scoreArray.push(lastPlayer);
        var leaderboardString = JSON.stringify(scoreArray);
        localStorage.setItem('score',leaderboardString);
        var test = localStorage.getItem('score');
        var testagain = JSON.parse(test);
        toLeaderboard = testagain;
    }
}
function createLeaderboard() {
    LBscreen = buildDom(`
        <main class = "leaderboardmain">
            <div class = "leaderboardcontainter">
                <div>
                    <ol class = "leaderboardlist" id = "name">
                        <header>Top Players</header>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                    </ol>
                </div>
                <div>
                <ol class = "secondleaderboardlist" id = "score">
                    <header>Score</header>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                    </ol>
                </div>
                <div>
                <ol class = "secondleaderboardlist" id = "difficulty">
                    <header>Difficulty</header>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                        <li>________</li>
                    </ol>
                </div>
            </div>
            <div class = "leaderboardbuttons">
                <button>To Main Menu</button>
                <button class = 'backbutn'>Back</button>
                <button class = 'clear'>Clear Leaderboard</button>
            </div>
        </main>
    `)
    document.body.appendChild(LBscreen);

    setLeaderboard(toLeaderboard);
    let menbutton = LBscreen.querySelector('button');
    menbutton.addEventListener('click',function () {
        removeLeaderboard();
        createSplashScreen();
    })
    let leadbackbutton = LBscreen.querySelector('.backbutn');
    leadbackbutton.addEventListener('click', function () {
        removeLeaderboard(); 
        createGameOverScreen(scorePlayer);
    })
    let clearbutton = LBscreen.querySelector('.clear');
    clearbutton.addEventListener('click', function() {
        localStorage.clear();
        setLeaderboard(toLeaderboard);
    })
}
function removeLeaderboard() {
    LBscreen.remove();
}
function setLeaderboard(array) {
    function compare(a,b) {
        if (a.score > b.score){
          return -1;
        }
        if (a.score < b.score){
          return 1;
        }
      }
      array.sort(compare);
      console.log(toLeaderboard);
    var nameList = document.querySelector('#name');
    var scoreList = document.querySelector('#score');
    var difficultyList = document.querySelector('#difficulty');
        let nam = nameList.querySelectorAll('li');
        nam.forEach(function(element,index) {
            if(array[index]){
                element.innerHTML = array[index].name;
            }
        })
        let scr = scoreList.querySelectorAll('li');
        scr.forEach(function(element,index) {
            if(array[index]){
                element.innerHTML = array[index].score;
            }
        })
        let dfc= difficultyList.querySelectorAll('li');
        dfc.forEach(function(element,index) {
            if(array[index]){
                element.innerHTML = array[index].difficulty;
            }
        })
}
  createSplashScreen();
  bgm.play();
}

window.addEventListener('load', main);