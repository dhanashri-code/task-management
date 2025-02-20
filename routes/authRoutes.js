const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/authController');
const authenticateToken = require("../middleware/authJwt");

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);

router.delete("/delete-account/:userId", authenticateToken, AuthController.deleteAccount);

module.exports = router;