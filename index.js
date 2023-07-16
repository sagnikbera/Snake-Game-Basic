//Game's Constant & Variables
let inputDir = {x:0 , y:0};
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
// let speed = prompt("Enter speed: ");
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{x:13 , y:15}];
let food = {x:10 , y:13};
let score = 0;
let tempScore = 5;

//here origin is the top-left side , top left to right side is positive x axis and top left to bottm left is psitive y axis.

//Game Function
function main(currentTime){
    window.requestAnimationFrame(main);
    if((currentTime - lastPaintTime)/1000 < 1/speed){
        //divided by 1000 to convert the time from millisecnds to seconds
        //1/speed = 1/2 = 0.5 seconds
        return;
    }
    lastPaintTime = currentTime;
    gameEngine();
}

function isCollied(snake){ 
    //If the snake bits itself
    for(let i=1 ; i< snakeArr.length ; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true; 
        }    
    }

    //if the head collied with the walls
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
        return true;
    }
}




function gameEngine(){
    musicSound.play();
    //====================
    // document.getElementById("music").addEventListener("click", speedBooster);

    // function speedBooster(){

    // }
    //====================
//increment the speed after 5 food intake.
    if(score>tempScore){
        speed = speed + 1;
        tempScore = tempScore + 5;
    }

    // console.log(tempScore);
    // console.log(speed);
    //======================

    //Part 1: Updating the Snake array
    if(isCollied(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0 , y:0};
        alert("Game Over !!!");
        snakeArr = [{x:13 , y:15}];
        musicSound.play();
        score = 0;1
    }

    //if eaten the food => increment the score and regenrate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score = score + 1;
        if(score > highScoreVal){
            highScoreVal = score ;
            localStorage.setItem("highScore" , JSON.stringify(highScoreVal));
            highScoreBox.innerHTML ="High Score: " + highScoreVal;
        }

        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y})
    
    let a = 2;
    let b = 16; 

     food = {x: Math.round(a + (b-a)*Math.random()) , y: Math.round(a + (b-a)*Math.random())};   
     //Genarate random number between a and b => (a + (b-a)*Math.random();
    }


    //Move the Snake
    //shift every array segment to its in front of position
    for(let i=snakeArr.length-2 ; i>=0 ; i--){
        // snakeArr[i+1] = snakeArr[i];
        //still now snake will not move cause the position 0th element of the array is undefined
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    

    //Part 2: Render the snake and food
    board.innerHTML = "";

    //Display Snake
    snakeArr.forEach((e , index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        //here row is y and column is x
        if(index === 0){
            snakeElement.classList.add('snakeHead');
        }else{
            snakeElement.classList.add('snakeBody');
        }
        board.appendChild(snakeElement);
    });

    //Display Food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);


}

//high score store in local storage 
let highScore = localStorage.getItem("highScore");
if(highScore === null){
    highScoreVal = 0;
    localStorage.setItem("highScore" , JSON.stringify(highScoreVal));
}else{
    highScoreVal = JSON.parse(highScore);
    highScoreBox.innerHTML = "High Score: "+ highScore ;
}


//Main Logic
window.requestAnimationFrame(main);
//https://stackoverflow.com/questions/38709923/why-is-requestanimationframe-better-than-setinterval-or-settimeout


window.addEventListener('keydown', e=>{
    inputDir = {x:0 , y:1}//Start the game
    moveSound.play();

    switch(e.key){
        case "ArrowUp":
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            inputDir.x= 0;
            inputDir.y= +1;
            break;
        case "ArrowLeft":
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
            inputDir.x= +1;
            inputDir.y= 0;
            break;
        case "w"://ArrowUp
        inputDir.x= 0;
        inputDir.y= -1;
            break;
        case "s"://arrowDown
        inputDir.x= 0;
        inputDir.y= +1;
            break;
        case "a"://arrowLeft
        inputDir.x= -1;
        inputDir.y= 0;
            break;
        case "d"://arrowRight
        inputDir.x= +1;
        inputDir.y= 0;
            break;       
    }

})