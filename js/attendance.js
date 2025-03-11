function getSessionHTML(rv) {
  let x = ``;
  x = `<option value=-1>SELECT ONE</option>`;
  for (let i = 0; i < rv.length; i++) {
    let cs = rv[i];
    x =
      x + `<option value=${cs["id"]}>${cs["year"] + " " + cs["term"]}</option>`;
  }
  return x;
}

function loadSessions() {
  // make an ajax call and load the sessions from DB
  $.ajax({
    url: "ajaxhandler/attendanceAJAX.php",
    type: "POST",
    dataType: "json",
    data: { action: "getSession" },
    beforeSend: (e) => {},
    error: (e) => {},
    success: (rv) => {
      // alert(JSON.stringify(rv));
      // lets create the HTML from rv dynamically
      let element = getSessionHTML(rv);
      $("#ddlclass").html(element);
    },
  });
}
function fetchFacultyCourses(facid, sessionid) {
  // get all the courses taken by the loged in faculty
  // for the selected session
  // from DB
  // by an ajax call

  $.ajax({
    url: "ajaxhandler/attendanceAJAX.php",
    type: "POST",
    dataType: "json",
    data: { facid: facid, sessionid: sessionid, action: "getFacultyCourses" },
    beforeSend: () => {},
    success: (rv) => {
      alert(JSON.stringify(rv));
    },
    error: () => {},
  });
}

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
  loadSessions();
  $(document).on("change", "#ddlclass", (e) => {
    let si = $("#ddlclass").val();
    if (si != 1) {
      let sessionid = si;
      let facid = $("#hiddenFacId").val();
      fetchFacultyCourses(facid, sessionid);
    }
  });
});
