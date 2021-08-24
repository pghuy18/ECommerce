let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
for (let i = 0; i <= a.length - 1; i++) {
  if (i % 3 == 0) console.log(a.slice(i, i + 3));
}

// let urlDtb = `mongodb+srv://admin:admin@coffee.a9wil.mongodb.net/coffee?retryWrites=true&w=majority`;
// require("../configs/configs").testConnectDatabase(urlDtb);
// let a = [
//   {
//     id: 1,
//     price: 1000,
//     name: "ewq",
//   },
//   {
//     id: 2,
//     price: 500,
//     name: "abd",
//   },
//   {
//     id: 3,
//     price: 5000,
//     name: "def",
//   },
// ];
// let t = "1";
// switch (t) {
//   case 1: {
//     console.log("t");
//   }
// }
// console.log(a[0].name < a[1].name);
// let arr = [1, 9, 8, 2, 3, 2];
// let asc = a.sort((a, b) => {
//   return a.price - b.price;
// });
// let sttr = a.sort((a, b) => {
//   return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
// });
// console.log(asc);
// for (let i in a) {
//   switch (a[i].name) {
//     case "n1": {
//       console.log("1+1");
//       break;
//     }
//     case 2: {
//       console.log("2+2");
//       break;
//     }
//     case 3: {
//       console.log("3+3");
//       break;
//     }
//   }
// }
const app = require("../models/app");
async function abc() {
  let ret = await app.Product.getPage(1, 10);
  let map = ret.map((o) => {
    return { price: o.price, size: o.size };
  });

  let filter = ret.filter((o) => {
    if (o.price % 2 == 0) return o;
  });

  let asc = ret.sort((a, b) => {
    return a.updatedAt - b.updatedAt;
  });
  // console.log(asc);
}
abc();
