import mongoose from "mongoose";
const connectDb = async () => {
// MongoDB Connection
    try {
        mongoose.connection.on('connected', () => {
            console.log('Successfully connected to MongoDB.....')
        })
        await  mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.log('Failed to connect MongoDB.....')
    }
}

export default connectDb;