const router = require('express').Router();
const Book = require('../models/book');
const verify = require("../routes/verifyToken");

router.get('/all/:role', verify, async (req, res) => {
    try{
        const specific = req.query.role === 'admin' ? {} : { available: true };
        const books = await Book.find(specific);
        res.json(books);
    } catch(err){
        res.status(400).send(err);
    }
});

router.get('/by-id', async (req, res) => {
    try{
        const id = req.query.bookId; 
        const books = await Book.findById(id);
        res.json(books);
    } catch(err){
        res.status(400).send(err);
    }
});

router.get('/by-category/all', verify, async (req, res) => {
    try{
        const limit = req.query.limit || 8;
        const page = req.query.page || 1;
        const category = req.query.category;
        const _category = category === 'all' ? '' : category;
        const specific = req.query.role === 'admin' ? 
            _category === '' ? {} :
            { category: _category } 
        : 
            _category === '' ? { available: true } :
            { available: true, category: _category };
        const books = await Book.paginate(specific, { limit, page });
        res.json(books);
    } catch(err){
        res.status(400).send(err);
    }
});

router.get('/books/all-categories', async (req, res) => {
    try{
        const categories = await Book.distinct('category');
        let _categories = categories;
        _categories.sort();
        _categories.unshift('all');
        res.json(_categories);
    } catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;