// Find and extract substring between two given token characters. Return list of strings

function capture(string,str1,str2,callback){
	if(str1 != str2 && str1 !== undefined && str2 !== undefined){
		str1_indices = [];
		str2_indices = [];
		for(var i=0,offset=0;i<string.length;i++){
			if(string.substr(i,str1.length) == str1){
				if(offset === 0)
					str1_indices.push(i+str1.length-1);
				offset++;
			}
			if(string.substr(i,str2.length) == str2){
				offset--;
				if(offset === 0)
					str2_indices.push(i);
			}
		}
		if(str1_indices.length == str2_indices.length){
			var result = [];
			for(var s1 = 0, s2 = 0; s1 < str1_indices.length && s2 < str2_indices.length; s1++, s2++){
				result.push(string.substring(str1_indices[s1]+1,str2_indices[s2]));
			}
			if(callback)
				callback(result);
			else
				return result;
		}
		else{
			throw new Error("Token count mismatch. \n'"+str1+"': "+String(str1_indices.length)+"\n'"+str2+"': "+String(str2_indices.length));
		}
	}
	else{
		throw new Error("You must provide two different token characters");
	}
}