import express from "express";
import {  deleteUser, getAllUsers, login, logout, register } from "../controllers/user.controller.js";
 
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/get").get(getAllUsers);
router.route("/delete/:id").delete(deleteUser);


export default router;