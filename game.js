var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var keyPressed = false;
var level = 0;

function nextSequence() {
  userClickedPattern = [];
  $("h1").text("Level " + level);
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(color) {
  var buttonSound = new Audio("./sounds/" + color + ".mp3");
  buttonSound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (currentLevel === gamePattern.length - 1) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    const gameOver = new Audio("./sounds/wrong.mp3");
    gameOver.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over");
    resetGame();
  }
}

function resetGame() {
  setTimeout(function () {
    $("h1").text("Press A Key to Start");
    keyPressed = false;
    gamePattern = [];
    level = 0;
  }, 1000);
}

$(".btn").on("click", function (e) {
  if (keyPressed) {
    var userChosenColour = this.id;
    animatePress(userChosenColour);
    playSound(userChosenColour);

    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
});

$(document).on("keypress", function () {
  if (!keyPressed) {
    keyPressed = true;
    nextSequence();
  }
});
