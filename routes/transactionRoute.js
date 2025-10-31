const express = require("express");
const { getAllTransactions } = require("../controllers/transactionController");
const { createTransaction } = require("../controllers/transactionController");

const router = express.Router();

//routes
router.get("/get-transactions", getAllTransactions);
router.post("/create-transaction/:id", createTransaction);
module.exports = router;
