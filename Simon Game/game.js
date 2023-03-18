
//create an array for color buttons
var buttonColours = ["red", "blue", "green", "yellow"];

//empty array for game pattern
var gamePattern = [];
//user's click pattern
var userClickedPattern = [];

//set to false before stating and level as 0 initially
var started = false;
var level = 0;

//set jquery for document and key press detection
$(document).keypress(function() {
    //if not started select the level title and add level value text
  if (!started) {
    $("#level-title").text("Level " + level);
    //move to next sequence function
    nextSequence();
    //if values are detected set as started true
    started = true;
  }
});


//select the button using jquery and add event listener on click
$(".btn").click(function() {

    //variable for chosen color and get its id
  var userChosenColour = $(this).attr("id");
  //add the user's chosen color in the user clicked pattern array
  userClickedPattern.push(userChosenColour);

// play sound for the selected color
  playSound(userChosenColour);
  //animate according to the color pressed
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
  console.log(checkAnswer)
});

//function to validate the answer
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

//function to set next sequence for the game as per user selection
function nextSequence() {
  userClickedPattern = [];
  level++;
  
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern)

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
