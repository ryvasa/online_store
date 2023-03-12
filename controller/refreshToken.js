import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const refreshToken = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { uuid: req.params.id },
    });
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
            expiresIn: "20m",
          }
        );
        await res
          .status(200)
          .cookie("access_token", accessToken, {
            httpOnly: true,
            maxAge: 20 * 60 * 1000,
            // secure:true
          })
          .json({ message: "Access token refreshed" });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
