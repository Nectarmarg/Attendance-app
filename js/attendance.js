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

function getStudentListHTML(studentList) {
  let x = `<div class="studentlist">
                <label for="">STUDENT LIST</label>
            </div>`;

  let i = 0;

  for (i = 0; i < studentList.length; i++) {
    let cs = studentList[i];
    x =
      x +
      `<div class="studentdetails">
            <div class="slno-area">${i + 1}</div>
            <div class="rollno-area">${cs["roll_no"]}</div>
            <div class="name-area">${cs["name"]}</div>
            <div class="checkbox-area">
                <input type="checkbox" class='cbpresent'>
            </div>
        </div>

       `;
  }

  // let i = 0;
  // for (i = 0; i < studentList.length; i++) {
  //   let cs = studentList[i];
  //   x += `
  //           <div class="studentdetails">
  //               <div class="slno-area">${i + 1}</div>
  //               <div class="rollno-area">${cs["roll_no"]}</div>
  //               <div class="name-area">${cs["name"]}</div>
  //               <div class="checkbox-area">
  //                   <input type="checkbox">
  //               </div>
  //           </div>
  //         `;
  // }
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
    beforeSend: () => {},
    success: (rv) => {
      // alert(JSON.stringify(rv));
      let x = getCourseCardHTML(rv);
      $("#classlistarea").html(x);
    },
    error: () => {},
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
          <input type="date" value=${ondate}>
        </div>
  </div>

          `;
  return x;
}
function fetchStudentList(sessionid, classid) {
  $.ajax({
    url: "ajaxhandler/attendanceAJAX.php",
    type: "POST",
    dataType: "json",
    data: { action: "getStudentList", sessionid: sessionid, classid: classid },
    beforeSend: (e) => {},
    error: (e) => {
      alert("Error");
    },
    success: (rv) => {
      // alert(JSON.stringify(rv));
      getStudentListHTML(rv);
      $("#studentlistarea").html(getStudentListHTML(rv));
    },
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
    if (si != -1) {
      let sessionid = si;
      let facid = $("#hiddenFacId").val();
      fetchFacultyCourses(facid, sessionid);
    }
  });
  $(document).on("click", ".classcard", (e) => {
    let classobject = $(e.currentTarget).data("code");
    // alert(JSON.stringify(classobject));
    let x = getClassdetailsAreaHTML(classobject);
    $("#classdetailsarea").html(x);
    // now fill the studentlist
    // for session and course
    let sessionid = $("#ddlclass").val();
    let classid = classobject["id"];
    if (sessionid != -1) {
      fetchStudentList(sessionid, classid);
    }
  });
  $(document).on("click", ".cbpresent", (e) => {
    // get the check state
    let isPresent=e.currentTarget.checked;
    alert(isPresent)
  });
});
