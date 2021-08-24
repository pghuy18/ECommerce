const helper = {};
helper.clearMsg = function (element) {
  document.getElementById("error_msg").style.display = "none";
  document.getElementById("success_msg").style.display = "none";
  document.getElementById("error_msg").innerText = "";
  document.getElementById("success_msg").innerText = "";
};
helper.msg = function (str = "BAD REQUEST", err = false) {
  this.clearMsg();
  let msg = err
    ? document.getElementById("error_msg")
    : document.getElementById("success_msg");
  msg.style.display = "block";
  msg.innerText = str;
  setTimeout(function () {
    msg.style.display = "none";
  }, 1000);
};
helper.moneyFormat = function (price) {
  let formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(price);
};

function groupBy(collection, property) {
  return result;
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function groupByProduct(productList) {
  // console.log(productList);
  const unique = [...new Set(productList.map((item) => item._id))];

  let result = [];
  for (let i in unique) {
    let temp = productList.filter((o) => o._id == unique[i]);
    let obj = {
      item: temp[0],
      unitPrice: temp[0].price,
      quantity: temp.length,
    };
    result.push(obj);
  }
  // console.log(result);
  return result;
}

function moneyFormat(price) {
  let formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(price);
}

function pushProduct(o) {
  console.log(o);
  let s = [];
  s.push("<tr>");
  s.push(` <td>${o.item.info.name} ${o.item.size}gr x${o.quantity}</td>`);
  s.push(` <td>${o.item.info.subname}</td>`);
  s.push(` <td>${DOM.moneyFormat(o.unitPrice * o.quantity)}</td>`);
  s.push(`<td id="del" value=${o.item._id}>Delete</td>`);
  s.push("</tr>");
  return s.join("");
}
