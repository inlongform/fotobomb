const jimp = require("jimp");

const writeImage = (image, path, size, fileName) => {
  image
    .resize(size, jimp.AUTO, jimp.RESIZE_BEZIER)
    .write(`${path}/${fileName}`);
};

module.exports = writeImage;
