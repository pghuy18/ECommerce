let app = new AppApi();
let DOM = {};

let category = {};
let product = {};
let productInfo = {};
DOM.pushOptionToSelect = function (o) {
  DOM.createFrm.querySelector("#selectInfo").appendChild(DOM.createOption(o));
  DOM.updateFrm.querySelector("#selectInfo").appendChild(DOM.createOption(o));
};
productInfo.GET = function () {
  app.ProductInfo.GET()
    .then((ret) => {
      if (ret.error) helpers.msg(ret.msg, true);
      else {
        if (ret.data.length > 0) {
          let arr = [];
          // console.log(ret.data);
          for (let i in ret.data) {
            arr[ret.data[i]._id] = ret.data[i].name;
            DOM.pushOptionToSelect(ret.data[i]);
          }
          productInfo.list = arr;
        }
      }
    })
    .then(product.GET())
    .catch((err) => {
      helper.msg("BAD REQUEST", true);
      console.log(err);
    });
};

DOM.tableShow = function () {
  let info = app.ProductInfo.GET();
  let products = app.Product.GET();
};

DOM.createOption = function (o) {
  let elm = document.createElement("option");
  elm.className = "form-control";
  elm.value = o._id;
  elm.textContent = o.name;
  return elm;
};

DOM.infoSelect = function (elm) {
  let select = elm.querySelector("#selectInfo");
  let inputInfo = elm.querySelector("#inputInfo");
  let txtInfo = elm.querySelector("#txtInfo");
  select.onchange = function () {
    if (this.selectedIndex > 0) {
      let s = this.options[this.selectedIndex];
      if (inputInfo.value) {
        //check duplicate
        if (inputInfo.value.indexOf(s.value) < 0) {
          inputInfo.value += "," + s.value;
          txtInfo.textContent += "," + s.text;
        }
      } else {
        inputInfo.value += s.value;
        txtInfo.textContent += s.text;
      }
    }
  };
};
DOM.setEventUpdate = function (elm) {
  elm.onclick = function () {
    // alert("abc");
    DOM.createFrm.style = "display:none";
    DOM.updateFrm.style = "display:block";
    let tr = this.parentNode.querySelectorAll("td");
    let o = {
      id: this.parentNode.getAttribute("value"),
      info: tr[0].textContent,
      price: tr[3].getAttribute("value"),
      size: tr[4].textContent.substring(0, tr[4].textContent.length - 3),
      quantity: tr[5].textContent,
    };
    DOM.updateFrm.price.value = o.price;
    DOM.updateFrm.size.value = o.size;
    DOM.updateFrm.quantity.value = o.quantity;
    DOM.updateFrm.id.value = o.id;
    DOM.updateFrm.info.value = o.info;
    let opts = DOM.updateFrm.info.querySelectorAll("option");

    for (let i in opts)
      if (opts[i].textContent == o.info) DOM.updateFrm.info.selectedIndex = i;

    setTimeout(function () {
      $("#updateFrm").trigger("reset");
      DOM.updateFrm.id.value = "";
    }, 1000 * 60 * 10);
  };
};
DOM.setEventDelete = function (elm) {
  elm.onclick = function () {
    if (confirm("SURE TO DELETE")) {
      let id = this.parentNode.getAttribute("value");
      app.Product.DELETE(id)
        .then((ret) => {
          if (ret.error) helper.msg(ret.msg, true);
          else {
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

DOM.moneyFormat = function (price) {
  let formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  return formatter.format(price);
};

product.pushCategory = function (arr) {
  //o is array with id and name
  if (arr.length > 0) {
    let s = [];
    s.push(`<td>`);
    for (let i in arr) s.push(`${arr[i].name} `);
    s.push(`</td>`);
    return s.join("");
  }
};
product.pushOne = function (o) {
  let s = [];

  s.push(
    `<tr id="id${o._id}" info="${o.info._id}" value="${o._id}"
         ${o.quantity <= 0 ? `style = "background-color: darkgrey;"` : ""}   >`
  );
  s.push(`<td>${o.info.name}</td>`);
  s.push(
    `<td><img width="100px" src="/images/productInfo/${o.info.imgUrl}" alt="${o.info.imgUrl}"></td>`
  );
  s.push(product.pushCategory(o.info.category));
  s.push(`<td style="color:red;" value=${o.price}>${DOM.moneyFormat(o.price)}</td>`);
  s.push(`<td>${o.size} mg</td>`);
  s.push(
    `<td style="text-align: center; color:green;font-size: 45px; font-weight: bold">${o.quantity}</td>`
  );
  s.push(`<td class="update">UPDATE</td>`);
  s.push(`<td class="del">DELETE</td>`);
  s.push(`</tr>`);
  return s.join("");
};
product.POST = function (o) {
  app.Product.POST(o)
    .then((ret) => {
      if (ret.error) helper.msg(ret.msg, true);
      else {
        // console.log(ret.data);
        DOM.sheet.insertAdjacentHTML("afterbegin", product.pushOne(ret.data));
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
product.GET = function () {
  app.Product.GET()
    .then((ret) => {
      if (ret.error) helper.msg(ret.msg, true);
      else {
        // console.log(ret.data.length);
        console.log(ret.data);
        if (ret.data.length > 0) {
          for (let i = ret.data.length - 1; i >= 0; i--) {
            DOM.sheet.insertAdjacentHTML("afterbegin", product.pushOne(ret.data[i]));
            DOM.setEventDelete(DOM.sheet.querySelector("td.del"));
            DOM.setEventUpdate(DOM.sheet.querySelector("td.update"));
          }
        }
      }
    })
    .catch((err) => {
      helper.msg("BAD REQUEST", true);
      console.log(err);
    });
};
product.PUT = function (o) {
  // console.log(o);
  app.Product.PUT(o)
    .then((ret) => {
      if (ret.error) helper.msg(ret.msg, true);
      else {
        // console.log(ret);
        let promise = new Promise(function (resolve, reject) {
          let t = DOM.sheet.querySelector(`tr#id${ret.data._id}`);
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
  productInfo.GET();
  DOM.createFrm.onsubmit = function (ev) {
    ev.preventDefault();
    product.POST({
      price: this.price.value,
      quantity: this.quantity.value,
      size: this.size.value,
      info: this.info.value,
    });
  };
  DOM.updateFrm.onsubmit = function (ev) {
    ev.preventDefault();
    product.PUT({
      id: this.id.value,
      price: this.price.value,
      quantity: this.quantity.value,
      size: this.size.value,
      info: this.info.value,
    });
    // category.PUT({ id: this.id.value, name: this.name.value });
  };
});
