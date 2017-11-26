function fibonnaci(iter, callback, a = 0, b = 1) {
	iter--;
	if (iter > 0) {
		fibonnaci(iter,function(res){
			callback(res);
		},a+b,a);
	} else {
		callback(a + b);
	}
}

fibonnaci(10, function(res) {
	console.log(res);
});
