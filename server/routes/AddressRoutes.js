import { Router } from 'express';
import { UserCheck } from "../middlewares/Auth.js";
import { AddAddress, DeleteAddress, GetAllAddress } from '../controllers/AddressController.js';

const router = Router();

router.post("/add-address", UserCheck,AddAddress);
router.get("/get-all-address",UserCheck,GetAllAddress);
router.post("/delete-address",UserCheck,DeleteAddress);

export default router;