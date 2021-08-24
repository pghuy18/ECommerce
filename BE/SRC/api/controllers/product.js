const app = require("../../models/app");
const helper = require("../../helper");
const chalk = require("chalk");

module.exports.SEARCH = async (req, res) => {
  try {
    console.log("search api", req.body);
    if (req.body) {
      let q = req.body.q || "";
      let ret = await app.Product.getSearchByName(q, req.body.skip);
      if (ret) return res.status(200).json(helper.stt200(ret));
    }
  } catch (err) {
    return res.status(500).json(helper.stt500());
    return res.status(500).render("error", { layout: false, message: "SERVER ERROR" });
  }

  return res.status(400).json(helper.stt400());
};

module.exports.PAGE = async (req, res) => {
  let p = req.params.p || 1;

  console.log(chalk.red("here we go product PAGE"), p);
  try {
    let ret = await app.Product.getPage(p);
    if (ret) return res.status(200).json(helper.stt200(ret));
  } catch (err) {
    return res.status(500).json(helper.stt500());
  }

  return res.status(400).json(helper.stt400());
};

module.exports.DELETE = async (req, res) => {
  if (req.params.id) {
    try {
      let ret = await app.Product.deleteById(req.params.id);
      if (ret) return res.status(200).json(helper.stt200(ret));
    } catch (err) {
      return res.status(500).json(helper.stt500(err));
    }
  }
  return res.status(400).json(helper.stt400());
};

module.exports.PUT = async (req, res) => {
  if (res.locals.data) {
    try {
      let ret = await app.Product.update(res.locals.data);
      if (ret) return res.status(200).json(helper.stt200(ret));
    } catch (err) {
      return res.status(500).json(helper.stt500());
    }
  }
  return res.status(400).json(helper.stt400());
};

module.exports.POST = async (req, res) => {
  if (res.locals.data) {
    try {
      let ret = await app.Product.create(res.locals.data);
      if (ret) return res.status(200).json(helper.stt200(ret));
    } catch (err) {
      return res.status(500).json(helper.stt500());
    }
  }
  return res.status(400).json(helper.stt400());
};

// module.exports.GETONE = async (req, res) => {
//   console.log(req.params);
//   if (req.params.id) {
//     try {
//       console.log(chalk.red("here we go"), req.params);
//       let ret = await app.Product.getById(req.params.id);

//       // console.log(chalk.blue("ret now"), ret);
//       if (ret) return res.status(200).json(helper.stt200(ret));
//     } catch (err) {
//       return res.status(500).json(helper.stt500(err));
//     }
//   }
//   return res.status(400).json(helper.stt400());
// };

module.exports.GET = async (req, res) => {
  try {
    // console.log(chalk.red("here we go"), req.params);
    let ret = req.params.id
      ? await app.Product.getById(req.params.id)
      : await app.Product.getAll();
    //console.log(chalk.blue("ret now"), json(helper.stt200(ret)));
    //console.log(ret);
    if (ret) return res.status(200).json(helper.stt200(ret));
  } catch (err) {
    return res.status(500).json(helper.stt500());
  }
  return res.status(400).json(helper.stt400());
};
