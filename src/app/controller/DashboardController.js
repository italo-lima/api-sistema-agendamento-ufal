import Register from "../models/Register"
import Equipment from "../models/Equipment"
import User from "../models/User"
import {Op, Model} from 'sequelize'

import {startOfWeek, endOfWeek} from "date-fns"

class DashboardController{
    async findRegisterIdUser(req, res){
        const checkUser = await User.findOne({
            where: {id: req.userId}
        })

        if (!checkUser){
            return res.status(401).json({error: "User not found"})
        }
        const today = new Date()
        const todayWeekStart = startOfWeek(today)
        const todayWeekEnd = endOfWeek(today)

        const allRegisters = await Register.findAll({
            order: ['date_initial'],
            include:[
                {
                model: Equipment,
                as: 'equipment',
                attributes:['name', 'code']
                }
            ],
            where: {
                canceled_at: null,
                checkout: null,
                date_initial:{
                    [Op.between]: [
                        todayWeekStart, todayWeekEnd]
                },
                date_final:{
                    [Op.between]: [
                        todayWeekStart, todayWeekEnd]
                }
            }
        })
        
        return res.json(allRegisters)
        
    }
}

export default new DashboardController()