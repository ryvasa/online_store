import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// add Product
export const addProduct = async (req, res) => {
  try {
    const { name, img, rating, categories, detail, desc, price, stock } =
      req.body;

    const product = await prisma.product.create({
      data: {
        name,
        img,
        rating,
        categories,
        detail,
        desc,
        price,
        stock: {
          create: stock.map((s) => ({
            size: s.size,
            color: s.color,
            stock: s.stock,
          })),
        },
      },
      include: {
        stock: true,
      },
    });

    res.status(200).json({ message: "Product Added", product: product });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// get all product
export const getAllProduct = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const size = req.query.size || "";
  const color = req.query.color || "";
  const category = req.query.category;
  const search = req.query.search || "";
  const offset = limit * page;
  try {
    const totalRows = await prisma.product.count({
      where: {
        AND: [
          {
            name: {
              contains: search,
            },
          },
          {
            categories: {
              array_contains: category,
            },
          },
        ],
      },
    });

    const totalPage = Math.ceil(totalRows / limit);
    const result = await prisma.product.findMany({
      where: {
        AND: [
          {
            name: {
              contains: search,
            },
          },
          {
            categories: {
              array_contains: category,
            },
          },
        ],
      },
      skip: offset,
      take: limit,
      orderBy: {
        id: "desc",
      },
    });

    res.json({ result, page, limit, totalRows, totalPage });
  } catch (error) {
    console.log(error);
    res.status(200).json(error);
  }
};

// get product by id
export const getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// update product
export const updateProduct = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      uuid: req.params.id,
    },
  });
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  try {
    const updatedProduct = await prisma.product.update({
      data: {
        ...req.body,
      },
      where: { uuid: product.uuid },
    });

    res
      .status(200)
      .json({ message: "Product has been updated", product: updatedProduct });
  } catch (error) {
    return res.status(500).json(error);
  }
};
// delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    await prisma.product.delete({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ message: "Product has been deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
