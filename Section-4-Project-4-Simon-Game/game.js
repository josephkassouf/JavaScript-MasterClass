let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickerPattern = [];

let level = 0;
let gameStarted = false;

// Start the game
$(document).on("keypress", function () {
  if (!gameStarted) {
    level = 0;
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

// Handle button clicks
$(".btn").on("click", function () {
  let userChosenColor = $(this).attr("id");
  userClickerPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer();
});

// Generate the next color sequence
function nextSequence() {
  userClickerPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);

  playSound(randomChosenColor);
}

// Play sound effect
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animate the button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Check if the user's answer is correct
function checkAnswer() {
  let currentLevel = userClickerPattern.length - 1;
  if (gamePattern[currentLevel] === userClickerPattern[currentLevel]) {
    console.log("Success");

    if (userClickerPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Failure");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// Restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
