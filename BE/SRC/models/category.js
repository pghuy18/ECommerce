const Category = require("./model").Category;

module.exports.deleteById = async (id) => {
  try {
    let ret = await Category.findByIdAndDelete(id);
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.update = async (o) => {
  try {
    o.updatedAt = new Date();
    let ret = await Category.findByIdAndUpdate(o.id, o, { new: true });
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.create = async (o) => {
  try {
    let newCategory = await new Category(o).save();
    return newCategory;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getById = async (id) => {
  try {
    let ret = await Category.findById(id);
    return ret;
  } catch (err) {
    return null;
    throw new Error(err);
  }
};

module.exports.getAll = async () => {
  try {
    let ret = await Category.find().sort({ updatedAt: -1 });

    return ret;
  } catch (err) {
    throw new Error(err);
  }
};
