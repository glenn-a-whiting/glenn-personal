
// checks dimensional consistency of a multidimensional array
function isCuboid(arr,strict=false){ //strict = true cuboid - all dimensions are exactly equal; otherwise checks if dimensions are consistent
	var d = strict ? arr.length : [];
	
	function recurse(a,i=0){
		// mixed array & not array
		if(a.some(a2 => a2.constructor == Array) && a.some(a2 => a2.constructor != Array)){
			return false;
		}
		// all not arrays
		else if(a.every(a2 => a2.constructor != Array)){
			return true;
		}
		else{ // all arrays
			if(!strict) d.push(a[0].length);
			if(a.every(a2 => strict ? (a2.length == d) : (a2.length == d[i]))){
				return a.every(a2 => recurse(a2,i+1));
			}
			else{
				return false;
			}
		}
	}
	
	return recurse(arr);
}