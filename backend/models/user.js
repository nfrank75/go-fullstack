const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


userSchema.plugin(uniqueValidator);  // to make sure that a email is unique

const User = mongoose.model('User', userSchema);

module.exports = User;
