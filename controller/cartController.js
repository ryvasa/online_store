import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// add product or update product on cart
export const addCart = async (req, res) => {
  const { product_id, color, size, quantity } = req.body;
  const product = await prisma.product.findUnique({
    where: { uuid: product_id },
    include: {
      stock: {
        where: {
          color: color,
          size: size,
        },
      },
    },
  });
  if (
    !product ||
    product.stock.length === 0 ||
    product.stock[0].stock <= 0 ||
    quantity > product.stock[0].stock
  ) {
    return res.status(400).json({ message: "Out of stock" });
  }
  jwt.verify(
    req.cookies.access_token,
    process.env.ACCESS,
    async (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ message: "Invalid access token" });
      }
      try {
        const cart = await prisma.cart.findFirst({
          where: {
            AND: [
              {
                user_id: decodedToken.id,
              },
              {
                product_id: product.uuid,
              },
              {
                stock_id: product.stock[0].uuid,
              },
            ],
          },
          include: {
            product: true,
            stock: true,
          },
        });
        if (cart) {
          if (product.stock[0].stock === 0) {
            return res.status(400).json({ message: "Out of stock" });
          }
          try {
            const updateStock = prisma.stock.update({
              data: { stock: cart.stock.stock - quantity },
              where: { uuid: cart.stock_id },
            });
            const updateCart = prisma.cart.update({
              data: {
                quantity: cart.quantity + quantity,
                price: product.price * (cart.quantity += quantity),
              },
              where: { uuid: cart.uuid },
            });
            await prisma.$transaction([updateStock, updateCart]);
            res.status(200).json({
              message: "Update product quantity on cart",
              cart: await updateCart,
            });
          } catch (error) {
            console.log(error);
            res.status(500).json(error);
          }
        } else {
          try {
            const updateStock = prisma.stock.update({
              data: { stock: { decrement: quantity } },
              where: { uuid: product.stock[0].uuid },
            });
            const addCart = prisma.cart.create({
              data: {
                user_id: decodedToken.id,
                product_id: product_id,
                stock_id: product.stock[0].uuid,
                quantity: quantity,
                price: product.price * quantity,
              },
            });
            const findCart = prisma.cart.findFirst({
              where: {
                user_id: decodedToken.id,
                product_id: product_id,
                stock_id: product.stock[0].uuid,
                quantity: quantity,
                price: product.price * quantity,
              },
            });
            await prisma.$transaction([updateStock, addCart, findCart]);
            res
              .status(200)
              .json({ message: "Product Added to cart", cart: await findCart });
          } catch (error) {
            console.log(error);
            return res.status(500).json(error);
          }
        }
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    }
  );
};

// get all product on cart by user id
export const getAllProductOnCart = async (req, res) => {
  jwt.verify(
    req.cookies.access_token,
    process.env.ACCESS,
    async (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ message: "Invalid access token" });
      }
      try {
        const cart = await prisma.cart.findMany({
          where: { user_id: decodedToken.id },
          include: {
            product: true,
            stock: true,
          },
        });
        res.status(200).json(cart);
      } catch (error) {
        console.log(error);
        res.status(200).json(error);
      }
    }
  );
};

// add or reduce quantity product on cart
export const updateQuantity = async (req, res) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { uuid: req.params.id },
      include: {
        product: true,
        stock: true,
      },
    });
    if (!cart) {
      return res.status(404).json({ message: "Product not found on cart" });
    }
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
    if (userId === cart.user_id) {
      if (req.body.operation === "add") {
        if (cart.stock.stock === 0) {
          return res.status(400).json({ message: "Out of stock" });
        } else {
          const addCart = prisma.cart.update({
            data: {
              quantity: cart.quantity + 1,
              price: cart.product.price * (cart.quantity + 1),
            },
            where: { uuid: req.params.id },
          });
          const updateStock = prisma.stock.update({
            data: { stock: cart.stock.stock - 1 },
            where: { uuid: cart.stock_id },
          });

          await prisma.$transaction([addCart, updateStock]);
          res
            .status(200)
            .json({ message: "Cart added +1", addCart: await addCart });
        }
      } else if (req.body.operation === "reduce") {
        if (cart.quantity <= 1) {
          try {
            const deleteCart = prisma.cart.delete({
              where: {
                uuid: cart.uuid,
              },
            });
            const updateStock = prisma.stock.update({
              data: { stock: cart.stock.stock + 1 },
              where: { uuid: cart.stock_id },
            });
            await prisma.$transaction([deleteCart, updateStock]);
            return res.status(200).json({ message: "Cart deleted" });
          } catch (error) {
            console.log(error);
            res.status(500).json(error);
          }
        }
        const reduceCart = prisma.cart.update({
          data: {
            quantity: cart.quantity - 1,
            price: cart.product.price * (cart.quantity - 1),
          },
          where: { uuid: req.params.id },
        });
        const updateStock = prisma.stock.update({
          data: { stock: cart.stock.stock + 1 },
          where: { uuid: cart.stock_id },
        });

        await prisma.$transaction([reduceCart, updateStock]);
        res
          .status(200)
          .json({ message: "Cart reduced -1", reduceCart: await reduceCart });
      }
    } else {
      return res.status(403).json({ message: "You are not allowed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// delete product on cart
export const deleteProductOnCart = async (req, res) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { uuid: req.params.id },
      include: {
        product: true,
        stock: true,
      },
    });
    if (!cart) {
      return res.status(404).json({ message: "Product not found on cart" });
    }
    const deleteCart = prisma.cart.delete({
      where: {
        uuid: req.params.id,
      },
    });
    const updateStock = prisma.stock.update({
      data: { stock: cart.stock.stock + cart.quantity },
      where: { uuid: cart.stock_id },
    });
    await prisma.$transaction([deleteCart, updateStock]);
    res.status(200).json({ message: "Product on cart has been deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
