import express from "express";

const app = express();

// middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

export default app;