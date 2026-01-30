import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.json({ message: "category api works!" });
});

export default router;

// import { Router } from 'express';
// import prisma from '../lib/prisma';

// const router = Router();

// // 👈 これが必要です！
// router.post("/", async (req, res) => {
//   try {
//     const { name } = req.body;
//     const category = await prisma.category.create({
//       data: { name }
//     });
//     res.status(201).json(category);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "カテゴリ作成失敗" });
//   }
// });

// router.get("/", async (req, res) => {
//   const categories = await prisma.category.findMany();
//   res.json(categories);
// });

// export default router;

// import { Router } from 'express';
// import prisma from '../lib/prisma';

// const router = Router();

// // カテゴリ作成 (POST)
// router.post('/', async (req, res) => {
//   try {
//     const { name } = req.body;
//     const newCategory = await prisma.category.create({
//       data: { name },
//     });
//     res.status(201).json(newCategory);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create category' });
//   }
// });

// // カテゴリ一覧 (GET)
// router.get('/', async (req, res) => {
//   const categories = await prisma.category.findMany();
//   res.json(categories);
// });

// export default router;