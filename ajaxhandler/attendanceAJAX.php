 <?php
$path = $_SERVER['DOCUMENT_ROOT'];
require_once $path . '/attendanceapp/database/database.php';
require_once $path . '/attendanceapp/database/sessionDetails.php';
if (isset($_POST['action']) && $_POST['action'] === "getSession") {
  $action = $_POST['action'];

  $dbo = new Database();
  $sobj = new SessionDetails();
  $rv = $sobj->getSessions($dbo);
  echo json_encode($rv);
}
