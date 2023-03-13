import express from "express";
import db from "./config/Database.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import refreshTokenRoute from "./routes/refreshTokenRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";

dotenv.config();
// try {
//   await db.authenticate();
//   console.log("Database conected...");
// } catch (error) {
//   console.log(error);
// }
// (async () => {
//   await db.sync();
// })();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(authRoute);
app.use(refreshTokenRoute);
app.use(userRoute);
app.use(productRoute);
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
