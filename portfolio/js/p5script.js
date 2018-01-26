HTMLCollection.prototype.map = function(callback){
	for(var i = 0; i < this.length; i++){
		callback(this[i], i, this);
	}
}

var rate = 0.5;
var timing = "ease-in-out";

function hideSiblingsOf(elem,d){
	var e = document.getElementById(d);
	e.parentElement.children.map(function(sibling,index){
		sibling.style.animation = "opa_backwards "+rate+"s "+timing+" 0s 1 normal forwards";
	});
	e.style.animation = "opa_forwards "+rate+"s "+timing+" 0s 1 normal forwards";
}