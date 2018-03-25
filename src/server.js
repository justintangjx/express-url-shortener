const app = require("./app");
const mongoose = require("mongoose");

const server = app.listen(process.env.PORT || 3000, function() {
  console.log(`Listening on port ${server.address().port}...`);
});

require('dotenv').config(); 

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
};

const dburl = process.env.MONGODB_URI;

mongoose.connect(dburl, function(err) {
  if (err) throw err;
  console.log("db connected successfully")
})
