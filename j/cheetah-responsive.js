
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

	$(".ad-unit-728").each( function() {
		var theID=$(this).attr("id");
		if (theID) {
		  googletag.cmd.push(function() {
    		googletag.defineSlot('/2994/ng.ngm/climate-change', [[728, 90], [320, 50]], theID ).addService(googletag.pubads());
		    googletag.pubads().enableSingleRequest();
		    googletag.enableServices();
		    googletag.display(theID);
		  });
		}
		
	});
	
	$(".ad-unit-210").each( function() {
		var theID=$(this).attr("id");
		if (theID) {
		  googletag.cmd.push(function() {
    		googletag.defineSlot('/2994/ng.ngm/climate-change', [210, 50], theID ).addService(googletag.pubads());
		    googletag.pubads().enableSingleRequest();
		    googletag.enableServices();
		    googletag.display(theID);
		  });
		}
		
	});
	
	$(".ad-unit-300").each( function() {
		var theID=$(this).attr("id");
		if (theID) {
		  googletag.cmd.push(function() {
    		googletag.defineSlot('/2994/ng.ngm/climate-change', [300, 250], theID ).addService(googletag.pubads());
		    googletag.pubads().enableSingleRequest();
		    googletag.enableServices();
		    googletag.display(theID);
		  });
		}
		
	});
	
}

function prepareDrawers() {

	$("div.drawer div.header").each(function() {
		$(this).click(
		function() {
			$(this).parent().toggleClass("closed");
			return false;
		} ) ;  } ) ;
	$("div.drawer").addClass("closed");
	$("div.drawer").first().removeClass("closed");
	

}

$(document).ready(function() {
	
	prepareDrawers();
	prepareAds();

});
