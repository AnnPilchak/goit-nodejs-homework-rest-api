import express from "express";
import authController from "../../controllers/auth-controller.js";

import { authenticate, isEmptyBody, upload } from "../../middlewares/index.js";
import { validateBody, validateEmail } from "../../decorators/index.js";
import { userSignupSchema, userSigninSchema, userEmailSchema } from "../../models/User.js";

const userSignupValidate = validateBody(userSignupSchema);
const userSigninValidate = validateBody(userSigninSchema);
const userEmailValidate = validateEmail(userEmailSchema);


const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, userSignupValidate, authController.register);

authRouter.post("/login", isEmptyBody, userSigninValidate, authController.login);

authRouter.get("/current", authenticate, authController.current);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch("/avatars", authenticate, upload.single('avatar'), authController.uploadAvatar);

authRouter.get("/verify/:verificationToken", authController.verify);

authRouter.post("/verify", isEmptyBody, userEmailValidate, authController.resendVerifyEmail);

export default authRouter;