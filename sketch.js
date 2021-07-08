var bg,bgI;
var pC,pcI;
var ground;
var enemy,enemyG;
var t,t2,t3;
var e1,e2,e3;
var PLAY=1,END=2;
var gameState=PLAY;
var score=0;
var blast;


function preload(){
bgI=loadImage("gameBG.jpg")
pcI=loadAnimation("pcBoat.png")
e1=loadImage("npcBoat1.png")
e2=loadImage("npcBoat2.png")
e3=loadImage("npcBoat3.png")
blast=loadAnimation("blast.png")

}


function setup(){
createCanvas(950,500)
 bg=createSprite(width/2,height/2-200,950,500)
 bg.addImage(bgI)
 bg.scale=2;
 bg.velocityX=-3;

 pC=createSprite(100,250)
 pC.addAnimation("play",pcI)
 pC.addAnimation("sit",blast)
 pC.scale=0.2

 
//t=createSprite(width,250,50,50)
//t2=createSprite(width,350,50,50)
//t3=createSprite(width,450,50,50)
enemyG=new Group()
 
}

function draw(){
  background("green")
if(gameState===PLAY){

score=score+Math.round(getFrameRate()/60)

if(bg.x<0){
  bg.x=width/2
}
if(keyDown("UP_ARROW")&&pC.y!==200){
  pC.y-=5
}
if(keyDown("DOWN_ARROW")&&pC.y!==height-50){
  pC.y+=5
}
if(pC.isTouching(enemyG)){
  gameState=END
}


  spawnEnemy()

}
if (gameState===END){
  enemyG.destroyEach()
  bg.velocityX=0
  pC.changeAnimation("sit",blast)

}

console.log(score)
  
  drawSprites()
  fill("black")
  text("Score:"+score,800,80)
  if(gameState===END){
    textSize(20)
    text("GAME OVER",450,250)
    text("PRESS SPACE TO RESTART",400,300)
    if(keyDown("space")){
      reset()
    }
  }
}
function spawnEnemy(){
  if(frameCount%60===0){
    enemy=createSprite(width+10,0,60,50)
    enemy.velocityX=-5
    enemy.lifetime=250

    var anime=Math.round(random(1,3))
    switch(anime){
      case 1:enemy.addImage(e1);enemy.scale=0.2;
      break;
      case 2:enemy.addImage(e2);enemy.scale=0.2;
      break;
      case 3:enemy.addImage(e3);enemy.scale=0.2;
      default:break;
    }

    var pos=Math.round(random(1,3))
    switch(pos){
      case 1:enemy.y=250;
      break;
      case 2:enemy.y=350;
      break;
      case 3:enemy.y=450;
      default:break;
    }
    enemyG.add(enemy)

  }
}
function reset(){
  gameState=PLAY
  frameCount=0
  pC.changeAnimation("play",pcI)
  score=0
  bg.velocityX=-3;
  pC.y=250

}