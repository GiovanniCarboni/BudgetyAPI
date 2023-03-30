const express = require("express");

const expenseController = require("../controllers/expenseController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, expenseController.getAllExpenses)
  .post(expenseController.createExpense);

router
  .route("/:id")
  .get(expenseController.getExpense)
  .patch(expenseController.updateExpense)
  .delete(expenseController.deleteExpense);

module.exports = router;
