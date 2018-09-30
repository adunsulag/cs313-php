<?php

require_once 'functions.php';

session_start();

$id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING);

$confirmation = get_confirmation($id);

// TODO: stephen need to handle if the id is missing... send them to 404
if ($confirmation == null) {
    die("Invalid request or your session has expired");
}
$items = get_items_from_cart($confirmation['cart']);
$data = [
    'items' => $items
    ,'cartTotal' => get_cart_total($items)
    ,'address' => $confirmation['address']
];

load_twig_file('week3/confirmation.html.twig', $data);
?>