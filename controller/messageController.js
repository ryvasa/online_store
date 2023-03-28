import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// get all message
export const getAllMessage = async (req, res) => {
  try {
    const response = await prisma.message.findMany({});
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
// add message client
export const addMessage = async (req, res) => {
  jwt.verify(
    req.cookies.access_token,
    process.env.ACCESS,
    async (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ message: "Invalid access token" });
      }
      try {
        const response = await prisma.message.create({
          data: {
            user_id: decodedToken.id,
            chat_id: req.body.chat_id,
            message: req.body.message,
          },
        });
        res.status(200).json(response);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    }
  );
};
// delet message
export const deleteMessage = async (req, res) => {
  try {
    const response = await prisma.message.delete({
      where: { uuid: req.params.id },
    });
    res.status(200).json({ message: "Message has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
