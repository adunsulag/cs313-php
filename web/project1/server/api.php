<?php

require_once './db.php';

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
    if (!empty($request['data'])) {
        try {
            $request['data'] = json_decode($request['data'], true);
        }
        catch (Exception $error) {
            error_log($error);
            $request['data'] = [];
        }
    }

    // TODO: stephen when we implement the Amazon cognito piece we will change this hardcoded value
    $request['systemUserId'] = 1;

    return $request;


}
function listClients($data, $request) {

    $db = openDBConnection($request['systemUserId']);

    $results = [];
    $statement = 'select id,name from Client ORDER BY name';
    $records = $db->query($statement);
    while ($row = $records->fetch(PDO::FETCH_ASSOC)) {
        $results[] = $row;
    }
    $db = null; // unset it so we close the connection
    return $results;
}

function listActivityLogs($data, $request) {

    $db = openDBConnection($request['systemUserId']);
    

    $results = [];
    $statement = 'select ActivityLog.creation_date as "date",table_name as "tableName", table_id as "tableID", action,notes,su.email as "systemUserEmail" 
        from ActivityLog JOIN SystemUser su ON ActivityLog.created_by = su.id ';

    if (!empty($data['entity'])) {
        $entity = filter_var($data['entity'], FILTER_SANITIZE_STRING);
        $statement .= 'WHERE table_name = :entity';
        $statement .= ' ORDER BY ActivityLog.creation_date DESC';
        error_log("Running $statement");
        $preparedStatement = $db->prepare($statement);
        $preparedStatement->execute([":entity" => $entity]);
        // so we can use the same code to fetch the rows.
        $records = $preparedStatement;
    }
    else {
        $statement .= ' ORDER BY ActivityLog.creation_date DESC';
        error_log("Running $statement");
        $records = $db->query($statement);
    }
        
   
    while ($row = $records->fetch(PDO::FETCH_ASSOC)) {
        $results[] = $row;
    }
    $db = null; // unset it so we close the connection
    return $results;
    return [
        [
            'id' => 1
            ,'tableName' => 'Client'
            ,'tableID' => 1
            ,'action' => 'SELECT'
            ,'notes' => 'Client was viewed'
            ,'systemUserEmail' => 'Stephen Nielson'
        ]
    ];
}

function listTherapists($data, $request) {
    $db = openDBConnection($request['systemUserId']);

    $results = [];
    $statement = 'select id,name from Therapist ORDER BY name';
    $records = $db->query($statement);
    while ($row = $records->fetch(PDO::FETCH_ASSOC)) {
        $results[] = $row;
    }
    $db = null; // unset it so we close the connection
    return $results;
}

function getClients($data, $request) {
    return [];
}

function postClients($data, $request) {
    return [];
}

function noop($data, $request) {
    return [];
}
    
function getActionMap() {
    $validActions = [
        "clients.list" => 'listClients'
        ,"clients.get" => 'getClients'
        ,"clients.post"=> 'postClients'
        ,"therapists.list"=> 'listTherapists'
        ,"therapists.get"=> 'noop'
        ,"therapists.post"=> 'noop'
        ,"activitylog.list"=> 'listActivityLogs'
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
