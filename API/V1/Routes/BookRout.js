const router = require('express').Router();

const{
    GetAllBooks,
    GetBookByID,
    AddBook,
    UpdateBookByID,
    DeleteBookByID,
    BorrowBook,
    ReturnBook
}=require('../Controllers/BookController');
const authAdmin = require('../Middlewares/authAdmin');
const authUser = require('../Middlewares/authUser');

router.get('/',authAdmin,authUser,GetAllBooks);
router.get('/:id',authAdmin,authUser,GetBookByID);
router.post('/',authAdmin,AddBook);
router.patch('/:id',authAdmin,UpdateBookByID);
router.delete('/:id',authAdmin,DeleteBookByID);
router.patch('/borrow/:id',authAdmin,authUser, BorrowBook);
router.patch('/return/:id',authAdmin,authUser, ReturnBook);

module.exports=router;