import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// get all chat
export const getAllChat = async (req, res) => {
  try {
    const response = await prisma.chat.findMany({
      include: {
        user: {
          select: {
            uuid: true,
            img: true,
            name: true,
            role: true,
          },
        },
        message: {
          orderBy: [
            {
              createdAt: "desc",
            },
          ],
          take: 1,
        },
      },
      orderBy: [
        {
          updatedAt: "desc",
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// get singgle chat
export const getChatById = async (req, res) => {
  try {
    const response = await prisma.chat.findUnique({
      where: { uuid: req.params.id },
      include: {
        message: {
          include: { user: true },
        },
        user: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
// get client chat
export const getClientChat = async (req, res) => {
  jwt.verify(
    req.cookies.access_token,
    process.env.ACCESS,
    async (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ message: "Invalid access token" });
      }
      try {
        const response = await prisma.chat.findUnique({
          where: { user_id: decodedToken.id },
          include: {
            message: {
              include: {
                user: {
                  select: {
                    name: true,
                    uuid: true,
                    img: true,
                    role: true,
                  },
                },
              },
            },
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

// add chat client
export const addClientChat = async (req, res) => {
  jwt.verify(
    req.cookies.access_token,
    process.env.ACCESS,
    async (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ message: "Invalid access token" });
      }
      try {
        const response = await prisma.chat.create({
          data: { user_id: decodedToken.id },
        });
        res.status(200).json(response);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    }
  );
};

// add chat admin
export const addAdminChat = async (req, res) => {
  try {
    const response = await prisma.chat.create({
      data: { user_id: req.params.id },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// delete chat
export const deleteChat = async (req, res) => {
  try {
    const response = await prisma.chat.delete({
      where: { uuid: req.params.id },
    });
    res.status(200).json({ message: "Chat has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
