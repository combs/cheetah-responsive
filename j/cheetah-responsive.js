


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
	

/* Look for ad units and load them. */

function prepareAds() {
 
	$(".ad-unit-728").not(".prepared").each( function(index) { 
		
		var self=this; 
		var theID=$(self).attr("id");
		if (theID && isElementInViewport ($(self).get(0) )) {
			
			googletag.cmd.push(function() {
	    		googletag.defineSlot("/2994/ng.ngm/" + ( index>1 ? "ng" + (index) + "_" : "") + "climate-change", [[728, 90], [320, 50]], theID ).addService(googletag.pubads());
			    googletag.pubads().enableSingleRequest();
			    googletag.pubads().collapseEmptyDivs();
			    googletag.enableServices();
			    googletag.display(theID);
			    $(self).addClass("prepared");
		  	});
		  	
		}
		
	}); 
	
	$(".ad-unit-210").not(".prepared").each( function(index) {
		
		var self=this; 
		var theID=$(self).attr("id");
		if (theID && isElementInViewport ($(self).get(0) )) {
			
			  googletag.cmd.push(function() {
	    		googletag.defineSlot("/2994/ng.ngm/" + ( index>1 ? "ng" + (index) + "_" : "") + "climate-change", [210, 50], theID ).addService(googletag.pubads());
			    googletag.pubads().enableSingleRequest();
			    googletag.pubads().collapseEmptyDivs();
			    googletag.enableServices();
			    googletag.display(theID);
			    $(self).addClass("prepared");
			  });
			  
		}
		
	});
	 
	$(".ad-unit-300").not(".prepared").each( function(index) {
		
		var self=this;
		var theID=$(self).attr("id");
		if (theID && isElementInViewport ($(self).get(0) )) { 
			
			  googletag.cmd.push(function() {
			  	index++;
	    		googletag.defineSlot("/2994/ng.ngm/" + ( index>1 ? "ng" + (index) + "_" : "") + "climate-change", [300, 250], theID ).addService(googletag.pubads());
			    googletag.pubads().enableSingleRequest();
			    googletag.pubads().collapseEmptyDivs();
			    googletag.enableServices();
			    googletag.display(theID);
			    $(self).addClass("prepared");
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

function prepareOverlay() {

	try {
		
		var overlayHere=$(".overlay-title-here");
		
		if (overlayHere) {
		
			overlayHere.append("<div class='overlay'>");
			$(".title").appendTo( $(".overlay").first() );
			overlayHere.removeClass("overlay-title-here");
			overlayHere.addClass("overlay-container");
			
		}
		
	} catch (err) {
		
	}	
	
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
		  
	prepareOverlay();
	prepareIncludes();
	prepareDrawers();
	prepareAds();
	
	$(window).scroll(prepareAds);

});
/* is element visible? in pure JS */

function isElementInViewport (el) {

	try{
		var rect = el.getBoundingClientRect();
		
		return (
			rect.top + (rect.height / 2 )  >= 0 &&
			rect.bottom - (rect.height / 2 )  <= (window.innerHeight || document.documentElement.clientHeight)
		);
	} catch (err) {
	
		return false;
	
	}

}
