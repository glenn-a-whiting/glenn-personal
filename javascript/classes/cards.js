/*
	Cards class
	
	Allows using many divs in one location

*/

var WIDTH = window.self.innerWidth;
var HEIGHT = window.self.innerHeight;

var stylesheet = document.createElement("STYLE");
stylesheet.innerHTML = 
".card{"+
"	position: absolute;"+
"	width: inherit;"+
"	height: inherit;"+
"}"+
".cardLeft{"+
"	left:0px;"+
"}"+
".cardRight{"+
"	right:0px;"+
"}"+
"cardUp{"+
"	top:0px;"+
"}"+
"cardDown{"+
"	down:0px;"+
"}"+
""+
"@keyframes slideout_left {"+
"	from {right:0px;}"+
"	to {right:"+WIDTH+"px;}"+
"}"+
"@keyframes slidein_left {"+
"	from {right:"+WIDTH+"px;}"+
"	to {right:0px;}"+
"}"+
"@keyframes slideout_right {"+
"	from {left:0px;}"+
"	to {left:"+WIDTH+"px;}"+
"}"+
"@keyframes slidein_right {"+
"	from {left:"+WIDTH+"px;}"+
"	to {left:0px;}"+
"}"+
"@keyframes slideout_up {"+
"	from {bottom:0px;}"+
"	to {bottom:"+HEIGHT+"px;}"+
"}"+
"@keyframes slidein_up {"+
"	from {bottom:"+HEIGHT+"px;}"+
"	to {bottom:0px;}"+
"}"+
"@keyframes slideout_down {"+
"	from {top:0px;}"+
"	to {top:"+HEIGHT+"px;}"+
"}"+
"@keyframes slidein_down {"+
"	from {top:"+HEIGHT+"px;}"+
"	to {top:0px;}"+
"}";

document.head.appendChild(stylesheet);

var cardsCount = 0;
class Cards{
	constructor(parent,pages,animation_direction="left"){
		this.parent = parent;
		this.pageset = {};
		//this.parent.style.position = "relative";
		
		// Pageset defines elements belonging to the Cards object.
		// : An object, with each key being either a number or string,
		// : and each value being an HTMLElement.
		
		if(pages instanceof Array){
			var index = 0;
			pages.forEach(function(p){
				if(p instanceof HTMLElement){
					this.pageset[index] = p;
				}
				else if(typeof p == "string"){
					if(p.startsWith(".")){
						let classElems = document.getElementsByClassName(p.substr(1));
						for(let i=0;i<classElems.length;i++){
							let e = classElems[i];
							if(e != this.parent) this.pageset[index+i] = e;
							index++;
						}
					}
					else if(p.startsWith("#")){
						let elem = document.getElementById(p.substr(1));
						if(elem != this.parent) this.pageset[index] = elem;
					}
					else{
						let elem = document.getElementById(p);
						if(elem != this.parent) this.pageset[index] = elem;
					}
				}
				index++;
			});
		}
		else if(pages instanceof HTMLElement){
			this.pageset[0] = pages;
		}
		else if(typeof pages == "string"){
			if(pages.startsWith(".")){
				let classElems = document.getElementsByClassName(pages.substr(1));
				for(let index=0;index < classElems.length;index++){
					let e = classElems[index];
					if(e != this.parent) this.pageset[index] = e;
				}
			}
			else if(pages.startsWith("#")){
				this.pageset[0] = document.getElementById(pages.substr(1));
			}
			else{
				this.pageset[0] = document.getElementById(pages);
			}
		}
		else if(pages instanceof Object){
			if(Object.keys(pages).length > 0){
				if(Object.keys(pages).every(function(k){return pages[k] instanceof HTMLElement;})){
					Object.keys(pages).forEach(function(pa,index){
						this.pageset[index] = pa;
					});
				}
				else{
					throw "all object values must be HTMLElements";
				}
			}
			else{
				throw "Given object must have a length greater than zero."
			}
		}
		else{
			throw "second parameter must be one of: <HTMLElement>, String, Array<<HTMLElement> | String>, Object{String:<HTMLElement>}"
		}
		
		this.styles;
		this.active = this.pageset[Object.keys(pages)[0]];
		Object.keys(this.pageset).forEach(function(pagekey){
			switch(animation_direction){
				case "left":
					this.styles = {
						"active":"slidein_left 1s ease-in-out 0s 1 normal forwards running",
						"inactive":"slideout_left 1s ease-in-out 0s 1 normal forwards running"
					};
					this.pageset[pagekey].setAttribute("class","card cardLeft");
					break;
				case "right":
					this.styles = {
						"active":"slidein_right 1s ease-in-out 0s 1 normal forwards running",
						"inactive":"slideout_right 1s ease-in-out 0s 1 normal forwards running"
					};
					this.pageset[pagekey].setAttribute("class","card cardRight");
					break;
				case "up":
					this.styles = {
						"active":"slidein_up 1s ease-in-out 0s 1 normal forwards running",
						"inactive":"slideout_up 1s ease-in-out 0s 1 normal forwards running"
					};
					this.pageset[pagekey].setAttribute("class","card cardUp");
					break;
				case "down":
					this.styles = {
						"active":"slidein_down 1s ease-in-out 0s 1 normal forwards running",
						"inactive":"slideout_down 1s ease-in-out 0s 1 normal forwards running"
					};
					this.pageset[pagekey].setAttribute("class","card cardDown");
					break;
				default:
					this.styles = {
						"active":"slidein_left 1s ease-in-out 0s 1 normal forwards running",
						"inactive":"slideout_left 1s ease-in-out 0s 1 normal forwards running"
					};
					this.pageset[pagekey].setAttribute("class","card cardLeft");
					throw "animation direction not one of (left, right, up, down), setting as left by default.";
					break;
			}
			this.pageset[pagekey].style.animation = this.styles.inactive;
		},this);
		this.active
	}
	
	setActive(page){
		this.active.style.animation = this.styles.inactive;
		this.pageset[page].style.animation = this.styles.active;
		this.active = this.pageset[page];
	}
}