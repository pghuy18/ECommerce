const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("./model").Product;
const ProductInfo = require("./model").ProductInfo;
const chalk = require("chalk");

const selectFields = ["-createdAt", "-updatedAt"];
const populateOpt = {
  path: "info",
  select: selectFields,
  populate: { path: "category", select: ["name"] },
};

module.exports.update = async (o) => {
  console.log(chalk.red("model "), o);
  try {
    o.updatedAt = new Date();
    let ret;
    await Product.findByIdAndUpdate(o.id, o, { new: true }).then((data) => {
      ret = data.populate(populateOpt).execPopulate();
    });
    return ret;
  } catch (err) {
    console.log(chalk.red("model-product-update"), err);
    throw new Error(err);
  }
};

module.exports.deleteById = async (id) => {
  try {
    let ret = await Product.findByIdAndRemove(id);
    console.log(chalk.blue("model delte"), ret);
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getById = async (id) => {
  try {
    let ret = await Product.findById(id).populate(populateOpt);
    return ret;
  } catch (err) {
    console.log("model-product-getbyId", err);
    return null;
    throw new Error(err);
  }
};

module.exports.create = async (o) => {
  try {
    let newProduct;
    await new Product(o).save().then((data) => {
      newProduct = data.populate(populateOpt).execPopulate();
    });
    return newProduct;
  } catch (err) {
    console.log("model-product-create", err);
    throw new Error(err);
  }
};
module.exports.getSearchAggregate = async (q) => {
  // let agg = [];
  // agg.push({
  //   $match: {
  //     name: { $regex: q, $options: "i" },
  //   },
  // });
  // agg.push({
  //   $lookup: {
  //     from: "products",
  //     localField: "_id",
  //     foreignField: "info",
  //     as: "product",
  //   },
  // });
  // let ret = await ProductInfo.aggregate(agg);
};

module.exports.getSearchCount = async (q) => {
  try {
    let idlist = await ProductInfo.find({ $text: { $search: new RegExp(q) } }).select(
      "_id"
    );
    if (idlist.length > 0) {
      idlist = idlist.map(function (o) {
        return o._id;
      });
      let count = await Product.find({ info: { $in: idlist } }).countDocuments();
      return count;
    }
    return null;
  } catch (err) {
    console.log(chalk.red(err));
    throw new Error(err);
  }
};

module.exports.getSearchByName = async (q, p = 1, size = 20) => {
  try {
    let idlist = await ProductInfo.find({ $text: { $search: new RegExp(q) } }).select(
      "_id"
    );
    if (idlist.length > 0) {
      idlist = idlist.map(function (o) {
        return o._id;
      });
      let count = await Product.find({ info: { $in: idlist } }).countDocuments();
      let ret = await Product.find({ info: { $in: idlist } })
        .populate(populateOpt)
        .skip((p - 1) * size)
        .limit(size);
      return ret;
    }
    return null;
  } catch (err) {
    console.log(chalk.red(err));
    throw new Error(err);
  }
};

module.exports.getPage = async (p = 1, size = 20) => {
  try {
    let ret = await Product.find({})
      .populate(populateOpt)
      .skip((p - 1) * size)
      .limit(size)
      .sort({ updatedAt: -1 });
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.count = async () => {
  try {
    let ret = await Product.countDocuments();
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports.getAll = async () => {
  try {
    let ret = await Product.find({}).populate(populateOpt).sort({ updatedAt: -1 });
    console.log(ret);
    //let a = await Product.find().populate("info").sort({ updatedAt: -1 });
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

// module.exports.fillAllProdut = async () => {
//   try {
//     // let ret = await Product.find({ quantity: 1 });
//     // ret.map((o) => (o.quantity *= 3));
//     let ret = await Product.updateMany(
//       { quantity: 1 },
//       {
//         $inc: { quantity: 3 },
//       }
//     );
//     // console.log(ret);
//     return ret;
//   } catch (err) {
//     throw new Error(err);
//   }
// };
