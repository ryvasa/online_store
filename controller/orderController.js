import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import Stripe from "stripe";

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
    const total = await prisma.cart.aggregate({
      _sum: {
        quantity: true,
        price: true,
      },
      where: { user_id: userId, uuid: { in: req.body.cartId }, order_id: null },
    });
    if (total._sum.quantity === null && total._sum.price === null) {
      return res.status(400).json({ message: "Product not avaible" });
    } else {
      try {
        await prisma.$transaction(async (tx) => {
          const createOrder = await prisma.order.create({
            data: {
              user_id: userId,
              totalPrice: total._sum.price,
              totalQuantity: total._sum.quantity,
              name: req.body.name,
              country: req.body.country,
              city: req.body.city,
              address: req.body.address,
              postal_code: req.body.postal_code,
            },
          });
          const stripe = new Stripe(process.env.STRIPE);
          const response = await stripe.charges.create({
            source: req.body.tokenId,
            amount: total._sum.price * 100,
            currency: "usd",
          });

          const updateCarts = await prisma.cart.updateMany({
            data: { order_id: createOrder.uuid },
            where: {
              user_id: userId,
              uuid: { in: req.body.cartId },
              order_id: null,
            },
          });
          const carts = await prisma.cart.findMany({
            where: { order_id: createOrder.uuid },
          });
          for (const cart of carts) {
            const updateSoldProduct = await prisma.product.update({
              data: { sold: { increment: cart.quantity } },
              where: { uuid: cart.product_id },
            });
          }
          res.status(200).json({
            carts: carts,
            createdOrder: createOrder,
            updateCarts: updateCarts,
          });
        });
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getAllOrder = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const offset = limit * page;
    const totalRows = await prisma.order.count({
      where: {
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            country: {
              contains: search,
            },
          },
          {
            city: {
              contains: search,
            },
          },
          {
            address: {
              contains: search,
            },
          },
        ],
      },
    });
    const totalPage = Math.ceil(totalRows / limit);
    const orders = await prisma.order.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            country: {
              contains: search,
            },
          },
          {
            city: {
              contains: search,
            },
          },
          {
            address: {
              contains: search,
            },
          },
        ],
      },
      select: {
        uuid: true,
        name: true,
        totalPrice: true,
        totalQuantity: true,
        status: true,
        createdAt: true,
      },
      skip: offset,
      take: limit,
      orderBy: {
        id: "desc",
      },
    });
    res.json({ result: orders, page, limit, totalRows, totalPage });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getOrderByUserId = async (req, res) => {
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
    const orders = await prisma.order.findMany({
      where: { user_id: userId },
      include: {
        cart: {
          include: {
            product: {
              select: {
                name: true,
                price: true,
              },
            },
            stock: {
              select: {
                color: true,
                size: true,
              },
            },
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { uuid: req.params.id },
      select: {
        uuid: true,
        name: true,
        totalPrice: true,
        totalQuantity: true,
        country: true,
        city: true,
        address: true,
        postal_code: true,
        status: true,
        createdAt: true,
        user: {
          select: {
            phone: true,
          },
        },
        cart: {
          select: {
            quantity: true,
            price: true,
            product: {
              select: {
                name: true,
                price: true,
                img: true,
              },
            },
            stock: {
              select: {
                color: true,
                size: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export const updateOrderStatus = async (req, res) => {
  let data;
  if (req.body.data === "confirm") {
    data = "success";
  } else {
    data = "cancelled";
  }
  try {
    const findOrder = await prisma.order.findUnique({
      where: { uuid: req.params.id },
    });
    const findTransaction = await prisma.transaction.findUnique({
      where: { order_id: req.params.id },
    });
    const deleteTransaction = await prisma.transaction.deleteMany({
      where: {
        order: { status: "proccess" },
      },
    });
    if (!findOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (findOrder.status !== "proccess" || findTransaction) {
      return res
        .status(400)
        .json({ message: "The order has been processed before" });
    }
    try {
      await prisma.$transaction(async (tx) => {
        const order = prisma.order.update({
          data: { status: data },
          where: { uuid: req.params.id },
        });

        if (data === "success") {
          const transaction = prisma.transaction.create({
            data: { order_id: req.params.id, name: (await order).name },
          });
          return res.status(200).json({
            message: `Transaction Added`,
            transaction: await transaction,
            order: await order,
          });
        } else {
          res
            .status(200)
            .json({ message: `Order ${data}`, order: await order });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export const getOrderStats = async (req, res) => {
  try {
    const result =
      await prisma.$queryRaw`SELECT MONTH(createdAt) as Month, YEAR(createdAt) as Year, COUNT(*) as Total_Order FROM online_store.Order GROUP BY YEAR(createdAt), MONTH(createdAt) ORDER BY YEAR(createdAt) ASC, MONTH(createdAt) ASC`;
    const data = result.map((item) => ({
      Month: item.Month,
      Year: item.Year,
      Total_Order: parseInt(item.Total_Order),
    }));
    res.status(200).json(data);
    return;
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
