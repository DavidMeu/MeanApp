var mongoose = require('mongoose');

var OrderedBookSchema = new mongoose.Schema({
    book_id: String,
    user_id: String,
    ordered_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OrderedBook', OrderedBookSchema);

module.exports.getOrderedBookByUserId = function (id, callback) {
    OrderedBookSchema.findById(id, callback);
}

module.exports.getOrderedBookByBookId = function (book_id, callback) {
    const query = { book_id: book_id };
    OrderedBookSchema.findOne(query, callback);
}

module.exports.addOrderedBook = function (newOrderedBook, callback) {
    newOrderedBook.save(callback);
}