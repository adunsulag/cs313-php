<?php

require_once './db.php';
require_once './api.php';

$request = parse_request_from_method($_SERVER['REQUEST_METHOD']);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: accept, content-type, content-encoding, authorization");
header("Access-Control-Allow-Methods: POST,GET,DELETE,OPTIONS");
header("Access-Control-Allow-Credentials: true");

error_log(var_export($request, true));
try {
	$controller = getController($request['action']);
	$actionResult = $controller($request['data']);
	header("Status: 200");
	header("Content-Type: application/json'");
	echo json_encode($actionResult);
}
catch (BadActionException $ex) {
	header("Status: 400");
	header("Content-Type: application/json");
	echo json_encode(["error" => "Bad Request"]);
}
catch (Exception $error) {
	error_log($error);
	header("Status: 500");
	header("Content-Type: application/json");
	echo json_encode(["error" => "Server Error.  Check logs"]);
}
