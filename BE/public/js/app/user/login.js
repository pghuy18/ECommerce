let app = new AppApi();

$(document).ready(function () {
  //code here

  let frm = document.getElementById("frm");
  frm.onsubmit = function (ev) {
    ev.preventDefault();
    let ret = app.User.LOGIN({
      username: frm.username.value,
      password: frm.password.value,
      remember: frm.remember.checked ? true : false,
    })
      .then((ret) => {
        if (ret.error) helper.msg(ret.msg, true);
        else {
          console.log(ret.data);
          ret.data.admin
            ? (document.location.href = "/admin/dashboard")
            : (document.location.href = "/shop");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
});
