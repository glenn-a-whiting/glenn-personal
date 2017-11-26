function setup() { 
  createCanvas(500, 500);
  worldSize = 5; //World size in meters
  gravity = -9.86; //Gravity in meters/second^2 (moon = -1.6)
  size = 0.1; //Ball size in meters
  fps = 60; //Framerate
  frameRate(fps);
  startingHeight = 50.0
  x = width/2;
  y = height-startingHeight;
  velocity = 0.0;
  floor = height;
  buildingPos = 10.0;
  buildingHeight = 800;
  buildingWidth = 20;
} 

function draw() {
  background(220);
  
  if(keyIsDown(UP_ARROW)){
    worldSize *= 1.1;
    y = height-(height-y)/1.1;
  }
  else if(keyIsDown(DOWN_ARROW)){
    worldSize /= 1.1;
    y = height-(height-y)*1.1;
  }
  
  if (y < floor){
  	y += velocity/fps*(height/worldSize);
    velocity -= gravity/fps;
  }
  else {
    velocity = 0.0;
    y = floor;
  }
  ellipse(x,y-(size*(height/worldSize))/2,(size*(height/worldSize)));
  rect(buildingPos,height - buildingHeight*(height/worldSize),-buildingWidth*(height/worldSize),buildingHeight*(height/worldSize));
  document.getElementById("world_size").innerHTML = "World size: "+worldSize.toFixed(2)+"m<br/>Ball height: "+((height-y)*(worldSize/height)).toFixed(2)+"m<br/>Velocity: " + abs(velocity).toFixed(2) + "m/s";
}
var power = 5;
function mousePressed(){
  velocity = -power;
  y -= 1;
  redraw();
}

function keyPressed(){
  if(key == " "){
  	velocity = -power;
  	y -= 1;
  	redraw();
  }
}
