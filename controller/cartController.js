import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// add user
export const addCart = async (req, res) => {
  const { product_id, color, size, quantity } = req.body;
  try {
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
    if (product.stock.length === 0) {
      res.status(400).json({ message: "Out of stock" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }

  //   jwt.verify(
  //     req.cookies.access_token,
  //     process.env.ACCESS,
  //     async (err, decodedToken) => {
  //       if (err) {
  //         return res.status(403).json({ message: "Invalid access token" });
  //       }
  //       console.log(decodedToken);
  //       try {
  //         const cart = await prisma.cart.create({
  //           data: {
  //             user_id: decodedToken.id,
  //             stock_id: stock_id,
  //           },
  //         });

  //         res
  //           .status(200)
  //           .json({ message: "Product Added to cart", product: product });
  //       } catch (error) {
  //         console.log(error);
  //         return res.status(500).json(error);
  //       }
  //     }
  //   );
};

// // get all user
// export const getAllUser = async (req, res) => {
//   const page = parseInt(req.query.page) || 0;
//   const limit = parseInt(req.query.limit) || 10;
//   const search = req.query.search || "";
//   const offset = limit * page;
//   try {
//     const totalRows = await prisma.user.count({
//       where: {
//         OR: [
//           {
//             name: {
//               contains: search,
//             },
//           },
//           {
//             email: {
//               contains: search,
//             },
//           },
//         ],
//       },
//     });

//     const totalPage = Math.ceil(totalRows / limit);
//     const result = await prisma.user.findMany({
//       where: {
//         OR: [
//           {
//             name: {
//               contains: search,
//             },
//           },
//           {
//             email: {
//               contains: search,
//             },
//           },
//         ],
//       },
//       select: {
//         uuid: true,
//         name: true,
//         email: true,
//         phone: true,
//         gender: true,
//         img: true,
//         role: true,
//       },
//       skip: offset,
//       take: limit,
//       orderBy: {
//         id: "desc",
//       },
//     });

//     res.json({ result, page, limit, totalRows, totalPage });
//   } catch (error) {
//     console.log(error);
//     res.status(200).json(error);
//   }
// };

// // get user by id
// export const getUserById = async (req, res) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         uuid: req.params.id,
//       },
//       select: {
//         id: true,
//         uuid: true,
//         name: true,
//         email: true,
//         phone: true,
//         img: true,
//         gender: true,
//       },
//     });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json({ user });
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };

// // update user
// export const updateUser = async (req, res) => {
//   const user = await prisma.user.findUnique({
//     where: {
//       uuid: req.params.id,
//     },
//   });
//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }
//   const { name, email, password, confirmPassword, role, img, phone, gender } =
//     req.body;
//   let hashPassword;
//   if (!password || password === "" || password === null) {
//     hashPassword = user.password;
//   } else {
//     {
//       if (password !== confirmPassword)
//         return res
//           .status(400)
//           .json({ message: "Password and confirm not match" });
//       else if (password && confirmPassword) {
//         const salt = await bcrypt.genSalt();
//         hashPassword = await bcrypt.hash(password, salt);
//       }
//     }
//   }
//   try {
//     const updatedUser = await prisma.user.update({
//       where: { uuid: user.uuid },
//       data: {
//         email: email,
//         name: name,
//         password: hashPassword,
//         phone: phone,
//         gender: gender,
//         img: img,
//         role: role,
//       },
//     });

//     res
//       .status(200)
//       .json({ message: "User has been updated", user: updatedUser });
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };
// // delete user
// export const deleteUser = async (req, res) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         uuid: req.params.id,
//       },
//     });
//     if (!user) return res.status(404).json({ message: "User not found" });
//     await prisma.user.delete({
//       where: {
//         uuid: req.params.id,
//       },
//     });
//     res.status(200).json({ message: "User has been deleted" });
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };
