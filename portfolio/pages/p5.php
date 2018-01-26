<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8"/>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/p5.min.js"></script>
    	<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/addons/p5.dom.min.js"></script>
    	<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/addons/p5.sound.min.js"></script>
		<link rel="stylesheet" type="text/css" media="all" href="../stylesheet.css">
		<script src="../js/p5script.js"></script>
	</head>
	<body>
		<div id="banner" class="layout">
		</div>
		<div id="content" class="layout">
			<div id="sidebar">
				<ul>
					<li class="liButton"><a href="javascript.php">Javascript</a></li>
					<li class="liButton"><a href="p5.php">P5js</a></li>
				</ul>
			</div>
			<div id="notSidebar">
				<div id="topBar">
					<div id="horizontal">
						<ul>
							<li class="liButton" onclick="hideSiblingsOf(this,'page_1');">one</li>
							<li class="liButton" onclick="hideSiblingsOf(this,'page_2');">two</li>
							<li class="liButton" onclick="hideSiblingsOf(this,'page_3');">three</li>
						</ul>
					</div>
				</div>
				<div id="main" onload="hideSiblingsOf('page_1');">
					<div class="swappable" id="page_1"></div>
					<div class="swappable" id="page_2"></div>
					<div class="swappable" id="page_3"></div>
				</div>
			</div>
		</div>
		<div id="footer" class="layout">
		</div>
	</body>
</html>