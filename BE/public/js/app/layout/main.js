$(document).ready(function () {
  let app = new AppApi();
  let btnLogout = document.getElementById("btnLogout");
  let chatboxBtn = document.getElementById("chatBtn");
  let btnClose = document.getElementById("btnClose");
  //   console.log(app.User);
  if (btnLogout) {
    btnLogout.onclick = function () {
      app.User.LOGOUT()
        .then((ret) => {
          if (ret.error) {
            document.location.href = "/";
          } else {
            document.location.href = "/";
          }
        })
        .catch((err) => {
          document.location.href = "/";
          console.log(err);
        });
    };
  }
  chatboxBtn.onclick = function () {
    // $("#chatFrm").show();
  };
  btnClose.onclick = function () {
    // $("#chatFrm").hide();
  };
});
