import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { blockchainRouter } from './routes/blockchain.route.js';

const PORT = 3030

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// using the routes that we created in the routes folder
app.use(blockchainRouter);

app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`)
});