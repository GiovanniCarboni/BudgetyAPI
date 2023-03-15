const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "An expense must have a title"],
  },
  amount: {
    type: Number,
    required: [true, "An expense must have an amount"],
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
