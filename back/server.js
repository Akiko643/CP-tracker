import express from "express";
import route from "./src/routes/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import https from "https";

dotenv.config();

const app = express();
const port = process.env.PORT;

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
  try {
    if (!fs.existsSync("./data.json")) {
      const url = "https://codeforces.com/api/problemset.problems";
      console.log("fetching all problems from codeforces");
      https
        .get(url, (res) => {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            try {
              const jsonData = JSON.parse(data);
              if (jsonData.status === "OK") {
                fs.writeFileSync(
                  "./data.json",
                  JSON.stringify(jsonData.result.problems, null, 2)
                );
                console.log("Data successfully written to data.json");
              } else {
                console.error("API Error:", jsonData.comment);
              }
            } catch (error) {
              console.error("Parsing Error:", error);
            }
          });
        })
        .on("error", (err) => {
          console.error("Request Error:", err);
        });
      console.log("Fetched all problems from codeforces");
    }
    console.log("Initiated connection to mongodb");
    await mongoose.connect(process.env.MONGO_URI_2025, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log(`Example app listening on port ${port}`);
  } catch (err) {
    console.log("Error:", err.message);
  }
});
