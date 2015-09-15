


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

	var theOverlayHeres=document.getElementsByClassName("overlay-title-here");
	
	if (theOverlayHeres) {
		
		var theOverlayHere=theOverlayHeres[0];
		var theTitles=document.getElementsByClassName("title");
		var theOverlay=document.createElement("div");
		theOverlayHere.appendChild(theOverlay);
		addClass(theOverlay,"overlay");
		
		if (theTitles && theTitles.length) {
			
			// NodeLists rearrange as you change the DOM so we start at the end and work backwards
				
			for (var i=theTitles.length - 1; i >= 0; i-- ) { 
				
				// more gymnastics
			
				theOverlay.insertBefore(theTitles[i],theOverlay.firstChild);
				
			}
		
		}
		
		addClass(theOverlayHere,"overlay-container");
		removeClass(theOverlayHere,"overlay-title-here");
		
	}
	 	
}

/* Allow for client-side includes. Usage:

<div class="include" data-include="/2015/11/promo-series-climate-change.html">

*/

function prepareIncludes() {
	
	$(".include").each(function(){ 
		
		$(this).load(
			$(this).data("include")
			).removeClass("include").data("include","");
	});
		
}

$(document).ready(function() {
		  
	prepareOverlay();
	prepareIncludes();
	prepareDrawers();
	prepareAds();
function prepareSlideShows() {
	
	$(window).scroll(prepareAds);

});
	if (! window.ourSlideShows) {
		return;
	}
	
	var theIDs=ourSlideShows.keys();
	
	for (var i=0; i<theIDs.length; i++) {
		new SlideShow(theIDs[i],ourSlideShows[theIDs[i]]);
	}
	
}

	
/* 

http://jaketrent.com/post/addremove-classes-raw-javascript/

*/

function hasClass(ele,cls) {

	if (ele.className) {

	  return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));

	} else {

		return false;

	}

}

function addClass(ele,cls) {
	
	if (ele.className) {
		
	  if (!hasClass(ele,cls)) ele.className += " "+cls;

	} else {
		
		ele.className=cls;
	
	}
	
}

function removeClass(ele,cls) {
	
	if (ele.className) {
		
		if (hasClass(ele,cls)) {
		   var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		   ele.className=ele.className.replace(reg,' ');
	  	}
	  	 
  	} else {
  	
	  	return;
  	
	}
	
}

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
