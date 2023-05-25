import express from "express";
import { getAllUsers, login, signup } from "../controllers/user-controller";

const userRouter = express.Router();//for handling request types put, get, post, delete

userRouter.get("/", getAllUsers );
userRouter.post("/register/", signup);
userRouter.post("/login", login);
export default userRouter;