var mongoose = require('mongoose');  

var studentSchema = new mongoose.Schema({  
  name: String,
  roll: Number,
  batch: String,
  session: String,
  gender: String,
  doa: String
});

mongoose.model('Student', studentSchema);