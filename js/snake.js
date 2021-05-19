var canvas;
var context;

var foodPos = [
  Math.floor(Math.random()*75) * 10,
  Math.floor(Math.random()*50) * 10
];
var snakePos = [100,50];
var snakeBody = [[100,50], [90,50], [80,50]];
var direction = "ArrowRight";
var block = 10; 
var over = false;
var score = 0;
var framesPerSecond = 1000/30;

window.onload = () => {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  setInterval(() =>{
    drawObjects();
    snakeAnimation();
    eatFood();
    
  }, framesPerSecond);
  document.addEventListener('keydown', snakeDirection, false);
  document.addEventListener('mousedown', () => {
    if(over){
      resetGame();
    }
  })
}

function drawObjects(){
 
  createRectangle(0, 0, canvas.width, canvas.height, 'rgb(40,40,40)');

  createRectangle(foodPos[0], foodPos[1], block, block, 'rgb(128,0,128)');

  snakeBody.splice(0, 0, [snakePos[0], snakePos[1]])
  for (var i = 0; i < snakeBody.length; i++) {
    var body = snakeBody[i];
    createRectangle(body[0], body[1], block, block, 'rgba(0,255,0)');
  }
  
  context.font = "25px sans-serif";
  context.fillText("Score: " + score, 20, 30);

  if(over){
    displayMessage("Game Over");
  }

}


function snakeDirection(event){
  console.log(snakeBody);
  changeTo = event.key
  console.log("direction: " + direction);
  console.log("changeTo: " + changeTo);
  switch (changeTo) {
    case "ArrowDown":
      if (direction != "ArrowUp"){
        direction = "ArrowDown";
      }
      break;
    case "ArrowUp":
      if (direction != "ArrowDown"){
        direction = "ArrowUp";
      }
      break;
    case "ArrowLeft":
      if (direction != "ArrowRight"){
        direction = "ArrowLeft";
      }
      break;
    case "ArrowRight":
      if (direction != "ArrowLeft"){
        direction = "ArrowRight";
      }
      break;
    default:
      console.log("No matching direction");
      return;
  }
}


function snakeAnimation(){
  if (over) {
    return;
  }
  console.log(direction);
  switch (direction) {
    case "ArrowDown":
      snakePos[1] += 10;
      break;
    case "ArrowUp":
      snakePos[1] -= 10;
      break;
    case "ArrowLeft":
      snakePos[0] -= 10;
      break;
    case "ArrowRight":
      snakePos[0] += 10;
      break;
    default:
      console.log("Didn't animate");
      return;
  }
  gameOver();
}


function eatFood(){
  if(snakePos[0] == foodPos[0] && snakePos[1] == foodPos[1]){
    foodPos = [
      Math.floor(Math.random()*72) * 10,
      Math.floor(Math.random()*48) * 10
    ];
    score += 10;
  } else {
    snakeBody.pop()
  }
}


function gameOver(){
  if(snakePos[0] > canvas.width - 10 || snakePos[0] < 0){
    over = true;
  } else if (snakePos[1] > canvas.height - 10 || snakePos[1] < 0) {
    over = true;
  }

  for (var i = 3; i < snakeBody.length; i++) {
    var body = snakeBody[i]
    console.log("Body array: " + body);
    console.log("Snake possition: " + snakePos);
    if (snakePos[0] == body[0] && snakePos[1] == body[1]) {
      over = true;
    }
  }
}


function resetGame(){
  foodPos = [
    Math.floor(Math.random()*72) * 10,
    Math.floor(Math.random()*48) * 10
  ];
  snakePos = [100,50];
  snakeBody = [[100,50], [90,50], [80,50]];
  over = false;
  score = 0;
  direction = "ArrowRight";
}


function createRectangle(posX, posY, width, height, color){
  context.fillStyle = color;
  context.fillRect(posX, posY, width, height);
}


function displayMessage(message){
  context.fillStyle = "rgb(0,255,0)"
  context.font = "50px sans-serif";
  context.fillText(message, 250, 250);
  context.font = "25px sans-serif";
  context.fillText("Click to continue", 275, 300)
}

