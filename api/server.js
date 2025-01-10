import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDb from './utils/connectDb';

dotenv.config();
const PORT = process.env.PORT || 6008;

const app = express();

// Middleware
app.use(express.json());
app.use((express.urlencoded({extended: true, limit:"50mb"})));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(cookieParser());


/* ERROR HANDLER */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
});



/* DATABASE CONNECTION */
 connectDb()
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
