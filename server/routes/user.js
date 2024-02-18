import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "User exists" });
  }

  const hashpassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashpassword,
  });

  await newUser.save();
  return res.json({ status: true, message: "user successfully registered" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ status: false, message: "User is not registered" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "Incorrect Password" });
  }

  const token = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "1hr",
  });

  console.log(token);

  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });

  return res.json({ status: true, message: "Login successful" });
});

export { router as UserRouter };
