import { Router } from "express";

const router = Router();

// GET /api/news
router.get("/", (_req, res) => {
  res.json({
    status: "ok",
    news: []
  });
});

export default router;
