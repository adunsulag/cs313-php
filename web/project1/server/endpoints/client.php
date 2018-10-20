
<?php
function clientAddEndpoints(array &$validActions) {
    $validActions['clients.list'] = 'listClients';
    $validActions['clients.get'] = 'getClient';
}

function listClients($data, $request) {

    $db = openDBConnection($request['systemUserId']);

    $results = [];
    $statement = 'select id,name from Client ORDER BY name';
    $results = getArrayFromQuery($statement, [], $db);;
    if (!empty($results)) {
        $recordIds = array_map(function($record) { return $record['id']; }, $results);
        logSelectActivity($recordIds, 'Client', $db);
    }
    $db = null; // unset it so we close the connection
    return $results;
}

function getClient($data, $request) {
    $db = openDBConnection($request['systemUserId']);
    if (empty($data['id'])) {
        throw new InvalidArgumentException("Client id is missing");
    }
    $id = (int)$data['id'];
    $clientStatement = 'select id,name from Client WHERE id=:id';
    $client = getSingleArrayFromQuery($clientStatement, ['id' => $id], $db);
    if (empty($client)) {
        return null;
    }
    logSelectActivity([$id], 'Client', $db);
    
    $aptStatement = 'select a.id,
    c.name as "clientName", c.id as "clientID",
    t.name as "therapistName", t.id as "therapistID",
    a.start_date as "startDate", a.end_date as "endDate", a.status
    from Appointment a 
    JOIN Client c ON a.client_id = c.id 
    JOIN Therapist t ON a.therapist_id = t.id
    WHERE c.id = :id
    ORDER BY a.start_date';
    $client['appointments'] = getArrayFromQuery($aptStatement, ['id' => $id], $db);


    if (!empty($client['appointments'])) {
        $apptIds = array_map(function($record) { return $record['id']; }, $client['appointments']);
        logSelectActivity($apptIds, 'Appointment', $db);
    }

    $logStatement = 'select ActivityLog.creation_date as "date",table_name as "tableName", table_id as "tableID", action,notes,su.email as "systemUserEmail" 
    from ActivityLog JOIN SystemUser su ON ActivityLog.created_by = su.id 
    WHERE table_id = :id AND table_name = \'Client\'';
    $client['logs'] = getArrayFromQuery($logStatement, ['id' => $id], $db);
    return $client;
}