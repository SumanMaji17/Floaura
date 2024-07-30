import getPrismaInstance from "../utils/PrismaClient.js";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

import { comparePassword, hashPassword } from "../utils/PasswordGenerator.js";

config();

export const AdminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ msg: "All fields are required.", status: false });
    }
    const prisma = getPrismaInstance();
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.json({ msg: "Admin not found", status: false });
    } else {
      const adminPassword = password.toString();
      const match = await comparePassword(adminPassword, admin.password);
      if (!match) return res.status(400).send("Wrong password");

      const payload = {
        id: admin.id.toString(),
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET.toString(), {
        expiresIn: "2h",
      });

      admin.password = undefined;
      res
        .cookie("admin", token, {
          path: "/api",
          expires: new Date(Date.now() + 2592000000),
          httpOnly: true,
          // secure: true, // only works on https
        })
        .json({ msg: "Login Successfully...", status: true, data: admin });
    }
  } catch (err) {
    next(err);
  }
};

export const AdminSignUp = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !name || !password) {
      return res.json({ msg: "All fields are required.", status: false });
    }

    const prisma = getPrismaInstance();
    const adminExist = await prisma.admin.findUnique({ where: { email } });

    if (adminExist)
      return res.json({ msg: "Admin already exist", status: false });

    const adminPassword = password.toString();

    const hashedPassword = await hashPassword(adminPassword);

    const admin = await prisma.admin.create({
      data: { name, email, password: hashedPassword },
    });

    return res.json({ msg: "SignUp Successful..", status: true, admin });
  } catch (err) {
    next(err);
  }
};

export const AdminProfile = async (req, res, next) => {
  try {
    const adminData = req.authenticatedAdmin;
    return res.json({ data: adminData, status: true });
  } catch {
    next(err);
  }
};
