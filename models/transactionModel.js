const mongoose = require("mongoose");

const transactionModel = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Please add an amount"],
    },
    type: {
      type: String,
      required: [true, "Please add a type"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
    },
    reference: {
      type: String,
    },
    desc: {
      type: String,
      required: [true, "Please add a description"],
    },
    date: {
      type: Date,
      required: [true, "Please add a date"],
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionModel);
module.exports = Transaction;
