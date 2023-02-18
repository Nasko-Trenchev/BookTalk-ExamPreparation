const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        minLength: 2,
    },
    author: {
        type: String,
        required: true,
        minLength: 5
    },
    image: {
        type: String,
        required: true,
        match: [/^https?:\/\//, "Invalid URL"]
    },
    review: {
        type: String,
        required: true,
        minLength: 10
    },
    genre: {
        type: String,
        required: true,
        minLength: 3
    },
    stars: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    wishingList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;