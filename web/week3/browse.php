<?php

require_once 'functions.php';

session_start();

$action = filter_input(INPUT_POST, 'action', FILTER_SANITIZE_STRING);
$addedItem = null;
switch ($action) {
    case 'add-cart': {
        $itemId = filter_input(INPUT_POST, 'item-add-id', FILTER_SANITIZE_NUMBER_INT);
        add_item_to_cart($itemId);
        $addedItem = get_item($itemId);
    };
    break;
}


$cart = get_shopping_cart();
$data = [
    "items" => load_store_items()
    ,"cartCount" => get_shopping_cart_item_count($cart)
    ,"addedItem" => $addedItem
];

load_twig_file('week3/browse.html.twig', $data);

?>