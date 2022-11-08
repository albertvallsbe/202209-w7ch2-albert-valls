import express from "express";
import { loginUser } from "../controllers/usersControllers.js";
import routes from "./routes.js";

const { loginRoute } = routes;

// eslint-disable-next-line new-cap
const usersRouter = express.Router();

usersRouter.post(loginRoute, loginUser);

export default usersRouter;
