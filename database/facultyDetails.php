<?php
define('BASEPATH', __DIR__);

require_once BASEPATH . "/database.php";

class facultyDetails
{
    public function verifyUser($dbo, $un, $pw)
    {
        $rv = ["id" => -1, "status" => "ERROR"];
        $c = "select id, password from faculty_details where user_name=:un";
        $s = $dbo->conn->prepare($c);
        try {
            $s->execute([":un" => $un]);
            if ($s->rowCount() > 0) 
            {
                $result = $s->fetchAll(PDO::FETCH_ASSOC[0]);

                if ($result['password'] == $pw) {
                    // all ok
                    $rv = ["id" => -1, "status" => "ERROR"];
                } else {
                    // pw does not match
                }
            } else {
                // user name does not exists
            }
        } catch (PDOException $e) {
        }
    }
}
