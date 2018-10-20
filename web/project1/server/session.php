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
function server_load_session() {
    session_start(); // we could load the session from the database here... but this is fine for now.
    return server_get_session_data();
}

function server_get_session_data() {
    $storage = new SessionStorage();
    $storage->setValuesToStore($_SESSION);
    return $storage;
}

function server_save_session($session) {
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