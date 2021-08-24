require("../configs/configs").connectDatabase();
const app = require("../models/app");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let t = async function () {
  let ret = await app.Product.getAll();
  let info = await app.ProductInfo.getAll();
  // console.log(ret[0].info.category);
  //console.log(info);

  console.log(ret);
  console.log(ret[0].info);
  console.log(ret[0].info.category[0]);
};
// t();
let s = "Abc";
console.log(Schema.Types.ObjectId(s));
