
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var survivalTime = 0;
var bananaEaten = 0;
var ground;
var PLAY=1;
var END=0;
var gameState=PLAY;
var restart;
    
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,250);
  
  // creating monkey 
monkey = createSprite(80,200,10,10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
  
  // creating ground
  
  ground = createSprite(400,230,1000,10);
  ground.velocityX=-4;
  ground.x = ground.width/2;

  bananaGroup = createGroup();
  obstacleGroup= createGroup();
  
   restart = createSprite(400,180,40,40);
  restart.visible= false
  

  
}


function draw() {
background("white");
  console.log("this is ",gameState);
  
    text("survivalTime:"+survivalTime,300,100);
 
  
  if(gameState===PLAY){
    
    
    
      if(keyDown("space")&&monkey.y>=180){
    monkey.velocityY=-12;
  }
  monkey.velocityY = monkey.velocityY+0.8;
  
  // banana
  banana();
     survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
  // obstacles
  obstacles();
    
      if(ground.x>0){
    ground.x = ground.width/2;
  }
  
  monkey.collide(ground);
  
  if(monkey.isTouching( bananaGroup)){
 bananaGroup.destroyEach();
    bananaEaten = bananaEaten+1;
  }
    
    if(monkey.isTouching(obstacleGroup)){
      gameState=END;
          }
     
     
  }
  
  if(gameState===END){
    
    ground.velocityX=0;
    monkey.velocityY=0;
    
    text("GAME OVER",300,120);
    
      monkey.visible = false
    
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
      
      bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    restart.visible = true
    
    if(mousePressedOver(restart)){
      
      reset();
    }
    
    
  }
  

  drawSprites();
  text("bananaEaten:"+bananaEaten,370,70);
   
}

function banana(){
  
  if(frameCount%80===0){
   var banana = createSprite(600,130,10,10);
    banana.addImage(bananaImage);
    banana.velocityX=-6;
    banana.y=Math.round(random(70,180));
    banana.scale=0.1;
    banana.lifetime=100;
    bananaGroup.add(banana);
    
    
   }   
      }

   function obstacles(){
     
     if(frameCount%90===0){
       var obstacle = createSprite(450,210,10,10);
       obstacle.addImage(obstacleImage);
       obstacleGroup.add(obstacle);
       obstacle.scale=0.1;
       obstacle.velocityX=-6;
       obstacle.lifetime=100;
     }
   }

function reset(){
  
  survivalTime=0;
  bananaEaten=0;
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  monkey.visible= true
  restart.visible = false
  gameState= PLAY;
  
  
  
}

