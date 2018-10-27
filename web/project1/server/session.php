<?php

class SessionStorage {
    private $_data;
    public function __set($name, $value) {
        $this->_data[$name] = $value;
    }

    public function __get($name) {
        if (!empty($this->_data[$name])) {
            return $this->_data[$name];
        }
        return null;
    }

    public function getValuesToStore() {
        return $this->_data;
    }

    public function setValuesToStore($values) {
        error_log("storing values of " . var_export($values, true));
        $this->_data = $values;
    }
    public function reset() {
        $this->_data = [];
    }
}
function serverLoadSession() {
    session_start(); // we could load the session from the database here... but this is fine for now.
    return serverGetSessionData();
}

function serverGetSessionData() {
    $storage = new SessionStorage();
    $storage->setValuesToStore($_SESSION);
    return $storage;
}

function serverSaveSession($session) {
    // TODO: there's likely old session data here that can be cleaned out
    // but at this stage let's just leave those for now.
    if (!empty($session)) {
        $data = $session->getValuesToStore();
        foreach ($data as $key => $value) {
            $_SESSION[$key] = $value;
        }
    }
    error_log('$_SESSION set now to ' . var_export($_SESSION, true));
}