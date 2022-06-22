var PLAY = 1;
var END = 0;
var gameState=PLAY;


var score = 0;

var backgroundImg;
var penguin, penguin_collapsed, penguinImg;
var icicle, icicleImg;
var icicle2, icicle2Img;
var icicleGrp;
var restart, restartImg;
var fish, fishImg;
var fishGrp;

var jumpSound, collidedSound;

function preload() {

  jumpSound = loadSound("jump.wav")
  collidedSound = loadSound("collided.wav")

  backgroundImg = loadImage("background.jpeg");
  penguinImg = loadImage("penguin.png");
  penguin_collapsed = loadImage("penguin_dead.png");
  icicleImg = loadImage("icicle.png");
  icicle2Img = loadImage("icicles2.png");
  restartImg = loadImage("restart.png");
  fishImg = loadImage("fish.png");
}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
 
  penguin = createSprite(width/12,height/2+height/8,10,10);
  penguin.addImage("bouncing", penguinImg);
  penguin.addImage("collapsed", penguin_collapsed);
  penguin.setCollider('circle',0,0,150)
  penguin.scale = 0.25;

 /* restart = createSprite(width/2,height-100,10,10);
  restart.addImage("reset", restartImg);
  restart.scale=0.05
  restart.visible= false;*/


  //penguin.debug = true;

  icicleGrp = new Group();
  fishGrp = new Group();
  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);


  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);

  if(gameState===PLAY)  {
  if(keyDown("SPACE") && penguin.y>15)  {
    penguin.velocityY=-10
    jumpSound.play();
  }
  penguin.velocityY = penguin.velocityY+0.8;

  spawnIcicles();
  spawnIcicles2();
  spawnFish();
  
  if(fishGrp.isTouching(penguin)){
    for(var i=0;i<fishGrp.length;i++){     
        
     if(fishGrp[i].isTouching(penguin)){
      fishGrp[i].destroy()
   
          score = score+1;
          } 
    
    }
  }

  if(icicleGrp.collide(penguin) || penguin.y>height-20) {
    collidedSound.play();
   gameState = END;
  }
} else if(gameState===END) {
  penguin.velocityY=0;
  icicleGrp.setVelocityXEach(0); 
  icicleGrp.setVelocityYEach(0); 
  //fishGrp.setvelocityXEach(0);
  penguin.changeAnimation("collapsed", penguin_collapsed);
  gameOver();
  }

 // console.log(height/1.45);
  drawSprites();
}

function spawnIcicles()  {
if(frameCount%60===0 ) {
  icicle = createSprite(width,65,5,5);
  icicle.setCollider('rectangle',0,0,50, height/2)
  icicle.addImage("icicl", icicleImg);
  icicle.scale=0.7;
  icicle.velocityX=-(score+12);
  icicle.lifetime = 400;
  icicle.y=Math.round(random(5,height/5));
  icicleGrp.add(icicle);
  //icicle.debug=true;
}
}

function spawnIcicles2()  {
  if(frameCount%77===0) {
    icicle2 = createSprite(width,335,5,5);
    icicle2.setCollider('rectangle',0,0,150,height)
    icicle2.addImage("icicl2", icicle2Img);
    icicle2.scale=0.4;
    icicle2.velocityX=-(score+12);
    icicle2.lifetime = 400;
    icicle2.y=Math.round(random(height/1.25,height-5));
    icicleGrp.add(icicle2);
    //icicle2.debug=true;
  }
}

function spawnFish()  {
  if(frameCount%113===0) {
    fish = createSprite(width,height/2,5,5);
    fish.setCollider('circle',0,0,150)
    fish.addImage("bait", fishImg);
    fish.scale=0.1
    fish.velocityX=-8;
    fish.lifetime = 400;
    fish.y=Math.round(random(height/4,height/2+height/4));
    fishGrp.add(fish);
    //fish.debug=true;
  }
}


function gameOver() {
  swal({
    title: `Game Over`,
    text: "Oops you lost the game....!!!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  });
}