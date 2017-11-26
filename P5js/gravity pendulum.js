class Ball{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.mx = 0;
    this.my = 0;
    this.color = 0;
  }
  
  move(){
    var npi = 0; //nearest planet index
    var nbi = 0; //nearest ball index
    
   	for(let i = 0; i < planets.length; i++){
      if(dist(planets[i].x,planets[i].y,this.x,this.y) < dist(planets[npi].x,planets[npi].y,this.x,this.y)){
        npi = i;
      }
    }
    
    for(let i = 0, b = balls[i]; i < balls.length; i++, b = balls[i]){
      if(b != this && dist(balls[i].x,balls[i].y,this.x,this.y) < dist(balls[nbi].x,balls[nbi].y,this.x,this.y)){
        nbi = i;
      }
    }
    
    var obj = planets[npi];
    var angle = atan2(obj.y-this.y,obj.x-this.x);
    
    this.mx += cos(angle);
    this.my += sin(angle);
    
    this.x += this.mx;
    this.y += this.my;
    
    this.color += 1;
    
    if(frameCount % 1 == 0){
      
      ellipse(this.x,this.y,5);
      stroke((this.color/10) % 360,255,255);
    	line(this.x,this.y,obj.x,obj.y);
      stroke("black");
    }
  }
}

function setup() { 
  createCanvas(800, 800);
  colorMode(HSB);
  c1 = width/4;
  c2 = width - width/4;
  c3 = height/4;
  c4 = height - height/4;
  planets = [];
  balls = [];
  c = 0;
  for(let i=0;i<5;i++)planets.push({"x":random(c1,c2),"y":random(c3,c4)});
} 

function draw() { 
  background(220);
  
  balls.forEach(function(b){b.move()});
  for(var i = 0; i < planets.length; i++){
    ellipse(planets[i].x,planets[i].y,20);
  }
  
  if(mouseIsPressed && frameCount % 5 == 0)balls.push(new Ball(mouseX,mouseY));
}

//function mousePressed(){
//  balls.push(new Ball(mouseX,mouseY));
//}