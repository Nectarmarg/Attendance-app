<?php
// retrieve what was sent
$action = $_REQUEST['action'];


if (!empty($action)) {
    if ($action === "verifyUser") {

        // retrieve what was sent
        $un = $_REQUEST['user_name'];
        $pw = $_REQUEST['pass_word'];
        $rv = ["un" => $un, "pw" => $pw];
        echo json_encode($rv);
        // check if exists in database
    }
}
