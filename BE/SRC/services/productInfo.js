const fs = require("fs");
const path = require("path");
module.exports.deleteFile = (name) => {
  try {
    fs.unlinkSync(path.join(__dirname, `../../public/images/coffee/${name}`));
  } catch (err) {
    throw new Error(err);
  }
};
