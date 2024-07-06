import mongoose from "mongoose";
import colors from "colors"
import dotenv from "dotenv"
dotenv.config()
/**
 * Asynchronous function to establish a connection to a MongoDB database using Mongoose.
 * Logs success message if connection is successful, otherwise logs any errors.
 */
const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected Successfully");
    } catch (error) {
        console.log(error);
    }
}

export default connectdb;

