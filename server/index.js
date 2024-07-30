import { config } from "dotenv";
import cors from "cors";
import express, { json, raw } from "express";
import AdminRoutes from "./routes/AdminRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import CategoryRoutes from "./routes/CategoryRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import AddressRoutes from "./routes/AddressRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";
import cookieParser from "cookie-parser";
import { CreateOrder } from "./controllers/OrderController.js";

config();
const PORT = process.env.PORT || 3005;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000"
const app = express();
app.post("/webhook", raw({ type: "application/json" }), CreateOrder);

app.use(json());
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    optionSuccessStatus: 200,
    sameSite: "None",
  })
);

app.use(express.urlencoded({ extended: false }));

app.use("/api/admin", AdminRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/category", CategoryRoutes);
app.use("/api/product", ProductRoutes);
app.use("/api/address", AddressRoutes);
app.use("/api/order", OrderRoutes);

// app.get("/api/server-status", (req, res) => {
//   res.status(200).json({ message: "Server is up and running!" });
// });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
