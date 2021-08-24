let app = new AppApi();
let DOM = {};

let category = {};
let product = {};
let productInfo = {};
let user = {};

DOM.setEventUpdate = function (elm) {
  elm.onclick = function () {
    DOM.createFrm.style = "display:none";
    DOM.updateFrm.style = "display:block";

    DOM.updateFrm.username.value = elm.parentNode.getAttribute("value");
    setTimeout(function () {
      $("#updateFrm").trigger("reset");
      DOM.updateFrm.password.value = "";
    }, 1000 * 60 * 10);
  };
};
DOM.setEventDelete = function (elm) {
  elm.onclick = function () {
    if (confirm("SURE TO DELETE")) {
      let usr = this.parentNode.getAttribute("value");
      app.User.DELETE(usr)
        .then((ret) => {
          if (ret.error) helper.msg(ret.msg, true);
          else {
            helper.msg(`Delete "${ret.data.username}" successfully`);
            this.parentNode.parentNode.removeChild(this.parentNode);
          }
        })
        .catch((err) => {
          helper.msg("BAD REQUEST", true);
          console.log(err);
        });
    }
  };
};

user.pushOne = function (o) {
  let s = [];
  s.push(`<tr id="id${o.username}" value=${o.username}>`);
  s.push(`<td>${o.username}</td>`);
  s.push(`<td>${o.email}</td>`);
  s.push(`<td>${o.profile.fullName}</td>`);
  s.push(`<td>${o.profile.phoneNumber}</td>`);
  s.push(`<td>${new Date(o.profile.birthDate).toLocaleDateString()}</td>`);
  s.push(`<td class="update">UPDATE</td>`);
  s.push(`<td class="del">DELETE</td>`);
  s.push(`</tr>`);
  return s.join("");
};

user.PATCH = function (o) {
  // console.log(o);
  app.User.PATCH(o)
    .then((ret) => {
      if (ret.error) helper.msg(ret.msg, true);
      else {
        helper.msg(`Change password of "${ret.data.username}" successfully`);
        let promise = new Promise(function (resolve, reject) {
          let t = DOM.sheet.querySelector(`tr#id${ret.data.username}`);
          t.parentNode.removeChild(t);
          resolve();
        });
        promise
          .then(function () {
            DOM.sheet.insertAdjacentHTML("afterbegin", product.pushOne(ret.data));
          })
          .then(function () {
            DOM.setEventDelete(DOM.sheet.querySelector("td.del"));
            DOM.setEventUpdate(DOM.sheet.querySelector("td.update"));
          });
      }
    })
    .catch((err) => {
      helper.msg("BAD REQUEST", true);
      console.log(err);
    });
};

user.POST = function (o) {
  app.User.POST(o)
    .then((ret) => {
      if (ret.error) helper.msg(ret.msg, true);
      else {
        helper.msg(`Create "${ret.data.username}" successfully`);
        DOM.sheet.insertAdjacentHTML("afterbegin", user.pushOne(ret.data));
      }
    })
    .then(function () {
      DOM.setEventDelete(DOM.sheet.querySelector("td.del"));
      DOM.setEventUpdate(DOM.sheet.querySelector("td.update"));
    })
    .catch((err) => {
      helper.msg("BAD REQUEST", true);
      console.log(err);
    });
};

user.GET = function () {
  app.User.GET()
    .then((ret) => {
      if (ret.error) helper.msg(ret.msg, true);
      else {
        if (ret.indexOf("Access Denied") !== -1) {
          document.location.href = "/error/authorize";
        } else {
          if (ret.data.length > 0) {
            for (let i = ret.data.length - 1; i >= 0; i--) {
              DOM.sheet.insertAdjacentHTML("afterbegin", user.pushOne(ret.data[i]));
              DOM.setEventDelete(DOM.sheet.querySelector("td.del"));
              DOM.setEventUpdate(DOM.sheet.querySelector("td.update"));
              // console.log(DOM.sheet.querySelector("td.del"));
            }
          }
        }
      }
    })
    .catch((err) => {
      helper.msg("BAD REQUEST", true);
      console.log(err);
    });
};
$(document).ready(function () {
  DOM.create = document.getElementById("btnCreate");
  DOM.sheet = document.getElementById("sheet");
  DOM.createFrm = document.getElementById("createFrm");
  DOM.updateFrm = document.getElementById("updateFrm");
  DOM.createClearBtn = document.getElementById("createClearBtn");

  DOM.create.onclick = function () {
    DOM.updateFrm.style = "display:none";
    DOM.createFrm.style = "display:block";
  };
  user.GET();
  DOM.createFrm.onsubmit = function (ev) {
    ev.preventDefault();
    user.POST({
      email: this.email.value,
      username: this.username.value,
      password: this.password.value,
    });
  };
  DOM.updateFrm.onsubmit = function (ev) {
    ev.preventDefault();
    user.PATCH({
      username: this.username.value,
      password: this.password.value,
    });
    // category.PUT({ id: this.id.value, name: this.name.value });
  };
});
