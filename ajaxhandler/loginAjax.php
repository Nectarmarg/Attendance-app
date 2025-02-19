<?php
$path = $_SERVER['DOCUMENT_ROOT'];

require_once $path . "/attendanceapp/database/database.php";
require_once $path . "/attendanceapp/database/facultyDetails.php";

// check if ajax call is successfull
$action = $_REQUEST['action'];
if (!empty($action) && $action == "verifyUser") {

    // retrieve data
    $un = $_POST['user_name'];
    $pw = $_POST['password'];



    // check if data exist in database

    $dbo = new Database();
    $fdo = new faculty_details();
    $rv = $fdo->verifyUser($dbo, $un, $pw);

    // if data exist get the current user id
    if ($rv["status"] == "ALL OK") {
        session_start();
        $_SESSION['current_user'] = $rv['id'];
    }

    echo json_encode($rv);
}
