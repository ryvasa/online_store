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

// // get all product
export const getAllProduct = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const size = req.query.size;
  const color = req.query.color;
  const category = req.query.category;
  const search = req.query.search || "";
  const offset = limit * page;
  try {
    const totalRows = await prisma.product.findMany({
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
          {
            stock: {
              some: {
                color: color,
                size: size,
              },
            },
          },
        ],
      },
      include: {
        stock: {
          where: {
            color: color,
            size: size,
          },
        },
      },
    });

    const totalPage = Math.ceil(totalRows.length / limit);
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
          {
            stock: {
              some: {
                color: color,
                size: size,
              },
            },
          },
        ],
      },
      select: {
        uuid: true,
        img: true,
        name: true,
        price: true,
        sold: true,
        stock: {
          where: {
            color: color,
            size: size,
          },
          select: {
            stock: true,
          },
        },
      },
      skip: offset,
      take: limit,
      orderBy: [
        {
          sold: "desc",
        },
        {
          name: "asc",
        },
      ],
    });
    res
      .status(200)
      .json({ result, page, limit, totalRows: totalRows.length, totalPage });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// getall product store
export const getAllStoreProduct = async (req, res) => {
  const size = req.query.size;
  const color = req.query.color;
  const category = req.query.category;
  const search = req.query.search || "";
  const sort = req.query.sort;
  let sortBy;
  if (sort === "soldAsc") {
    sortBy = { sold: "asc" };
  } else if (sort === "soldDesc") {
    sortBy = { sold: "desc" };
  } else if (sort === "priceAsc") {
    sortBy = { price: "asc" };
  } else if (sort === "priceDesc") {
    sortBy = { price: "desc" };
  } else {
    sortBy = { createdAt: "desc" };
  }
  try {
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
          {
            stock: {
              some: {
                color: color,
                size: size,
              },
            },
          },
        ],
      },
      select: {
        uuid: true,
        img: true,
        name: true,
        price: true,
        sold: true,
        stock: {
          where: {
            color: color,
            size: size,
          },
          select: {
            stock: true,
            color: true,
          },
        },
      },
      orderBy: [sortBy],
    });
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// get product by id
export const getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        uuid: req.params.id,
      },
      select: {
        uuid: true,
        name: true,
        img: true,
        categories: true,
        detail: true,
        price: true,
        rating: true,
        desc: true,
        sold: true,
        stock: {
          select: {
            size: true,
            color: true,
            stock: true,
          },
        },
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
    console.log(error);
    return res.status(500).json(error);
  }
};

export const addStock = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      uuid: req.params.id,
    },
  });
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  const findStock = await prisma.stock.findFirst({
    where: {
      AND: [
        {
          color: {
            contains: req.body.color,
          },
        },
        {
          size: {
            contains: req.body.size,
          },
        },
        {
          product_id: {
            equals: req.params.id,
          },
        },
      ],
    },
    include: {
      product: true,
    },
  });
  if (findStock) {
    try {
      const updatedStock = await prisma.stock.update({
        data: {
          ...req.body,
          stock: req.body.stock,
        },
        where: {
          uuid: findStock.uuid,
        },
      });

      res
        .status(200)
        .json({ message: "Stock has been updated", product: updatedStock });
    } catch (error) {
      console.log(error);

      return res.status(500).json(error);
    }
  } else {
    try {
      const createdStock = await prisma.stock.create({
        data: {
          product_id: req.params.id,
          ...req.body,
        },
      });

      res
        .status(200)
        .json({ message: "Product has been updated", product: createdStock });
    } catch (error) {
      console.log(error);

      return res.status(500).json(error);
    }
  }
};
// delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        uuid: req.params.id,
      },
      include: { stock: true },
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    await prisma.product.delete({
      where: {
        uuid: req.params.id,
      },
      include: { stock: true },
    });
    res.status(200).json({ message: "Product has been deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// get products stats

export const getProductStats = async (req, res) => {
  try {
    const result =
      await prisma.$queryRaw` SELECT sum(o.totalQuantity) as Sold_Product ,MONTH(t.createdAt) as Month, YEAR(t.createdAt) as Year
FROM Transaction as t
INNER JOIN online_store.Order as o ON t.order_id = o.uuid
GROUP BY YEAR(createdAt), MONTH(createdAt) ORDER BY YEAR(createdAt) ASC, MONTH(createdAt) ASC`;
    const data = result.map((item) => ({
      Month: item.Month,
      Year: item.Year,
      Sold_Product: parseInt(item.Sold_Product),
    }));
    res.status(200).json(data);
    return;
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getBestSellerProduct = async (req, res) => {
  try {
    const result = await prisma.product.findMany({
      orderBy: { sold: "desc" },
      take: 4,
    });
    res.status(200).json({ result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
