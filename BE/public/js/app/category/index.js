let app = new AppApi();
let DOM = {};

let category = {};

category.pushOne = function (o) {
  let s = [];
  s.push(`<tr>`);
  s.push(`<td >${o.name}</td>`);
  s.push(
    `<td style="background-color:darksalmon;" class="update"id=id${o._id} value=${o._id}>UPDATE</td>`
  );
  s.push(`<td class="del" value=${o._id}>DELETE</td>`);
  s.push(`</tr>`);
  return s.join("");
};
category.setEventDelete = function (elm) {
  elm.onclick = function () {
    if (confirm("Sure to delete")) {
      DOM.updateFrm.style = "display:none";
      app.Category.DELETE(elm.getAttribute("value"))
        .then((ret) => {
          if (ret.error) helper.msg(ret.msg, true);
          else {
            helper.msg(`SUCCESSFULLY DELTE ${ret.data.name}`);
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
category.setEventUpdate = function (elm) {
  elm.onclick = function () {
    DOM.createFrm.style = "display:none";
    DOM.updateFrm.style = "display:block";
    let tr = elm.parentNode.querySelectorAll("td");
    DOM.updateFrm.id.value = this.getAttribute("value");
    DOM.updateFrm.name.value = tr[0].textContent;
    setTimeout(function () {
      DOM.updateFrm.id.value = "";
      DOM.updateFrm.name.value = "";
    }, 1000 * 60 * 10);
  };
};

category.PUT = function (o) {
  app.Category.PUT(o)
    .then((ret) => {
      if (ret.error) helper.msg(ret.msg, true);
      else {
        let promise = new Promise(function (resolve, reject) {
          let t = DOM.sheet.querySelector(`tr>td#id${ret.data._id}`);
          t.parentNode.parentNode.removeChild(t.parentNode);
          resolve();
        });
        promise.then(function () {
          DOM.sheet.insertAdjacentHTML("afterbegin", category.pushOne(ret.data));
          category.setEventUpdate(DOM.sheet.querySelector("td.update"));
          category.setEventDelete(DOM.sheet.querySelector("td.del"));
        });
      }
    })
    .catch((err) => {});
};
category.POST = function (o) {
  // console.log(o.name.value);
  app.Category.POST(o)
    .then((ret) => {
      if (ret.error) helper.msg(ret.msg, true);
      else {
        console.log(ret);
        helper.msg(`Create ${ret.data.name}  successfully`);
        DOM.sheet.insertAdjacentHTML("afterbegin", category.pushOne(ret.data));
        category.setEventUpdate(DOM.sheet.querySelector("td.update"));
        category.setEventDelete(DOM.sheet.querySelector("td.del"));
        DOM.createFrm.id.value = "";
        $("#createFrm").trigger("reset");
      }
    })
    .catch((err) => {
      helper.msg("BAD REQUEST", true);
      console.log(err);
    });
};
category.GET = function () {
  app.Category.GET()
    .then((ret) => {
      if (ret.error) helper.msg(ret.msg, true);
      else {
        console.log(ret.data);
        if (ret.data.length > 0) {
          for (let i in ret.data) {
            DOM.sheet.insertAdjacentHTML("beforeend", category.pushOne(ret.data[i]));
            category.setEventUpdate(DOM.sheet.querySelector("td.update"));
            category.setEventDelete(DOM.sheet.querySelector("td.del"));
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
  category.GET();
  DOM.createFrm.onsubmit = function (ev) {
    ev.preventDefault();
    category.POST({ name: this.name.value });
    // productInfo.POST(new FormData(DOM.createFrm));
  };
  DOM.updateFrm.onsubmit = function (ev) {
    ev.preventDefault();
    category.PUT({ id: this.id.value, name: this.name.value });
  };
});
