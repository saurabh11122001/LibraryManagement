import { Book } from "../models/book.model.js";
import { Purchased } from "../models/purchased.model.js";

// Admin adds a book
export const addBook = async (req, res) => {
    try {
        const { bookname, author, price, bookid,category , total, description} = req.body;

        if (!bookname || !author || !price || !bookid || !category || !total || !description) {
            return res.status(400).json({
                message: "Some fields are missing.",
                success: false
            });
        }

        const book = await Book.create({
            bookid,
            bookname,
            author,
            price: Number(price),
            category,
            total:Number(total),
            description
        });

        return res.status(201).json({
            message: "New book added successfully.",
            book,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while adding the book.",
            success: false
        });
    }
};

// Get all books (for students)
export const getAllBooks = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";

        const query = {
            $or: [
                { bookname: { $regex: keyword, $options: "i" } },
                { author: { $regex: keyword, $options: "i" } },
                { category: { $regex: keyword, $options: "i" } },

            ]
        };

        // If the keyword is a number, search for the bookid as a number
        if (!isNaN(keyword)) {
            query.$or.push({ bookid: Number(keyword) });
        }

        const books = await Book.find(query).sort({ createdAt: -1 });

        return res.status(200).json({
            books,
            success: true,
            message: books.length ? "Books fetched successfully." : "No books available."
        });
    } catch (error) {
        console.error("Error occurred in getAllBooks:", error); // Log detailed error
        return res.status(500).json({
            message: "An error occurred while fetching books.",
            success: false
        });
    }
};

export const getBookById = async (req, res) => {
    try {
        const bookid = req.params.id;
        const book = await Book.findById(bookid).populate({
            path:"applications"
        });
        if (!book) {
            return res.status(404).json({
                message: "Books not found.",
                success: false
            })
        };
        return res.status(200).json({ book, success: true });
    } catch (error) {
        console.log(error);
    }
}
// Delete a book
export const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;

        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({
                message: "Book not found.",
                success: false
            });
        }

        // Delete the book
        await book.deleteOne();

        // Optionally, delete related purchased entries
        await Purchased.deleteMany({ book: bookId });

        return res.status(200).json({
            message: "Book deleted successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while deleting the book.",
            success: false
        });
    }
};
// Get books by category
export const getBooksByCategory = async (req, res) => {
    try {
        const { category } = req.params; // Get the category from the route params

        if (!category) {
            return res.status(400).json({
                message: "Category is required.",
                success: false
            });
        }

        // Find books matching the category
        const books = await Book.find({ category: { $regex: category, $options: "i" } });

        if (!books || books.length === 0) {
            return res.status(404).json({
                message: "No books found for the specified category.",
                success: false
            });
        }

        return res.status(200).json({
            books,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while fetching books by category.",
            success: false
        });
    }
};
// Update book details
export const updateBook = async (req, res) => {
    try {
        const bookId = req.params.id; // Get the book ID from the route parameters
        const { bookname, author, price, category,total,description } = req.body; // Extract updated details from the request body

        // Validate the input
        if (!bookname && !author && !price && !category && !description && !total) {
            return res.status(400).json({
                message: "At least one field is required to update the book.",
                success: false
            });
        }

        // Find the book by ID and update
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                message: "Book not found.",
                success: false
            });
        }

        // Update only the provided fields
        if (bookname) book.bookname = bookname;
        if (author) book.author = author;
        if (price) book.price = Number(price);
        if (category) book.category = category;
        if (total) book.total = Number(total);
        if (description) book.description = description;

        await book.save(); // Save the updated book details

        return res.status(200).json({
            message: "Book updated successfully.",
            book,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while updating the book.",
            success: false
        });
    }
};
