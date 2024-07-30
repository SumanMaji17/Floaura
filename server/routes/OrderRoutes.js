import { Router } from 'express';
import { UserCheck } from '../middlewares/Auth.js';
import { CreatePayment, VerifyMember, getAllOrders } from '../controllers/OrderController.js';


const router = Router();

router.post("/self-pay",UserCheck,CreatePayment);
router.get("/get-all-orders",UserCheck,getAllOrders);
router.post("/verifyMember",UserCheck,VerifyMember);


export default router;