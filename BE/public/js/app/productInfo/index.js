let app = new AppApi();
let DOM = {};
let productInfo = {};
let category = {};

DOM.formReset = function (frm) {
  frm.category.value = "";
  frm.querySelector("#txtCategory").textContent = "";
  frm.querySelector("#inputDecription").textContent = "";
  frm.querySelector("#inputSubname").textContent = "";
  frm.querySelector("#currentImg").src = "";
  let emptyFile = document.createElement("input");
  emptyFile.type = "file";
  frm.img.files = emptyFile.files;
  $(`#${frm.getAttribute("id")}`).trigger("reset");
};
DOM.frmCategoryDisplay = function (elm, arr) {
  for (let i in arr) {
    if (i == 0) {
      elm.category.value += arr[i];
      elm.querySelector("#txtCategory").textContent += category.list[arr[i]];
      continue;
    }
    elm.category.value += "," + arr[i];
    elm.querySelector("#txtCategory").textContent += "," + category.list[arr[i]];
  }
};

DOM.updateFrmClick = function (arr) {
  let o = {
    name: arr[0].textContent,
    imgUrl: arr[1].childNodes[0].getAttribute("alt"),
    subname: arr[2].textContent,
    description: arr[3].textContent,
    category: arr[4].getAttribute("value").split(","),
    id: arr[5].getAttribute("value"),
  };

  DOM.updateFrm.id.value = o.id;
  DOM.updateFrm.name.value = o.name;
  DOM.updateFrm.subname.textContent = o.subname;
  DOM.updateFrm.description.textContent = o.description;
  DOM.updateFrm.querySelector("#currentImg").src = `/images/productInfo/${o.imgUrl}`;
  DOM.updateFrm.imgUrl.value = o.imgUrl;
  DOM.updateFrm.category.value = "";
  DOM.updateFrm.querySelector("#txtCategory").textContent = "";
  DOM.frmCategoryDisplay(DOM.updateFrm, o.category);
  setTimeout(function () {
    DOM.updateFrm.style = "display:none";
  }, 1000 * 60 * 10);
};

DOM.setEventUpdate = function (elm) {
  elm.onclick = function () {
    DOM.createFrm.style = "display:none";
    DOM.updateFrm.style = "display:block";
    DOM.updateFrmClick(this.parentNode.querySelectorAll("td"));
  };
};

DOM.setEventDelete = function (elm) {
  elm.onclick = function () {
    if (confirm("SURE to DELETE")) {
      app.ProductInfo.DELETE(elm.getAttribute("value"))
        .then((ret) => {
          if (ret.error) helper.msg(ret.msg, true);
          else {
            this.parentNode.parentNode.removeChild(this.parentNode);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};
DOM.loadTable = function (arr) {
  let s = [];
  for (let i in arr) {
    s.push(productInfo.pushOne(arr[i]));
  }
  sheet.insertAdjacentHTML("afterbegin", s.join(""));
};

DOM.frmCategorySelect = function (elm) {
  let select = elm.querySelector("#selectCategory");
  let inputCategory = elm.querySelector("#inputCategory");
  let txtCategory = elm.querySelector("#txtCategory");
  select.onchange = function () {
    if (this.selectedIndex > 0) {
      let s = this.options[this.selectedIndex];
      if (inputCategory.value) {
        //check duplicate
        if (inputCategory.value.indexOf(s.value) < 0) {
          inputCategory.value += "," + s.value;
          txtCategory.textContent += "," + s.text;
        }
      } else {
        inputCategory.value += s.value;
        txtCategory.textContent += s.text;
      }
    }
  };
};

category.GET = function () {
  app.Category.GET()
    .then((ret) => {
      if (ret.error) helper.msg(ret.msg, true);
      else {
        if (ret.data.length > 0) {
          category.list = [];
          for (let i in ret.data) category.list[ret.data[i]._id] = ret.data[i].name;

          for (let i in ret.data) {
            DOM.updateFrm
              .querySelector("#selectCategory")
              .appendChild(category.pushOneToOption(ret.data[i]));
            DOM.createFrm
              .querySelector("#selectCategory")
              .appendChild(category.pushOneToOption(ret.data[i]));
          }
          let clearCategory = document.getElementById("btnClearCategory");
          clearCategory.onclick = function () {
            DOM.updateFrm.querySelector("#txtCategory").textContent = "";
            DOM.updateFrm.category.value = "";
            DOM.updateFrm.querySelector("#selectCategory").setAttribute("required", true);
          };
        }
      }
    })
    .then(function () {
      productInfo.GET();
    })
    .catch((err) => {
      console.log(err);
    });
};
category.pushOneToOption = function (o) {
  let elm = document.createElement("option");
  elm.className = "form-control";
  elm.value = o._id;
  elm.textContent = o.name;
  elm.setAttribute("v", o.name);
  return elm;
};

category.pushTable = function (o) {
  //o is array[]

  if (o.length > 0) {
    let s = [];
    let id = [];
    // s.push(`<td>`);
    if (!o[0].name) {
      for (let i in o) s.push(category.list[o[i]] + " ");
      id = o;
    } else {
      for (let i in o) {
        id.push(o[i]._id);
        s.push(o[i].name + " ");
      }
    }
    s.unshift(`<td value=${id.join(",")}>`);
    s.push(`</td>`);
    return s.join("");
  }
};
productInfo.pushOne = function (o) {
  let s = [];
  // console.log("push one", o.category + " " + o.name);
  s.push("<tr>");
  s.push(`<td>${o.name}</td>`);
  s.push(
    `<td><img src="/images/productInfo/${o.imgUrl}" alt="${o.imgUrl}" width="100px"/></td>`
  );
  s.push(`<td>${o.subname}</td>`);
  let descript = o.description.split(".");
  s.push(`<td style="display:block">${o.description}</td>`);
  s.push(category.pushTable(o.category));
  s.push(`  <td class="update" id=id${o._id} value=${o._id}>UPDATE</td>`);
  s.push(`<td class="del" value="${o._id}">DELETE</td>`);
  s.push("</tr>");
  return s.join("");
};
productInfo.PUT = function (o) {
  app.ProductInfo.PUT(o)
    .then((ret) => {
      if (ret.error) helper.msg(ret.msg, true);
      else {
        helper.msg("SUCCESSFULLY UPDATE");
        let p = new Promise(function (resolve, reject) {
          let t = DOM.sheet.querySelector(`tr>td#id${ret.data._id}`);
          t.parentNode.parentNode.removeChild(t.parentNode);
          resolve();
        });
        p.then(function () {
          DOM.sheet.insertAdjacentHTML("afterbegin", productInfo.pushOne(ret.data));
        }).then(function () {
          DOM.setEventUpdate(DOM.sheet.querySelector("tr >td.update"));
          DOM.setEventDelete(DOM.sheet.querySelector("td.del"));
          DOM.formReset(DOM.updateFrm);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

productInfo.DELETE = function (id) {};

productInfo.GET = function () {
  app.ProductInfo.GET()
    .then((ret) => {
      if (ret.error) helper.msg(ret.msg, true);
      else {
        if (ret.data.length > 0) {
          productInfo.list = ret.data;
          DOM.loadTable(ret.data);
          let updt = DOM.sheet.querySelectorAll("td.update");
          let dels = DOM.sheet.querySelectorAll("td.del");

          for (let i in updt) {
            DOM.setEventUpdate(updt[i]);
            DOM.setEventDelete(dels[i]);
          }
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

productInfo.POST = function (o) {
  // console.log(o.name);
  app.ProductInfo.POST(o)
    .then((ret) => {
      if (ret.error) helper.msg(ret.msg, true);
      else {
        // console.log(ret.data);
        sheet.insertAdjacentHTML("afterbegin", productInfo.pushOne(ret.data));
        helper.msg(`SUCESSFULLY TO CREATE ${ret.data.name}`);
        DOM.setEventDelete(DOM.sheet.querySelector("td.del"));
        DOM.setEventUpdate(DOM.sheet.querySelector("td.update"));
        DOM.formReset(DOM.createFrm);
        // DOM.createFrm.category.value = "";
        // document.getElementById("txtCategory").textContent = "";
        // $("#createFrm").trigger("reset");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
$(document).ready(function () {
  //get html elements
  console.log(document.getElementById("createFrm"));
  DOM.create = document.getElementById("btnCreate");
  DOM.sheet = document.getElementById("sheet");
  DOM.createFrm = document.getElementById("createFrm");
  DOM.updateFrm = document.getElementById("updateFrm");
  DOM.btn = document.getElementById("btn");
  DOM.selectCategory = document.getElementById("selectCategory");
  DOM.createClearBtn = document.getElementById("createClearBtn");

  DOM.createClearBtn.onclick = function () {
    DOM.createFrm.category.value = "";
    document.getElementById("txtCategory").textContent = "";
    DOM.formReset(DOM.createFrm);
  };
  category.GET();
  DOM.frmCategorySelect(DOM.createFrm);
  DOM.frmCategorySelect(DOM.updateFrm);
  DOM.create.onclick = function () {
    DOM.updateFrm.style = "display:none";
    DOM.createFrm.style = "display:block";
  };

  DOM.createFrm.onsubmit = function (ev) {
    ev.preventDefault();
    productInfo.POST(new FormData(DOM.createFrm));
  };
  DOM.updateFrm.onsubmit = function (ev) {
    ev.preventDefault();
    // console.log(this.querySelector("#selectCategory"));
    // console.log(this.category);
    productInfo.PUT(new FormData(DOM.updateFrm));
  };
});
