const app = new AppApi();

// function test() {
//   axios
//     .get("http://localhost:3000/api/category")
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   axios
//     .get("http://168.63.133.155/api/Covid/GetCityList")
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

$(document).ready(function () {
  let btn = document.getElementById("cartBtn");
  let frm = document.getElementById("cartFrm");
  console.log(frm);
  // test();
  frm.onsubmit = function (ev) {
    ev.preventDefault();
    app.Cart.POST({
      productId: this.productId.value,
      quantity: this.quantity.value || 1,
    })
      .then((ret) => {
        if (ret.error) helper.msg(ret.msg, true);
        else {
          helper.msg(`Add to your cart successfully`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // btn.onclick = function () {
  //   app.Cart.POST({
  //     productId: this.getAttribute("value"),
  //     quantity: this.getAttribute("quantity"),
  //   })
  //     .then((ret) => {
  //       if (ret.error) helper.msg(ret.msg, true);
  //       else {
  //         helper.msg(`Add your cart successfully`);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
});
