import mongoose, { connect } from "mongoose";

const URL = process.env.MONGO_URL;

const connectMongo = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Connected to mongoDB");
    } catch (err) {
        console.log(err.message);
    }
};
export default connectMongo;
