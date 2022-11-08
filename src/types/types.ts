import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

export interface RobotsFeatures {
  _id: string;
  name: string;
  image: string;
  creation: string;
  resistance: number;
  speed: number;
}
export interface UserCredentials {
  username: string;
  password: string;
  _id: string;
}

export interface RegisterData extends UserCredentials {
  email: string;
}

export interface CustomRequest extends Request {
  userId: string;
}

export interface UserTokenPayload extends JwtPayload {
  id: string;
  username: string;
}
