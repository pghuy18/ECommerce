let app = new AppApi();
let product = {};
let DOM = {};

DOM.setEventCart = function () {
  let carts = document.querySelectorAll("button.add");
  for (let i in carts) {
    carts[i].onclick = function () {
      app.Cart.POST({ productId: this.getAttribute("value") })
        .then((ret) => {
          if (ret.error) helper.msg(ret.msg, true);
          else {
            helper.msg(`Successfully add your cart`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }
};

DOM.pushProductAll = function (arr) {
  let t = new Promise(function (resolve, reject) {
    for (let i = 0; i < arr.length; i++) {
      if (i % 3 == 0)
        DOM.sheet.insertAdjacentHTML(
          "beforeend",
          DOM.pushRowProductCard(arr.slice(i, i + 3))
        );
    }
    resolve();
  });
  t.then(function () {
    console.log("add event cart");
    DOM.setEventCart();
  });
};

DOM.pushRowProductCard = function (row) {
  console.log(row.length);
  let s = [];
  s.push(`  <div class="row">`);
  for (let i in row) {
    s.push(DOM.pushProductCard(row[i]));
  }
  s.push(`  </div>`);
  return s.join("");
};

DOM.pushProductCard = function (o) {
  let s = [];
  s.push(` <div class="cardproduct">`);
  s.push(
    ` <a href="/detail/${o._id}"><img src="/images/productInfo/${o.info.imgUrl}" widtd="30px" alt="${o.info.imgUrl}" class="imgproduct" /></a>`
  );
  s.push(
    `  <h2 id="productName" class="name" style="color:red">${o.info.name} ${o.size}gr </h2>`
  );
  s.push(
    `  <h3 id="productQuantity" style="color:darkcyan">Quantity: ${o.quantity} </h3>`
  );
  s.push(` <h3 class="subname">${o.info.subname}</h3>`);
  s.push(`  <div class="hc">
  <h4 id="productPrice" class="price" style="color:black">${helper.moneyFormat(
    o.price
  )}</h4><button class="add" value=${o._id}>Choose</button></div>`);
  s.push(`</div>`);
  return s.join("");
};

DOM.pushProduct = function (o) {
  let s = [];
  s.push(` <div class="col-3">`);
  s.push(` <div style="text-align: left"><b>${o.info.name} ${o.size}gr</b></div>`);

  s.push(`<div style="text-align: left">"${o.info.subname}"</div>`);
  s.push(`<div>
    <a href="/detail/${o._id}"
      ><img
        src="/images/productInfo/${o.info.imgUrl}"
        alt="${o.info.imgUrl}"
        width="100px"
      />
    </a>
  </div>`);
  s.push(` <div>
    <p><b>${o.price}</b></p>
  </div>`);

  s.push(`</div>`);
  return s.join("");
};

DOM.loadmoreEvent = function () {
  DOM.loadmore = document.getElementById("btnLoadmore");
  if (DOM.loadmore) {
    DOM.loadmore.onclick = function () {
      DOM.loadmore.value = DOM.loadmore.value * 1.0 + 1;
      app.Product.SEARCH({
        q: DOM.searchFrm.q.value,
        skip: DOM.loadmore.value,
      })
        .then((ret) => {
          if (ret.error) {
            helper.msg(ret.msg, true);
          } else {
            // console.log(ret.data);
            if (ret.data.length > 0) {
              DOM.pushProductAll(ret.data);
            } else {
              DOM.loadmore.style.display = "none";
            }
          }
        })
        .then(function () {
          DOM.setEventCart();
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }
};
DOM.init = function () {
  if (document.querySelectorAll("button.add").length > 0) DOM.setEventCart();
  if (document.getElementsByClassName("active page-item").length > 0) {
    DOM.page =
      document.getElementsByClassName("active page-item")[0].childNodes[0].textContent;
    product.PAGE(DOM.page);
  }
};
DOM.sortByName = function (key) {
  let arr = product.list.sort((a, b) => {
    return a.info.name > b.info.name ? 1 : a.info.name < b.info.name ? -1 : 0;
  });
  return key == 1 ? arr : arr.reverse();
};
DOM.sortByPrice = function (key) {
  let arr = product.list.sort((a, b) => {
    return a.price > b.price ? 1 : a.price < b.price ? -1 : 0;
  });
  // console.log(arr);
  return key == 1 ? arr : arr.reverse();
};
DOM.sortByLastest = function (key) {
  let arr = product.list.slice();
  return key == 1 ? arr : arr.reverse();
};
DOM.filterByPrice = function (value, s) {
  console.log(typeof value, value);
  if (s == 1)
    return product.list.filter((o) => {
      if (o.price >= value) return o;
    });
  if (s == -1)
    return product.list.filter((o) => {
      if (o.price < value) return o;
    });
};
DOM.filterChoose = function (elm) {
  elm.onchange = function () {
    if (this.selectedIndex > 0) {
      let arr;
      switch (this.id) {
        case "selectName": {
          arr = DOM.sortByName(this.value);
          document.getElementById("selectUpdated").selectedIndex = 0;
          document.getElementById("selectPrice").selectedIndex = 0;
          break;
        }
        case "selectUpdated": {
          arr = DOM.sortByLastest(this.value);
          document.getElementById("selectName").selectedIndex = 0;
          document.getElementById("selectPrice").selectedIndex = 0;
          break;
        }
        case "selectPrice": {
          let s = 1.0 * this.options[this.selectedIndex].getAttribute("s");
          if (s == 1 || s == -1) {
            if (this.value > 0) arr = DOM.filterByPrice(1.0 * this.value, s);
          } else {
            arr = DOM.sortByPrice(this.value);
          }
          document.getElementById("selectUpdated").selectedIndex = 0;
          document.getElementById("selectName").selectedIndex = 0;
          break;
        }
      }
      // console.log(
      //   arr.map((o) => {
      //     return {
      //       price: o.price,
      //       size: o.size,
      //       updatedAt: o.updatedAt,
      //       quantity: o.quantity,
      //     };
      //   })
      // );
      DOM.sheet.textContent = "";
      DOM.pushProductAll(arr);
    }
  };
};
DOM.eventFilter = function () {
  DOM.selectFilter = document.querySelectorAll(".filter");
  if (DOM.selectFilter) {
    for (let i in DOM.selectFilter) {
      DOM.filterChoose(DOM.selectFilter[i]);
    }
  }
};
product.PAGE = function (p) {
  app.Product.PAGE(p)
    .then((ret) => {
      if (ret.error) {
        helper.msg(ret.msg, true);
      } else {
        if (ret.data.length > 0) {
          product.list = ret.data;
          for (let i in ret.data)
            ret.data[i].updatedAt = new Date(ret.data[i].updatedAt).toLocaleDateString();
          DOM.pushProductAll(ret.data);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
$(document).ready(function () {
  // if (location.protocol != "https:") {
  //   location.protocol = "https:";
  // }
  DOM.searchFrm = document.getElementById("searchFrm");
  DOM.sheet = document.getElementById("sheet");
  DOM.init();
  DOM.loadmoreEvent();
  DOM.eventFilter();
});
