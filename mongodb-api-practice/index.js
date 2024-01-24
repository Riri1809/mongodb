import express from 'express';
import "./loadEnvy.js"

import grades from './routes/grades.js'

console.log(process.env.ATLAS_URI);


const app = express();
const PORT = process.env.PORT || 3010;

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Welcome to the API.");
});

app.use("/grades", grades);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});




app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});