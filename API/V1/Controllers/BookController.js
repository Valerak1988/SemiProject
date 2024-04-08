//Import Book Models
const Book = require('../Models/BookModel');

//create and export modules
module.exports = {
    GetAllBooks:(req, res) => {
        Book.find()
            .then(books => {
                res.status(200).json(books);
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    },

    GetBookByID:(req, res) => {
        let bookId = req.params.id;
        Book.findById(bookId).then((data) => {
            return res.status(200).json(data);
        }).catch((err) => {
            res.status(500).json({ message: err.message });
        });
    },

    AddBook:(req, res) => {
        const { title, author, price, quantity, category } = req.body;
        const book = new Book({
            title,
            author,
            price,
            quantity: parseInt(quantity),
            category
        });

        book.save().then((newBook) => {
            res.status(201).json(newBook);
        }).catch((err) => {
            res.status(400).json({ message: err.message });
        });
    },

    UpdateBookByID:(req, res) => {
        const { id } = req.params;
        const { title, author, price, quantity, category } = req.body;
    
        Book.findByIdAndUpdate(id, { title, author, price, quantity, category }, { new: true })
            .then(updatedBook => {
                if (!updatedBook) {
                    throw new Error('Book not found');
                }
                res.status(200).json(updatedBook);
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    },

    DeleteBookByID:(req, res) => {
        const { id } = req.params;
    
        Book.findByIdAndDelete(id)
            .then(deletedBook => {
                if (!deletedBook) {
                    throw new Error('Book not found');
                }
                res.status(200).json({ message: 'Book deleted successfully' });
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    },

    BorrowBook: (req, res) => {
        const { id } = req.params;

        Book.findByIdAndUpdate(id, { $inc: { quantity: -1 } }, { new: true })
            .then(updatedBook => {
                if (!updatedBook) {
                    throw new Error('Book not found');
                }
                res.status(200).json(updatedBook);
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    },

    ReturnBook: (req, res) => {
        const { id } = req.params;

        Book.findByIdAndUpdate(id, { $inc: { quantity: 1 } }, { new: true })
            .then(updatedBook => {
                if (!updatedBook) {
                    throw new Error('Book not found');
                }
                res.status(200).json(updatedBook);
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    }
}