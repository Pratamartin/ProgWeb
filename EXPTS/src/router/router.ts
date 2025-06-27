import { Router } from 'express';
import main from '../controllers/main';

const router = Router();

router.get('/', main.index);
router.get('/about', main.about);
router.get('/lorem/:count', main.loremRoute);
router.get('/hb1', main.hb1);
router.get('/hb2', main.hb2);
router.get('/hb3', main.hb3);
router.get('/hb4', main.hb4);

export default router;
