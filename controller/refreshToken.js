import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const refreshToken = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { uuid: req.params.id },
    });
    if (!user) {
      return res.status(401).json({ message: "Plese login to your account" });
    }
    jwt.verify(
      user.refresh_token,
      process.env.REFRESH,
      async (err, decodedToken) => {
        if (err) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }
        const accessToken = jwt.sign(
          { id: user.uuid, role: user.role },
          process.env.ACCESS,
          {
            expiresIn: "30m",
          }
        );
        jwt.verify(
          user.refresh_token,
          process.env.REFRESH,
          async (err, decodedAccess) => {
            if (err) {
              return res.status(403).json({ message: "Invalid refresh token" });
            }
          }
        );
        jwt.verify(
          accessToken,
          process.env.ACCESS,
          async (err, decodedAccess) => {
            if (err) {
              return res.status(403).json({ message: "Invalid access token" });
            }
          }
        );
        const expToken = jwt.sign(
          { token: process.env.EXP, id: user.uuid },
          process.env.EXP,
          {
            expiresIn: "30m",
          }
        );
        await res
          .status(200)
          .cookie("access_token", accessToken, {
            httpOnly: true,
            maxAge: 30 * 60 * 1000,
            // secure:true
          })
          .json({ message: "Access token refreshed", token: expToken });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
