var fishie, tubes1, tubes, tube1Image, tube2Image, fishieImage, ground, groundImage;
var score=0;
var clouds, cloudsImage, cloudsGroup;
var coins;
var tubesGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverImage, restartImage
var backgroundImage;
var invisibleWall;

function preload(){
fishieImage= loadImage(" flappybird-animation.gif");
 groundImage= loadImage("baseImg.png");
 tube2Image= loadImage(" pipe-bottom.png");
 tube1Image= loadImage("pipe-top.png");
 backgroundImage= loadImage("background.png");
 gameOverImage= loadImage(" gameover.jpg");
 cloudImage= loadImage("cloud1.png");
}


function setup() {
 createCanvas(500,400);

   
   fishie= createSprite(100,200,20,20);
   fishie.addImage(fishieImage);
   fishie.scale=0.5;
 fishie.velocityY=5


   ground =createSprite(600,480,400,20);
   ground.addImage(groundImage);
   ground.scale=3;
  ground.x = ground.width /2;

  gameOver = createSprite(210,170);
 gameOver.addImage(gameOverImage);
 gameOver.scale=0.5;
 
 invisibleWall=createSprite(250,1,1000,10);
invisibleWall.visible=false;



  tubesGroup= new Group();
 cloudsGroup= new Group();

  

 
 
   
}

function draw() {
 background(backgroundImage);

 
  
  
   if (gameState===PLAY){

     if(frameCount % 100 === 0){
    score= score+1;
   }
     //score = score + Math.round(getFrameRate()/60);
    // ground.velocityX = -(6 + 3*score/100);
     gameOver.visible=false;
     //restart.visible=false;
   
     if(keyDown(32)){
       fishie.velocityY= -6;
     }
   
     fishie.velocityY= fishie.velocityY+0.5;
   
     if (ground.x < 0){
       ground.x = ground.width/2;
     }
     ground.velocityX=-4
    ground.visible=true;

   
     //fishie.collide(tubesGroup);
     fishie.collide(ground);
     fishie.collide(invisibleWall);
     spawnUpTubes();
     spawnDownTubes();
     spawnClouds();
   
     if(fishie.isTouching(tubesGroup)){
         gameState = END;
     }
   }
   else if (gameState === END) {
     gameOver.visible = true
     //restart.visible = true;
    score = 0 ;
     if(keyDown("ENTER")){
    gameState=PLAY;
    }
  


  


    ground.visible=false;
     //set velcity of each game object to 0
     ground.velocityX = 0;
     fishie.velocityY = 0;
     tubesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
    
     

     
     
     //set lifetime of the game objects so that they are never destroyed
    tubesGroup.setLifetimeEach(0);
    cloudsGroup.setLifetimeEach(0);

  }

 drawSprites();
 
 text("Score : "+score,100,50)

 
}
function spawnUpTubes() {
 
   if (frameCount % 80 === 0){
     tubes1 = createSprite(500,45,500,280);
     tubes1.y = Math.round(random(20,70));
     tubes1.addImage(tube1Image);
     tubes1.scale=0.4;
     tubes1.velocityX= -4;
     tubes1.lifetime= 200;
     tubesGroup.add(tubes1)
     
      }
   
  
 }
function spawnDownTubes() {
 
   if (frameCount % 80 === 0){
     tubes = createSprite(500,350,600,580);
     tubes.y = Math.round(random(250,300));
     tubes.addImage(tube2Image);
     tubes.scale=0.4 ;
     tubes.velocityX= -4;
     tubes.lifetime= 200;
     tubesGroup.add(tubes)
     tubes.depth = ground.depth ; 
     ground.depth = ground.depth+1;
      }
   
  
 }
function spawnClouds() {
 
   if (frameCount % 60 === 0){
     clouds = createSprite(800,200,600,580);
    clouds.y = Math.round(random(10,70));
     clouds.addImage(cloudImage);
     clouds.scale=0.3;
     clouds.velocityX= -4;
     clouds.lifetime= 200;
     cloudsGroup.add(clouds)
     
      }
   
  
 }

