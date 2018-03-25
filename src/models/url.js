var mongoose = require('mongoose');

const countersSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    count: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', countersSchema);


var urlSchema = new mongoose.Schema({
    id: String,
    url: String,
    hash: String,
     
      created: { 
          type: Date,
          default: Date.now
      }
  });

const url = mongoose.model('url', urlSchema);

urlSchema.pre('save', function(next) {
    console.log('running pre-save');
    var doc = this;
    Counter.findByIdAndUpdate({ _id: 'url_count' }, { $inc: { count: 1 } }, function(err, counter) {
        if(err) return next(err);
        console.log(counter);
        console.log(counter.count);
        doc._id = counter.count;
        doc.created_at = new Date();
        console.log(doc);
        next();
    });
});

module.exports = url;
module.exports = Counter;
