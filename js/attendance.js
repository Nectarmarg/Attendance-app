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
    beforeSend: function (e) {},
    error: function (e) {},
    success: function (rv) {
      // alert(JSON.stringify(rv));
      // lets create the HTML from rv dynamically
      let element = getSessionHTML(rv);
      $("#ddlclass").html(element);
    },
  });
}

function getStudentListHTML(studentList) {
  let x = `<div class="studentlist">
                <label for="">STUDENT LIST</label>
            </div>`;

  let i = 0;

  for (i = 0; i < studentList.length; i++) {
    let cs = studentList[i];
    let checkedState = "";
    let rowColor = "absentColor";
    if (cs["isPresent"] == "YES") {
      checkedState = "checked";
      rowColor = "presentColor";
    }
    x =
      x +
      `<div class="studentdetails ${rowColor}" id="student${cs["id"]}">
            <div class="slno-area">${i + 1}</div>
            <div class="rollno-area">${cs["roll_no"]}</div>
            <div class="name-area">${cs["name"]}</div>
            <div class="checkbox-area" data-studentid="${cs["id"]}">
                <input type="checkbox" class='cbpresent' data-studentid="${
                  cs["id"]
                }" ${checkedState}>
            </div>
        </div>

       `;
  }
  x += ` <div class="reportsection">
                <button id='btnReport'>REPORT</button>
            </div>
            
            <div id="divReport"></div>

            `;
  return x;
}
function getCourseCardHTML(classlist) {
  let x = ``;

  let i = 0;
  for (i = 0; i < classlist.length; i++) {
    let cs = classlist[i];
    x += `<div class="classcard" data-code='${JSON.stringify(cs)}'>${
      cs["code"]
    }</div>`;
  }
  return x;
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
    beforeSend: function () {},
    success: function (rv) {
      // alert(JSON.stringify(rv));
      let x = getCourseCardHTML(rv);
      $("#classlistarea").html(x);
    },
    error: function () {},
  });
}
function getClassdetailsAreaHTML(classobject) {
  let dateobj = new Date();
  let year = dateobj.getFullYear();
  let month = dateobj.getMonth() + 1;
  let day = dateobj.getDate();

  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  let ondate = `${year}-${month}-${day}`;

  let x = `<div class="classdetails">
    <div class="code-area">${classobject["code"]}</div>
    <div class="title-area">${classobject["title"]}</div>
        <div class="ondate-area">
          <input type="date" value="${ondate}" id='dptondate'>
        </div>
  </div>

          `;
  return x;
}
function fetchStudentList(sessionid, classid, facid, ondate) {
  $.ajax({
    url: "ajaxhandler/attendanceAJAX.php",
    type: "POST",
    dataType: "json",
    data: {
      action: "getStudentList",
      facid: facid,
      ondate: ondate,
      sessionid: sessionid,
      classid: classid,
    },
    beforeSend: function (e) {},
    error: function (e) {
      alert("Error");
    },
    success: function (rv) {
      // alert(JSON.stringify(rv));
      let x = getStudentListHTML(rv);
      $("#studentlistarea").html(x);
    },
  });
}
function saveAttendance(
  studentid,
  courseid,
  facultyid,
  sessionid,
  ondate,
  ispresent
) {
  // make an ajax call to save the attendance of the student in DB

  $.ajax({
    url: "ajaxhandler/attendanceAJAX.php",
    type: "POST",

    dataType: "json",

    data: {
      studentid: studentid,
      courseid: courseid,
      facultyid: facultyid,
      sessionid: sessionid,
      ondate: ondate,
      ispresent: ispresent,
      action: "saveAttendance",
    },

    beforeSend: function (e) {},

    error: function (e) {
      alert("OOPS! Something went wrong!");
    },

    success: function (rv) {
      // alert(JSON.stringify(rv));
      if (ispresent === "YES") {
        $("#student" + studentid)
          .removeClass("absentColor")
          .addClass("presentColor");
      }else{
        $("#student" + studentid)
          .removeClass("presentColor")
          .addClass("absentColor");
      }
    },
  });
}
function loadListOnCurrentDate(ondate) {
  let sessionid = $("#ddlclass").val();
  let classid = $("#hiddenSelectedCourseID").val();
  let facid = $("#hiddenFacId").val();
  fetchStudentList(sessionid, classid, facid, ondate);
}
function downloadCSV(sessionid, classid, facid) {
  // make ajax call to fetch from server

  $.ajax({
    url: "ajaxhandler/attendanceAJAX.php",
    type: "POST",
    dataType: "json",
    data: {
      action: "downloadReport",
      facid: facid,
      sessionid: sessionid,
      classid: classid,
    },
    beforeSend: function (e) {},
    success: function (rv) {
      alert(JSON.stringify(rv));

      let x = `<object data=${rv["filename"]} type="text/html" target="_parent" ></object>`;
      $("#divReport").html(x);
    },
    error: function (e) {
      alert("Error");
    },
  });
}
$(function (e) {
  $(document).on("click", "#btnLogοut", function () {
    $.ajax({
      url: "ajaxhandler/logoutAjax.php",
      type: "post",
      dataType: "json",
      data: {
        id: 1,
        action: "logout",
      },

      beforeSend: function () {
        alert("About to send ajax request");
      },
      success: function (rv) {
        document.location.href = "login.php";
      },
      error: function () {
        alert("Something went wrong!");
      },
    });
  });
  loadSessions();
  $(document).on("change", "#ddlclass", function (e) {
    $("#classlistarea").html(``);
    $("#classdetailsarea").html(``);
    $("#studentlistarea").html(``);

    let si = $("#ddlclass").val();
    if (si != -1) {
      let sessionid = si;
      let facid = $("#hiddenFacId").val();
      fetchFacultyCourses(facid, sessionid);
    }
  });
  $(document).on("click", ".classcard", function (e) {
    let classobject = $(e.currentTarget).data("code");
    // remember the class id
    $("#hiddenSelectedCourseID").val(classobject["id"]);
    let x = getClassdetailsAreaHTML(classobject);
    $("#classdetailsarea").html(x);

    // now fill the studentlist
    // for session and course

    let sessionid = $("#ddlclass").val();
    let classid = $("#hiddenSelectedCourseID").val();
    let facid = $("#hiddenFacId").val();
    let ondate = $("#dptondate").val();

    if (sessionid != -1) {
      fetchStudentList(sessionid, classid, facid, ondate);
    }
  });
  $(document).on("click", ".cbpresent", function (e) {
    // get the check state
    let ispresent = e.currentTarget.checked;

    // ispresent is boolean, convert to YES or NO

    if (ispresent) {
      ispresent = "YES";
    } else {
      ispresent = "NO";
    }

    let studentid = $(this).data("studentid");
    let courseid = $("#hiddenSelectedCourseID").val();
    let facultyid = $("#hiddenFacId").val();
    let sessionid = $("#ddlclass").val();
    let ondate = $("#dptondate").val();
    // alert(studentid + " " + courseid + " " + facultyid + " " + sessionid+" "+ondate);
    saveAttendance(
      studentid,
      courseid,
      facultyid,
      sessionid,
      ondate,
      ispresent
    );
  });
  $(document).on("change", "#dptondate", function (e) {
    // Load the student list on current date
    let ondate = $("#dptondate").val();
    loadListOnCurrentDate(ondate);
  });
  $(document).on("click", "#btnReport", function (e) {
    // send the session course faculty to server
    // and get a csv filename in return
    // server will create the CSV file which will contain
    // the report
    let sessionid = $("#ddlclass").val();
    let classid = $("#hiddenSelectedCourseID").val();
    let facid = $("#hiddenFacId").val();
    downloadCSV(sessionid, classid, facid);
  });
});
