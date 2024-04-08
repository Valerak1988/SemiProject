const mongoose = require('mongoose');
mongoose.pluralize(null);

//create schema
const userSchema = new mongoose.Schema({
    UserName: String,
    Email: String,
    Pass: String,
    
});
//export the schema
module.exports = mongoose.model('User',userSchema);