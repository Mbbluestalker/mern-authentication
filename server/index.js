import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserRouter } from "./routes/user.js";
import cors from "cors";

dotenv.config();
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/authentication");

app.use(express.json());
app.use(cors());
app.use("/auth", UserRouter);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
