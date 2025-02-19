//Do everything only when the page is loaded

function tryLogin() {
  // Get username and password
  let un = $("#txtUsername").val();
  let pw = $("#txtPassword").val();

  // Check if they are empty and if not send ajax
  if (un.trim() !== "" && pw.trim() !== "") {
    $.ajax({
      url: "ajaxhandler/loginAjax.php",
      type: "post",
      data: {
        user_name: un,
        password: pw,
        action: "verifyUser",
      },
      dataType: "json",
      beforeSend: () => {
        alert("About to send ajax request");
      },
      success: (rv) => {
        if (rv["status"] == "ALL OK") {
          document.location.href = "attendance.php";
        } else {
          alert(JSON.stringify(rv));
        }
      },
      error: () => {
        alert("Something went wrong!");
      },
    });
  } else {
    alert("Please enter both username and password before continuing");
  }
}

$(function (e) {
  $(document).on("keyup", "input", function (e) {
    let un = $("#txtUsername").val();
    let pw = $("#txtPassword").val();
    if (un.trim() !== "" && pw.trim() !== "") {
      $("#btnLogin").removeClass("inactivecolor");
      $("#btnLogin").addClass("activecolor");
    } else {
      $("#btnLogin").removeClass("activecolor");
      $("#btnLogin").addClass("inactivecolor");
    }
  });

  // When the login button is pressed
  $(document).on("click", "#btnLogin", () => {
    tryLogin();
  });
});
