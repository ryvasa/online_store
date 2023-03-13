import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const verifyToken = async (req, res, next) => {
  try {
    jwt.verify(
      req.cookies.access_token,
      process.env.ACCESS,
      async (err, decodedAccess) => {
        if (err) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }
        const user = await prisma.user.findUnique({
          where: { uuid: decodedAccess.id },
        });
        jwt.verify(
          user.refresh_token,
          process.env.REFRESH,
          async (err, decodedRefresh) => {
            if (err) {
              return res.status(403).json({ message: "Invalid refresh token" });
            }
            if (
              decodedAccess.id === decodedRefresh.id &&
              decodedAccess.role === decodedRefresh.role
            ) {
              next();
            } else {
              return res.status(403).json({ message: "You are not allowed" });
            }
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export const onlyAdmin = async (req, res, next) => {
  try {
    jwt.verify(
      req.cookies.access_token,
      process.env.ACCESS,
      async (err, decodedAccess) => {
        if (err) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }
        const user = await prisma.user.findUnique({
          where: { uuid: decodedAccess.id },
        });
        jwt.verify(
          user.refresh_token,
          process.env.REFRESH,
          async (err, decodedRefresh) => {
            if (err) {
              return res.status(403).json({ message: "Invalid refresh token" });
            }
            if (
              user.role === "admin" &&
              decodedAccess.role === "admin" &&
              decodedRefresh.role === "admin"
            ) {
              next();
            } else {
              return res
                .status(403)
                .json({ message: "Admin only, you are not allowed" });
            }
          }
        );
      }
    );
  } catch (error) {}
};
