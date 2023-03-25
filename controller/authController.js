import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const signUp = async (req, res) => {
  const { email, password, confirmPassword, name, phone, gender } = req.body;
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Email not valid" });
  }
  const users = await prisma.user.findFirst({
    where: {
      OR: [
        {
          name: {
            equals: name,
          },
        },
        {
          email: {
            equals: email,
          },
        },
      ],
    },
  });
  if (users) {
    return res
      .status(400)
      .json({ message: "Username or email already in use" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must more than 6 character" });
  }
  if (password !== confirmPassword)
    return res.status(400).json({ message: "Password and confirm not match" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  const data = { email, password, name, phone, gender, password: hashPassword };
  try {
    const user = await prisma.user.create({
      data: {
        ...data,
      },
    });
    res.status(200).json({ message: "User Sign Up", id: user.uuid });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Email not valid" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with email ${email} not found` });
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(400).json({ message: "Wrong password" });
    }
    const accessToken = jwt.sign(
      { id: user.uuid, role: user.role },
      process.env.ACCESS,
      {
        expiresIn: "30m",
      }
    );
    const refreshToken = jwt.sign(
      { id: user.uuid, role: user.role },
      process.env.REFRESH,
      {
        expiresIn: "2d",
      }
    );
    await prisma.user.update({
      data: { refresh_token: refreshToken },
      where: { uuid: user.uuid },
    });
    const expToken = jwt.sign(
      { token: process.env.EXP, id: user.uuid },
      process.env.EXP,
      {
        expiresIn: "30m",
      }
    );

    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000,
        // secure:true
      })
      .status(200)
      .json({ message: "User Sign In", token: expToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export const adminSignIn = async (req, res) => {
  const { email, password } = req.body;
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Email not valid" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with email ${email} not found` });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can access" });
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(400).json({ message: "Wrong password" });
    }
    const accessToken = jwt.sign(
      { id: user.uuid, role: user.role },
      process.env.ACCESS,
      {
        expiresIn: "30m",
      }
    );
    const refreshToken = jwt.sign(
      { id: user.uuid, role: user.role },
      process.env.REFRESH,
      {
        expiresIn: "2d",
      }
    );
    await prisma.user.update({
      data: { refresh_token: refreshToken },
      where: { uuid: user.uuid },
    });
    const expToken = jwt.sign(
      { token: process.env.EXP, id: user.uuid },
      process.env.EXP,
      {
        expiresIn: "30m",
      }
    );

    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000,
        // secure:true
      })
      .status(200)
      .json({ message: "User Sign In", token: expToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const signOut = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { uuid: req.params.id },
    });
    await prisma.user.update({
      data: {
        refresh_token: null,
      },
      where: { uuid: user.uuid },
    });
    res
      .cookie("access_token", "", { expires: new Date(0) })
      .status(200)
      .json({ message: "User Sign Out" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getFirst = async (req, res) => {
  if (!req.params.id) {
    return res.status(401).json({ message: "Plese login to your account" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { uuid: req.params.id },
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with uuid ${req.params.id} not found` });
    }
    const accessToken = jwt.sign(
      { id: user.uuid, role: user.role },
      process.env.ACCESS,
      {
        expiresIn: "20m",
      }
    );
    const refreshToken = jwt.sign(
      { id: user.uuid, role: user.role },
      process.env.REFRESH,
      {
        expiresIn: "2d",
      }
    );
    await prisma.user.update({
      data: { refresh_token: refreshToken },
      where: { uuid: user.uuid },
    });
    const expToken = jwt.sign(
      { token: process.env.EXP, id: user.uuid },
      process.env.EXP,
      {
        expiresIn: "30m",
      }
    );

    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000,
        // secure:true
      })
      .status(200)
      .json({ message: "Token added", token: expToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getMe = async (req, res) => {
  try {
    jwt.verify(
      req.cookies.access_token,
      process.env.ACCESS,
      async (err, decodedAccess) => {
        if (err) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }
        const user = await prisma.user.findUnique({
          where: { uuid: decodedAccess.id },
          select: {
            name: true,
            uuid: true,
            img: true,
          },
        });
        res.status(200).json(user);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
