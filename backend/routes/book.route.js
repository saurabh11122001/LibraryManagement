import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
    addBook,
    getAllBooks,
    deleteBook,
    getBooksByCategory,
    getBookById,
    updateBook
} from "../controllers/book.controller.js";

const router = express.Router();

router.route("/add").post(isAuthenticated, addBook);
router.route("/get").get( isAuthenticated,getAllBooks);
router.route("/delete/:id").delete(isAuthenticated, deleteBook);
router.route("/category/:category").get(isAuthenticated,getBooksByCategory);
router.route("/get/:id").get(isAuthenticated,getBookById);
router.route("/update/:id").put(isAuthenticated,updateBook);

export default router;
