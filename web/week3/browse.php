<?php

require_once 'functions.php';

session_start();

$action = filter_input(INPUT_POST, 'action', FILTER_SANITIZE_STRING);
switch ($action) {
    case 'add-cart': {
        $itemId = filter_input(INPUT_POST, 'item-add-id', FILTER_SANITIZE_NUMBER_INT);
        add_item_to_cart($itemId);
    };
    break;
}


$cart = get_shopping_cart();
$data = [
    "items" => load_store_items()
    ,"cartCount" => get_shopping_cart_item_count($cart)
];

load_twig_file('week3/browse.html.twig', $data);

?>