<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

require_once('./functions/logUser.php');
require_once('./functions/createResponse.php');

$usersJSON = fopen('users.json', 'r');
$usersArr = fread($usersJSON, filesize('users.json'));
fclose($usersJSON);
$usersArr = json_decode($usersArr, true);

$json = file_get_contents('php://input');
$postUserData = json_decode($json, true);
$userName = $postUserData['name'];
$userEmail = $postUserData['email'];
$userPass = $postUserData['password'];
$userPassRep = $postUserData['passwordRepeat'];

$response = null;

if(str_contains($userEmail, "@")){

    if($userPass === $userPassRep){

        $isExist = null;
        foreach($usersArr as $user){
            if($user['email'] === $userEmail){
                $isExist = true;
                break;
            }
        }
                
        if($isExist){
            $response = createResponse(false, 'User with this email already exists', 201);

            logUser($userEmail, 'already exists');
                
        } else {
            $newUser = [
                "id" => rand(1, 100000),
                "name" => $userName,
                "email" => $userEmail,
                "password" => md5($userPass),
            ];

            $usersArr[] = $newUser;
            file_put_contents("users.json", json_encode($usersArr)); 

            $response = createResponse(true, 'User is added', 201);
            logUser($userEmail, 'added');
        }

    } else {
        $response = createResponse(false, 'Passwords is different', 400);
    }

} else {
    $response = createResponse(false, 'Email is invalid', 400);
}

echo json_encode($response);
