const Book = require('../models/Book');

exports.createBook = (data) => Book.create(data, {runValidators: true});

exports.getAll = () => Book.find({});

exports.findById = (id) => Book.findById(id);

exports.wishBook = async (userId, bookId) => {

    const book = await this.findById(bookId);
    book.wishingList.push(userId);
    book.save();
}

exports.delete = (id) => Book.findByIdAndDelete(id);

exports.edit = (id, data) => Book.findByIdAndUpdate(id, data, {runValidators: true});

exports.something = (id) => Book.find({wishingList:{$all: [id]}});