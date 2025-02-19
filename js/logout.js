$(function (e) {
  $(document).on("click", "#btnLogοut", () => {
    $.ajax({
      url: "ajaxhandler/logoutAjax.php",
      type: "post",
      dataType: "json",
      data: {
        id: 1,
        action: "logout",
      },

      beforeSend: () => {
        alert("About to send ajax request");
      },
      success: (rv) => {
        document.location.href = "login.php";
      },
      error: () => {
        alert("Something went wrong!");
      },
    });
  });
});
