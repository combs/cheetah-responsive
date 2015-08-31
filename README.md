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
<link rel="stylesheet" href="/dev/supercheetah/c/cheetah-responsive.css">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0, user-scalable=1">`

## Advanced Usage

### Inline Galleries

We can include galleries using Joel Fiser's SlideShow.js (used in ISP projects). 

* Include these extra script tags:
	* coming soon!

* Add this code to the desired location--change the ID if you use more than one:

     
     	<div id="slideShow1Div" class="inlineSlideShow">
	
	    	<script>$(document).ready(
	 	   		function() {
	    	
	 		   		// Change this path to your JSON.
	    		
	    			var slideShow1 = new SlideShow("slideShow1Div", "/dev/supercheetah/i/examples/masks.json");
	    		
	   			} ) ;
	    	</script>
		</div>

	

### Embedded Autoplaying "Textural" Videos



### Additional Ads

