let app = new AppApi();

$(document).ready(function () {
  let btn = document.getElementById("btn");
  let frm = document.getElementById("frm");
  frm.onsubmit = async function (ev) {
    ev.preventDefault();
    let ret = await app.User.REGISTER({
      username: frm.username.value,
      password: frm.password.value,
      email: frm.email.value,
    });
    if (ret.error) {
      helper.msg(ret.msg, true);
    } else {
      // console.log(ret.data);
      helper.msg(`SUCESSFULLY TO CREATE "${ret.data.username}"`);
      setTimeout(function () {
        document.location.href = "/user/login";
      }, 2000);
    }
  };
});
