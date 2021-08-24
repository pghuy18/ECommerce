let app = new AppApi();
let DOM = {};
let user = {};
user.changePassword = function (o) {
  app.User.CHANGE_PASSWORD(o)
    .then((ret) => {
      if (ret.error) {
        if (ret.status == undefined) document.location.href = "/user/login";
        else helper.msg(ret.msg, true);
      } else {
        if (typeof ret == String && ret.indexOf("Need to Login"))
          document.location.reload();
        else {
          helper.msg("Change your password successfully. Please login again");
          setTimeout(function () {
            document.getElementById("btnLogout").click();
          }, 3000);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
$(document).ready(function () {
  DOM.changePasswordFrm = document.getElementById("changePasswordFrm");
  DOM.changePasswordFrm.onsubmit = function (ev) {
    ev.preventDefault();
    user.changePassword({
      currentPassword: changePasswordFrm.currentPassword.value,
      newPassword: changePasswordFrm.newPassword.value,
    });
  };
});
