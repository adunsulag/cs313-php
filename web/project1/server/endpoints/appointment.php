<?php

function appointmentAddEndpoints(array &$validActions) {
    $validActions['appointments.list'] = 'listAppointments';
    $validActions['appointments.get'] = 'getAppointment';
    $validActions['appointments.save'] = 'saveAppointment';
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

function getAppointmentProperty($data, $propName, $filter) {
    $property = isset($data[$propName]) ? filter_var($data[$propName], $filter) : null;
    if (empty($property)) {
        throw new InvalidArgumentException("Appointment $propName is missing");
    }
    return $property;
}

function saveAppointment($data, $request) {
    $db = openDBConnection($request['systemUserId']);

    $id = isset($data['id']) ? (int)$data['id'] : null;
    $status = getAppointmentProperty($data, 'status', FILTER_SANITIZE_STRING);
    $therapistID = getAppointmentProperty($data, 'therapistID', FILTER_SANITIZE_NUMBER_INT);
    $clientID = getAppointmentProperty($data, 'clientID', FILTER_SANITIZE_NUMBER_INT);
    $startDate = getAppointmentProperty($data, 'startDate', FILTER_SANITIZE_STRING);
    $endDate = getAppointmentProperty($data, 'endDate', FILTER_SANITIZE_STRING);

    // convert startDate & endDate to a proper date
    $startDateTime = strtotime($startDate);
    $endDateTime = strtotime($startDate);
    if ($startDateTime === false) {
        throw new InvalidArgumentException("Appointment startDate must be a valid date and time");
    }
    if ($endDateTime === false) {
        throw new InvalidArgumentException("Appointment endDate must be a valid date and time");
    }

    $params = [
        ":status" => $status, ":therapistID" => $therapistID
        , ":clientID" => $clientID, ':startDate' => $startDate
        , ":endDate" => $endDate
    ];


    if (!empty($data['id'])) {
        $params[':id'] = $id;
        $sql = "UPDATE Appointment SET status=:status, therapist_id = :therapistID, client_id = :clientID, start_date = :startDate, end_date = :endDate WHERE id=:id";
        executeQuery($sql, $params, $db);
    }
    else {
        $sql = "INSERT INTO Appointment(status,therapist_id,client_id,start_date,end_date) VALUES(:status, :therapistID, :clientID, :startDate, :endDate)";
        executeQuery($sql, $params, $db);
        $id = getLastInsertId("Appointment", $db);
    }
    return getAppointment(["id" => $id], $request);
}
