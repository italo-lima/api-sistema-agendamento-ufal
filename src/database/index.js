import Sequelize from "sequelize"

import dataBaseConfig from "../config/database"

import User from "../app/models/User"
import Equipment from "../app/models/Equipment"
import Register from "../app/models/Register"

//Array de models para ser carregado
const models = [User, Equipment, Register]

//conexão com o banco e carregar os models 
class DataBase{
    constructor(){
        this.init()
    }

    init(){
        this.connection = new Sequelize(dataBaseConfig)
        models.map(model => model.init(this.connection))
        models.map(model => model.associate && model.associate(this.connection.models))   
    }
}

export default new DataBase()