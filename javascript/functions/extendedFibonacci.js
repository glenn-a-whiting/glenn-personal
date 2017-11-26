function extendedFibonacci(n,callback,c=2,s=[]){
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
			extendedFibonacci(n-1,function(res){
				callback(res);
			},c,s2);
		});
	}
}