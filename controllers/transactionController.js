const transactionModel = require("../models/transactionModel");
const dayjs = require("dayjs");
// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel({
      ...req.body,
      userId: req.params.id,
    });
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const { frequency, startDate, endDate, type } = req.query;
    const query = {};
    if (frequency === "custom" && startDate && endDate) {
      query.date = {
        $gte: dayjs(startDate).startOf("day").toDate(),
        $lte: dayjs(endDate).endOf("day").toDate(),
      };
      console.log();
    } else if (frequency && frequency !== "Please Select") {
      query.date = {
        $gt: dayjs().subtract(Number(frequency), "day").toDate(),
      };
    }
    if (type && type !== "all") {
      query.type = type;
    }

    const transactions = await transactionModel.find(query).sort({ date: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllTransactions, createTransaction };
