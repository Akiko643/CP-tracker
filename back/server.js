import express from "express";
import route from "./src/routes/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
const port = 4000;

app.use(express.json());

dotenv.config();

app.use("/", route);

app.listen(port, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Example app listening on port ${port}`);
  } catch (err) {
    console.log("Error:", err.message);
  }
});
