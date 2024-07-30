import { Router } from 'express';
import { AdminLogin, AdminProfile, AdminSignUp } from '../controllers/AdminController.js';
import { AdminCheck } from '../middlewares/Auth.js';

const router = Router();

router.post("/admin-login",AdminLogin);
router.post("/admin-signup",AdminSignUp);
router.get("/admin-profile",AdminCheck,AdminProfile);

export default router;