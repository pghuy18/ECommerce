let app = new AppApi();
let cart = {};
let DOM = {};
function pushProduct(o) {
  // console.log(o);
  let s = [];
  s.push("<tr>");
  s.push(` <td>${o.item.info.name} ${o.item.size}gr x${o.quantity}</td>`);
  s.push(` <td>${o.item.info.subname}</td>`);
  s.push(` <td>${DOM.moneyFormat(o.unitPrice)}</td>`);
  s.push(`<td id="del" value=${o.item._id}>Delete</td>`);
  s.push("</tr>");
  return s.join("");
}

cart.PUT = () => {
  {
    let dels = document.querySelectorAll("#del");
    for (let i in dels) {
      dels[i].onclick = function () {
        app.Cart.PUT({ id: this.getAttribute("value") })
          .then((ret) => {
            if (ret.error) helper.msg(ret.msg, true);
            else {
              helper.msg(ret.msg);
              this.parentNode.parentNode.removeChild(this.parentNode);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
    }
  }
};

cart.DELETE = () => {
  // alert("Abc");
  app.Cart.DELETE()
    .then((ret) => {
      if (!ret.error) {
        sheet.textContent = "";
        sheet.insertAdjacentHTML(
          "afterbegin",
          `   <tr>
          <td></td>
          <td></td>
          <td></td>
          <td><button>CHECKOUT</button></td>
        </tr>`
        );
      }
      ret.error ? helper.msg(ret.msg, true) : helper.msg(ret.msg);
    })
    .catch((err) => {
      console.log(err);
    });
};
DOM.moneyFormat = function (price) {
  let formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(price);
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
    .then((o) => {
      let s = [];
      let total = 0;
      let itemList = groupByProduct(o.item);
      // console.log(o);
      for (let i in itemList) {
        s.push(pushProduct(itemList[i]));
        total += itemList[i].unitPrice * itemList[i].quantity;
      }

      sheet.insertAdjacentHTML("afterbegin", s.join(""));
      document.getElementById("total").textContent = DOM.moneyFormat(total);
      cart.PUT();
    })
    .catch((err) => {
      console.log(err);
    });
};

$(document).ready(async function () {
  const sheet = document.getElementById("sheet");
  const clearCart = document.getElementById("clearCart");
  cart.GET();
  clearCart.onclick = function () {
    if (confirm("sure to clear your cart")) cart.DELETE();
  };
  let checkoutBtn = document.getElementById("checkoutBtn");
  checkoutBtn.onclick = function () {
    let total = document.getElementById("total");
    if (sheet.querySelector("#del")) {
      location.href = "/cart/checkout";
    } else {
      alert("You have no product in your cart");
    }
  };
});
