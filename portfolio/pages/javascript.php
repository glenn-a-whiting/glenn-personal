<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8"/>
		<link rel="stylesheet" type="text/css" media="all" href="../stylesheet.css">
		<script src="../js/javascripts.js"></script>
		<style>
			.script {
				background-color: lightgrey;
				margin: 0px 15px;
			}
		</style>
	</head>
	<body onload="generateFunctions()">
		<div id="banner" class="layout bordered">
		</div>
		<div id="content" class="layout">
			<div id="sidebar" class="bordered">
				<ul>
					<li class="liButton"><a href="javascript.php">Javascript</a></li>
					<li class="liButton"><a href="p5.php">P5js</a></li>
				</ul>
			</div>
			<div id="notSidebar" class="bordered">
				<div class="script" script="echo" format="str:string" desc="print out what is input"></div>
				<div class="script" script="capture" format="str:string, token1:string, token2:string" desc="return array of substrings where substring has token1 on left, and token2 on right."></div>
				<div class="script" script="extendedFibonacci" format="a:number, b:number" desc="fibonacci sequence"></div>
			</div>
		</div>
		<div id="footer" class="layout bordered">
		</div>
	</body>
</html>