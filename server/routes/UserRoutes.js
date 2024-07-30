import { Router } from "express";
import { UserCheck } from "../middlewares/Auth.js";
import {
  CreateReview,
  DeleteReview,
  EditProfile,
  EditReview,
  GetAllReviews,
  LogOut,
  OtpGenerator,
  OtpVerification,
  SentEmail,
  UserLogin,
  UserProfile,
  UserSignUp,
  UserVerify,
} from "../controllers/UserController.js";

const router = Router();

router.post("/user-pass-verify", UserVerify);
router.post("/user-login", UserLogin);
router.post("/user-signup", UserSignUp);
router.get("/user-profile", UserCheck, UserProfile);
router.post("/otp-generate", OtpGenerator);
router.post("/otp-verify", OtpVerification);
router.post("/create-review",UserCheck,CreateReview);
router.get("/get-all-reviews",GetAllReviews);
router.post("/delete-review",UserCheck,DeleteReview);
router.post("/edit-review",UserCheck,EditReview);
router.post("/sent-email",SentEmail);
router.post("/edit-profile",UserCheck,EditProfile);
router.get("/log-out",UserCheck,LogOut);

export default router;
