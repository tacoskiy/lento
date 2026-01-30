// import { Router } from "express";

// const router = Router();

// // GET /api/news
// router.get("/", (_req, res) => {
//   res.json({
//     status: "ok",
//     news: []
//   });
// });

// export default router;

import { Router } from 'express';
// import prisma from '../lib/prisma';

const router = Router();

// ニュース作成（カテゴリ紐づけ）
router.post("/", async (req, res) => {
  const { title, content, categoryIds } = req.body;

  try {
    const news = await prisma.news.create({
      data: {
        title,
        content,
        categories: {
          create: categoryIds.map((id: number) => ({
            categoryId: id // 直接IDを指定する方が確実です
          })),
        },
      },
      include: {
        categories: { include: { category: true } }
      }
    });
    res.status(201).json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "作成に失敗しました" });
  }
});

// ニュース取得（カテゴリ込み）
router.get("/", async (_req, res) => {
  try {
    const newsList = await prisma.news.findMany({
      include: {
        categories: {
          include: { category: true },
        },
      },
    });
    res.json(newsList);
  } catch (error) {
    res.status(500).json({ error: "取得に失敗しました" });
  }
});

export default router;