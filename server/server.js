import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = 1011;

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
