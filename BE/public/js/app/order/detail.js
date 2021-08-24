const app = new AppApi();
order = {};
order.GET = function () {
  let id = document.location.href;
  id = id.substr(id.lastIndexOf("/") + 1);
  app.Order.GET(id)
    .then((ret) => {
      if (ret.error) {
        helper.msg(ret.msg, false);
      } else return ret.data;
    })
    .then((data) => {
      let frm = document.getElementById("frm");
      let infor = document.getElementById("infor");
      infor.querySelector("#receiver").textContent = data.receiver.toUpperCase();
      let address = data.address.split(",");
      let len = address.length;
      address = `${address[0]}, ${address[len - 3]}, ${address[len - 2]}, ${
        address[len - 1]
      }`;
      infor.querySelector("#address").textContent = `${address}`;
      infor.querySelector("#phone").textContent = data.phone;
      infor.querySelector("#cost").textContent = moneyFormat(data.cost);
      frm.onsubmit = function (ev) {
        ev.preventDefault();
      };
    })
    .catch((err) => {
      console.log(err);
    });
};

$(document).ready(function () {
  //   alert("asd");
  let t = document.getElementsByClassName("card");
  let frm = document.getElementById("frm");
  for (let i in t) {
    t[i].onclick = function () {
      frm.style.display = "";
      for (let j in t) {
        let s = ` ${t[j].className}`;
        if (s.match("paymentChoose")) t[j].classList.toggle("paymentChoose");
      }
      this.classList.toggle("paymentChoose");
      if (this.id == "cash") frm.style.display = "none";
    };
  }
  order.GET();
});
