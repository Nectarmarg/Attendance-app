//Do everything only when the page is loaded
function tryLogin() {
  let un = $("#txtUsername").val();
  let pw = $("#txtPassword").val();

  if (un.trim() !== "" && pw.trim() !== "") {
    $.ajax({
      url: "ajaxhandler/loginAjax.php",
      type: "post",
      dataType: "json",
      data: {
        user_name: un,
        password: pw,
        action: "verifyUser",
      },

      beforeSend: () => {
        alert("About to make an ajax call");
      },

      success: (rv) => {
        alert(JSON.stringify(rv));
      },
      error: () => {
        alert("All bad");
      },
    });
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

  $(document).on("click", "#btnLogin", function () {
    tryLogin();
  });
});
