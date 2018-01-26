HTMLCollection.prototype.map = function(callback){
	for(var i = 0; i < this.length; i++){
		callback(this[i], i, this);
	}
};

function gid(s){
    return document.getElementById(s);
}

function generateFunctions(){
    document.getElementById("notSidebar").children.map(function(c,index){
        if(c.tagName == "DIV" && c.hasAttribute("script")){
            var script_name = c.getAttribute("script");
            var func = window[script_name];
            if(func){ // check if function with given name exists.
                var parameters = func.length; // get number of parameters
                var scr = "gid('p-"+index+"').innerHTML="+script_name+"(";
                
                var title = document.createElement("H2");
                title.innerHTML = script_name;
                c.appendChild(title);
                
                var desc = document.createElement("P");
                desc.innerHTML = "<i>"+c.getAttribute("desc")+"</i>";
                c.appendChild(desc);
                
                var format = [];
                if(c.hasAttribute("format")){
                    var f = c.getAttribute("format").split(",");
                    for(var i = 0; i < f.length; i++){
                        var s = {
                            "name":f[i].split(":")[0].trim(),
                            "type":f[i].split(":")[1].trim()
                        };
                        format.push(s);
                    }
                }
                
                for(var i = 0; i < parameters; i++){ // generate an input element for each parameter of function
                    var newinput = document.createElement("INPUT");
                    var j = index+"-"+i; //each input element is given a unique id, which will be referenced by the output button
                    scr += "gid('"+j+"').value,";
                    newinput.setAttribute("id",j);
                    if(format.length > 0){
                        switch(format[i].type){
                            case "string":
                                newinput.setAttribute("type","text");
                                newinput.setAttribute("placeholder",format[i].name);
                                break;
                            case "number":
                                newinput.setAttribute("type","number");
                                newinput.setAttribute("placeholder",format[i].name);
                                break;
                            case "boolean":
                                let l = document.createElement("LABEL");
                                l.innerHTML = " "+format[i].name;
                                c.appendChild(l);
                                newinput.setAttribute("type","checkbox");
                                break;
                            default:
                                newinput.setAttribute("type","text");
                                newinput.setAttribute("placeholder",format[i].name);
                                break;
                        }
                    }
                    else{
                        newinput.setAttribute("type","text");
                    }
                    
                    c.appendChild(newinput);
                }
                //result: onclick="gid('p-0').innerHTML=script_name(gid('0-0').value,gid('0-1').value,gid('0-2').value,gid('0-3').value)"
                
                scr = scr.substr(0,scr.length-1) + ")"; //remove trailing comma; append closing parenthesis
                var newp = document.createElement("P");
                var newbutton = document.createElement("BUTTON");
                
                newp.setAttribute("id","p-"+index);
                newbutton.innerHTML = "press";
                newbutton.setAttribute("onclick",scr);
                
                c.appendChild(newp);
                c.appendChild(newbutton);
            }
        }
    });
}

function echo(str){
    return str;
}

function capture(string,str1,str2){
	if(str1 != str2 && str1 !== undefined && str2 !== undefined){
		var str1_indices = [];
		var str2_indices = [];
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
			return result;
		}
		else{
		    //throw error in production
			return "Token count mismatch. \n'"+str1+"': "+String(str1_indices.length)+"\n'"+str2+"': "+String(str2_indices.length);
		}
	}
	else{
	    //throw error in production
		return "You must provide two different token characters";
	}
}

function sum(arr,callback){
    var total = 0;
    for(var i = 0; i < arr.length; i++){
        total += arr[i];
    }
    callback(total);
}

function extendedFibonacci(n,c=2,s=[]){
	function nextFib(arr,callback){
		var res = [];
		for(var i = 0; i < arr.length-1; i++){
			res.push(arr[i+1]);
		}
		sum(arr,function(t){
			res.push(t);
			callback(res);
		});
	}
	
	if(s.length === 0){
		for(var i = 0; i < c-1; i++){
			s.push(0);
		}
		s.push(1);
	}
	if(n === 0){
		sum(s,function(t){
			callback(t);
		});
	}
	else{
		nextFib(s,function(s2){
			return extendedFibonacci(n-1,c,s2);
		});
	}
}