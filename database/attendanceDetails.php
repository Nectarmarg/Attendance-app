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
    public function getAttendanceReport($dbo, $session, $course, $fac)
    {
        // get the total number of classes by the fac
        $c = "select distinct on_date from attendance_details where session_id=:session_id 
        and course_id=:course_id 
        and faculty_id=:faculty_id";
        $s = $dbo->conn->prepare($c);

        try {
            $s->execute([":session_id" => $session, ":course_id" => $course, ":faculty_id" => $fac]);
            $rv = $s->fetchAll(PDO::FETCH_ASSOC);
            $total = count($rv);

            if ($total > 0) {
                $start = $rv[0]['on_date'];
                $end = $rv[$total - 1]['on_date'];
            }
        } catch (Exception $e) {
            return [-1];
        }
        $report = [];
        array_push($report, ['total' => $total]);
        array_push($report, ['start' => $start]);
        array_push($report, ['end' => $end]);
        // get the total number of classes attended by each student
        // compute the report
        // return the report
        return $report;
    }
}
