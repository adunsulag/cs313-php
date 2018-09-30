<?php
require_once '../../vendor/autoload.php';

function load_twig_file($twig_name, $data) {
    $loader = new Twig_Loader_Filesystem( '../templates/');
    $twig = new Twig_Environment($loader);
    echo $twig->render($twig_name, $data);
}

function get_item($itemId) {
    $items = load_store_items();
    foreach ($items as $item) {
        if ($item->id == $itemId) {
            return $item;
        }
    }
    return null;
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

function set_cart_item_quantity($itemId, $quantity) {
    $quantity = (int)$quantity;
    $itemId = (int)$itemId; // safecheck it
    $cart = get_shopping_cart();
    
    if ($quantity == 0) {
        unset($cart[$itemId]);
    }
    else if (!empty($cart[$itemId])) {
        $cart[$itemId] = $quantity;
    }
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

function clear_item_from_cart($itemId) {
    $itemId = (int)$itemId; // safecheck it
    $cart = get_shopping_cart();
    if (!empty($cart[$itemId])) {
        unset($cart[$itemId]);
    }
    save_shopping_cart($cart);
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

function clear_shopping_cart() {
    save_shopping_cart([]);
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
    return get_items_from_cart($cart);
}

function get_items_from_cart($cart) {
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

/**
 * Checkout Functions
 */
function get_shipping_address_for_checkout() {
    $address = new stdClass();
    $address_fields = ['street1', 'street2', 'city', 'state', 'zipcode'];
    foreach ($address_fields as $field) {
        $address->$field = filter_input(INPUT_POST, $field, FILTER_SANITIZE_STRING);
        if ($address->$field == null) {
            $address->field = '';
        }
    }
    return $address;
}

function validate_shipping_address($address) {
    // TODO: stephen need to write the validation here...
    $errors = [];
    if (empty($address->street1)) {
        $errors[] = "Street 1 is required and must be filled out";
    }
    if (empty($address->city)) {
        $errors[] = "City is required and must be filled out";
    }
    if (empty($address->state)) {
        $errors[] = "State is required and must be filled out";
    }
    if (empty($address->zipcode)) {
        $errors[] = "Zipcode is required and must be filled out";
    }
    // @see https://gist.github.com/jefferyrdavis/5992282
    else if (!(preg_match('/^[0-9]{5}(-[0-9]{4})?$/', $address->zipcode))) {
        $errors[] = "Zipcode is invalid";
    }
    return $errors;
}

function finalize_checkout($cart, $address) {
    $id = uniqid();
    if (empty($_SESSION['confirmation'])) {
        $_SESSION['confirmation'] = [];
    }
    $_SESSION['confirmation'][$id] = ['cart' => $cart, 'address' => $address];
    clear_shopping_cart();
    return $id;
}

/** 
 * Confirmation Functions 
*/
function get_confirmation($id) {
    if (!empty($_SESSION['confirmation'][$id])) {
        return $_SESSION['confirmation'][$id];
    }
    return null;
}