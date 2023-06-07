const util = require("util");
const multer = require("multer");
const path = require('path');
const maxSize = 2 * 1024 * 1024;
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
      },
      filename: function(req, file, cb) {
       
        // cb(null,file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
});
let uploadFile = multer({
  storage:storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;