var canvasWidth = 640;
var canvasHeight = 480;

var player = 0;
var playerX = 300;
var playerY = 100;
var sprHeight = 64;
var sprWidth = 64;
var speed = 5;
var monster = 0;
var monsterX = 300;
var monsterY = 300;
var projectiles;
var direction = 90;
var ghost = 0;
var ghostX = 100;
var ghostY = 100;
var score = 0;


function preload() {
  bgImg = loadImage("images/background.png");
  playerImg = loadImage("images/Person.gif");
  monsterImg = loadImage("images/goldfish.png");
  projectileImg = loadImage("images/arrow.gif");
  ghostImg = loadImage("images/pink.png");
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  player = createSprite(playerX, playerY, sprWidth, sprHeight);
  player.addImage(playerImg, "images/Person.gif");

  monster = createSprite(monsterX, monsterY, sprWidth, sprHeight);
  monster.addImage(monsterImg, "images/goldfish.png");

  ghost = createSprite(monsterX, monsterY, sprWidth, sprHeight);
  ghost.addImage(ghostImg, "images/pink.png");

  enemy = new Group();
  enemy.add(monster);
  enemy.add(ghost);

  projectiles = new Group();

  player.setCollider("rectangle", 0, 0, 40, 40);
  monster.setCollider("rectangle", 0, 0, 40, 40);
  ghost.setCollider("rectangle", 0, 0, 40, 40);
  for (var i = 0; i < 13; i++) {
    var ang = random(99);
    var px = canvasWidth / 2 + 10000 * ang;
    var py = canvasHeight / 2 + 10000 * ang;
    createEnemy(px, py);
  }

}


function playerControls() {
  if (keyIsDown(RIGHT_ARROW)) {
    player.position.x += speed;
    if (player.position.x + sprWidth / 2 > canvasWidth) {
      player.position.x = canvasWidth - sprWidth / 2;
    }3
  } else if (keyIsDown(LEFT_ARROW)) {
    player.position.x -= speed;
    if (player.position.x < 0 + sprWidth / 2) {
      player.position.x = 0 + sprWidth / 2;
    }
  } else if (keyIsDown(DOWN_ARROW)) {
    player.position.y += speed;
    if (player.position.y + sprHeight / 2 > canvasHeight) {
      player.position.y = canvasHeight - sprHeight / 2;
    }
  } else if (keyIsDown(UP_ARROW)) {
    player.position.y -= speed;
    if (player.position.y < 0 + sprHeight / 2) {
      player.position.y = 0 + sprHeight / 2;
    }
  }
}

function enemyMovements() {
  direction += 2;
  monster.setSpeed(3, direction)
}

function gameOver() {
  alert("😭NOOOO😭GAME OVER😭 Final Score: " + score);
  window.location.reload();
}

function collisions() {
  enemy.overlap(projectiles, destroyOther);
  player.collide(enemy, gameOver);
}

function destroyOther(destroyed, projectile) {
  destroyed.remove();
  projectiles.remove(projectile);
  score++;
}


function mousePressed() {
  var projectile = createSprite(player.position.x, player.position.y);
  projectile.addImage(projectileImg);
  projectile.attractionPoint(10 + speed, mouseX, mouseY);
  projectile.setCollider("rectangle", 0, 0, 40, 40);
  projectiles.add(projectile);
}

function createEnemy(x, y) {
  var newEnemy = createSprite(x, y);
  var purpleImg = loadImage("images/purple.png");
  newEnemy.addImage(purpleImg);
  newEnemy.setSpeed(1.5,random (360));
  newEnemy.setCollider("rectangle", 0, 0, 40, 40);
  enemy.add(newEnemy);

}



function draw() {
  background(bgImg);
  playerControls()
  collisions()
  enemyMovements()
  ghost.attractionPoint(0.2, player.position.x, player.position.y);
  ghost.maxSpeed = 1;
  

  for (var i = 0; i < enemy.length; i++) {
    var s = enemy[i];
    if (s.position.x < -40) s.position.x = canvasWidth + 40;
    if (s.position.x > canvasWidth + 40) s.position.x = -40;
    if (s.position.y < -40) s.position.y = canvasHeight + 40;
    if (s.position.y > canvasHeight + 40) s.position.y = -40;
  }
drawSprites();
  if (score >= 15) {
    alert(" 🤩 You Win!🤩 Final Score: " + score);
    score = 0;
    window.location.reload();
  }

}