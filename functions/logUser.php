<?php
function logUser ($userEmail, $info): void {
    $message = "------------------------------------------------\n";
    $message .= "Attention!\n"; 
    $message .= "------------------------------------------------\n\n\n";

    $message .= "User with this email: " . $userEmail . " - is " . $info . " in DB \n" . date('d.m.Y H:i:s', strtotime('+ 3 Hours')) . "\n\n\n";
    file_put_contents("log.txt", $message, FILE_APPEND); 
}