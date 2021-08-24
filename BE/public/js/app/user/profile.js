let app = new AppApi();
let DOM = {};
let user = {};
DOM.fillData = function (o) {
  let ss = new Date(o.profile.birthDate).toISOString().split("T")[0];
  DOM.profileFrm.fullName.value = o.profile.fullName;
  DOM.profileFrm.gender.checked = o.profile.gender;
  DOM.profileFrm.birthDate.value = new Date(o.profile.birthDate)
    .toISOString()
    .split("T")[0];
  DOM.profileFrm.address.value = o.profile.address;
  DOM.profileFrm.phoneNumber.value = o.profile.phoneNumber;
  DOM.profileFrm.email.value = o.email;
};
user.updateProfile = function (o) {
  app.User.UPDATE_PROFILE(o)
    .then((ret) => {
      if (ret.error) {
        if (ret.status == undefined) document.location.href = "/user/login";
        else helper.msg(ret.msg, true);
      } else {
        if (typeof ret == String && ret.indexOf("Need to Login"))
          document.location.reload();
        else {
          helper.msg("Change your Profile successfully,we will go to shop");
          setTimeout(function () {
            document.location.href = "/shop";
          }, 2000);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
user.GET = function () {
  app.User.PROFILE()
    .then((ret) => {
      if (ret.error) {
        console.log(ret);
      } else {
        console.log(ret.data);
        DOM.fillData(ret.data);
      }
    })
    .catch((err) => {
      //   helper.msg("BAD REQUEST", true);
      console.log(err);
    });
};
$(document).ready(function () {
  user.GET();
  DOM.profileFrm = document.getElementById("profileFrm");
  DOM.profileFrm.onsubmit = function (ev) {
    ev.preventDefault();
    user.updateProfile({
      fullName: this.fullName.value,
      gender: this.gender.checked,
      phoneNumber: this.phoneNumber.value,
      address: this.address.value,
      birthDate: new Date(this.birthDate.value),
    });
  };
});
