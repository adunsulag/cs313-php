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
    case 'remove-cart': {
        $itemId = filter_input(INPUT_POST, 'item-add-id', FILTER_SANITIZE_NUMBER_INT);
        remove_item_from_cart($itemId);
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