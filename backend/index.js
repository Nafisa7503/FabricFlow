import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import transactionRoutes from './routes/transaction.route.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); //to parse json data

app.use("/api/transactions", transactionRoutes)



app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);

})

//password: ccR8QJMI1EwzOTFX