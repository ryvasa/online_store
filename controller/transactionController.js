import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";

export const getAllTransaction = async (req, res) => {
  try {
    const search = req.query.search || "";
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [
          {
            order_id: {
              contains: search,
            },
          },
          {
            name: {
              contains: search,
            },
          },
        ],
      },
      include: {
        order: {},
      },
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { uuid: req.params.id },
      include: {
        order: {
          include: { cart: true },
        },
      },
    });
    if (!transaction) {
      return re.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export const deleteTransaction = async (req, res) => {
  try {
    await prisma.transaction.delete({
      where: { uuid: req.params.id },
    });
    res.status(200).json({ message: "History transaction deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};
