import mongoose, { connect } from "mongoose";

const URL = process.env.MONGO_URL;
const connectMongo = async () =>
    mongoose.connect(URL).then(() => {
        console.log("Connected to mongoDB");
    });
export default connectMongo;
