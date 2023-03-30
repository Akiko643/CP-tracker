import mongoose, { connect } from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http";
import { kill } from "kill-port";

const URL = process.env.MONGO_URL;

const server = createServer();
const io = new Server(server);
const port = 4000;

const openSocketServer = async (port) => {
    try {
        await kill(port);
        console.log(`Killed the process using port ${port}`);
    } catch (err) {
        console.error(
            `Failed to kill process using port ${port}: ${err.message}`
        );
    }
    server.listen(port, () => {
        console.log("HTTP server listening on port 4000");
    });
};

const connectMongo = async () => {
    await mongoose.connect(URL);
    console.log("Connected to mongoDB");
    // await openSocketServer(port);
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
