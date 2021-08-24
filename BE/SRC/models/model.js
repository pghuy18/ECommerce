const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// item: [
//   { id: { type: String, ref: "products" } },
//   { num: { type: Number, default: 1 } },
// ],

const order = new Schema(
  {
    address: { type: String, required: true },
    receiver: { type: String, required: true },
    phone: { type: String, required: true },
    cost: { type: Number },
    username: { type: String, ref: "users", default: null },
    item: [{ type: String, ref: "products" }],
  },
  { timestamps: true }
);

const cart = new Schema(
  {
    token: { type: String, required: true },
    customer: { type: String, ref: "users", default: null },
    item: [{ type: String, ref: "products" }],
    expireAt: { type: Number, expires: 3600 * 24 * 30 },
  },
  { timestamps: true }
);
const user = new Schema(
  {
    email: {
      type: String,
      default: new mongoose.Types.ObjectId().toHexString() + "@email.com",
      unique: true,
      lowercase: true,
    },
    username: {
      type: String,
      min: 30,
      max: 100,
      lowercase: true,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      min: 6,
      max: 50,
      require: true,
    },
    role: {
      type: String,
      default: "customer",
    },
    profile: {
      fullName: { type: String, uppercase: true, default: "NO NAME" },
      address: { type: String, default: "0/0/0 unknown road" },
      gender: { type: Boolean, default: 1 },
      birthDate: { type: Date, default: new Date() },
      phoneNumber: { type: String, minlength: 10, maxlenth: 10, default: "0000000000" },
    },
  },
  {
    timestamps: true,
  }
);

const product = new Schema(
  {
    info: { type: mongoose.Types.ObjectId, ref: "productInfo" },
    price: {
      type: Number,
      default: 1,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      required: true,
    },
    size: {
      type: Number,
      default: 0.5,
      required: true,
    },
  },
  { timestamps: true }
);

const productInfo = new Schema(
  {
    name: { type: String, unique: true, uppercase: true, index: "text" },
    subname: { type: String, index: "text" },
    imgUrl: { type: String, default: "default" },
    description: { type: String },
    category: [{ type: mongoose.Types.ObjectId, ref: "categories" }],
    bestChoice: { type: String, default: "" },
  },
  { timestamps: true }
);

// productInfo.index({ name: "text", subname: "text" });
const category = new Schema(
  {
    name: { type: String, unique: true, uppercase: true },
    // parent: { type: String, ref: "categories" },
  },
  { timestamps: true }
);

module.exports.Order = mongoose.model("orders", order, "orders");
module.exports.Cart = mongoose.model("carts", cart, "carts");
module.exports.User = mongoose.model("users", user, "users");
module.exports.Product = mongoose.model("products", product, "products");
module.exports.ProductInfo = mongoose.model("productInfo", productInfo, "productInfo");
module.exports.Category = mongoose.model("categories", category, "categories");
