import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.send('Hello from TypeScript Express App!');
});

router.get('/about', (_req, res) => {
  res.render('about');
});

export default router;
