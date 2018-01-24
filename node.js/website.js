const express = require("express");
const fs = require("fs");
const app = express();
const http = require("http");

var html = "";

var defaultSubstitutes = {
	"%1%":"<p>empty space</p>"
};

function replaceEach(str,obj,r){ //recurse: re-run replaceEach function. Use -1 to continue until no more replacements are made;
	var recurse = r === undefined ? 0 : r;
	var before = str;
	var keys = Object.keys(obj);
	if(recurse == -1 && keys.some(function(k){
		var v = obj[k];
		return v.indexOf(k) >= 0;
	})){
		throw "Infinite recursion warning! Substitute contains substring of replacee";
	}
	for(var i = 0; i < keys.length; i++){
		var val = obj[keys[i]];
		str = replaceAll(str,keys[i],String(val));
	}
	if(recurse == -1 && before != str)
		return replaceEach(str,obj,recurse);
	else if(recurse > 0)
		return replaceEach(str,obj,recurse-1);
	return str;
}

function replaceAll(str,a,b){
	var s = str.match(new RegExp(a,"g"));
	if(s !== null){
		var	l = s.length;
		for(var i = 0, index = 0; i < l; i++){
			str = str.substring(0,i) + str.substr(i).replace(a,b);
			index = str.indexOf(a,index);
		}
	}
	return str;
}

fs.readFile("website_body.html",function(err,htm){
	if (err) console.log(err);
	else html = String(htm);
});

app.get('/', function(req,res){
	res.send(replaceEach(html,defaultSubstitutes,-1));
});

app.get("/process_get",function(req,res){
	var s = {"%1%":"<p>"+req.query.firstName+"<br>"+req.query.lastName+"</p>"};
	res.send(replaceEach(html,s));
});

var server = app.listen(process.env.PORT,function(){
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("Example app listening at http://", process.env.IP, port);
});