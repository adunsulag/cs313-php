<?php

function appointmentAddEndpoints(array &$validActions) {
    $validActions['appointments.list'] = 'listAppointments';
    $validActions['appointments.get'] = 'getAppointment';
}
function listAppointments($data, $request) {
    $db = openDBConnection($request['systemUserId']);

    $results = [];
    $statement = 'select a.id,
    c.name as "clientName", c.id as "clientID",
    t.name as "therapistName", t.id as "therapistID",
    a.start_date as "startDate", a.end_date as "endDate", a.status
    from Appointment a 
    JOIN Client c ON a.client_id = c.id 
    JOIN Therapist t ON a.therapist_id = t.id
    ORDER BY a.start_date';
    $results = getArrayFromQuery($statement, [], $db);;
    if (!empty($results)) {
        $recordIds = array_map(function($record) { return $record['id']; }, $results);
        logSelectActivity($recordIds, 'Appointment', $db);
    }
    $db = null; // unset it so we close the connection
    return $results;
}

function getAppointment($data, $request) {
    $db = openDBConnection($request['systemUserId']);
    if (empty($data['id'])) {
        throw new InvalidArgumentException("Appointment id is missing");
    }
    $id = (int)$data['id'];
    $apptStatement =  $statement = 'select a.id,
    c.name as "clientName", c.id as "clientID",
    t.name as "therapistName", t.id as "therapistID",
    a.start_date as "startDate", a.end_date as "endDate", a.status
    from Appointment a 
    JOIN Client c ON a.client_id = c.id 
    JOIN Therapist t ON a.therapist_id = t.id
    WHERE a.id = :id
    ORDER BY a.start_date';
    $appointment = getSingleArrayFromQuery($apptStatement, ['id' => $id], $db);
    if (empty($appointment)) {
        return null;
    }
    logSelectActivity([$id], 'Appointment', $db);
    return $appointment;
}
