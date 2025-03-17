<?php
require_once $path . "/attendanceapp/database/database.php";

class faculty_details
{
    public function verifyUser($dbo, $un, $pw)
    {
        $rv = ["id" => -1, "status" => "ERROR"];
        //    Select data from database

        $c = "select id, password from faculty_details where user_name=:un";

        $s = $dbo->conn->prepare($c);

        try {
            $s->execute([":un" => $un]);

            if ($s->rowCount() > 0) {
                $result = $s->fetchAll(PDO::FETCH_ASSOC)[0];

                if ($result['password'] === $pw) {
                    // all ok
                    $rv = ["id" => $result['id'], "status" => "ALL OK"];
                } else {
                    // Incorrect password
                    $rv = ["id" => $result['id'], "status" => "WRONG PASSWORD"];
                }
            } else {
                // user name does not exist
                $rv = ["id" => -1, "status" => "USER NAME DOES NOT EXIST"];
            }
        } catch (PDOException $e) {
        }
        return $rv;
    }
    public function getCoursesInASession($dbo, $sessionid, $facid)
    {
        $rv = [];
        $c = "select cd.id, cd.code, cd.title from course_allotment as ca, course_details as cd where ca.course_id=cd.id and faculty_id=:facid and session_id=:sessionid ";
        $s = $dbo->conn->prepare($c);
        try {
            $s->execute([":facid" => $facid, ":sessionid" => $sessionid]);
            $rv = $s->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
        }
        return $rv;
    }
}
