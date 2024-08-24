var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require('cors');


var loginRouter = require("./routes/loginRouter/loginRouter.router.js");
var getUploadedImages=require("./routes/getUploadedImages/getUploadedImages.router.js")
var imageUploader = require("./routes/image-uploader/image-uploader.router");
var updateImageRouter=require("./routes/updateImageRouter/updateImageRouter.router.js")
var deleteRouter=require("./routes/deleteRouter/deleteRouter.router.js")
require("dotenv").config();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.join(__dirname, 'build')));


app.use("/",loginRouter );
app.use("/getupload-img",getUploadedImages)
app.use("/image-uploader", imageUploader);
app.use("/update-image", updateImageRouter);
app.use("/delete",deleteRouter)



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// catch 404 and forward to error handler
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
  res.render("error");
});

module.exports = app;
