import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import user from './routes/user';
import auth from './routes/auth';
import cookieParser from 'cookie-parser';

dotenv.config();

const app: Express = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const uri: string =
    process.env.MONGODB_URI || 'mongodb://localhost:27017';

(async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to the database');
    } catch {
        console.log('Error connecting to the database');
    }
})();

app.use('/auth', auth);
app.use('/user', user);

app.get('/health', (_req: Request, res: Response) => {
    res.status(200).send('Server is running');
});

const PORT: string | number = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});