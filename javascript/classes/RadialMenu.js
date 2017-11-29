/*
	Radial Menu class
	
	Displays a series of elements in a circular
	arrangement, with another element in the center.
	
	Radial menus can be rotated and expanded, using the
	rotate() and expand() methods.

*/

const fps = 60;
var RadialMenuArray = [];
function updateRadials(){
	for(let i = 0; i < RadialMenuArray.length; i++){
		RadialMenuArray[i].update();
	}
}

var pageCenter = {
	"x":window.self.innerWidth / 2,
	"y":window.self.innerHeight / 2
};

function getCenter(other){
	pageCenter = {
		"x":window.self.innerWidth / 2,
		"y":window.self.innerHeight / 2
	};
}

function centerOf(elem){
	return {
		"x": elem.clientWidth / 2,
		"y": elem.clientHeight / 2
	};
}

class RadialMenu{
	constructor(center,elems,parent,radius=150){
		this.center = center;
		this.parent = parent;
		this.elems = elems;
		this.radius = radius;
		this.rotationOffset = 0;
		this.parentMidpoint = centerOf(this.parent);
		this.count = elems.length;
		
		this.toggleRotation = false;
		this.rotatingInterval;
		this.rotatingAmount;
		this.remainingFrames = 0;
		
		this.toggleExpansion = false;
		this.expansionInterval;
		this.expansionAmount;
		this.remainingExpansionFrames = 0;
		
		for(let i = 0; i < this.count; i++){
			this.elems[i].style.position = "absolute";
			var elementWidth = this.elems[i].clientWidth;
			var elementHeight = this.elems[i].clientHeight;
			
			
			var point = {
				"x": this.parentMidpoint.x + Math.sin(2 * Math.PI / this.count * i) * this.radius,
				"y": this.parentMidpoint.y + Math.cos(2 * Math.PI / this.count * i) * this.radius
			};
			
			this.elems[i].style.left = Math.round(point.x - elementWidth / 2) + "px";
			this.elems[i].style.top = Math.round(point.y - elementHeight / 2) + "px";
			
			parent.appendChild(elems[i]);
		}
		
		this.center.style.position = "absolute";
		this.center.style.left = Math.round(this.parentMidpoint.x - this.center.clientWidth / 2) + "px";
		this.center.style.top = Math.round(this.parentMidpoint.y - this.center.clientHeight / 2) + "px";
		
		parent.appendChild(this.center);
		
		RadialMenuArray.push(this);
	}
	
	rotate(amount,time=1000,smooth=true){		
		if(typeof time == "boolean"){ //if time parameter is a boolean, then toggle rotation state.
			var frames = 1000 / fps;
			if(time === true && !this.toggleRotation){
				this.rotatingAmount = amount / frames;
				this.rotatingInterval = setInterval(function(self){
					self.rotationOffset += self.rotatingAmount;
					for(let i = 0; i < self.count; i++){
						var elementWidth = self.elems[i].clientWidth;
						var elementHeight = self.elems[i].clientHeight;
						var point = {
							"x": self.parentMidpoint.x + Math.sin(2 * Math.PI / self.count * i + self.rotationOffset) * self.radius,
							"y": self.parentMidpoint.y + Math.cos(2 * Math.PI / self.count * i + self.rotationOffset) * self.radius
						};
				
						self.elems[i].style.left = point.x - elementWidth / 2 + "px";
						self.elems[i].style.top = point.y - elementHeight / 2 + "px";
					}
				},1000/fps,this);
			}
			else if(time == false){
				clearInterval(this.rotatingInterval);
				this.toggleRotation = false;
			}
		}
		else{
			var frames = time / fps;
			if(this.remainingFrames === 0){
				this.remainingFrames = frames;
				this.rotatingAmount = amount / frames;
				this.rotatingInterval = setInterval(function(self){
					if(self.remainingFrames <= 0){
						clearInterval(self.rotatingInterval);
						self.rotatingAmount = undefined;
					}
					else{
						self.remainingFrames--;
						if (self.remainingFrames < 1 && self.remainingFrames > 0){
							self.rotationOffset += self.rotatingAmount * self.remainingFrames;
							self.remainingFrames = 0;
						}
						else{
							self.rotationOffset += self.rotatingAmount;
						}
						
						for(let i = 0; i < self.count; i++){
							
							var elementWidth = self.elems[i].clientWidth;
							var elementHeight = self.elems[i].clientHeight;
							
							var point = {
								"x": self.parentMidpoint.x + Math.sin(2 * Math.PI / self.count * i + self.rotationOffset) * self.radius,
								"y": self.parentMidpoint.y + Math.cos(2 * Math.PI / self.count * i + self.rotationOffset) * self.radius
							};
							
							self.elems[i].style.left = point.x - elementWidth / 2 + "px";
							self.elems[i].style.top = point.y - elementHeight / 2 + "px";
						}
					}
				},1000/fps,this);
			}
		}
	}
	
	expand(amount,time=1000){
		var frames = time / fps;
		if(this.remainingFrames === 0){
			this.remainingExpansionFrames = frames;
			this.expansionAmount = ( ( this.radius * amount ) - this.radius ) / frames;
			this.expansionInterval = setInterval(function(self){
				
				if(self.remainingExpansionFrames <= 0){
					clearInterval(self.expansionInterval);
					self.expansionAmount = undefined;
				}
				else{
					self.remainingExpansionFrames--;
					if (self.remainingExpansionFrames < 1 && self.remainingExpansionFrames > 0){
						self.radius += self.expansionAmount * self.remainingExpansionFrames;
						self.remainingExpansionFrames = 0;
					}
					else{
						self.radius += self.expansionAmount;
					}
					
					for(let i = 0; i < self.count; i++){
						
						var elementWidth = self.elems[i].clientWidth;
						var elementHeight = self.elems[i].clientHeight;
						
						var point = {
							"x": self.parentMidpoint.x + Math.sin(2 * Math.PI / self.count * i + self.rotationOffset) * self.radius,
							"y": self.parentMidpoint.y + Math.cos(2 * Math.PI / self.count * i + self.rotationOffset) * self.radius
						};
						
						self.elems[i].style.left = point.x - elementWidth / 2 + "px";
						self.elems[i].style.top = point.y - elementHeight / 2 + "px";
					}
				}
			},1000/fps,this);
		}
	}
	
	update(){
		this.parentMidpoint = centerOf(this.parent);
		for(let i = 0; i < this.count; i++){
			var elementWidth = this.elems[i].clientWidth;
			var elementHeight = this.elems[i].clientHeight;
			var point = {
				"x": this.parentMidpoint.x + Math.sin(2 * Math.PI / this.count * i + this.rotationOffset) * this.radius,
				"y": this.parentMidpoint.y + Math.cos(2 * Math.PI / this.count * i + this.rotationOffset) * this.radius
			};
			this.elems[i].style.left = Math.round(point.x - elementWidth / 2) + "px";
			this.elems[i].style.top = Math.round(point.y - elementHeight / 2) + "px";
		}
		
		this.center.style.left = Math.round(this.parentMidpoint.x - this.center.clientWidth / 2) + "px";
		this.center.style.top = Math.round(this.parentMidpoint.y - this.center.clientHeight / 2) + "px";
	}
	
	destroy(){
		
	}
}