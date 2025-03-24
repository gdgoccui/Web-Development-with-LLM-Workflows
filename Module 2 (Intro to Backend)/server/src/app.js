import express from "express";
import cors from "cors";

const app = express();

// middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

export default app;