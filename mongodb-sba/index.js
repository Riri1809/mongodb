import "./localEnv.js"
import {conn} from "./db/conn.js"; conn();
import express from "express";
import mongoose from 'mongoose';
import morgan from "morgan";

import productsRoutes from "./routes/products.js"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/products", productsRoutes);

app.get("/", (req, res) => {
    res.send("This is going to be great");
});




app.listen(PORT, () => {
    console.log(`The server is running on port: ${PORT}`);
});