$(document).ready(function() {

	/** The amount of time in miliseconds that the fade animation should take **/
	var fadeTimeDelay = 1500;

	$("#action").click(function() {
		alert('Clicked!');
	});
	$("#actionChangeColor").click(function() {
		var color = $("#color").val() || "";
		if (color.trim() == "") {
			alert("Enter in a color to change");
			return;
		}
		
		$("#div1").css('background-color', color);
	});
	$("#actionFade").click(function() {
		$("#div3").fadeOut(fadeTimeDelay);
	});
	$("#actionDisplay").click(function() {
		$("#div3").fadeIn(fadeTimeDelay);
	});
});
