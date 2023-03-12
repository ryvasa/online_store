import User from "../models/User.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

// add user
export const addUser = async (req, res) => {
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    return res.status(400).json({ message: "Password and confirm not match" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const user = await User.create({
      ...req.body,
      password: hashPassword,
    });
    res.status(200).json({ message: "User Added", id: user.uuid });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// get all user
export const getAllUser = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  try {
    const totalRows = await User.count({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            email: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
    });
    const totalPage = Math.ceil(totalRows / limit);
    const result = await User.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            email: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
      attributes: ["uuid", "name", "email", "phone", "gender", "img", "role"],
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
    });
    res.json({ result, page, limit, totalRows, totalPage });
  } catch (error) {
    console.log(error);
    res.status(200).json(error);
  }
};

// get user by id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.params.id,
      },
      attributes: ["uuid", "name", "email", "phone", "gender", "img"],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// update user
export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const { name, email, password, confirmPassword, role, img, phone, gender } =
    req.body;
  let hashPassword;
  if (!password || password === "" || password === null) {
    hashPassword = user.password;
  } else {
    {
      if (password !== confirmPassword)
        return res
          .status(400)
          .json({ message: "Password and confirm not match" });
      else if (password && confirmPassword) {
        const salt = await bcrypt.genSalt();
        hashPassword = await bcrypt.hash(password, salt);
      }
    }
  }
  try {
    const updatedUser = await User.update(
      {
        email: email,
        name: name,
        password: hashPassword,
        phone: phone,
        gender: gender,
        img: img,
        role: role,
      },
      { where: { uuid: user.uuid } }
    );

    res
      .status(200)
      .json({ message: "User has been updated", user: updatedUser });
  } catch (error) {
    return res.status(500).json(error);
  }
};
// delete user
export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ message: "User not found" });
  try {
    await User.destroy({
      where: {
        uuid: user.uuid,
      },
    });
    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
