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

`<link rel="stylesheet" href="https://fonts.ngeo.com/hoefler/1-0-1/hco_fonts.css">
<link rel="stylesheet" href="/dev/supercheetah/c/cheetah-responsive.min.css">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0, user-scalable=1">`

Now you can code it as usual.

### Adding Extra Images

### Adding Pull Quotes

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

* Also include these extra script tags (will be trimmed/concatenated soon):

  
		<script src="/dev/supercheetah/j/TweenLite.min.js"></script>
		<script src="/dev/supercheetah/j/CSSPlugin.min.js"></script>
		<script src="/dev/supercheetah/j/EasePack.min.js"></script> 
		<script src="/dev/supercheetah/j/SlideShow.min.js"></script>
		<script src="/dev/supercheetah/j/hammer.min.js"></script>    
		<script src="/dev/supercheetah/j/jquery.focuspoint.min.js"></script>    
		<script src="/dev/supercheetah/j/jquery.dfp.js"></script>    
		<script src="/dev/supercheetah/j/jquery.visible.min.js"></script>  
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

