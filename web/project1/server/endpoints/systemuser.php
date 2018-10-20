<?php

function systemUserAddEndpoints(array &$validActions) {
    $validActions['users.login'] = 'loginUser';
    $validActions['users.logout'] = 'logoutUser';
}

function createUser($systemUserEmail, $identity, $appSystemUserId, $db) {
    $insertSQL = "INSERT INTO SystemUser(identity_id, email, active, created_by, creation_date, last_updated_by, last_updated_date) "
    . "VALUES(:identity, :email, 'Y', :systemUserId, NOW(), :systemUserId, NOW())";
    $preparedStatement = $db->prepare($insertSQL);
    $preparedStatement->execute(['identity' => $identity, 'email' => $systemUserEmail, 'systemUserId' => $appSystemUserId]);
    $idSQL = "SELECT last_value FROM systemuser_id_seq";
    $statement = $db->query($idSQL);
    $userId = $statement->fetchColumn();
    return $userId;
}

function loginUser($data, $request) {
    $db = openDBConnection($request['applicationSystemUserId']);
    $payload = $data['payload'];
    $email = filter_var($payload['email'], FILTER_SANITIZE_EMAIL);
    // TODO: stephen need to figure out the best identity id to use here...
    // for now we just go off of email but security wise we need to use the unique id that amazon cognito uses so we can do a back-channel verification
    // against it...
    $identityId = filter_var($payload['event_id'], FILTER_SANITIZE_STRING);
    $userRecord = getSingleArrayFromQuery('SELECT id FROM SystemUser WHERE email = :email', ['email' => $email], $db);
    if (empty($userRecord)) {
        $userId = createUser($email, $identityId, $request['applicationSystemUserId'], $db);
    }
    else {
        $userId = $userRecord["id"];
    }
    $db->exec("SET \"act_log.user\" = $userId");
    $request['session']->loggedIn = true;
    $request['session']->systemUserId = $userId;
    $request['systemUserId'] = $userId;
    return ["userId" => $userId];
}

function logoutUser($data, $request) {
    $db = openDBConnection($request['applicationSystemUserId']);
    error_log(var_export($data, true));
    $request['session']->reset();
    unset($request['userId']);
    return [];
}