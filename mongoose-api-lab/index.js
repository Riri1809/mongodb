import express from "express";
//import './localEnv.js';
//import {conn} from './db/conn.js';conn();
import morgan from 'morgan';

const PORT = 5000;
const app = express();

//import grades from "./routes/grades.js";

app.use(morgan('dev'));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API.");
});

//app.use("/grades", grades);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
