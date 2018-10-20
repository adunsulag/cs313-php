<?php

require_once './db.php';

require_once './endpoints/therapist.php';
require_once './endpoints/client.php';
require_once './endpoints/appointment.php';
require_once './endpoints/activitylog.php';
require_once './endpoints/systemuser.php';

// rather than do a REST api we will do just a simple RCP protocol
// with JSON format of {"action": "", "data": {/** ...payload... **/}}
class BadActionException extends InvalidArgumentException{}

function parse_request_from_method($method, $session) {
    $method = strtoupper($method);
    $request = ['action'=> 'none', 'data'=> []];

    // currently we only support post and get
    // sanitization of the individual data properties are handled in the various controller functions.
    if ($method == 'POST') {
        try {
            $data = file_get_contents('php://input');
            $json = json_decode($data, true);
            $request['action'] = !empty($json['action']) ? $json['action'] : 'none';
            $request['data'] = !empty($json['data']) ? $json['data'] : [];
        }
        catch (Exception $error) {
            error_log($error);
        }  
    }
    else if ($method == 'GET') {
        $request['data'] = !empty($_GET['data']) ? $_GET['data'] : $request;
        $request['action'] = !empty($_GET['action']) ? $_GET['action'] : $request;
        if (!empty($request['data'])) {
            try {
                $request['data'] = json_decode($request['data'], true);
            }
            catch (Exception $error) {
                error_log($error);
                $request['data'] = [];
            }
        }
    }
    
    $request['applicationSystemUserId'] = 1; // application system user id, only used in user authentication pieces...
    $request['session'] = $session;
    if ($session->systemUserId !== null) {
        $request['systemUserId'] = $session->systemUserId;
    }

    return $request;
}

function noop($data, $request) {
    return [];
}

function getActionMap() {
    $validActions = [];
    therapistAddEndpoints($validActions);
    clientAddEndpoints($validActions);
    appointmentAddEndpoints($validActions);
    activityLogAddEndpoints($validActions);
    systemUserAddEndpoints($validActions);
    return $validActions;
}
function isValidApiCall($action) {
    $actionMap = getActionMap();
    return !empty($actionMap[$action]);
}

function getController($action) {
    if (isValidApiCall($action)) {
        $actionMap = getActionMap();
        return $actionMap[$action];
    }
    throw new BadActionException("Invalid action $action specified");
}
