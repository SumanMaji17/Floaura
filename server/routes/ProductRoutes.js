import { Router } from 'express';
import { AdminCheck } from '../middlewares/Auth.js';
import { AddProduct, GetAllProduct } from '../controllers/ProductController.js';




const router = Router();

router.post("/add-product",AdminCheck,AddProduct)
router.get("/get-all-product",GetAllProduct);


export default router;
