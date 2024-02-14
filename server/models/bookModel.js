const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
    }, 
    author: {
        type: String,
    }, 
    description: {
        type: String,
    }, 
    image: {
        type: String
    } 
    // date: {
    //     type: Date,
    //     default: Date.now
    // }
})

const book = mongoose.model('Book', bookSchema)

module.exports = book;