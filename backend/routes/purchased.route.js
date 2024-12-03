import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";  // Assuming you have a middleware to check user authentication
import {
    purchaseBook,
    getPurchasedBooks,
    getPurchasers,
    updatePurchaseStatus,
    getBookApplicationsCount
} from "../controllers/purchased.controller.js";

const router = express.Router();

// Route to handle purchasing a book
router.route("/purchase/:id").post(isAuthenticated, purchaseBook);

// Route to get all books purchased by the authenticated user
router.route("/my-purchases").get(isAuthenticated, getPurchasedBooks);

// Route to get all purchasers of a specific book (admin route)
router.route("/purchasers/:id").get(isAuthenticated, getPurchasers);
router.route("/getApplicants").get(isAuthenticated, getBookApplicationsCount);

// Route to update the purchase status (admin route)
router.route("/status/:id/update").patch(isAuthenticated, updatePurchaseStatus);

export default router;
