import express from "express";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

export default app;