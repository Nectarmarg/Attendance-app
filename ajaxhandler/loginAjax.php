<?php
$path = $_SERVER['DOCUMENT_ROOT'];

require_once $path . "/attendanceapp/database/database.php";
require_once $path . "/attendanceapp/database/facultyDetails.php";
$action = $_REQUEST['action'];


if (!empty($action) && $action === "verifyUser") {
    // Retrieve what was sent

    $un = $_POST['user_name'];
    $pw = $_POST['password'];

    // $rv = ["un" => $un, "pw" => $pw];
    // echo json_encode($rv);

    $dbo = new Database();
    $fdo = new faculty_details();
    $rv = $fdo->verifyUser($dbo, $un, $pw);

    // if the status is ok, start session and get id
    if($rv['status']==="ALL OK"){
        session_start();
        $_SESSION['current_user']=$rv['id'];
    }

    echo json_encode($rv);

    // check if credentials exist database
}
