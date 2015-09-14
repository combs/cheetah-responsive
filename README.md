# cheetah-responsive

[Jira ticket.
](https://jira.nationalgeographic.com/browse/DP-501
)
## Repository Directory

* c/ - CSS 
* i/ - Images (for examples, gallery icons)
* j/ - JavaScript

## Build/Deploy Requirements

* SASS interpreter, such as the Mac app Koala
* Upload access to NGM Static server - this lives in /dev/supercheetah/

## Usage Instructions

Add this code to your Cheetah article's data XML:

	<link rel="stylesheet" href="https://fonts.ngeo.com/hoefler/1-0-1/hco_fonts.css">
	<link rel="stylesheet" href="/dev/supercheetah/c/cheetah-responsive.min.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0, user-scalable=1">
	<script src="/dev/supercheetah/j/picturefill.min.js"></script>

Now you can code it as usual.

### Adding Extra Images

Use this code to add each picture to your article:

	<div class="photo width-text">

		<img class="lazyload" 
		srcset="img/image1_2048.jpg 2048w, img/image1_1024.jpg 1024w, img/image1_640.jpg 640w" 
		src="img/image1_640.jpg" 
		alt="Picture of TK TK TK">

		<div class="caption">Caption TK 
			<span class="credit">Photograph by TK</span>
		</div>
		
	</div>

You can change the dimensions of the image versions--just make sure it is updated throughout the code.


### Adding Pull Quotes


	<div class="width-wider quote">"It’s a project for a generation, it’s going to take till 2040 or 2050, and it’s hard."</div>


### Adding Contributors' Notes

	<p class="bio">"I'm so happy to be a contributor," said a contributor. "And that this story is built in literally the most beautiful webpage I've ever seen."</p>

### Size Options for Media Elements

* width-inset: a small inset.
* width-text: the width of the text well.
* width-wider: a little wider than the text well.
* width-full: a very large image.
* width-cinematic: edge-to-edge.


## Advanced Usage

### Inline Galleries

We can include galleries using Joel Fiser's SlideShow.js (used in ISP projects). 

* Include jQuery at the very top:

		<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>

* Also include these extra tags (will be trimmed/concatenated soon):

		<script src="/dev/supercheetah/j/TweenLite.min.js"></script>
		<script src="/dev/supercheetah/j/CSSPlugin.min.js"></script>
		<script src="/dev/supercheetah/j/EasePack.min.js"></script>
		<script src="/dev/supercheetah/j/hammer.min.js"></script>    
		<script>
		function buildGalleries() {
			var slideShow1 = new SlideShow("slideShow1Div", "/dev/supercheetah/i/examples/masks.json");
		}
		function defer() {
		    if (window.jQuery) {
        		window.jQuery.getScript("/dev/supercheetah/j/jquery.focuspoint.min.js");
				window.jQuery.getScript("/dev/supercheetah/j/jquery.dfp.min.js");
				window.jQuery.getScript("/dev/supercheetah/j/cheetah-responsive.min.js");
				window.jQuery.getScript("/dev/supercheetah/j/SlideShow.min.js",buildGalleries);
			    
			} else {
		        setTimeout(defer, 50);
			}
		}
		defer();
		</script>
		<script src="/dev/supercheetah/j/Draggable.min.js"></script>    
		<script src="/dev/supercheetah/j/blockadblock.min.js"></script>    
		<link rel="stylesheet" href="/dev/supercheetah/c/inlineSlideShow.min.css" type="text/css" media="screen" />


* Add this code to the desired location--change the ID in both places from "slideShow1Div" if you use more than one:

     
     	<div id="slideShow1Div" class="inlineSlideShow">
	
	    	<script>$(document).ready(
	 	   		function() {
	    	
	 		   		// Change this path to your JSON.
	    		
	    			var slideShow1 = new SlideShow("slideShow1Div", "/dev/supercheetah/i/examples/masks.json");
	    		
	   			} ) ;
	    	</script>
		</div>

	

### Embedded Autoplaying "Textural" Videos

* Include jQuery at the very top:

		<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
		
* Also include this script:

		<script src="//assets.nationalgeographic.com/modules-video/build/video.min.js"></script>
		
* At the desired point in your story, add the code:

			<div class="width-cinematic video">
				<div id="inlinePlayer01" class="inline ngs-video"
				    data-instance="inlinePlayer01"
				    data-type="textural"
				    data-guid="1d27f0cf-8b5b-44eb-865f-3093e64643ca"
				    data-account="2423130747">
				</div>
			</div>
			
* Change the GUID to thePlatform's GUID for your video.


### Additional Ads

	<!-- /2994/ng.ngm/climate-change -->
	<div id='div-gpt-ad-1441209663586-0' class="adunit ad-unit-728">
	</div>

	
	
	

### Removing the Leaderboard

In the package config XML, replace the ad block with:

		<object type="ad">
			<height>90</height>
			<width>728</width>
			<label>0</label>
			<adfile>/ads/ngmLeader-remover.html</adfile>
		</object>
		
		
### Promo Tiles

	<a href="/link/">
		<div class="promo-tile box">
				<img src="/2015/11/promo-images/img/06-motorcycle-repair-2048.jpg"> <div>
				<h5>Promote the Channel</h5>
				<p>Here is the descriptive text for promoting the Explorer site for the Channel.</p>
		</div>
	</div></a>
		
### Promo Drawers


* Include jQuery at the very top:

		<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
		
* Also include this script:

		<script src="/dev/supercheetah/j/supercheetah.min.js"></script>

* Add this code where you want the box to appear:

		<div class="promo-series box-yellow width-box float-right include" data-include="/2015/11/promo-series-climate-change.html" />



### Promo Stack

			<div class="promo-content">
				<h5>More From the Climate Change Special Issue</h5>

				<img src="/2015/09/chameleons/img/chameleons-graphic-160.jpg" />
				<a href="/">Gallery: Click here for really cool ish</a>
				<p>This is descriptive text telling the visitor how cool and what ish is in the extra cool ish link and how it is going to change their lives immeasurably if they only click on the link.</p>

				<hr/>

				<img src="/2015/09/chameleons/img/chameleons-graphic-160.jpg" />
				<a href="/">Gallery: Click here for really cool ish</a>
				<p >This is descriptive text telling the visitor how cool and what ish is in the extra cool ish link and how it is going to change their lives immeasurably if they only click on the link.</p>

				<hr/>

				<h6>Still More Climate Change Ish: Can You Believe That Ish?</h6>

				<a href="/">Gallery: Click here for really cool ish</a>
				<p>This is descriptive text telling the visitor how cool and what ish is in the extra cool ish link and how it is going to change their lives immeasurably if they only click on the link.</p>

				<a href="/">Gallery: Click here for really cool ish</a>
				<p>This is descriptive text telling the visitor how cool and what ish is in the extra cool ish link and how it is going to change their lives immeasurably if they only click on the link.</p>

				<a href="/">Gallery: Click here for really cool ish</a>
				<p>This is descriptive text telling the visitor how cool and what ish is in the extra cool ish link and how it is going to change their lives immeasurably if they only click on the link.</p>
			</div>
			
			
			
### Cinematic Introductions

Make a photo container per usual, and add class `overlay-title-here`. 

			<div class="width-full photo overlay-title-here">
				<img src="/2015/11/germany/img/01-windmills-990.jpg" alt="Picture of an abandoned nuclear power plant" style="">
			</div> 
			
Anything with the class `.title` will be moved to a `.overlay` div inside it after page load.
