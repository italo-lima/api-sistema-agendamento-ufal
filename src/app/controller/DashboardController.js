import Register from "../models/Register"
import Equipment from "../models/Equipment"
import User from "../models/User"
import {Op, Sequelize} from 'sequelize'

import {startOfWeek, endOfWeek, startOfDay, endOfDay} from "date-fns"

class DashboardController{
    async findRegisterIdUser(req, res){
        console.log("req", req.userId)
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
                user_id: req.userId,
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

    async informationInitial(req, res){
        const todayDayStart = startOfDay(new Date())
        const todayDayEnd = endOfDay(new Date())
        
        const countUser = await User.count()
        const countEquipments = await Equipment.count()
        const countRegisters = await Register.count({
            where: {
                canceled_at: null,
                date_initial:{
                    [Op.between]: [
                        todayDayStart, todayDayEnd]
                },
                date_final:{
                    [Op.between]: [
                        todayDayStart, todayDayEnd]
                }
            }
        })

        return res.json({countUser, countEquipments,countRegisters})
    }

    async graphicAllRegisters(req, res){
        const allRegisters = await Register.findAll({
            attributes: [
                [Sequelize.fn('Count', Sequelize.col('equipment_id')), 'count']
              ],
              include: [{
                model: Equipment,
                as:'equipment',
                required: true,
                attributes: ['name','code']
              }],
              group: ['equipment_id','equipment.id']
        })

        const allRegistersFinal = []
        allRegisters.forEach(v =>  
        allRegistersFinal.push({
            x: v.equipment.code,
            y:parseInt(v.dataValues.count)
            }
        ))
        console.log(allRegistersFinal)
        
        const data = [{
            label: 'Gráfico 1',
            values :allRegistersFinal
        }]

        res.json(data)
    }

    async graphicAllRegistersUser(req, res){
        const allRegisters = await Register.findAll({
            attributes: [
                [Sequelize.fn('Count', Sequelize.col('user_id')), 'count']
              ],
              include: [{
                model: User,
                as:'user',
                required: true,
                attributes: ['first_name', 'last_name']
              }],
              group: ['user_id','user.id']
        })

        const allRegistersFinal = []
        allRegisters.forEach(v =>  
        allRegistersFinal.push({
            x: `${v.user.first_name} ${v.user.last_name}`,
            y:parseInt(v.dataValues.count)
            }
        ))
        
        const data = {
            label: 'Gráfico 2',
            values :allRegistersFinal
        }

        res.json(data)
    }

}

export default new DashboardController()
/*

async graphicAllRegisters(req, res){
        const allRegisters = await Register.findAll({
            attributes: [
                'equipment_id',
                [Sequelize.fn('Count', Sequelize.col('equipment_id')), 'count']
              ],
              include: [{
                model: Equipment,
                as:'equipment',
                required: true,
                attributes: ['name','code']
              }],
              group: ['equipment_id','equipment.id']
        })
*/