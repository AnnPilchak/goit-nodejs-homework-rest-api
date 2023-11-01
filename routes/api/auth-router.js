import express from "express";

import authController from "../../controllers/auth-controller.js";

import { authenticate, isEmptyBody } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import { userSignupSchema, userSigninSchema } from "../../models/User.js";

const userSignupValidate = validateBody(userSignupSchema);
const userSigninValidate = validateBody(userSigninSchema);


const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, userSignupValidate, authController.register);

authRouter.post("/login", isEmptyBody, userSigninValidate, authController.login);

authRouter.get("/current", authenticate, authController.current);

authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;