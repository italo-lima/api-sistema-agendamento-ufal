import { Router } from "express";

import UserController from "./app/controller/UserController"
import EquipmentController from "./app/controller/EquipmentController"

import SessionController from "./app/controller/SessionController"

import authMiddleware from "./app/middlewares/auth"
import CheckAdminMiddleware from "./app/middlewares/auth"

const routes = new Router()

routes.post("/sessions", SessionController.store)

routes.post("/users", UserController.store)
routes.get("/users/:id", UserController.index)
routes.get("/users", UserController.show)
routes.put("/users/:id",  UserController.update)
routes.delete("/users/:id", UserController.delete)

//routes.post("/equipment", EquipmentController.store)

//routes.use(authMiddleware)
//routes.use("/users", CheckAdminMiddleware("admin", "owner", "manager"), UserController.show)
//routes.get("/users/:id", UserController.index)
//routes.put("/users",  UserController.update)
//routes.delete("/users/", UserController.delete)

export default routes