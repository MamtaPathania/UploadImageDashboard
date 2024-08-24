const path = require("path");
const pool = require("../../database");

module.exports = {
  userUploadedImg: (req, callback) => {
    const getImgQuery = process.env.get_images;
    console.log(getImgQuery, "====query");
    pool.query(getImgQuery, [], (err, result) => {
      if (err) {
        console.log(err, "error");
        return callback(err, null);
      } else {
        return callback(null, result);
      }
    });
  },

  CategoryDetails: (req, callback) => {
    const { category } = req.body;
    const getcatQuery = process.env.category_data;
    console.log(getcatQuery, "====query");
    pool.query(getcatQuery, [category], (caterr, catresult) => {
      if (caterr) {
        console.log(caterr, "error");
        return callback(caterr, null);
      } else {
        return callback(null, catresult);
      }
    });
  },


  
};
