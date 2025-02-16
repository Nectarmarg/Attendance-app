<?php
$path = $_SERVER['DOCUMENT_ROOT'];
require_once $path . "attendanceapp/database/database.php";
require_once $path . "attendanceapp/database/facultyDetails.php";

$action = $_REQUEST['action'];

if (!empty($action)) {
  if ($action == "verifyUser") {
    $un = $_POST['user_name'];
    $pw = $_POST['password'];
    // $rv = ["un" => $un, "pw" => $pw];
    // echo json_encode($rv);

    // check if exists in database
    $dbo = new Database();
    $fdo = new faculty_details();
    $rv = $fdo->verifyUser($dbo, $un, $pw);
    echo json_encode($rv);
  }
}
