<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<!-- For internal use. -->
<meta name="author" content="mangosango, aka Sang Jin Lee" /> 
<meta name="resource-type" content="document" /> 
<meta name="distribution" content="global" /> 
<meta name="rating" content="general" /> 
<meta name="robots" content="no-index" /> <!-- change this -->
<meta name="copyright" content="Copyright 2011 Sang Jin Lee, mangosango"> 

<!-- LOAD @FONTFACE FONTS -->
<link href="font/LeagueGothic/stylesheet.css" rel="stylesheet" type="text/css" />

<!-- LOAD CSS STYLES -->
<link rel="stylesheet" href="css/reset.css" />
<link rel="stylesheet" href="css/text.css" />
<link rel="stylesheet" href="css/960.css" />
<link rel="stylesheet" href="css/style.css"/>
<link type="text/css" href="css/cupertino/jquery-ui-1.8.16.custom.css" rel="stylesheet" />	

<!--css3-mediaqueries-js - http://code.google.com/p/css3-mediaqueries-js/ - Enables media queries in some unsupported browsers-->
<script type="text/javascript" src="js/css3-mediaqueries.js"></script>

<!-- LOAD JQUERY LIBRARIES -->
<script type="text/javascript" src="js/jquery-1.6.2.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.16.custom.min.js"></script>
<script type="text/javascript" src="js/jquery.cycle.all.js"></script>
<!-- LOAD DOCUMENT.LOAD FUNCTIONS -->
<script type="text/javascript" src="js/onLoad.js"></script>

<title>The Dartmouth D-Planner | Tutorial</title>

</head>

<body>

<?php include('includes/navbar.html'); ?>

<div id="welcome_1" class="" style="min-height: 70%;">
	<div class="container_12">
    	<div align="center" class="grid_12" style="padding-bottom: 20px;">
        	<span id="slideshowTitle" class="league" style="font-size: 48px;">Tutorial<br /></span>
        </div>
    	<div id="slideshowContainer" class="grid_12 ui-corner-all" style="background: #fff; height: 510px; border: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 50px;">
        	<div style="padding: 30px 30px 75px 30px;"><!-- PADDING HACK FOR JQUERY CYCLE -->
                <div id="welcomeInnerText">
                    <div class="slideshowInner" style="width: 860px;">
                        <h1 align="center">Part 1 - The White Box<br /><img src="img/tut_1.jpg" width="600" height="280" alt="tut_1" /></h1>
                        <p align="center">This is a <strong>white box</strong>. The terms in this box will count for your VISA requirement.</p>
                    </div>
                    
                    <div class="slideshowInner" style="width: 860px;">
                        <h1 align="center">Part 2 - The Black Box<br /><img src="img/tut_2.jpg" width="600" height="280" alt="tut_1" /></h1>
                        <p align="center">This is a <strong>black box</strong>. The terms in this box do not count for your VISA requirement.</p>
                    </div>
                    
                    <div class="slideshowInner" style="width: 860px;">
                        <h1 align="center">Part 3 - Your Goal<br /><img src="img/tut_3.jpg" alt="tut_2" width="800" height="300" class="ui-corner-all" style="margin-top: 10px;" /></h1>
                        <p align="center">Your goal is to have <strong>one term</strong> from the black box for every <strong>three terms</strong> from the white box.</p>
                    </div>
                    
                    <div class="slideshowInner" style="width: 860px;">
                        <h1 align="center">Part 4 - Your Goal<br /><img src="img/tut_4.jpg" alt="tut_2" width="800" height="300" class="ui-corner-all" style="margin-top: 10px;" /></h1>
                        <p align="center"><strong>However</strong>, it is <strong>ok</strong> for you to violate your VISA requirements. So feel free to play around!</p>
                    </div>
                    
                    <div class="slideshowInner" style="width: 860px;">
                        <h1 align="center">Part 5 - Drag and Drop!<br /><img src="img/tut_5.jpg" width="800" height="300" class="ui-corner-all" style="margin-top: 10px;" /></h1>
                        <p align="center">To move items from the boxes onto the grid, just drag and drop - it's that simple.</p>
                    </div>
                    
                    <div class="slideshowInner" style="width: 860px;">
                        <h1 align="center">Part 6 - Clearing Rows<br /><img src="img/tut_8.jpg" width="800" height="300" class="ui-corner-all" style="margin-top: 10px;" /></h1>
                        <p align="center">Want to delete an entire year? Just click "Clear Row" and watch the magic happen!</p>
                    </div>
                    
                    <div class="slideshowInner" style="width: 860px;">
                        <h1 align="center">Part 6 - Explore!<br /><img src="img/tut_7.jpg" width="800" height="300" class="ui-corner-all" style="margin-top: 10px;" /></h1>
                        <p align="center">Don't be afraid to explore and try new things!<br /><br /><a class="indexBtn ui-corner-all" href="grid.php" style="line-height: 40px;">Get Started</a></p><br />
                    </div>
                    
                </div>
                <div id="navBtns"><a href="#" class="back">Back</a><a href="#" class="next">Next</a></div>
            </div>
        </div>
        <?php include('includes/footer.html') ?>
    </div>
</div>
</body>
</html>