import { Op } from "sequelize";
import Product from "../models/Product.js";

// add Product
export const addProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
    });
    res.status(200).json({ message: "Product Added", product: product });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// get all product
export const getAllProduct = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";
  const cat = req.query.cat || "";
  const size = req.query.size || "";
  const color = req.query.color || "";
  const offset = limit * page;
  try {
    const totalRows = await Product.count({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            categories: search,
          },
        ],
      },
    });
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            categories: search,
          },
        ],
      },
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
    });
    res.status(200).json({ result, page, limit, totalRows, totalPage });
    // res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get product by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
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
  const product = await Product.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  try {
    const updatedProduct = await Product.update(
      {
        ...req.body,
      },
      { where: { uuid: product.uuid } }
    );

    res
      .status(200)
      .json({ message: "Product has been updated", product: updatedProduct });
  } catch (error) {
    return res.status(500).json(error);
  }
};
// delete product
export const deleteProduct = async (req, res) => {
  const product = await Product.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!product) return res.status(404).json({ message: "Product not found" });
  try {
    await Product.destroy({
      where: {
        uuid: product.uuid,
      },
    });
    res.status(200).json({ message: "Product has been deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
