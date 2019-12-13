import { Router } from "express";

import UserController from "./app/controller/UserController"
import EquipmentController from "./app/controller/EquipmentController"

import SessionController from "./app/controller/SessionController"

import authMiddleware from "./app/middlewares/auth"
import CheckAdminMiddleware from "./app/middlewares/auth"

const routes = new Router()

routes.post("/sessions", SessionController.store)

routes.post("/users", UserController.store)
routes.post("/equipment", EquipmentController.store)

routes.use(authMiddleware)

//rotas de usuários
//routes.use("/users", CheckAdminMiddleware("admin"), UserController.show)
routes.get("/users/:id", UserController.index)
routes.get("/users", UserController.show)
routes.put("/users/:id",  UserController.update)
routes.delete("/users/:id", UserController.delete)

//rotas de equipamentos
routes.get("/equipment", EquipmentController.show)
routes.get("/equipment/:id", EquipmentController.index)
routes.put("/equipment/:id", EquipmentController.update)
routes.delete("/equipment/:id", EquipmentController.destroy)

export default routes