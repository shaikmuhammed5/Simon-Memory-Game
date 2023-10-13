
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$(document).keypress(function(event) {

    if( (("Enter" == event.key) && !started)  ) {

        nextSequence();

        started = true;

    }

});

$(".btn").click(function() {

    if (!started){

        nextSequence();

        started = true;
    
    }
    else{

        var userChosenColour = $(this).attr("id");

        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);

        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length-1);

    }

});


$(document).keypress(function (event) {

    var keypressed = $("."+event.key).attr("id");

    var ans = buttonColours.includes(keypressed)

    if (ans) {

    userClickedPattern.push(keypressed);

    playSound(keypressed);

    animatePress(keypressed);

    checkAnswer(userClickedPattern.length-1);

    }

});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
        console.log(gamePattern);
        console.log(userClickedPattern);

        if (gamePattern.length === userClickedPattern.length) {

            console.log("success");
            console.log(gamePattern);
            console.log(userClickedPattern);

            setTimeout(function() {
            
                nextSequence();

            }, 1000);

        }
        

    }
    else{

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function() {
            
            $("body").removeClass("game-over");
            
        }, 200);

        $("h1").text("Game Over, Press Enter Key to Restart");

        startOver();

        console.log("wrong");
        console.log(gamePattern);
        console.log(userClickedPattern);
        
    }
    
}

function nextSequence() {

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(200).fadeIn(200);

    playSound(randomChosenColour);

    level++;

    userClickedPattern = [];

    $("#level-title").text("Level "+level);

}

function playSound(name) {

    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
    
}

function animatePress(currentColour) {
    
    $("#"+currentColour).addClass("pressed");

    setTimeout(function() {

        $("#"+currentColour).removeClass("pressed");

    }, 100);

}

function startOver() {
    
    level = 0;

    gamePattern = [];

    started = false;

}


// if ($(window).width() < 850 ){
//     $("h1").text("Press Any Key to Start");
//     $(".btn").text(" ");
// }


