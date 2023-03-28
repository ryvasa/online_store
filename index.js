import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import refreshTokenRoute from "./routes/refreshTokenRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import slideRoute from "./routes/slideRoute.js";
import orderRoute from "./routes/orderRoute.js";
import categoryPreviewRoute from "./routes/categoryPreviewRoute.js";
import transactionRoute from "./routes/transactionRoute.js";
import chatRoute from "./routes/chatRoute.js";
import messageRoute from "./routes/messageRoute.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:5173"],
  })
);
app.use(cookieParser());
app.use(authRoute);
app.use(refreshTokenRoute);
app.use(userRoute);
app.use(productRoute);
app.use(cartRoute);
app.use(slideRoute);
app.use(orderRoute);
app.use(transactionRoute);
app.use(categoryPreviewRoute);
app.use(chatRoute);
app.use(messageRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
