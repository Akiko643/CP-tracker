import express from "express";
import route from "./src/routes/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express();
const port = 5001;

// Use middleware that allows for access from other domains
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
// Use middleware that allows us to access the JSON body of requests
app.use(express.json());
// Use middleware to pass cookies
app.use(cookieParser());

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
