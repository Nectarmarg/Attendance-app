<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Page</title>
  <link rel="stylesheet" href="css/login.css">
  <link rel="stylesheet" href="css/loader.css">
</head>

<body>

  <div class="loginform">

    <div class="inputgroup topmarginlarge">
      <input type="text" id="txtUsername" required>
      <label for="txtUsername" id="lblUsername"> USER NAME</label>
    </div>

    <div class="inputgroup topmarginlarge">
      <input type="password" id="txtPassword" required>
      <label for="txtPassword" id="lblPassword"> PASSWORD</label>
    </div>
    <div class="divcallforaction topmarginlarge">
      <button class="btnlogin inactivecolor" id="btnLogin">LOGIN</button>
    </div>

    <div class="diverror topmarginlarge" id="diverror">
      <label for="" class="errormessage" id="errormessage">ERROR GOES HERE</label>
    </div>

  </div>
  <div class="lockscreen" id="lockscreen">
    <div class="spinner" id="spinner"></div>
  </div>

  <script src="js/jquery.js"></script>
  <script src="js/login.js"></script>
</body>

</html>