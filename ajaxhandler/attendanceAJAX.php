 <?php
  $path = $_SERVER['DOCUMENT_ROOT'];
  require_once $path . '/attendanceapp/database/database.php';
  require_once $path . '/attendanceapp/database/sessionDetails.php';
  require_once $path . '/attendanceapp/database/facultyDetails.php';
  require_once $path . '/attendanceapp/database/courseRegistrationDetails.php';
  require_once $path . '/attendanceapp/database/attendanceDetails.php';

  // getSession - get all the sessions
  if (isset($_POST['action']) && $_POST['action'] === "getSession") {

    $dbo = new Database();
    $sobj = new SessionDetails();
    $rv = $sobj->getSessions($dbo);
    echo json_encode($rv);
  }

  // getFacultyCourses - get all the courses taken by a faculty in a session
  if (isset($_POST['action']) && $_POST['action'] === "getFacultyCourses") {
    // fetch the courses taken by fac in sess

    $facid = $_POST['facid'];
    $sessionid = $_POST['sessionid'];
    $dbo = new Database();
    $fo = new faculty_details();
    $rv = $fo->getCoursesInASession($dbo, $sessionid, $facid);

    echo json_encode($rv);
  }

  // getStudentList - get all the students in a class in a session
  if (isset($_POST['action']) && $_POST['action'] === "getStudentList") {
    // fetch the courses taken by fac in sess

    $classid = $_POST['classid'];
    $sessionid = $_POST['sessionid'];
    $facid = $_POST['facid'];
    $ondate = $_POST['ondate'];

    $dbo = new Database();

    $crgo = new CourseRegistrationDetails();
    $allStudents = $crgo->getRegisteredStudents($dbo, $sessionid, $classid);


    $ado = new attendanceDetails();
    $presentStudents = $ado->getPresentListOfAClassByAFacOnADate($dbo, $sessionid, $classid, $facid, $ondate);

    // lets iterate over allStudents and mark the presentStudents

    for ($i = 0; $i < count($allStudents); $i++) {
      $allStudents[$i]['isPresent'] = "NO";

      for ($j = 0; $j < count($presentStudents); $j++) {
        if ($allStudents[$i]['id'] === $presentStudents[$j]['student_id']) {
          $allStudents[$i]['isPresent'] = "YES";
          break;
        }
      }
    }

    echo json_encode($allStudents);
  }


  if (isset($_POST['action']) && $_POST['action'] === 'saveAttendance') {
    $studentid = $_POST['studentid'];
    $courseid = $_POST['courseid'];
    $facultyid = $_POST['facultyid'];
    $sessionid = $_POST['sessionid'];
    $ondate = $_POST['ondate'];
    $status = $_POST['ispresent'];
    $dbo = new Database();
    $ado = new attendanceDetails();
    $rv = $ado->saveAttendance($dbo, $sessionid, $courseid, $facultyid, $studentid, $ondate, $status);
    echo json_encode($rv);
  }
