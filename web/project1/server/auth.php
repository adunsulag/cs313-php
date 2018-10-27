<?php
/**
 * Handles security of the system.
 */

 class IllegalAccessException extends RuntimeException {};

 function checkIfCanPerformAction($action, $request) {
     // very simple auth for now we let logged in users do everything.
     if ($request['method'] === 'OPTIONS') {
         return true;
     }
     
     if ($request['session']->loggedIn !== true
        && $action !== 'users.login') {
            throw new IllegalAccessException("User not logged in.  Does not have access to any action $action");
    }
    else {
        return true;
    }
 }