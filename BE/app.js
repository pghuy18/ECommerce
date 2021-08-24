require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const logger = require("morgan");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");
const multer = require("multer");
const upload = multer();
var cors = require("cors");
var app = express();

require(".//src/configs/configs").connectDatabase();

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "html");
// app.set("view engine", "ejs");
const helper = require("./src/helper");
app.engine(
  "html",
  expressHandlebars({
    extname: ".html",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "/src/views/layouts"),
    partialsDir: path.join(__dirname, "/src/views/partials"),
    helpers: {
      //list of function helper
      pag: helper.pag,
      page: helper.page,
      shop: helper.shop,
      money: helper.moneyFormat,
    },
  })
);

// view engine setup

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser(process.env.TOKEN_SECRECT));
app.use(express.static(path.join(__dirname, "public")));

//routing
const home = require("./src/routes/home");
const user = require("./src/routes/user");
const productInfo = require("./src/routes/productInfo");
const cart = require("./src/routes/cart");
const api = require("./src/api/route");
const admin = require("./src/routes/admin");
var indexRouter = require("./src/routes/index");
var order = require("./src/routes/order");
// app.use("/",home);
app.use("/admin", admin);
app.use("/api", api);
app.use("/cart", cart);
app.use("/order", order);
app.use("/user", user);
app.use("/", indexRouter);

// catch 404 and forward to error handler

//404 not found
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "ERROR", layout: false });
});

module.exports = app;
