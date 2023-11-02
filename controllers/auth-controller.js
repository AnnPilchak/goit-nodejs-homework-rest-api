import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, `${email} is already in use`)
    }
    
    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({...req.body, password: hashPassword});

    res.status(201).json({
        email,
        subscription: 'starter',
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, `Email or password is wrong`)
    }
    
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, `Email or password is wrong`)
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '23h' });
    const loggedUser = await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
        token,
        user: {
            email: loggedUser.email,
            subscription: loggedUser.subscription,
        }
    })
}

const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

export default {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    current: ctrlWrapper(current),
    logout: ctrlWrapper(logout),
}