import { Router } from 'express';
import { AdminCheck } from '../middlewares/Auth.js';
import { AddCategory, DeleteCategory, GetAllCategory, UpdateCategory } from '../controllers/CategoryController.js';



const router = Router();

router.post("/add-category",AdminCheck,AddCategory)
router.get("/get-all-category",GetAllCategory);
router.post("/delete-category",AdminCheck,DeleteCategory);
router.post("/update-category",AdminCheck,UpdateCategory)

export default router;