const router = require('express').Router();
const User = require("../models/user");
const Book = require("../models/book");
const bcrypt = require("bcryptjs");
const verify = require("../routes/verifyToken");

router.post('/signup', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        email: req.body.email,
        password: hashedPassword,
        fullName: req.body.fullName,
        books: [],
        role: req.body.role,
    });
    try{
        const savedUser = await user.save();
        res.json(savedUser);
    } catch(err){
        if(err.keyPattern)
            res.status(400).send({error: "Email already exists"});
        else if(err.errors)
            res.status(400).send({error: err.message});
        else 
            res.status(400).send(err);
    }
});

router.put('/book/borrow', verify, async (req, res) => {
    const bookId = req.body.bookId;
    const userId = req.body.userId;
    const book = await Book.findById(bookId);
    const user = await User.findById(userId);

    let _book = book;
    _book.user = userId;
    _book.available = false;

    let _user = user;
    let _books = _user.books;
    _books.push(bookId);
    _user.books = _books;

    const updatedBook = await Book.findByIdAndUpdate(bookId, _book);
    const updatedUser = await User.findByIdAndUpdate(userId, _user);
    res.json({
        'remote': 'success',
        'data': {
            'book': updatedBook,
            'user': updatedUser
        }
    });
});

router.post('/books/borrow/all', verify, async (req, res) => {
    try{
        const userId = req.body.userId;
        const books = await Book.find({user: userId});
        res.json(books);
    } catch(err){
        res.status(400).send(err);
    }
});

router.put('/book/unborrow', verify, async (req, res) => {
    const bookId = req.body.bookId;
    const userId = req.body.userId;
    const book = await Book.findById(bookId);
    const user = await User.findById(userId);

    let _book = book;
    _book.user = '';
    _book.available = true;

    let _user = user;
    const books = _user.books;
    const newBooks = books.filter(bookId => bookId !== bookId);
    _user.books = newBooks;

    const updatedBook = await Book.findByIdAndUpdate(bookId, _book);
    const updatedUser = await User.findByIdAndUpdate(userId, _user);
    res.json({
        'remote': 'success',
        'data': {
            'book': updatedBook,
            'user': updatedUser
        }
    });
});

module.exports = router;