const bookService = require('../services/bookService');

exports.getCreate = (req, res) =>{

    res.render('create');
}

exports.postCreate = async (req, res) =>{

    const {title, author, genre, stars, image, review} = req.body;

    try {
        await bookService.createBook({title, author, genre, stars, image, review, owner: req.user._id})
    }
    catch(err){

        const errors = Object.keys(err.errors).map(key => err.errors[key].message)
        return res.render('create', {error: errors[0]})
    }

    res.redirect('/catalog')
}

exports.getCatalog = async (req, res) =>{

    const books = await bookService.getAll().lean();

    res.render("catalog", {books});
}

exports.getDetails = async (req, res) =>{

    const book = await bookService.findById(req.params.id).lean();

    if(book == null) {
       return res.redirect('/404');
    }
    console.log(req.user)

    if(req.user){

        const isOwner = req.user._id == book.owner;
        const hasWished = book.wishingList.some(id=> id == req.user._id);
        return res.render('details', {book, isOwner, hasWished})
    }  

    res.render('details', {book})
}

exports.wishToRead = async (req, res) =>{

    await bookService.wishBook(req.user._id, req.params.id);
    res.redirect(`/details/${req.params.id}`)
}

exports.getDelete = async (req, res) =>{

    await bookService.delete(req.params.id);
    res.redirect('/catalog')
}

exports.getEdit = async (req, res) => {

    const book = await bookService.findById(req.params.id).lean();

    res.render('edit', {book});
}

exports.postEdit = async (req, res) => {

    const {title, author, genre, stars, image, review} = req.body;

    const book = await bookService.findById(req.params.id).lean();
    try {
        await bookService.edit(req.params.id, {title, author, genre, stars, image, review})
    }
    catch(err){

        const errors = Object.keys(err.errors).map(key => err.errors[key].message)
    return res.render('edit', {book, error: errors[0]})
    }

    res.redirect(`/details/${req.params.id}`)
}

exports.getProfile = async (req, res) =>{

    const books = await bookService.something(req.user._id).lean();
    res.render('profile', {books})
}