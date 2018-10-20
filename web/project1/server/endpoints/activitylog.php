<?php

function activityLogAddEndpoints(array &$validActions) {
    $validActions['activitylog.list'] = 'listActivityLogs';
}

function listActivityLogs($data, $request) {

    $db = openDBConnection($request['systemUserId']);
    

    $results = [];
    $statement = 'select ActivityLog.creation_date as "date",table_name as "tableName", table_id as "tableID", action,notes,su.email as "systemUserEmail" 
        from ActivityLog JOIN SystemUser su ON ActivityLog.created_by = su.id ';

    if (!(empty($data['entity']) && empty($data['action']) && empty($data['entityID']))) {
        $entity = filter_var($data['entity'], FILTER_SANITIZE_STRING);
        $action = filter_var($data['action'], FILTER_SANITIZE_STRING);
        $entityID = filter_var($data['entityID'], FILTER_SANITIZE_NUMBER_INT);
        $statement .= 'WHERE 1=1 ';
        $preparedValues = [];
        if (!empty($entity)) {
            $statement .= 'AND table_name = :entity ';
            $preparedValues['entity'] = $entity;
        }
        if (!empty($action)) {
            $statement .= 'AND action = :action ';
            $preparedValues['action'] = $action;
        }
        if (!empty($entityID)) {
            $statement .= 'AND table_id = :table_id ';
            $preparedValues['table_id'] = $entityID;
        }
        $statement .= ' ORDER BY ActivityLog.creation_date DESC';
        error_log("Running $statement");
        $preparedStatement = $db->prepare($statement);
        $preparedStatement->execute($preparedValues);
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
}

 