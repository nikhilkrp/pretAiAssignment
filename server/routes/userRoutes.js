import express from "express";
import { isAuth, Login, logout, signUp} from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/signup",signUp);
userRouter.post("/login",Login);
userRouter.get("/is-auth",authUser,isAuth);
userRouter.post("/logout",authUser,logout);


export default userRouter;