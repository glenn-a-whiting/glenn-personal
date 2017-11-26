function pointInPolygon(points,point,callback){
	function quadrant(point,center,callback){
		var x = point.x < center.x;
		var y = point.y < center.y;
		
		switch(x){
			case true:
				switch(y){
					case true:
						callback(1);
						break;
					case false:
						callback(4);
						break;
				}
				break;
			case false:
				switch(y){
					case true:
						callback(2);
						break;
					case false:
						callback(3);
						break;
				}
		}
	}
	
	if(points.every(function(p){return (p instanceof Array && p.every(function(p2){return (p2 instanceof Number);}) && p.length == 2);})){
		var ray = {
			"north":0,
			"south":0,
			"east":0,
			"west":0
		};
		
		points.forEach(function(p,i){
			quadrant(points[i-1],point,function(q1){
				quadrant(points[i],point,function(q2){
					if(q1 != q2){ //When a line segment spans quadrants, determine which ray(s) would pass through it.
						var slope1 = (points[i-1].y - points[i].y) / (points[i-1].x - points[i].x); //Slope between points
						var slope2 = (points[i-1].y - point.y) / (points[i-1].x - point.x); //Slope between point and origin
						switch(q1){
							case 1:
								switch(q2){
									case 2:
										ray.north++;
										break;
									case 3:
										if (slope1 > slope2){
											ray.east++;
											ray.south++;
										}
										else if (slope1 < slope2){
											ray.north++;
											ray.west++;
										}
										else{
											ray.north++;
											ray.east++;
											ray.south++;
											ray.west++;
										}
										break;
									case 4:
										ray.east++;
										break;
								}
								break;
							case 2:
								switch(q2){
									case 1:
										ray.north++;
										break;
									case 3:
										ray.west++;
										break;
									case 4:
										if(slope1 > slope2){
											ray.north++;
											ray.east++;
										}
										else if(slope1 < slope2){
											ray.west++;
											ray.south++;
										}
										else{
											ray.north++;
											ray.east++;
											ray.south++;
											ray.west++;
										}
										break;
								}
								break;
							case 3:
								switch(q2){
									case 1:
										if(slope1 > slope2){
											west++;
											north++;
										}
										else if (slope1 < slope2){
											south++;
											east++;
										}
										else{
											ray.north++;
											ray.east++;
											ray.south++;
											ray.west++;
										}
										break;
									case 2:
										ray.west++;
										break;
									case 4:
										ray.south++;
										break;
								}
								break;
							case 4:
								switch(q2){
									case 1:
										ray.east++;
										break;
									case 2:
										if(slope1 > slope2){
											ray.south++;
											ray.west++;
										}
										else if (slope1 < slope2){
											ray.east++;
											ray.north++;
										}
										else{
											ray.north++;
											ray.east++;
											ray.south++;
											ray.west++;
										}
										break;
									case 3:
										ray.south++;
										break;
								}
								break;
						}
					}
				});
			});
		});
		callback((Object.keys(ray).some(function(key){
			return ray[key] % 2 == 1;
		})));
	}
	else{
		throw "pointInPolygon parameter 1 must be an array of coordinate pairs";
	}
}