const Expense = require("../models/expenseModel");

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();

    res.status(200).json({
      status: "success",
      results: expenses.length,
      data: {
        expenses,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        expense,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createExpense = async (req, res) => {
  try {
    const newExpense = await Expense.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        expense: newExpense,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.updateExpense = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined",
  });
};
exports.deleteExpense = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined",
  });
};
