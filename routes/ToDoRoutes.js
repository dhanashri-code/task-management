const express = require("express");
const router = express.Router();
const { createToDo } = require('../controllers/toDoController');
const { getAllToDo } = require('../controllers/toDoController');
const { deleteToDo } = require('../controllers/toDoController');
const { updateToDo } = require('../controllers/toDoController');
const { dashBoardToDo } = require('../controllers/toDoController');

const authenticateToken = require("../middleware/authJwt");

router.post("/create-to-do", authenticateToken, createToDo);
router.get("/get-all-to-do/:userId", authenticateToken, getAllToDo);
router.delete("/delete-to-do/:id", authenticateToken, deleteToDo);
router.patch("/update-to-do/:id", authenticateToken, updateToDo);

router.get("/dashboard/:userId", authenticateToken, dashBoardToDo);

module.exports = router;