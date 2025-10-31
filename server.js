const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
connectDB = require("./config/connectDB");

dotenv.config();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

connectDB();
// server.js - Update CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

//user routes
app.use("/api/v1/users", require("./routes/userRoute"));

//transaction routes
app.use("/api/v1/transactions", require("./routes/transactionRoute"));

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`.yellow.bold);
});
