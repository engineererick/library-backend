const router = require('express').Router();
const Book = require('../models/book');
const User = require('../models/user');
const verify = require("../routes/verifyToken");

router.post('/book/add', verify, async (req, res) => {
    const book = new Book({
        title: req.body.title,
        yearofpublication: req.body.yearofpublication,
        author: req.body.author,
        category: req.body.category,
        cover: req.body.cover,
        available: true,
        user: ''
    });
    try{
        const savedBook = await book.save();
        res.json(savedBook);
    } catch(err){
        res.status(400).send(err);
    }
});

router.delete('/book/delete', verify, async (req, res) => {
    try{
        const id = req.body.id;
        const book = await Book.findById(id);

        const user = await User.findById(req.body.userId);

        let _user = user;
        let _books = _user.books;

        const newBooks = _books.filter(bookId => bookId !== id);
        _user.books = newBooks;

        const updatedUser = await User.findByIdAndUpdate(user._id, _user);
        await Book.findByIdAndDelete(id);
        res.json({
            'remote': 'success',
            'updatedUser': updatedUser
        });
    } catch(err){
        res.status(400).send(err);
    }
});

router.put('/book/edit', verify, async (req, res) => {
    const book = {
        title: req.body.title,
        yearofpublication: req.body.yearofpublication,
        author: req.body.author,
        category: req.body.category,
        cover: req.body.cover,
        available: req.body.available,
        user: req.body.user
    };
    try{
        const updatedBook = await Book.findByIdAndUpdate(req.body.id, book);
        res.json(updatedBook);
    } catch(err){
        res.status(400).send(err);
    }
});

router.get('/users', verify, async (req, res) => {
    try{
        const users = await User.find({ role: 'user' });
        res.json(users);
    } catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;