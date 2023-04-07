import mongoose, { connect } from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http";
import { kill } from "kill-port";

const URL = process.env.MONGO_URL;

const connectMongo = async () => {` `
    await mongoose.connect(URL);
    console.log("Connected to mongoDB");
    const db = mongoose.connection;

    db.once("open", function () {
        try {
            console.log("MongoDB connected!");
            const myCollection = db.collection("problems");
            const changeStream = myCollection.watch();
            changeStream.on("change", () => {
                console.log("Collection updated!");
                io.emit("collection_updated");
            });
        } catch (err) {
            console.error(err);
        }
    });
};
export default connectMongo;
