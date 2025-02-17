//Do everything only when the page is loaded
function tryLogin() {
  let un = $("#txtUsername").val();
  let pw = $("#txtPassword").val();

  if (un.trim() !== "" && pw.trim() !== "") {
    $.ajax({
      url: "ajaxhandler/loginAjax.php",
      type: "post",
      data: {
        user_name: un,
        action: "verifyUser",
      },
      dataType: "json",
      beforeSend: () => {
        alert("About to send an ajax request");
      },
      success: (rv) => {
        // if status is OK or not

        if (rv["status"] === "ALL OK") {
          document.location.replace("attendance.php");
        } else {
          alert(rv["status"]);
        }
      },
      error: () => {
        alert("Something went wrong");
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

  $(document).on("click", "#btnLogin", function (e) {
    tryLogin();
  });
});
