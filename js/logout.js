$(function (e) {
  $(document).on("click", "#btnLogout", (e) => {
    $.ajax({
      url: "ajaxhandler/logoutAjax.php",
      type: "post",
      contentType: "application/json",
      data: { id: 1 },
      success: (e) => {
        document.location.replace("login.js");
      },
      error: () => {
        alert("Something went wrong");
      },
    });
  });
});
