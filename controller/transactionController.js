import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllTransaction = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const offset = limit * page;
    const totalRows = await prisma.transaction.count({
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
    });
    const totalPage = Math.ceil(totalRows / limit);
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
        order: {
          select: {
            totalPrice: true,
            totalQuantity: true,
          },
        },
      },
      skip: offset,
      take: limit,
      orderBy: {
        id: "desc",
      },
    });

    res.json({ result: transactions, page, limit, totalRows, totalPage });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { uuid: req.params.id },
      select: {
        uuid: true,
        name: true,
        createdAt: true,
        order: {
          select: {
            uuid: true,
            user_id: true,
            totalPrice: true,
            totalQuantity: true,
            name: true,
            country: true,
            city: true,
            address: true,
            postal_code: true,
            user: {
              select: {
                phone: true,
              },
            },
            cart: {
              select: {
                quantity: true,
                price: true,
                stock: {
                  select: {
                    size: true,
                    color: true,
                  },
                },
                product: {
                  select: {
                    uuid: true,
                    img: true,
                    name: true,
                    price: true,
                  },
                },
              },
            },
          },
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

export const getTransactionStats = async (req, res) => {
  try {
    const result =
      await prisma.$queryRaw`SELECT sum(o.totalPrice) as Total_Income ,MONTH(t.createdAt) as Month, YEAR(t.createdAt) as Year
FROM Transaction as t
INNER JOIN online_store.Order as o ON t.order_id = o.uuid
GROUP BY YEAR(createdAt), MONTH(createdAt) ORDER BY YEAR(createdAt) ASC, MONTH(createdAt) ASC`;
    const data = result.map((item) => ({
      Month: item.Month,
      Year: item.Year,
      Total_Income: parseInt(item.Total_Income),
    }));
    res.status(200).json(data);
    return;
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
