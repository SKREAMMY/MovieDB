import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import actorRoutes from "./routes/actorRoutes.js";
import notificationRoutes from './routes/notificationRoutes.js';

dotenv.config();
await connectDB();


const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());



// health check
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/actors", actorRoutes);
app.use("/api/notifications", notificationRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
