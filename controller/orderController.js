import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";

export const addOrder = async (req, res) => {
  try {
    let userId;
    jwt.verify(
      req.cookies.access_token,
      process.env.ACCESS,
      async (err, decodedToken) => {
        if (err) {
          return res.status(403).json({ message: "Invalid access token" });
        }
        userId = decodedToken.id;
      }
    );
    const transaction = await prisma.$transaction;

    const newOrder = await prisma.order.create({
      data: {
        user_id: userId,
        // product_id: "PRODUCT_ID",
        // stock_id: "STOCK_ID",
        totalPrice: 100,
        totalQuantity: 1,
        name: "John Doe",
        country: "USA",
        city: "New York",
        address: "123 Main St",
        postal_code: 10001,
      },
      include: {
        product: true,
        stock: true,
        user: true,
        cart: true,
      },
    });
    const updatedStock = await prisma.stock.update({
      where: {
        uuid: "STOCK_ID",
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
    res.status(200).json({ orde: newOrder, product: updatedStock });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
