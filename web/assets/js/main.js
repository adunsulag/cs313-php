$(document).ready(function() {
	$("#goSearchBtn").click(function(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		var search= $("#search").val() || "";
		search = search.replace(/\s/, '+');
		let newUrl = "http://www.google.com/search?q=site%3Ablooming-river-95663.herokuapp.com%20" + search;
		window.location.href= newUrl;
	});

	$(".week3.form-shop .addToCart").click(function (event) {
		event.stopPropagation();
		var button = $(this);
		var itemId = $(this).data("item");
		$("#item-add-id").val(itemId);
		button.closest("form").submit();
	});
	$(".week3.form-cart .setQuantity").click(function (event) {
		event.stopPropagation();
		var button = $(this);
		var itemId = $(this).data("item");
		var quantity = $("#quantity-" + itemId).val();
		$("#item-id").val(itemId);
		$("#item-quantity").val(quantity);
		$("#form-action").val("set-quantity");
		button.closest("form").submit();
	});
	$(".week3.form-cart .removeItem").click(function (event) {
		event.stopPropagation();
		var button = $(this);
		var itemId = $(this).data("item");
		$("#item-id").val(itemId);
		$("#form-action").val("remove-item");
		button.closest("form").submit();
	});
});
