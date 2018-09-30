<?php

require_once 'functions.php';

session_start();

$action = filter_input(INPUT_POST, 'action', FILTER_SANITIZE_STRING);
switch ($action) {
    case 'set-quantity': {
        $itemId = filter_input(INPUT_POST, 'item-id', FILTER_SANITIZE_NUMBER_INT);
        $quantity = filter_input(INPUT_POST, 'item-quantity', FILTER_SANITIZE_NUMBER_INT);
        set_cart_item_quantity($itemId, $quantity);
    };
    break;
    case 'remove-item': {
        $itemId = filter_input(INPUT_POST, 'item-id', FILTER_SANITIZE_NUMBER_INT);
        clear_item_from_cart($itemId);
    }
    break;
}


$items = get_cart_items();
$data = [
    'items' => get_cart_items()
    ,'cartTotal' => get_cart_total($items)
];
load_twig_file('week3/cart.html.twig', $data)

?>