const Expense = require("../models/expenseModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getAllExpenses = catchAsync(async (req, res) => {
  const queryObj = { ...req.query };

  if (queryObj.tags)
    queryObj.tags = { $in: queryObj.tags.replace(/_/, " ").split("-") };

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
});

exports.getExpense = catchAsync(async (req, res, next) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) return next(new AppError("No tour found with that id", 404));

  res.status(200).json({
    status: "success",
    data: {
      expense,
    },
  });
});

exports.createExpense = catchAsync(async (req, res) => {
  const newExpense = await Expense.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      expense: newExpense,
    },
  });
});

exports.updateExpense = catchAsync(async (req, res) => {
  // new: true means that expense is the doc after update
  const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!expense) return next(new AppError("No tour found with that id", 404));

  res.status(200).json({
    status: "success",
    data: {
      expense,
    },
  });
});

exports.deleteExpense = catchAsync(async (req, res) => {
  // new: true means that expense is the doc after update
  const expense = await Expense.findByIdAndDelete(req.params.id);

  if (!expense) return next(new AppError("No tour found with that id", 404));

  res.status(200).json({
    status: "success",
    data: null,
  });
});
