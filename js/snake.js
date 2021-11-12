
let score = 0,
    mainLives = 3,
    lives = mainLives,
    snakelength = 1,
    hightScore = 0,
    snakeParts = [],
    theCanvas = document.getElementById("canvas"),
    ctx = theCanvas.getContext("2d");

    theCanvas.height = theCanvas.width = 600;
    ctx.fillStyle = "#C850C0";

    SqureSize = 20;
    xPosition = getRandomPosition();  
    yPosition = getRandomPosition();  
    foodXPosition = getRandomPosition();
    foodYPosition = getRandomPosition();

    document.getElementById("lives").innerHTML = lives;


    document.getElementById("playAgain").addEventListener("click", function(){
        lives = mainLives;
        document.getElementById("lives").innerHTML = lives;

        xPosition = getRandomPosition();  
        yPosition = getRandomPosition();  

        foodXPosition = getRandomPosition();
        foodYPosition = getRandomPosition();
        document.getElementById("overlay").style.display = "none";
        document.getElementById("score").innerHTML = 0;
        drawGame();
    });


function getRandomPosition(){
    // Get random Position between 0 : 600
    let RandomPosition = Math.round( Math.random() * theCanvas.width );
    // make Position rounded and can divide By Square size 20
    return (RandomPosition - ( RandomPosition % 20 ));  
}

function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, theCanvas.width, theCanvas.height);
 }

function drawSnake() {
    ctx.fillStyle = "green";
    ctx.fillRect(xPosition, yPosition, 20, 20);
}

function drawFood() {
    ctx.fillStyle = "#FFCC70";
    ctx.fillRect(foodXPosition, foodYPosition, 20, 20);
}
function getHighScore(){
    if(window.localStorage.getItem('highScore') < score){
        console.log("new Record saved");
        localStorage.setItem('highScore',score);
        document.getElementById("highscore").innerHTML = localStorage.getItem('highScore');
    }
}

window.onload = function(){
    if(localStorage.getItem('highScore') != null){
        document.getElementById("highscore").innerHTML = localStorage.getItem('highScore');
    }else{
        localStorage.setItem('highScore',0);
        document.getElementById("highscore").innerHTML = 0;
    }
    console.log(window.localStorage.getItem('highScore'));

}

function eatingFood() {
    if(xPosition === foodXPosition && yPosition === foodYPosition){
        score++;
        document.getElementById("score").innerHTML = score;
        getHighScore();
        snakelength += 1;
        foodXPosition = getRandomPosition();
        foodYPosition = getRandomPosition();
        drawGame(); 
    }
}
function gameOver(){
    if(lives > 1 ){
        lives -= 1;
        xPosition = getRandomPosition();  
        yPosition = getRandomPosition();  

        foodXPosition = getRandomPosition();
        foodYPosition = getRandomPosition();
        drawGame(); 
    }else if(lives === 1){
        lives -= 1;
        document.getElementById("overlay").style.display = "flex";
    }
    document.getElementById("lives").innerHTML = lives;
}

function drawGame() {
    clearScreen();
    drawFood();
    drawSnake();
    eatingFood();
}   

window.addEventListener("keydown", function(event){
    if(event.key === "ArrowUp"){
        yPosition -=20;
        if(yPosition < 0){
            gameOver();
        }
        drawGame();
    }
    if(event.key === "ArrowDown"){
        yPosition +=20;
        if(yPosition > theCanvas.height - 20){
            gameOver();
         }
        drawGame();
    }
    if(event.key === "ArrowRight"){
        xPosition +=20;
        if(xPosition > theCanvas.width -20){
            gameOver();
        }
        drawGame();
    }
    if(event.key === "ArrowLeft"){
        xPosition -=20;
        if(xPosition < 0){
            gameOver();
        }
        drawGame();
    }
});



drawGame();

