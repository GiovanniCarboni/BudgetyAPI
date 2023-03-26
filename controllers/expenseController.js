const Expense = require("../models/expenseModel");

exports.getAllExpenses = async (req, res) => {
  try {
    const queryObj = { ...req.query };

    if (queryObj.tags) queryObj.tags = { $all: queryObj.tags.split("-") };

    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((field) => delete queryObj[field]);

    const expenses = await Expense.find(queryObj);

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
exports.updateExpense = async (req, res) => {
  try {
    // new: true means that expense is the doc after update
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        expense,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.deleteExpense = async (req, res) => {
  try {
    // new: true means that expense is the doc after update
    const expense = await Expense.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
