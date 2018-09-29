<?php
require_once '../../vendor/autoload.php';

function load_twig_file($twig_name, $data) {
    $loader = new Twig_Loader_Filesystem( '../templates/');
    $twig = new Twig_Environment($loader);
    echo $twig->render($twig_name, $data);
}

function add_item_to_cart($itemId) {
    $itemId = (int)$itemId; // safecheck it
    $cart = get_shopping_cart();
    
    if (empty($cart[$itemId])) {
        $cart[$itemId] = 0;
    }
    $cart[$itemId] = $cart[$itemId] + 1;
    save_shopping_cart($cart);
}

function get_shopping_cart_item_count($cart) {
    $total = 0;
    foreach ($cart as $key => $value ) {
        if ($value && is_int($value)) {
            $total += $value;
        }
    }
    return $total;
}

function remove_item_from_cart($itemId) {
    $itemId = (int)$itemId; // safecheck it
    $cart = get_shopping_cart();
    
    if (empty($cart[$itemId])) {
        $cart[$itemId] = 0;
    }
    $cart[$itemId] = min([$cart[$itemId] - 1, 0]);
    if ($cart[$itemId] == 0) {
        unset($cart[$itemId]);
    }
    save_shopping_cart($cart);
}

function get_shopping_cart() {
    if (!empty($_SESSION['cart'])) {
        return $_SESSION['cart'];
    }
    return [];
}
function save_shopping_cart($cart) {
    $_SESSION['cart'] = $cart;
}

function get_cart_items() {
    $cart = get_shopping_cart();
    $items = load_store_items();
    $cart_items = [];
    foreach ($items as $item) {
        if (!empty($cart[$item->id])) {
            $item->count = $cart[$item->id];
            $item->total = $item->count * $item->price;
            $cart_items[] = $item;
        }
    }
    return $cart_items;
}

function get_cart_total($items) {
    $total = 0;
    if (!empty($items)) {
        foreach ($items as $item) {
            $total += $item->total;
        }
    }
    return $total;
}

function load_store_items() {
    $store_str = file_get_contents("./store.json");
    return json_decode($store_str);
}