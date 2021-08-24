const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductInfo = require("./model").ProductInfo;
const Product = require("./model").Product;
const chalk = require("chalk");

const app = require("./app");
module.exports.update = async (o) => {
  try {
    o.updatedAt = new Date();
    let ret = await ProductInfo.findByIdAndUpdate(o.id, o, { new: true });
    console.log(chalk.blue("after update"), ret);
    return ret;
  } catch (err) {
    console.log(chalk.red(err));
    throw new Error(err);
  }
};

module.exports.deleteById = async (id) => {
  try {
    let ret = await ProductInfo.findByIdAndRemove(id);
    //console.log(chalk.blue("model delte"), ret);
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getById = async (id) => {
  try {
    let ret = await ProductInfo.findById(id);
    return ret;
  } catch (err) {
    return null;
    throw new Error(err);
  }
};

module.exports.create = async (o) => {
  try {
    console.log(chalk.blue("create now"), o);
    // let product = {
    //   price: 10000,
    //   quantity: 10,
    //   size: 1,
    // };
    // for (let i = 1; i < 51; i++) {
    //   let info = Object.assign({}, o);
    //   info.name += i;
    //   info.quote += i;
    //   info.description += i;

    //   let newInfo = new ProductInfo(info);

    //   newInfo.save().then((val) => {
    //     let pro = Object.assign({}, product);
    //     pro.price += i;
    //     pro.quantity += i;
    //     pro.size += i;
    //     pro.info = val._id;
    //     let newProduct = new Product(pro);
    //     newProduct.save();
    //   });
    // }
    let newProductInfo = await new ProductInfo(o).save();
    return newProductInfo;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getSearch = async (q) => {
  try {
    let ret = await ProductInfo.find({ name: { $regex: q, $options: "i" } });
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getPage = async (p, size = 10) => {
  try {
    // console.log(chalk.blue("page,size"), p, size);
    let ret = await ProductInfo.find()
      .skip((p - 1) * size)
      .limit(size);
    // console.log(chalk.blue("MODELS"), ret);
    // console.log(chalk.blue("MODELS"));
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.count = async () => {
  try {
    let ret = await ProductInfo.countDocuments();
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports.getAll = async () => {
  try {
    console.log("we are here");
    let a = await ProductInfo.find()
      .populate({ path: "category", select: "name" })
      .sort({ updatedAt: -1 });
    return a;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getByName = async (name) => {
  try {
    console.log("we are here");
    let ret = await ProductInfo.findOne({ name: name });
    return ret;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

module.exports.getByNameAndId = async (o) => {
  try {
    console.log("we are here");
    let ret = await ProductInfo.findOne({ name: o.name, _id: o._id });
    return ret;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
