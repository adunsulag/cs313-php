document.getElementById('action').addEventListener('click', function() {
	alert('Clicked!');
});

document.getElementById('actionChangeColor').addEventListener('click', function() {
	var color = document.getElementById('color').value || "";
	if (color.trim() == "") {
		alert("Enter in a color to change");
		return;
	}
	var div1 = document.getElementById('div1');
	div1.style['background-color'] = color;
});
