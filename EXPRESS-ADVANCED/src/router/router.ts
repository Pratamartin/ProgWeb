import express from "express";
import majorController from "../controllers/major";

const router = express.Router();

router.get('/major', majorController.index);
router.all('/major/create', majorController.create);
router.get('/major/read/:id', majorController.read);
router.all('/major/update/:id', majorController.update);
router.post('/major/remove/:id', majorController.remove);

export default router;
