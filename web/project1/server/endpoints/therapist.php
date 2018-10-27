<?php
function therapistAddEndpoints(array &$validActions) {
    $validActions['therapists.list'] = 'listTherapists';
    $validActions['therapists.get'] = 'getTherapist';
    $validActions['therapists.save'] = 'saveTherapist';
}

function listTherapists($data, $request) {
    $db = openDBConnection($request['systemUserId']);

    $statement = 'select id,name from Therapist ORDER BY name';
    $results = getArrayFromQuery($statement, [], $db);;
    if (!empty($results)) {
        $recordIds = array_map(function($record) { return $record['id']; }, $results);
        logSelectActivity($recordIds, 'Therapist', $db);
    }
    $db = null; // unset it so we close the connection
    return $results;
}

function getTherapist($data, $request) {
    $db = openDBConnection($request['systemUserId']);
    if (empty($data['id'])) {
        throw new InvalidArgumentException("Therapist id is missing");
    }
    $id = (int)$data['id'];
    $therapistStatement = 'select id,name from Therapist WHERE id=:id';
    $therapist = getSingleArrayFromQuery($therapistStatement, ['id' => $id], $db);
    if (empty($therapist)) {
        return null;
    }
    
    $aptStatement = 'select a.id,
    c.name as "clientName", c.id as "clientID",
    t.name as "therapistName", t.id as "therapistID",
    a.start_date as "startDate", a.end_date as "endDate", a.status
    from Appointment a 
    JOIN Client c ON a.client_id = c.id 
    JOIN Therapist t ON a.therapist_id = t.id
    WHERE t.id = :id
    ORDER BY a.start_date';
    $therapist['appointments'] = getArrayFromQuery($aptStatement, ['id' => $id], $db);
    logSelectActivity([$id], 'Therapist', $db);

    if (!empty($therapist['appointments'])) {
        $apptIds = array_map(function($record) { return $record['id']; }, $therapist['appointments']);
        logSelectActivity($apptIds, 'Appointment', $db);
    }
    
    $logStatement = 'select ActivityLog.creation_date as "date",table_name as "tableName", table_id as "tableID", action,notes,su.email as "systemUserEmail" 
    from ActivityLog JOIN SystemUser su ON ActivityLog.created_by = su.id 
    WHERE table_id = :id AND table_name = \'Therapist\' ORDER BY ActivityLog.creation_date DESC';
    $therapist['logs'] = getArrayFromQuery($logStatement, ['id' => $id], $db);
    return $therapist;
}

function saveTherapist($data, $request) {
    $db = openDBConnection($request['systemUserId']);
    if (empty($data['name'])) {
        throw new InvalidArgumentException("Therapist name is missing");
    }
    else {
        $name = filter_var($data['name'], FILTER_SANITIZE_STRING);
        if (empty($name)) {
            throw new InvalidArgumentException("Therapist name is missing");
        }
    }
    $params = [":name" => $name];

    if (!empty($data['id'])) {
        $id = (int)$data['id'];
        $params[':id'] = $id;
        $sql = "UPDATE Therapist SET NAME=:name WHERE id=:id";
        executeQuery($sql, $params, $db);
    }
    else {
        $sql = "INSERT INTO Therapist(name) VALUES(:name)";
        executeQuery($sql, $params, $db);
        $id = getLastInsertId("Therapist", $db);
    }
    return getTherapist(["id" => $id], $request);
}