let app = new AppApi();
let cart = {};
var DOM = {};
function pushProduct(o) {
  // console.log(o);
  let s = [];
  s.push("<tr>");
  s.push(` <td>${o.item.info.name} ${o.item.size}gr x${o.quantity}</td>`);
  s.push(` <td>${o.item.info.subname}</td>`);
  s.push(` <td>${DOM.moneyFormat(o.unitPrice * o.quantity)}</td>`);
  s.push("</tr>");
  return s.join("");
}

DOM.moneyFormat = function (price) {
  let formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(price);
};

DOM.createOption = function (o) {
  let option = document.createElement("option");
  option.value = o.id;
  option.textContent = o.name;
  return option;
};

DOM.getDistrictByProvince = function (id = 1) {
  let arr = DOM.vietnam.filter((o) => {
    if (o.id == id) return o;
  });
  return arr[0].districts;
};

DOM.getWardByDistrict = function (id = 1) {
  let arr = DOM.district.filter((o) => {
    if (o.id == id) return o;
  });
  return arr[0].wards;
};

DOM.setEventSelect = function (elm) {
  elm.onchange = function () {
    if (this.selectedIndex > 0) {
      switch (this.getAttribute("id")) {
        case "province": {
          let arr = DOM.getDistrictByProvince(this.value);
          DOM.districtSelect.options.length = 0;
          DOM.districtSelect.appendChild(
            DOM.createOption({
              value: "",
              name: "Quận Huyện",
            })
          );
          DOM.wardSelect.options.length = 0;
          DOM.wardSelect.appendChild(
            DOM.createOption({
              value: "",
              name: "Xã Phường",
            })
          );
          for (let i in arr) {
            DOM.districtSelect.appendChild(DOM.createOption(arr[i]));
          }
          DOM.district = arr;
          DOM.districtSelect.selectedIndex = 0;
          DOM.wardSelect.selectedIndex = 0;
          break;
        }
        case "district": {
          let arr = DOM.getWardByDistrict(this.value);
          DOM.wardSelect.options.length = 0;
          DOM.wardSelect.appendChild(
            DOM.createOption({
              value: "",
              name: "Xã Phường",
            })
          );
          for (let i in arr) {
            DOM.wardSelect.appendChild(DOM.createOption(arr[i]));
          }
          DOM.ward = arr;
          DOM.wardSelect.selectedIndex = 0;
          break;
        }
        case "ward": {
          break;
        }
      }
    }
  };
};

DOM.addProvince = function () {
  let select = document.getElementById("province");
  let arr = DOM.province;
  for (let i in arr) {
    select.appendChild(DOM.createOption(arr[i]));
  }
};

DOM.fillData = function () {
  let arr = DOM.vietnam;
  DOM.province = arr.map((o) => {
    return {
      id: o.id,
      name: o.name,
    };
  });
};
DOM.getVietNam = function () {
  app.Cart.VIETNAM()
    .then((ret) => {
      DOM.vietnam = ret.data;
      DOM.fillData();
    })
    .then(function () {
      DOM.addProvince();
      let list = document.querySelectorAll(".vietnam");
      for (let i in list) {
        DOM.setEventSelect(list[i]);
      }
    })
    .catch((err) => {});
};

cart.GET = () => {
  app.Cart.GET()
    .then((ret) => {
      if (ret.error) {
        helper.msg(ret.msg, true);
      } else {
        return ret.data;
      }
    })
    .then((obj) => {
      let s = [];
      let itemList = groupByProduct(obj.item);
      DOM.item = obj.item.map((o) => o._id);
      DOM.cartId = obj._id;
      // let total = 0;
      for (let i in itemList) {
        s.push(pushProduct(itemList[i]));
        DOM.total += itemList[i].unitPrice * itemList[i].quantity;
      }
      document.getElementById("total").textContent = moneyFormat(DOM.total);

      sheet.insertAdjacentHTML("afterbegin", s.join(""));
      if (obj.customer != null) {
        DOM.total = DOM.total * 0.95;
        document.getElementById("total").textContent =
          "Discount 5%\n" + moneyFormat(DOM.total);
      } else document.getElementById("total").textContent = moneyFormat(DOM.total);
    })
    .then(function () {
      DOM.getVietNam();
    })
    .catch((err) => {
      console.log(err);
    });
};

$(document).ready(async function () {
  DOM.provinceSelect = document.getElementById("province");
  DOM.districtSelect = document.getElementById("district");
  DOM.wardSelect = document.getElementById("ward");
  DOM.frm = document.getElementById("frm");
  DOM.item = [];
  DOM.total = 0;
  const sheet = document.getElementById("sheet");
  const clearCart = document.getElementById("clearCart");
  cart.GET();
  frm.onsubmit = function (ev) {
    ev.preventDefault();
    let a = [];
    let province = DOM.vietnam.filter((o) => o.id == frm.province.value)[0];
    let district = province.districts.filter((o) => o.id == frm.district.value)[0];
    let ward = district.wards.filter((o) => o.id == frm.ward.value)[0];
    app.Order.POST({
      address: `${frm.address.value},${ward.name}, ${district.name}, ${province.name}`,
      receiver: frm.fullName.value,
      phone: frm.phoneNumber.value,
      cost: DOM.total,
      item: DOM.item,
      cartId: DOM.cartId,
    })
      .then((ret) => {
        console.log(ret);
        document.location.href = `/order/${ret.data._id}`;
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(`${frm.address.value},${ward.name}, ${district.name}, ${province.name}`);

    // console.log(frm.fullName.value);
    // console.log();
  };
  // DOM.frm.onsubmit() = function () {};
});
