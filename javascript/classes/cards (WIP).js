/*
	Cards class
	
	Allows using many divs in one location

*/

var stylesheet = document.createElement("STYLE");
stylesheet.innerHTML = 
"@keyframes slideout_left {"+
"	from {right:0px;}"+
"	to {right:500px;}"+
"}"+
"@keyframes slidein_left {"+
"	from {right:500px;}"+
"	to {right:0px;}"+
"}"+
"@keyframes slideout_right {"+
"	from {left:0px;}"+
"	to {left:500px;}"+
"}"+
"@keyframes slidein_right {"+
"	from {left:500px;}"+
"	to {left:0px;}"+
"}"+
"@keyframes slideout_up {"+
"	from {bottom:0px;}"+
"	to {bottom:500px;}"+
"}"+
"@keyframes slidein_up {"+
"	from {bottom:500px;}"+
"	to {bottom:0px;}"+
"}"+
"@keyframes slideout_down {"+
"	from {top:0px;}"+
"	to {top:500px;}"+
"}"+
"@keyframes slidein_down {"+
"	from {top:500px;}"+
"	to {top:0px;}"+
"}";

document.head.appendChild(stylesheet);

var cardsCount = 0;
class Cards{
	constructor(parent,pages){
		this.parent = parent;
		this.pageset = {};
		
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
		
		this.styles = {};
		this.active = this.pageset[Object.keys(pages)[0]];
		Object.keys(this.pageset).forEach(function(pagekey){
			this.styles[pagekey] = {
				"active":"slidein_left 1s linear 0s",
				"inactive":"slideout_left 1s linear 0s"
			};
			this.pageset[pagekey].style.animation = this.styles[pagekey].active;
		},this);
	}
	
	setActive(page){
		var from = this.active;
		var to = this.pageset[page];
		
		from.style.animation = this.styles.inactive;
		to.style.animation = this.styles.active;
	}
}