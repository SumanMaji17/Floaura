import getPrismaInstance from "../utils/PrismaClient.js";
import jwt from "jsonwebtoken";
import pkg from "jsonwebtoken";
import { config } from "dotenv";
const { TokenExpiredError } = pkg;

config();

export const AdminCheck = async (req, res, next) => {
  try {
    const token = req.cookies.admin;

    if (token) {
      try {
        const admin = jwt.verify(token, process.env.JWT_SECRET.toString());
        const prisma = getPrismaInstance();
        const id = admin.id;
        const adminExist = await prisma.admin.findUnique({ where: { id } });

        if (adminExist) {
          adminExist.password = undefined;

          req.authenticatedAdmin = adminExist;
          
        //   res.json({ data: adminExist, status: true });
          return next();
        } else {
          return res.json({ msg: "Admin does not exist", status: false });
        }
      } catch (err) {
        if (err instanceof TokenExpiredError) {
          // Handle expired token
          return res.json({ msg: "Token has expired", status: false });
        } else {
          // Handle other errors
          throw err;
        }
      }
    } else {
      return res.json({ msg: "Admin does not exist", status: false });
    }
  } catch (err) {
    next(err);
  }
};



export const UserCheck = async (req, res, next) => {
  try {
    const token = req.cookies.user;
   

    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET.toString());
        const prisma = getPrismaInstance();
        const id = user.id;
        const userExist = await prisma.user.findUnique({ where: { id } });
        if (userExist) {
          userExist.password = undefined;

          req.authenticatedUser = userExist;
          return next();
        } else {
          return res.json({ msg: "User does not exist", status: false });
        }
      } catch (err) {
        if (err instanceof TokenExpiredError) {
          // Handle expired token
          return res.json({ msg: "Token has expired", status: false });
        } else {
          // Handle other errors
          throw err;
        }
      }
    } else {
      return res.json({ msg: "User does not exist", status: false });
    }
  } catch (err) {
    next(err);
  }
};