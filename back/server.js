import express from "express";
import route from "./src/routes/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.CP_PORT;
const heroku_port = process.env.PORT;

// Use middleware that allows for access from other domains
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
// Use middleware that allows us to access the JSON body of requests
app.use(express.json());

app.use("/", route);

app.listen(port, async () => {
  console.log("env var:", process.env);
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

app.listen(heroku_port, () => {
  console.log("App listening");
});
