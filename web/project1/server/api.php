<?php

// rather than do a REST api we will do just a simple RCP protocol
// with JSON format of {"action": "", "data": {/** ...payload... **/}}
class BadActionException extends InvalidArgumentException{}

function parse_request_from_method($method) {
    $method = strtoupper($method);
    $request = ['action'=> 'none', 'data'=> []];

    // currently we only support post and get
    // sanitization of the individual data properties are handled in the various controller functions.
    if ($method == 'POST') {
        $request = !empty($_POST['data']) ? $_POST['data'] : $request;
        $request['action'] = !empty($_POST['action']) ? $_POST['action'] : $request;
    }
    else if ($method == 'GET') {
        $request['data'] = !empty($_GET['data']) ? $_GET['data'] : $request;
        $request['action'] = !empty($_GET['action']) ? $_GET['action'] : $request;
    }

    return $request;


}
function listClients($request) {
    return [
        [
            'id' => 1
            ,'name' => 'John'
        ],
        [
            'id' => 1
            ,'name' => 'Jason'
        ]
    ];
}

function listActivityLogs($request) {
    return [
        [
            'id' => 1
            ,'tableName' => 'Client'
            ,'tableID' => 1
            ,'action' => 'SELECT'
            ,'notes' => 'Client was viewed'
            ,'systemUserName' => 'Stephen Nielson'
        ]
    ];
}

function listTherapists($request) {
    return [
        [
            'id' => 1
            ,'name' => 'John'
        ],
        [
            'id' => 1
            ,'name' => 'Jason'
        ]
    ];
}

function getClients($request) {
    return [];
}

function postClients($request) {
    return [];
}

function noop($request) {
    return [];
}
    
function getActionMap() {
    $validActions = [
        "clients.list" => listClients
        ,"clients.get" => getClients
        ,"clients.post"=> postClients
        ,"therapists.list"=> listTherapists
        ,"therapists.get"=> noop
        ,"therapists.post"=> noop
        ,"activitylog.list"=> listActivityLogs
    ];
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
