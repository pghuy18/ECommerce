const Order = require("./model").Order;
const Cart = require("./model").Cart;
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
module.exports.createOrder = async (o, cartId) => {
  try {
    let ret = await new Order(o).save();
    let cartDelete = await Cart.findByIdAndDelete(cartId);
    if (ret && cartDelete) return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getOrderById = async (id) => {
  try {
    let ret = await Order.findById(id).populate(populateOpt);
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};
