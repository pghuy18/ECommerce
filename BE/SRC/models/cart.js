const Cart = require("./model").Cart;
const chalk = require("chalk");
const helper = require("../helper");
const selectFields = ["-createdAt", "-updatedAt"];
const populateOpt = {
  path: "item",
  select: selectFields,
  populate: {
    path: "info",
    select: selectFields,
    populate: { path: "category", select: ["name"] },
  },
};

module.exports.checkout = async (o) => {};

module.exports.removeOne = async (token) => {
  try {
    let ret = await Cart.findOneAndDelete({ token: token });
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.delete = async (o) => {
  try {
    console.log(o);
    let ret =
      o.username == null
        ? await Cart.findOneAndUpdate(
            { token: o.token },
            {
              $set: {
                updatedAt: new Date(),
                item: [],
              },
            }
          )
        : await Cart.findOneAndUpdate(
            { customer: o.username },
            {
              $set: {
                updatedAt: new Date(),
                item: [],
              },
            }
          );
    console.log("result", ret);
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.deleteProductById = async (o) => {
  try {
    let cart = await Cart.findOne({ token: o.token });
    if (cart.item.indexOf(o.id) > -1) cart.item.splice(cart.item.indexOf(o.id), 1);
    cart.updatedAt = new Date();
    let ret = await Cart.findOneAndUpdate(
      { token: cart.token },
      { $set: { item: cart.item } },
      { new: true }
    );
    // let t = await Cart.findOneAndUpdate({ token: cart.token }, {}, { new: true });

    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.update = async (o) => {
  try {
    // console.log(chalk.red("model update"), o);
    o.updatedAt = new Date();
    let ret =
      o.username == null
        ? await Cart.findOneAndUpdate({ token: o.token }, o)
        : await Cart.findOneAndUpdate({ customer: o.customer }, o);
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.create = async (o) => {
  try {
    let newCart = new Cart(o);
    console.log(chalk.blue("new cart"), newCart);
    let ret = await newCart.save();
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getByToken = async (token, pop = true) => {
  try {
    let ret =
      pop == true
        ? await Cart.findOne({ token: token }).populate(populateOpt)
        : await Cart.findOne({ token: token });
    // console.log(chalk.blue("result"), ret);
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getByUsername = async (usr, pop = true) => {
  try {
    let ret =
      pop == true
        ? await Cart.findOne({ customer: usr }).populate(populateOpt)
        : await Cart.findOne({ customer: usr });
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};
