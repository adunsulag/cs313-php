<?php
/**
 * This is the main application entry point.  It follows the front end controller design pattern
 * with requests being passed off to individual 'controllers' that correspond to the called action.
 */
require_once './db.php';
require_once './api.php';
require_once './session.php';
require_once './auth.php';

// generate all of our request information
$session =  serverLoadSession(); // get the session going here.
$request = parseRequestFromMethod($_SERVER['REQUEST_METHOD'], $session);

$origin = $_SERVER['HTTP_ORIGIN'];
// TODO: stephen setup an domain validator that allows the domains we want to do origin

// for now for testing purposes we just let everything in.
header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Headers: accept, content-type, content-encoding, authorization");
header("Access-Control-Allow-Methods: POST,GET,DELETE,OPTIONS");
header("Access-Control-Allow-Credentials: true");

error_log("*****REQUEST******");
error_log("Access-Control-Allow-Origin: $origin");
error_log(var_export($request, true));

try {
	if (shouldProcessRequest($request)) {
		checkIfCanPerformAction($request['action'], $request);
		$controller = getController($request['action']);
		$actionResult = call_user_func($controller, $request['data'], $request);
		error_log("*****RESPONSE******");
		serverSaveSession($request['session']);
		header("Content-Type: application/json'");
		echo json_encode($actionResult);
	}
	else {
		error_log("*****RESPONSE******");
		error_log("<empty> request skipped");
	}
	http_response_code(200);
	
}
catch (InvalidArgumentException $ex) {
	error_log($ex);
	$msg = "Bad Request. " . $ex->getMessage();
	error_log("*****RESPONSE******");
	error_log("400: {'error': '$msg'}");
	http_response_code(400);
	header("Content-Type: application/json");
	echo json_encode(["error" => "Bad Request"]);
}
catch (IllegalAccessException $ex) {
	error_log($ex);
	error_log("*****RESPONSE******");
	error_log("401: {'error': 'Invalid Access.  Must Authenticate.'}");
	http_response_code(401);
	header("Content-Type: application/json");
	echo json_encode(["error" => "Invalid Access.  Must Authenticate."]);
}
catch (BadActionException $ex) {
	error_log($ex);
	error_log("*****RESPONSE******");
	error_log("400: {'error': Bad Request'}");
	http_response_code(400);
	header("Content-Type: application/json");
	echo json_encode(["error" => "Bad Request"]);
}
catch (Exception $error) {
	error_log($error);
	error_log("*****RESPONSE******");
	error_log("500: {'error': Server Error. Check logs'}");
	http_response_code(500);
	header("Content-Type: application/json");
	echo json_encode(["error" => "Server Error.  Check logs"]);
}
