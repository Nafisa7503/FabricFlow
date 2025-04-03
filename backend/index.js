import cors from "cors";
import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import transactionRoutes from './routes/transaction.route.js';
import orderRoutes from './routes/order.route.js';
import productRoutes from './routes/product.route.js';
import customerRoutes from './routes/customer.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); //to parse json data

app.use(cors())
app.use("/api/transaction", transactionRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/product", productRoutes)
app.use("/api/customer", customerRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);

})

//password: ccR8QJMI1EwzOTFX