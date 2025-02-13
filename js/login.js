//Do everything only when the page is loaded
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
    let un = $("#txtUsername").val();
    let pw = $("#txtPassword").val();

    if (un.trim() !== "" && pw.trim() !== "") {
      $.ajax({
        url: "ajaxhandler/loginAjax.php",
        type: "POST",
        data: {
          user_name: un,
          pass_word: pw,
          action: "verifyUser",
        },
        dataType: "json",
        beforeSend: () => {
          alert("About to send an ajax request");
        },
        success: (e) => {
          alert(JSON.stringify(e));
        },
        error: () => {
          alert("Error");
        },
      });
    } else {
      alert("Please enter both username and password before continuing");
    }
  });
});
