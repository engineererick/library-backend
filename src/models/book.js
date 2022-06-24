const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "can't be blank"],
    },
    yearofpublication: {
        type: String,
        required: [true, "can't be blank"],
    },
    author: {
        type: String,
        required: [true, "can't be blank"],
    },
    category: {
        type: String,
        required: [true, "can't be blank"],
    },
    cover: {
        type: String,
        required: [true, "can't be empty"],
    },
    available: {
        type: Boolean,
        default: true,
    },
    user: {
        type: String,
        default: '',
    }
});

BookSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Book', BookSchema);