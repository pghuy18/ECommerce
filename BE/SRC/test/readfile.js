const fs = require("fs");
const path = require("path");
let link = path.join(__dirname, "../data/vietnam.json");
let rawdata = fs.readFileSync(link);
let data = JSON.parse(rawdata);
console.log(data[0]);
console.log("----------------------------------------");
console.log(data);
