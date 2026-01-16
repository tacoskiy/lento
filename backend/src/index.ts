import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import newsRouter from "./routes/news";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/news", newsRouter);

const PORT = Number(process.env.PORT) || 8000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

app.get("/api/hello", (_req, res) => {
  res.json({
    status: "ok",
    message: "Hello from Express and node.js!"
  });
});