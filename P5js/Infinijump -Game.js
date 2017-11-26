// Note for marker:
// As this code is quite long, I have included comments with 'rubric' 
// to indicate lines or sections which satifiy rubric requirements.
// Ctrl-F search for 'rubric' to quickly jump through the code.



var objects = { // Game entities are store here
  "Entity": [], // rubric (Array)
  "Enemy": [],
  "Powerup": [],
  "Background": []
}

// Game entities are also stored here
// Chunks are used to reduce collision-detection computation
var chunks = []; //rubric (Array)

var imgs;

var weather;

function preload() {
  // rubric (Visual design)
  // A set of sprite sheets are used for
  // visually outstanding animated images
  imgs = {
    "bird": {
      "sprite": loadImage("sprites/bird.png"),
      "cols": 5,
      "rows": 4,
      "minus": 0,
      "height": 100,
      "width": 100
    },
    "cloud": {
      "sprite": loadImage("cloud.png"),
      "cols": 1,
      "rows": 1,
      "minus": 0,
      "height": 200,
      "width": 200
    },
    "plane": {
      "sprite": loadImage("airplane.png"),
      "cols": 2,
      "rows": 2,
      "minus": 0,
      "height": 200,
      "width": 200
    },
    "saucer": {
      "sprite": loadImage("saucer.png"),
      "cols": 3,
      "rows": 3,
      "minus": 1,
      "height": 50,
      "width": 200
    },
    "rocket": {
      "sprite": loadImage("Rocket.png"),
      "cols": 11,
      "rows": 11,
      "minus": 1,
      "height": 50,
      "width": 50
    },
    "shield": {
      "sprite": loadImage("shieldSprite.png"),
      "cols": 11,
      "rows": 11,
      "minus": 1,
      "height": 50,
      "width": 50
    },
    "parachute": {
      "sprite": loadImage("parachute.png"),
      "cols": 11,
      "rows": 11,
      "minus": 1,
      "height": 50,
      "width": 50
    }
  };
  
  var api = "cae3766c3e5c3f033de81a35adb2bef3";
  var url = "https://api.openweathermap.org/data/2.5/forecast?id=2148928&appid="+api;
  weather = loadJSON(url);
  print("Loaded images.");
  print("If 'Loading...' persists, check spelling of image urls.");
}

function setup() {
  createCanvas(800, 800);
  frame = 0;
  gravity = 9.81;
  fps = 60;
  frameRate(fps);
  chunkSize = 500;
  debugText = "";
  debug = false;
  score = 0; //rubric (Scoring)
  highScore = 0;
  win = false;

  camera = {
    "x": 0,
    "y": 0
  }
  player = {
    "x": width / 2,
    "y": height - 50,
    "size": 20,
    "velocity": 0,
    "invincible": false, //If player dies, they fall all the way back to the bottom.
    "powerup": "",
    "timeLeft": 0, //Power time remaining
    "timeMax": 300, //Powerup time limit
    "color": "white"
  }

  // rubric (for loop)
  // Instantiates game entities.
  for (let i = 0; i < 150; i++) {
    let spawnY = -i * 250 + height/2;
    for (let j = 1; j <= 2; j++) {
      let spawnX = random(width); // rubric (Randomness)
      if (!floor(random(0, 5))) { // 1/4 chance of generating a powerup
        switch (floor(random(1, 4))) { //pick a powerup at random
          case 1:
            objects.Entity.push(new Parachute(spawnX, spawnY));
            break;
          case 2:
            objects.Entity.push(new Rocket(spawnX, spawnY));
            break;
          case 3:
            objects.Entity.push(new Shield(spawnX, spawnY));
            break;
        }
      } else {
        if (i < 50) {
          objects.Entity.push(new Bird(spawnX, spawnY));
        } else if (i < 100) {
          objects.Entity.push(new Plane(spawnX, spawnY));
        } else if (i < 150) {
          objects.Entity.push(new Saucer(spawnX, spawnY));
        }
      }
    }
  }

  for (let i = 0; i < 500; i++) {
    let spawnY = -i * 50 + height/2;
    objects.Entity.push(new Cloud(random(width), spawnY, random(3,10)));
  }
}

// rubric (Animation)
// Fetches animation frame from spritesheet
function getFrame(sprite, frame, positionX, positionY, imgWidth, imgHeight) {
  f = frame % ((sprite.cols * sprite.rows) - sprite.minus); //modulo frame number to avoid errors
  c = f % sprite.cols; //column of spritesheet
  r = floor(f / sprite.cols); //row of spritesheet
  spriteX = (sprite.sprite.width / sprite.cols) * c; //Y-value of top-left of selection
  spriteY = (sprite.sprite.height / sprite.rows) * r; //X-value of top-left of selection
  spriteWidth = (sprite.sprite.width / sprite.cols); //width of selection
  spriteHeight = (sprite.sprite.height / sprite.rows); //width of selection

  // rubric (Drawing images)
  // This line is used to draw all images
  image(sprite.sprite, positionX, positionY, imgWidth, imgHeight, spriteX, spriteY, spriteWidth, spriteHeight);
}

function scaleRect(x1, y1, x2, y2, scale) {
  x3 = x1 + (((x1 + x2) / 2) - x1) * (1 - scale);
  y3 = y1 + (((y1 + y2) / 2) - y1) * (1 - scale);
  x4 = x2 + (((x1 + x2) / 2) - x2) * (1 - scale);
  y4 = y2 + (((y1 + y2) / 2) - y2) * (1 - scale);
  return [x3, y3, x4, y4];
}

// rubric (Complexity)
// this game implements a class hierarchy 
// with inheritance and overriding 
// of properties and methods
class Entity {
  constructor(px, py, speed, hbs, heigh, widt, sprite, name) {
    this.x = px;                                        //world X position
    this.y = py;                                        //world Y position
    this.speed = speed;                                 //horizontal movement per frame
    this.h = heigh;                                     //image and hitbox height
    this.w = widt;                                      //image and hitbox width
    this.hitboxShape = hbs;                             //hitbox shape (circle or square)
    this.sprite = sprite;                               //entity's spritesheet
    this.spriteSpeed = 1.0;                             //sprite animation speed tweak (1.0 = matches game (60 fps))
    this.name = name;                                   //debug display name
    this.r = 0;                                         //image rotation in radians
    this.chunk = floor((height - this.y) / chunkSize);  //residing chunk
    this.depth = false;                                 //paralax distance if any
    this.hitboxScale = 1.0;                             //tweak hitbox size (1.0 = same as image)
    this.showHitbox = false;                             //display hitbox (debugging)
    this.debug = false;                                 //display debugging information

    if (chunks[this.chunk] == undefined)
      chunks[this.chunk] = [];
    chunks[this.chunk].push(this);
  }

  // rubric (Collision detection)
  // All entities inherit the isHit() method
  isHit(px, py) {
    //return false; //administrative anti-collision
    let flag = false;
    switch (this.hitboxShape) {
      case "circle":
        flag = dist(px - camera.x, py - camera.y, this.x, this.y) < (this.h * this.hitboxScale / 2 + player.size);
        break;
      case "square":
        let sr = scaleRect(this.x - (this.w / 2), this.y - (this.h / 2), this.x + (this.w / 2), this.y + (this.h / 2), this.hitboxScale);
        let r = {
          "x1": sr[0],
          "y1": sr[1],
          "x2": sr[2],
          "y2": sr[3]
        }
        flag = (px > r.x1 + camera.x && px < r.x2 + camera.x && py > r.y1 + camera.y && py < r.y2 + camera.y);
        break;
    }

    return player.invincible ? false : flag;
  }

  display(f) {
    let d = (this.depth) ? (this.y - (this.h / 2)) + ((1 / this.depth) * camera.y) : this.y - (this.h / 2);
    translate(this.x + this.w / 2, this.y + this.h / 2);
    rotate(this.r);
    translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
    getFrame(this.sprite, floor(f * this.spriteSpeed), this.x - (this.w / 2), d, this.w, this.h);
    if (this.showHitbox) {
      switch (this.hitboxShape) {
        case "square":
          noFill();
          let sr = scaleRect(this.x - (this.w / 2), this.y - (this.h / 2), this.x + (this.w / 2), this.y + (this.h / 2), this.hitboxScale);
          let r = {
            "x": sr[0],
            "y": sr[1],
            "w": sr[2] - sr[0],
            "h": sr[3] - sr[1]
          }
          //rect(this.x-(this.w/2),this.y-(this.h/2),this.w,this.h);
          rect(r.x, r.y, r.w, r.h);
          break;
        case "circle":
          noFill();
          ellipse(this.x, this.y, this.w * this.hitboxScale, this.h * this.hitboxScale);
          break;
      }
    }
    if (this.debug) {
      fill(0);
      textAlign(LEFT, TOP);
      let txt = "location: " + this.x + ", " + this.y;
      txt += "\nrotation: " + this.r;
      txt += "\nchunk: " + floor((height - this.y) / chunkSize);
      txt += "\nhitboxShape: " + this.hitboxShape;
      text(txt, this.x, this.y);
    }

    translate(this.x + this.w / 2, this.y + this.h / 2);
    rotate(-this.r);
    translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
  }

  // deletes object from both the chunk array 
  // and the object array, preventing it from being
  // rendered or considered in collision detection
  destroy() {
    // rubric (for loop)
    for (let i in objects.Entity) {
      if (objects.Entity[i] == this) { // rubric (if statement)
        objects.Entity.splice(i, 1);
      }
    }
    // rubric (for loop)
    for (let i in chunks[this.chunk]) {
      if (chunks[this.chunk][i] == this) { // rubric (if statement)
        chunks[this.chunk].splice(i, 1);
      }
    }
  }

  action() {}
}

class Enemy extends Entity {
  constructor(px, py, speed, heigh, widt, sprite, name) {
    super(px, py, speed, "square", heigh, widt, sprite, name);
    objects.Enemy.push(this);
  }

  action() {
    if (player.powerup != "shield") { // rubric (if statement)
      player.invincible = true;
      player.timeLeft = 0;
      player.powerup = "";
    } else {
      player.timeLeft -= 10;
    }
  }
}

class Powerup extends Entity {
  constructor(px, py, speed, sprite, name) {
    super(px, py, speed, "circle", 50, 50, sprite, name);
    this.hitboxScale = 1.0;
    objects.Powerup.push(this);
  }

  destroy() {
    // rubric (for loop)
    for (let i in objects.Entity) {
      if (objects.Entity[i] == this) { // rubric (if statement)
        objects.Entity.splice(i, 1);
      }
    }
    for (let i in objects.Powerup) {
      if (objects.Powerup[i] == this) { // rubric (if statement)
        objects.Powerup.splice(i, 1);
      }
    }
    // rubric (for loop)
    for (let i in chunks[this.chunk]) {
      if (chunks[this.chunk][i] == this) { // rubric (if statement)
        chunks[this.chunk].splice(i, 1);
      }
    }
  }
}

class Background extends Entity { //Background sprites have a null hitbox shape, so they will fail any collision test
  constructor(px, py, depth, speed, heigh, widt, sprite, name) {
    super(px, py, speed, null, heigh, widt, sprite, name);
    this.depth = depth; //used to perform paralax motion
    objects.Background.push(this);
  }
}

class Bird extends Enemy {
  constructor(px, py) {
    super(px, py, -2, imgs.bird.height, imgs.bird.width, imgs.bird, "Bird");
    this.spriteSpeed = 0.5;
    this.hitboxScale = 0.5;
  }
}

class Plane extends Enemy {
  constructor(px, py) {
    super(px, py, -2, imgs.plane.height, imgs.plane.width, imgs.plane, "Plane");
    this.hitboxScale = 0.5;
  }
}

class Saucer extends Enemy {
  constructor(px, py) {
    super(px, py, -2, imgs.saucer.height, imgs.saucer.width, imgs.saucer, "Saucer");
    this.spriteSpeed = 0.2;
  }
}

class Rocket extends Powerup {
  constructor(px, py) {
    super(px, py, -3, imgs.rocket, "Rocket Powerup");
  }

  action() {
    player.powerup = "rocket";
    player.timeLeft = player.timeMax;
    this.destroy();
  }
}

class Parachute extends Powerup {
  constructor(px, py) {
    super(px, py, -3, imgs.parachute, "Parachute Powerup");
  }

  action() {
    player.powerup = "parachute";
    player.timeLeft = player.timeMax;
    this.destroy();
  }
}

class Shield extends Powerup {
  constructor(px, py) {
    super(px, py, -3, imgs.shield, "Shield Powerup");
  }

  action() {
    player.powerup = "shield";
    player.timeLeft = player.timeMax;
    this.destroy();
  }
}

class Cloud extends Background {
  constructor(px, py, pd = 3) {
    // rubric (Weather)
    // cloud horizontal speed is taken from current wind speed.
    super(px, py, pd, weather.list[0].wind.speed, 60, 100, imgs.cloud, "Cloud");
  }
}

function playerControl() {
  
  // rubric (Interactivity)
  if (((mouseIsPressed && mouseButton == LEFT) || (keyIsPressed && keyIsDown(32))) && !player.invincible && player.powerup == "rocket"){
    player.velocity = 10;
    player.timeLeft -= 3;
  }
  
  if (player.velocity <= -1 && player.powerup == "parachute") { // rubric (if statement)
    player.velocity = -1;
    player.timeLeft--;
  } 
  else {
    player.velocity -= gravity / fps;
  }
  
  if (player.y >= height - player.size / 2) //update player position
    player.y = height - player.size / 2;
  else
  	player.y -= player.velocity;

  if ((height - player.y) + camera.y > score && !player.invincible) { //update scores
    score = floor((height - player.y) + camera.y);
    if (score > highScore) { // rubric (if statement)
      highScore = score;
    }
  }

  // if player is higher than 38000, game is won
  if (((height - player.y) + camera.y) > 38000) {
    player.invincible = true;
    win = true;
  }

  // rubric (if statement)
  if (player.timeLeft <= 0) { //remove powerup if bar is empty
    player.powerup = "";
  }
}

// Moves camera.
function cameraControl() {
  if (player.y < height / 5) { //North border detection
    camera.y += player.velocity;
    player.y += player.velocity;
  }
  if (player.y > height - (height / 5) && camera.y > 0) { //South border detection
    camera.y += player.velocity;
    player.y += player.velocity;
  }
}

// Evaluates entity collisions
function hitDetection() { //rubric (Collision)
  debugText = "collision: ";
  let playerchunk = floor(((height - player.y) + camera.y) / chunkSize);
  let c = [] //chunks to evaluate

  // rubric (for loop)
  for (let i = (playerchunk / 2) + (abs(playerchunk / 2)); i <= playerchunk + 1; i++) { //avoids attempts to evaluate chunk -1 (out of range)
    c.push(chunks[i]);
  }

  // rubric (Complexity)
  //In order to improve performance, entities are subdivided into chunks.
  //Collision evaluation is performed only on entites in the same chunk, or
  //neighboring chunks as the player. Neighboring chunks are included to account
  //for the player sometimes existing between chunks.

  for (let i in c) { // rubric (for loop)
    if (c[i] != undefined) { // a chunk with no objects is undefined in array
      for (let j in c[i]) { // so we don't need to evaluate it
        let e = c[i][j];

        // rubric (Collision Detection)
        if (e.isHit(player.x, player.y)) {
          e.action(); //If collision is detected, call entity's action() method
          debugText += e.name;
        }
      }
    }
  }

  // text printed when debugging
  debugText += "\nplayer chunk: " + playerchunk;
  debugText += "\n(relative) player.y: " + player.y.toFixed(2);
  debugText += "\n(absolute) player.y: " + ((height - player.y) + camera.y).toFixed(2);
  debugText += "\ncamera.y: " + camera.y.toFixed(2);
}

// Moves entities across screen
function entityControl() {
  for (let i in objects.Entity) { // rubric (for loop)
    let e = objects.Entity[i];
    let s = e.depth ? 1 / e.depth : 1;
    e.x += e.speed * s; //translate entity

    // Make entites loop from one 
    // side of the screen to the other.
    if (e.x < -e.w / 2) // rubric (if statement)
      e.x = width + e.w / 2;
    if (e.x > width + e.w / 2)
      e.x = -e.w / 2;
  }
}

// Draws powerup charge bar
function headsUpDisplay() {
  textSize(20);
  fill(0);
  textAlign(RIGHT, TOP);
  if (debug)
    text(debugText, width, 0);

  //draw charge bar outline
  let barwidth = 200;
  noFill();
  rect(20, 20, barwidth, 20);

  let barText = "";
  //powerup charge bar
  switch (player.powerup) { // rubric (Colour)
    case "shield":
      fill("lightblue");
      barText = "shield";
      break;
    case "rocket":
      fill("orange");
      barText = "rocket";
      break;
    case "parachute":
      barText = "parachute";
      fill("white");
      break;
    default:
      noFill();
      break;
  }

  // rubric (Drawing shapes)
  // draws rectangular powerup bar
  rect(20, 20, (barwidth / player.timeMax) * player.timeLeft, 20);
  textAlign(LEFT, TOP);
  fill(0);
  textSize(15);
  text(barText, 30, 20);
}

function render() { //TODO: render background objects before all others
  translate(camera.x, camera.y); //offset objects by camera location
  for (let i in objects.Enemy) {
    objects.Enemy[i].display(frame);
  }
  for (let i in objects.Powerup) {
    objects.Powerup[i].display(frame);
  }
  translate(-camera.x, -camera.y); //un-offset when drawing player.
  if (player.invincible) { // rubric (if statement)
    fill("black");
    textSize(50);
    textAlign(CENTER, BOTTOM);
    if (win) {
      text("Game Won!", width / 2, height / 2);
      fill("lime");
    } else {
      text("Game over", width / 2, height / 2); // rubric (Text)
      textSize(30);
      textAlign(CENTER, TOP);
      text("Score: " + score + "\nHigh score: " + highScore, width / 2, height / 2);
      fill("red");
    }
  } else {
    fill(player.color);
  }

  // rubric (Drawing shapes);
  ellipse(player.x, player.y, player.size);
}

function backgrounds() {
  for (let i in objects.Background) {
    objects.Background[i].display();
  }
}

function keyPressed(){
  if (player.y >= height - player.size / 2 && key == " ") { //update player position
    player.y = height - player.size / 2;
    player.invincible = false;
    score = 0;
  }
  if (!player.invincible && key == " ") {
    if (player.y >= height - player.size/2) // rubric (if statement)
      player.y -= player.size/2;
    player.velocity = 5;
  }
}

function mousePressed(){
  if (player.y >= height - player.size / 2 && mouseButton == LEFT) { //update player position
    player.y = height - player.size / 2;
    player.invincible = false;
    score = 0;
  }
  if (!player.invincible && mouseButton == LEFT) {
    if (player.y >= height - player.size/2) // rubric (if statement)
      player.y -= player.size/2;
    player.velocity = 5;
  }
}

function draw() {
  background("#7ec0ee");
  playerControl();
  backgrounds();
  hitDetection();
  headsUpDisplay();
  entityControl();
  cameraControl();
  render();
  frame++;
}