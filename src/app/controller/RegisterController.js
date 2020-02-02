import Register from "../models/Register"
import Equipment from "../models/Equipment"
import User from "../models/User"
import {Op} from 'sequelize'

import {isBefore, parseISO,startOfMinute, endOfMinute, subMinutes} from "date-fns"
import pt from 'date-fns/locale/pt-BR'
import * as Yup from "yup"

class RegisterController{

    async index(req, res){
        const {id} = req.params

        const register = await Register.findOne({where: {id}})        

        if(!register){
            return res.status(401).json({error: "User not found"})
        }

        return res.json(register)

    }

    async show(req, res){
        const registers = await Register.findAll({
            order:['date_initial'],
            include:[
            {
                model: User,
                as: 'user',
                attributes:['first_name', 'last_name', 'registration', 'office', 'email']
            },
            {
                model: Equipment,
                as: 'equipment',
                attributes:['name', 'owner', 'code', 'active']
            }            
        ]
        })

        return res.json(registers)
    }

    async store(req, res){

        const schema = Yup.object().shape({
            equipment_id: Yup.number().required(),
            date_initial: Yup.date().required(),
            date_final: Yup.date().required()
        })

        if(!(await schema.isValid(req.body))){
            return res.status(401).json({error: "Validations Fail"})
        }

        const {equipment_id, date_initial, date_final} = req.body

        const checkExists = await Equipment.findOne({where: {id: equipment_id}})
        
        if(!checkExists){
            return res.status(401).json({error: "Equipment not found"})
        }

        if(!checkExists.active){
            return res.status(401).json({error: "Deactivated equipment"})
        }

        /* Verificando se a data atual é menor que a data que está tentando agendar */
        const checkHour = parseISO(date_initial)
        
        if(isBefore(checkHour, new Date())){
            return res.status(401).json({error: "Past dates are not permited"})
        }

        const date_initial_parse = startOfMinute(parseISO(date_initial))
        const date_final_parse = endOfMinute(subMinutes(parseISO(date_final), 1))

        /* Verificando se a data está livre para agendar equipamento */
        const checkRegister = await Register.findOne({
            where:{
                equipment_id,
                canceled_at: null,
                date_initial:{
                    [Op.between]: [
                        date_initial_parse, date_final_parse]
                },
                date_final:{
                    [Op.between]: [
                        date_initial_parse, date_final_parse]
                }
            }
        })
                                                                                                                                                                                                                                                                                                                
        if(checkRegister){
            return res.status(401).json({error: "Equipment is not available"})
        }

        const register = await Register.create({
            user_id: req.userId,
            equipment_id,
            date_initial: date_initial_parse,
            date_final: date_final_parse
        })

        return res.json(register)
    }

    async delete(req, res){
        const register = await Register.findByPk(req.params.id)

        //alterado o role, se der erro, remover ele
        if(register.role !='admin' && register.user_id != req.userId){
            return res.status(401)
            .json({error:"You don't have permission to cancel this registration"})
        }
        
        register.canceled_at = new Date()

        await register.save()

        return res.json(register)

    }

    async action(req, res){
        const register = await Register.findByPk(req.params.id)
        const action = req.params.action
        //alterado o role, se der erro, remover ele
        if(register.role !='admin' && register.user_id != req.userId){
            return res.status(401)
            .json({error:"You don't have permission to cancel this registration"})
        }
        
        action == 'checkin' ? register.checkin = true : register.checkout = true

        await register.save()

        return res.json(register)

    }
}

export default new RegisterController()