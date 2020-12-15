var PLAY = 1;
var END = 0;
var gameState = PLAY;

var man, man_img;
var ground, groundImage, invisibleground;
var arrow, arrow2, ar_img, ar_img2;
var bg_img;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var city, cityimg;
var obstaclesGroup;
var ZombieGroup;
var zombie1, zombie2, zombie3;
var kill, killimg;
var kills;
var gameOver, gameOverImg;
var restart, restartImg;

function preload(){

    bg_img = loadImage("bg.jpg");
    man_img = loadImage("man.png");
    ar_img = loadImage("arrow.png");
    ar_img2 = loadImage("arrow2.png");
    obstacle1 = loadImage("obs1.png");
    obstacle2 = loadImage("obs2.png");
    obstacle3 = loadImage("obs3.png");
    zombie1 = loadImage("zomb.png");
    zombie2 = loadImage("zomb2.png");
    zombie3 = loadImage("zomb3.png");
    killimg = loadImage("kill.png");
    kill2img = loadImage("kill2.png"); 
    gameOverImg = loadImage("gameover.png");
    restartImg = loadImage("restart.png");
    cityimg = loadImage("city.jpg");
}


function setup(){

  createCanvas(1244, 580);
obstaclesGroup = createGroup();
ZombieGroup = createGroup();

man = createSprite(830, 300, 50, 50);
man.addImage(man_img);

ground = createSprite(200, 568, 7000, 20);
//ground.addImage(groundImage);
  ground.x = ground.width / 2;

  gameOver = createSprite(420, 200);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.25;

  restart = createSprite(420, 400);
  restart.addImage(restartImg);
  restart.scale = 0.5;

  man.setCollider("rectangle", 0, 0, 120, 150);
  man.debug = true;

  invisibleground = createSprite(200, 518, 7000, 20);
  invisibleground.visible = false;

  //city = createSprite(920, 578, 50, 50);
  //city.addImage(cityimg);
  
  kills = 0;

} 


function draw(){

    background(cityimg);


    text("KILLS: " + kills, 200, 50);

    if (gameState === PLAY) {

      gameOver.visible = false;
      restart.visible = false;
      
      if (ground.x < 0) {
        ground.x = ground.width / 2;
      }

      if (keyDown("space") && man.y >= 140) {
        man.velocityY = -9;
       }

       man.velocityY = man.velocityY + 0.8;


if(keyDown(LEFT_ARROW)){
  arrow2 = createSprite(750, 190, 50, 50);
  arrow2.addImage(ar_img2);
  arrow2.scale = 0.5;
  arrow2.velocityX = -6;
  arrow2.y = man.y
}

if (obstaclesGroup.isTouching(man)|| ZombieGroup.isTouching(man)) {
  gameState = END;
}

if(ZombieGroup.isTouching(arrow2)){
ZombieGroup.destroyEach();
arrow2.destroy();
kill = createSprite(400, 80, 20, 20);
kill.addImage(killimg);
kill.scale = 0.5;
kill.lifetime = 50;

kills = kills+2;
}


spawnObstacles();
spawnZombies();

} else if(gameState === END){
  gameOver.visible = true;
  restart.visible = true;

  ground.velocityX = 0;
  man.velocityY = 0

    if (mousePressedOver(restart)) {
      console.log("the Game is restarted");
      reset();
    }

    obstaclesGroup.setLifetimeEach(-1);
    ZombieGroup.setLifetimeEach(-1);
    obstaclesGroup.destroyEach();
    ZombieGroup.destroyEach();
    obstaclesGroup.setVelocityXEach(0);
    ZombieGroup.setVelocityXEach(0);
}

man.collide(invisibleground);

    drawSprites();
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  score = 0;
}

function spawnObstacles() {
  if (frameCount % 250 === 0) {
    var obstacle = createSprite(200, 558, 10, 40);
    obstacle.velocityX = 5
    //generate random obstacles
    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      default:
        break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.35;
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


function spawnZombies() {
  if (frameCount % 180 === 0) {
    var zombies = createSprite(100, 165, 10, 40);
    zombies.y = Math.round(random(100, 400))
    zombies.velocityX = 4
    
    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1:
        zombies.addImage(zombie3);
        break;
      case 2:
        zombies.addImage(zombie1);
        break;
      case 3:
        zombies.addImage(zombie2);
        break;
        default:
          break;
    }
   
    zombies.scale = 0.75;
    zombies.lifetime = 200;

    ZombieGroup.add(zombies);
  }
}




  