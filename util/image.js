const sharp = require("sharp");

module.exports = async (files) => {
  const data = await sharp(files.img.data).resize(280).toBuffer();
  return data.toString("base64");
};
