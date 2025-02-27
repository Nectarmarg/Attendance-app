<?php
session_start();
if (!isset($_SESSION['current_user'])) {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/attendance.css">
    <title>Document</title>
</head>

<body>
    <div class="page">
        <div class="header-area">
            <div class="logo-area">
                <h1 class="logo">ATTENDANCE APP</h1>
            </div>
            <div class="logout-area"><button class="logout">LOGOUT</button></div>
        </div>
        <div class="session-area">
            <div class="label-area"><label for="">SESSION</label></div>
            <div class="dropdown-area">
                <select name="" id="" class="ddlclass">
                    <option value="">SELECT ONE</option>
                    <option value="">2023 AUTUMN</option>
                    <option value="">2023 SPRING</option>
                </select>
            </div>
        </div>
        <div class="classlist-area">1</div>
        <div class="classdetails-area">1</div>
        <div class="studentlist-area">1</div>
    </div>

    <script src="js/jquery.js"></script>
    <script src="js/logout.js"></script>
</body>

</html>