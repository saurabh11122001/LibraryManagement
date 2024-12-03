import { Purchased } from "../models/purchased.model.js";  
import { Book } from "../models/book.model.js";  
import mongoose from "mongoose";


export const purchaseBook = async (req, res) => {
    try {
        const userId = req.id;
        const bookId = req.params.id;
        if (!bookId) {
            return res.status(400).json({
                message: "book id is required.",
                success: false
            })
        };
        const existingApplication = await Purchased.findOne({
            book: bookId,
            applicant: userId,
            status: { $nin: ['returned', 'rejected'] } // Check if status is neither 'returned' nor 'rejected'
        });
        
        

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this book",
                success: false
            });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                message: "book not found",
                success: false
            })
        }
        const newApplication = await Purchased.create({
            book:bookId,
            applicant:userId,
        });

        book.applications.push(newApplication._id);
        await book.save();
        return res.status(201).json({
            message:"book applied successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};

export const getPurchasedBooks = async (req, res) => {
    try {
        const userId = req.id;
        const purchases = await Purchased.find({ applicant: userId })
            .populate('book')  
            .sort({ createdAt: -1 });

        if (!purchases || purchases.length === 0) {
            return res.status(404).json({
                message: "No purchases found.",
                success: false
            });
        }

        return res.status(200).json({
            purchases,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

export const getPurchasers = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId).populate({
            path: 'purchased',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant',  
            }
        });

        if (!book) {
            return res.status(404).json({
                message: "Book not found.",
                success: false
            });
        }

        return res.status(200).json({
            book,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

export const getBookApplicationsCount = async (req, res) => {
    try {
        const bookId = req.params.id;  // Assuming the book ID is passed as a parameter

        // Find the applications (purchases) for a specific book
        const applicants = await Purchased.find().populate({
            path: 'book', // populate the book details
        }).populate({
            path: 'applicant', // populate the applicant (user) details
        }).sort({createdAt:-1});

        if (!applicants || applicants.length === 0) {
            return res.status(404).json({
                message: "No applicants found for this book.",
                success: false
            });
        }

        // Get the number of applicants (purchases)
        return res.status(200).json({
            message: `Total ${applicants.length} applicants for this book.`,
            applicants,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong.",
            success: false
        });
    }
};


export const updatePurchaseStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const purchaseId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "Status is required.",
                success: false,
            });
        }

        // Find the purchase by purchase ID
        const purchase = await Purchased.findOne({ _id: purchaseId });
        if (!purchase) {
            return res.status(404).json({
                message: "Purchase not found.",
                success: false,
            });
        }

        // Update the status
        purchase.status = status.toLowerCase();

        // Handle different statuses
        if (purchase.status === "accepted") {
            const book = await Book.findOne({ _id: purchase.book._id }); // Assuming purchase has a reference to the bookId
            if (book) {
                book.total = book.total > 0 ? book.total - 1 : 0; // Ensure count doesn't go negative
                await book.save();
            } else {
                return res.status(404).json({
                    message: "Associated book not found.",
                    success: false,
                });
            }
        }

        // Mark the purchase as returned or rejected
        if (purchase.status === "returned" || purchase.status === "rejected") {
            const book = await Book.findOne({ _id: purchase.book._id }); // Find the associated book
            if (book) {
                if (purchase.status === "returned") {
                    // Add one book back to the total if returned
                    book.total += 1;
                }

                // Remove the purchaseId from the applications array
                book.applications = book.applications.filter((applicant) => {
                    return applicant.toString() !== purchaseId.toString();
                });

                await book.save();
            } else {
                return res.status(404).json({
                    message: "Associated book not found.",
                    success: false,
                });
            }
        }

        await purchase.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error updating status:", error);
        return res.status(500).json({
            message: "An error occurred.",
            success: false,
        });
    }
};




