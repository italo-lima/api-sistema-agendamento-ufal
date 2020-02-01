import { Router } from "express";

import UserController from "./app/controller/UserController"
import EquipmentController from "./app/controller/EquipmentController"
import RegisterController from "./app/controller/RegisterController"

import SessionController from "./app/controller/SessionController"

import authMiddleware from "./app/middlewares/auth"
import CheckRole from "./app/middlewares/checkPermission"
import JobsCancellationRegister from "./app/jobs/CancellationRegister"

import {scheduleJob} from "node-schedule"

//scheduleJob('*/1 * * * *', JobsCancellationRegister.verify)

const routes = new Router()

routes.post("/sessions", SessionController.store)

routes.use(authMiddleware)

//rotas de usuários
routes.get("/users/:id",CheckRole("admin"), UserController.index)
routes.get("/users", CheckRole("admin"), UserController.show)
routes.put("/users/:id", UserController.update)
routes.post("/users", CheckRole("admin"), UserController.store)
routes.delete("/users/:id", CheckRole("admin"), UserController.delete)

//rotas de equipamentos
routes.get("/equipment", CheckRole("admin"), EquipmentController.show)
routes.get("/equipment/:id", CheckRole("admin"), EquipmentController.index)
routes.put("/equipment/:id", CheckRole("admin"), EquipmentController.update)
routes.delete("/equipment/:id", CheckRole("admin"), EquipmentController.destroy)
routes.post("/equipment/", CheckRole("admin"), EquipmentController.store)

//rotas de registros dos equipamentos
routes.post("/register", RegisterController.store)
routes.delete("/register/:id", RegisterController.delete)
routes.get("/register/:id",CheckRole("admin"), RegisterController.index) 
routes.get("/register", CheckRole("admin"), RegisterController.show)

export default routes