import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import type { UserCredentials, UserTokenPayload } from "../../types/types.js";
import User from "../../database/models/User.js";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as UserCredentials;

  const user = await User.findOne({ username });

  if (!user) {
    const error = new CustomError("No data found", 404, "Data not found");

    next(error);
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    const error = new CustomError("Wrong password", 401, "Wrong credentials");
    next(error);
    return;
  }

  const tokenPayload: UserTokenPayload = {
    id: user._id.toString(),
    username,
  };

  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
  res.status(200).json({ accesToken: token });
};
