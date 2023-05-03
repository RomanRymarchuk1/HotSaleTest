<?php
function logUser ($userEmail, $info) {
    $message = "------------------------------------------------\n";
    $message .= "Attention!\n"; 
    $message .= "------------------------------------------------\n\n\n";

    $message .= "User with this email: " . $userEmail . " - is " . $info . " DB \n" . date('d.m.Y H:i:s') . "\n\n\n";
    file_put_contents("log.txt", $message, FILE_APPEND); 
}