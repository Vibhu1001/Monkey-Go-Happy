var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;

var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;

var ground ;

var score;
var survivalTime;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
   createCanvas(500,500);  
  
  monkey = createSprite(40,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  
  console.log(ground.x);
  
  score = 0;
  survivalTime = 0;
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();

}


function draw() {
  background("red");
 
 
  stroke("white");
  textSize(20);
  fill("white");
  text("Score :  " + score, 20,50);
 
  if (gameState === PLAY) {
    
   if (keyDown("space")&& monkey.y >= 310) {
     monkey.velocityY = -17;
   }
     monkey.velocityY = monkey.velocityY + 0.8;
     
   spawnBananas(); 
    
   spawnObstacles();
    
   destroy1();
    
   gameOver();
    
     
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
  stroke("white");
  textSize(20);
  fill("white");
  text("Survival Time :  " + survivalTime, 320,50);
  }
  
  if (gameState === END) {
    monkey.velocityX = 0;
    FoodGroup.setVelocityXEach=(0);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach=(-1);
    obstacleGroup.setLifetimeEach(-1);
    monkey.velocityY = 0;
    text("Game Over",200,200);
  }
  
  ground.x = ground.width /2;
  
  monkey.collide(ground);
    
  drawSprites();
  
}

function spawnBananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,Math.round(random(120,200)),20,20) ;
    banana.velocityX = -4;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 300;
  
  FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(400,335,20,20);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    
  
  obstacleGroup.add(obstacle);
  }  

}



function destroy1 () {
 if(FoodGroup.isTouching(monkey)) {
   FoodGroup.destroyEach();
   score = score + 2;
   
 }
}

function gameOver() {
  if (obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
}
