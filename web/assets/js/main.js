$(document).ready(function() {
	$("#goSearchBtn").click(function(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		var search= $("#search").val() || "";
		search = search.replace(/\s/, '+');
		let newUrl = "http://www.google.com/search?q=site%3Ablooming-river-95663.herokuapp.com%20" + search;
		window.location.href= newUrl;
	});

});
