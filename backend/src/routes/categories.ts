import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.json({ message: "category api works!" });
});

export default router;