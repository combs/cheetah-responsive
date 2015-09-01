
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

});
