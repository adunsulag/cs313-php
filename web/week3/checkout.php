<?php

require_once 'functions.php';

session_start();

$action = filter_input(INPUT_POST, 'action', FILTER_SANITIZE_STRING);
$address = get_shipping_address_for_checkout();
$errors = [];
switch ($action) {
    case 'checkout': {
        $itemId = filter_input(INPUT_POST, 'item-add-id', FILTER_SANITIZE_NUMBER_INT);
        $errors = validate_shipping_address($address);
        if (empty($errors)) {
            $cart = get_shopping_cart();
            $confirmation_id = finalize_checkout($cart, $address);
            header("Location: confirmation.php?id=$confirmation_id");
            exit;
        }
    };
    break;
}

$items = get_cart_items();
$data = [
    'cartTotal' => get_cart_total($items)
    ,'items' => $items
    ,'errors' => $errors
    ,'address' => $address
];

load_twig_file('week3/checkout.html.twig', $data)

?>