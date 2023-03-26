const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "An expense must have a title"],
  },
  amount: {
    type: Number,
    required: [true, "An expense must have an amount"],
  },
  description: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tags: [
    {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^[a-z| ]{1,20}$/, "Invalid characters"],
    },
  ],
  // TODO accept images
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
