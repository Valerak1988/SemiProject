
const mongoose = require('mongoose');
mongoose.pluralize(null);

//create schema
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: String,
});
//export the schema
module.exports = mongoose.model('Book', bookSchema);