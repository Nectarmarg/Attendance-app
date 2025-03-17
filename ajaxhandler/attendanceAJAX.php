 <?php
  $path = $_SERVER['DOCUMENT_ROOT'];
  require_once $path . '/attendanceapp/database/database.php';
  require_once $path . '/attendanceapp/database/sessionDetails.php';
  require_once $path . '/attendanceapp/database/facultyDetails.php';

  if (isset($_POST['action']) && $_POST['action'] === "getSession") {

    $dbo = new Database();
    $sobj = new SessionDetails();
    $rv = $sobj->getSessions($dbo);
    echo json_encode($rv);
  }

  if (isset($_POST['action']) && $_POST['action'] === "getFacultyCourses") {
    // fetch the courses taken by fac in sess

    $facid = $_POST['facid'];
    $sessionid = $_POST['sessionid'];
    $dbo = new Database();
    $fo = new faculty_details();
    $rv = $fo->getCoursesInASession($dbo, $sessionid, $facid);

    echo json_encode($rv);
  }
