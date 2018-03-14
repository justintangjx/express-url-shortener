// import decode from "./demo/decode";
const express = require("express");
const bodyParser = require("body-parser");

// load our own helper functions
const encode = require("./demo/encode");
const decode = require("./demo/decode");

const app = express();
app.use(bodyParser.json());

const existingURLs = [
  { id: "1", url: "www.google.com", hash: "MQ==" },
  { id: "2", url: "www.facebook.com", hash: "Mg==" }
];

app.post("/shorten-url", function(request, respond) {
  const hash = encode(request.url, existingURLs);
  var shortenedUrl = {
    id: existingURLs.length + 1,
    url: request.url,
    hash: hash
  };
  respond.send(hash);
});

app.get("/expand-url/:hash", function(request, respond) {
  try {
    const decodedUrl = decode(request.params.hash, existingURLs);
    
    respond.status(200);
    respond.send({
      url:decodedUrl
    });
  } catch (error) {
    respond.status(404);
    respond.send({
      message: `There is no long URL registered for hash value ${
        request.params.hash
      }`
    });
  }
});

app.delete("/delete-url/:hash", function(request, respond) {
  try {
    const shortUrlToDelete = decode(request.params.hash, existingURLs);
    // const urlToRemove = existingURLs.filter(item => item["url"] === shortUrlToDelete);
    let indexToDelete = -1;
    for(var i = 0; i < existingURLs.length; i++) {
      if(existingURLs[i]["hash"] === request.params.hash) {
        indexToDelete = i;
      };
    };
    existingURLs.splice(indexToDelete, 1);

    respond.status(200);
    respond.send({
      message: `${shortUrlToDelete} with hash value ${request.params.hash} deleted successfully`
    });
  } catch (error) {
    respond.status(404);
    respond.send(
      // message:
       `Url with hash value ${request.params.hash} does not exist`
    );
  }
});

// app.get("/:someHash", function (request, respond) {
//   try {
//     const urlToRedirect = decode(request.params.hash, existingURLs);
//   } catch (error) {
    
//   }
// })

// TODO: Implement functionalities specified in README
app.get("/", function(req, res) {
  res.send("Hello world!");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.send("error");
});

module.exports = app;
