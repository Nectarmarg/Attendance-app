<?php
$path = $_SERVER['DOCUMENT_ROOT'];
require_once $path . '/attendanceapp/database/database.php';

class attendanceDetails
{
    public function  saveAttendance($dbo, $session, $course, $fac, $student, $ondate, $status)
    {

        $rv = [-1];
        $c = "insert into attendance_details (session_id, course_id, faculty_id, student_id, on_date, status) values 
        (:session, :course, :fac, :student, :on_date, :status)";
        $s = $dbo->conn->prepare($c);
        try {
            $s->execute([":session" => $session, ":course" => $course, ":fac" => $fac, ":student" => $student, ":on_date" => $ondate, ":status" => $status]);
            $s->execute();
            $rv = [1];
        } catch (Exception $e) {
            // $rv = [$e->getMessage()];

            $rv = [-1];
            $c = "update attendance_details set status = :status where session_id = :session and course_id = :course and faculty_id = :fac and student_id = :student and on_date = :on_date";
            $s = $dbo->conn->prepare($c);
            try {
                $s->execute([":session" => $session, ":course" => $course, ":fac" => $fac, ":student" => $student, ":on_date" => $ondate, ":status" => $status]);
                $s->execute();
                $rv = [1];
            } catch (Exception $e) {
                // $rv = [$e->getMessage()];
                $rv = [-1];
            }
        }
        return $rv;
    }
    public function getPresentListOfAClassByAFacOnADate($dbo, $session, $course, $fac, $ondate)
    {
        $c = "select * from attendance_details where session_id=:session_id 
        and course_id=:course_id 
        and faculty_id=:faculty_id 
        and on_date=:on_date 
        and status='YES'";
        $s = $dbo->conn->prepare($c);
        try {

            $s->execute([":session_id" => $session, ":course_id" => $course, ":faculty_id" => $fac, ":on_date" => $ondate]);
            $rv = $s->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            return [-1];
        }
        return $rv;
    }
}
