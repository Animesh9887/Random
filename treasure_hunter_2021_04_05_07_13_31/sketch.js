var path,boy,cash,diamonds,jwellery,sword;

var PLAY=1
var END=0
var gameState = PLAY

var Gameover,endImg

var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  boy_collided = loadAnimation("runner1.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  
  
}

function setup(){
  
  createCanvas(600,600);
// Moving background
path=createSprite(300,200);
path.addImage(pathImg);



//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.addAnimation("COLLIDED",boy_collided);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

  Gameover = createSprite(300,90, 20, 20);
  Gameover.addAnimation("gameover",endImg);
  Gameover.scale= 0.6
  Gameover.visible=false
}

function draw() {

  background(0);
  edges= createEdgeSprites();
  
  if(gameState===PLAY){
    
    boy.x = World.mouseX;
    
    boy.collide(edges);
    
    
     
    path.velocityY = 4;
    
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection =treasureCollection +1
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection =treasureCollection +1
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection =treasureCollection +1
      
    
  }
  }  
  
if (swordGroup.isTouching(boy)){
  gameState=END
  boy.changeAnimation("COLLIDED",boy_collided);
  Gameover.visible=true
}
  
if (gameState===END){
  path.velocityY=0;
  cashG.setVelocityYEach(0);
  jwelleryG.setVelocityYEach(0);
  diamondsG.setVelocityYEach(0);
  swordGroup.setVelocityYEach(0);
  cashG.destroyEach();
  diamondsG.destroyEach();
  jwelleryG.destroyEach();
  swordGroup.destroyEach();
  swordGroup.setLifetimeEach(-1);
  cashG.setLifetimeEach(-1);
  diamondsG.setLifetimeEach(-1);
  jwelleryG.setLifetimeEach(-1);
  
  
  
}
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    

    

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,450,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
    
    cash.setCollider("circle",0,0,20);
  
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;    
  diamonds.setCollider("circle",0,0,20);
    
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;   
  jwellery.setCollider("circle",0,0,20);
    
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  sword.setCollider("circle",0,0,50);
  swordGroup.add(sword);
  }
}