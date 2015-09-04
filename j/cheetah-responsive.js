



/* Look for ad units and load them. */

function prepareAds() {

	var theIndex=0;
	
	$(".ad-unit-728").each( function() {
		var theID=$(this).attr("id");
		if (theID) {
			theIndex++;
			googletag.cmd.push(function() {
	    		googletag.defineSlot("/2994/ng.ngm/" + ( theIndex>1 ? "ng" + theIndex + "_" : "") + "climate-change", [[728, 90], [320, 50]], theID ).addService(googletag.pubads());
			    googletag.pubads().enableSingleRequest();
			    googletag.enableServices();
			    googletag.display(theID);
		  	});
		}
		
	});
	
	theIndex=0;
	
	$(".ad-unit-210").each( function() {
		var theID=$(this).attr("id");
		if (theID) {
			theIndex++;
			  googletag.cmd.push(function() {
	    		googletag.defineSlot("/2994/ng.ngm/" + ( theIndex>1 ? "ng" + theIndex + "_" : "") + "climate-change", [210, 50], theID ).addService(googletag.pubads());
			    googletag.pubads().enableSingleRequest();
			    googletag.enableServices();
			    googletag.display(theID);
			  });
		}
		
	});
	
	theIndex=0;
	
	$(".ad-unit-300").each( function() {
		var theID=$(this).attr("id");
		if (theID) {
			theIndex++;
			  googletag.cmd.push(function() {
	    		googletag.defineSlot("/2994/ng.ngm/" + ( theIndex>1 ? "ng" + theIndex + "_" : "") + "climate-change", [300, 250], theID ).addService(googletag.pubads());
			    googletag.pubads().enableSingleRequest();
			    googletag.enableServices();
			    googletag.display(theID);
			  });
		}
		
	});
	
}

/* Enable interactive, collapsible drawers. */

function prepareDrawers() {

	$("div.drawer div.header").not(".prepared").each(function() {
		$(this).click(
		function() {
			$(this).parent().toggleClass("closed");
			return false;
			} ) ;  
		$(this).addClass("prepared");
		} ) ;
	$("div.drawer").addClass("closed");
	$("div.drawer").first().removeClass("closed");
	

}


/* Allow for client-side includes. Usage:

<div class="include" data-include="/2015/11/promo-series-climate-change.html">

*/

function prepareIncludes() {
	
	$(".include").each(function(){ 
		
		$(this).load(
			$(this).data("include")
			).removeClass("include");
	});
		
}

$(document).ready(function() {
		
	/* Ad tools. */
	
	var googletag = googletag || {};
	googletag.cmd = googletag.cmd || [];
	(function() {
	  var gads = document.createElement('script');
	  gads.async = true;
	  gads.type = 'text/javascript';
	  var useSSL = 'https:' == document.location.protocol;
	  gads.src = (useSSL ? 'https:' : 'http:') +
	    '//www.googletagservices.com/tag/js/gpt.js';
	  var node = document.getElementsByTagName('script')[0];
	  node.parentNode.insertBefore(gads, node);
	})();
  
  
	prepareIncludes();
	prepareDrawers();
	prepareAds();

});
