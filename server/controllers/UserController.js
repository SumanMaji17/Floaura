import getPrismaInstance from "../utils/PrismaClient.js";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import twilio from "twilio";
import nodemailer from "nodemailer";
import { OtpTemplate } from "../utils/EmailVerificationTemplate.js";
import { comparePassword, hashPassword } from "../utils/PasswordGenerator.js";
import { contactUsEmail } from "../utils/ConatctUsEmail.js";

config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const UserLogin = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ msg: "Email is required required.", status: false });
    }
    const prisma = getPrismaInstance();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.json({ msg: "User not found", status: false });
    }
    {
      const payload = {
        id: user.id.toString(),
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET.toString(), {
        expiresIn: "15d",
      });

      user.password = undefined;
      res
        .cookie("user", token, {
          path: "/api",
          expires: new Date(Date.now() + 1296000000),
          httpOnly: true,
          secure: true, // only works on https
          sameSite: "none",
          domain: "floaura.onrender.com",
        })
        .json({ msg: "Login Successfully...", status: true, data: user });
    }
  } catch (err) {
    next(err);
  }
};

export const UserVerify = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ msg: "All fields are required.", status: false });
    }
    const prisma = getPrismaInstance();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.json({ msg: "User not found", status: false });
    } else {
      const userPassword = password.toString();
      const match = await comparePassword(userPassword, user.password);
      if (!match) return res.status(400).send("Wrong password");
      user.password = undefined;
      user.name = undefined;
      user.id = undefined;
      res.json({ msg: "Login Successfully...", status: true, data: user });
    }
  } catch (err) {
    next(err);
  }
};

export const UserSignUp = async (req, res, next) => {
  try {
    const { email, name, password, phone } = req.body;
    if (!email || !name || !password || !phone) {
      return res.json({ msg: "All fields are required.", status: false });
    }

    const prisma = getPrismaInstance();
    const userExist = await prisma.user.findUnique({ where: { email } });

    if (userExist)
      return res.json({ msg: "User already exist", status: false });

    const userPassword = password.toString();

    const hashedPassword = await hashPassword(userPassword);

    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword, phone },
    });

    return res.json({ msg: "SignUp Successful..", status: true, user });
  } catch (err) {
    next(err);
  }
};

export const UserProfile = async (req, res, next) => {
  try {
    const userData = req.authenticatedUser;
    return res.json({ data: userData, status: true });
  } catch {
    next(err);
  }
};

export const OtpGenerator = async (req, res, next) => {
  try {
    const { email, phone } = req.body;

    if (!email || !phone) {
      return res.json({ status: false, msg: "All fields are required.." });
    }

    const otpEmail = Math.floor(100000 + Math.random() * 900000).toString();
    const otpPhone = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedPhoneOtp = await hashPassword(otpPhone);
    const hashedEmailOtp = await hashPassword(otpEmail);

    const phoneNumber = phone.toString();
    const prisma = getPrismaInstance();
    const otpCreationTime = new Date();

    const otpExpirationTime = new Date(otpCreationTime.getTime() + 10 * 60000);

    const otp = await prisma.otp.upsert({
      where: { email: email },
      create: {
        email: email,
        emailOtp: hashedEmailOtp,
        phone: phoneNumber,
        phoneOtp: hashedPhoneOtp,
        otpExp: otpExpirationTime,
      },
      update: {
        emailOtp: hashedEmailOtp,
        phoneOtp: hashedPhoneOtp,
        otpExp: otpExpirationTime,
      },
    });

    client.messages.create({
      body: `Your OTP is ${otpPhone}`,
      from: twilioPhoneNumber,
      to: phone,
    });

    const mailOptions = {
      from: "FLOAURA",
      to: email,
      subject: "Email Subject",
      html: OtpTemplate(otpEmail),
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Error sending email");
      } else {
        console.log("Email sent...");
      }
    });

    return res.json({ status: 200, msg: "Send Email success" });
  } catch (err) {
    next(err);
  }
};

export const verifyOTPInDatabase = async (identifier, otp, type) => {
  try {
    const prisma = getPrismaInstance();
    const user =
      type === "email"
        ? await prisma.otp.findUnique({ where: { email: identifier } })
        : await prisma.otp.findUnique({ where: { phone: identifier } });

    if (!user) return false;
    const otpField = type === "email" ? user.emailOtp : user.phoneOtp;
    const isVerified = await comparePassword(otp, otpField);

    const currentTime = new Date();

    const otpExpirationTime = new Date(user.otpExp);

    const isExpired = currentTime.getTime() > otpExpirationTime.getTime();

    return isVerified && !isExpired;
  } catch (error) {
    console.error("Error verifying OTP in database:", error);
    throw error;
  }
};

export const OtpVerification = async (req, res, next) => {
  try {
    const { email, phone, otp } = req.body;
    let isVerified = false;
    if (email) {
      // Verify email OTP
      isVerified = await verifyOTPInDatabase(email, otp, "email");
    } else if (phone) {
      // Verify phone OTP
      isVerified = await verifyOTPInDatabase(phone, otp, "phone");
    }

    if (!isVerified) {
      return res.json({ msg: "Not verified", status: false });
    }
    return res.json({ msg: "verified Successful..", status: true });
  } catch (err) {
    next(err);
  }
};

export const CreateReview = async (req, res, next) => {
  try {
    const { reviewData, orderId } = req.body;
    const userData = req.authenticatedUser;
    const prisma = getPrismaInstance();

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
        userId: userData.id,
      },
    });

    if (!order) {
      return res.json({ msg: "Order doesn't exist...", status: false });
    }

    const createdReviews = await Promise.all(
      reviewData.map((review) =>
        prisma.ratings.create({
          data: {
            rating: review.rating,
            review: review.review,
            product: {
              connect: { id: review.productId },
            },
            order: {
              connect: { id: orderId },
            },
            user: {
              connect: { id: userData.id },
            },
          },
          include: {
            product: {
              include: {
                images: true,
              },
            },
            order: true,
            user: true,
          },
        })
      )
    );

    if (createdReviews) {
      return res.json({
        createdReviews,
        msg: "Review were successfully created.",
        status: true,
      });
    }

    return res.json({ msg: "Error while creating reviews...", status: false });
  } catch (error) {
    next(error);
  }
};

export const GetAllReviews = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const reviews = await prisma.ratings.findMany({
      include: {
        product: {
          include: {
            images: true,
          },
        },
        order: true,
        user: true,
      },
    });

    const sanitizedReviews = reviews.map((review) => ({
      ...review,
      user: {
        id: review.user.id,
        name: review.user.name,
      },
      order: {
        id: review.order.id,
        orderType: review.order.orderType,
      },
    }));

    return res.json({ reviews: sanitizedReviews, status: true });
  } catch (error) {
    next(error);
  }
};

export const DeleteReview = async (req, res, next) => {
  try {
    const { reviewId } = req.body;

    if (!reviewId) {
      return res.json({ msg: "All fields are required.", status: false });
    }
    const prisma = getPrismaInstance();

    const review = await prisma.ratings.findUnique({
      where: {
        id: reviewId,
      },
    });

    if (!review) {
      return res.json({ msg: "Review does not exist...", status: false });
    }

    const deletedReview = await prisma.ratings.delete({
      where: {
        id: reviewId,
      },
    });

    if (!deletedReview) {
      return res.json({ msg: "Error while deleting review", status: false });
    }

    return res.json({
      msg: "Successfully deleted the review.",
      status: true,
      deletedReview,
    });
  } catch (error) {
    next(error);
  }
};

export const EditReview = async (req, res, next) => {
  try {
    const { reviewId, rating, review } = req.body;

    if (!reviewId || !rating || !review) {
      return res.json({ msg: "All fields are required.", status: false });
    }

    const prisma = getPrismaInstance();

    const rev = await prisma.ratings.findUnique({
      where: {
        id: reviewId,
      },
    });

    if (!rev) {
      return res.json({ msg: "Review does not exist...", status: false });
    }

    const updatedReview = await prisma.ratings.update({
      where: { id: reviewId },
      data: { rating: rating, review: review },
    });

    return res.json({
      msg: "Successfully updated the category...",
      editedReview: updatedReview,
      status: true,
    });
  } catch (error) {
    next(error);
  }
};

export const SentEmail = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    const mailOptions = {
      from: "FLOAURA",
      to: email,
      subject: "Contact Form Confirmation",
      html: contactUsEmail(email, name, message), // This could be your HTML template
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
        return res.json({ status: false, msg: "Error while sending email..." });
      } else {
        console.log("Email sent...");
      }
    });

    return res.json({ status: true, msg: "Email sent successfully..." });
  } catch (error) {
    next(error);
  }
};

export const EditProfile = async (req, res, next) => {
  try {
    const { newName } = req.body;

    if (!newName || newName.length === 0) {
      return res.json({ msg: "All fields are required.", status: false });
    }
    const userData = req.authenticatedUser;
    const prisma = getPrismaInstance();

    const updatedUser = await prisma.user.update({
      where: { id: userData.id },
      data: { name: newName },
    });

    if (!updatedUser) {
      return res.json({
        msg: "Error while saving name...",
        status: false,
      });
    }

    return res.json({
      msg: "Successfully updated the category...",
      updatedUser: updatedUser,
      status: true,
    });
  } catch (error) {
    next(error);
  }
};

export const LogOut = (req, res, next) => {
  try {
    res.clearCookie("user", { path: "/api" }).json({ status: true });
  } catch (error) {
    res.json({ status: false });
    next(error);
  }
};
