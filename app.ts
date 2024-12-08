// src/app.ts
import express from "express";
import routes from "./routes";
import dotenv from "dotenv";
import { connectDB } from "./db";
import cors from 'cors';

import bodyParser from "body-parser";

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'https://backend-gamma-five-74.vercel.app/',
  optionsSuccessStatus: 200
};


app.use(cors(corsOptions));

app.use(bodyParser.json()); 

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 8000;


// SAY Hello 
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Assistant API"
    })
})

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to connect to the database:", error);
});
