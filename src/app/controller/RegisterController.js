import Register from "../models/Register"
import Equipment from "../models/Equipment"
import User from "../models/User"

import {isBefore, parseISO} from "date-fns"
import pt from 'date-fns/locale/pt-BR'
import * as Yup from "yup"

class RegisterController{

    async index(req, res){
        const {id} = req.params

        const register = await Register.findOne({where: {id}})        

        return res.json(register)

    }

    async show(req, res){
        const registers = await Register.findAll({
            order:['date'],
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
            date: Yup.date().required()
        })

        if(!(await schema.isValid(req.body))){
            return res.status(401).json({error: "Validations Fail"})
        }

        const {equipment_id, date} = req.body

        const checkExists = await Equipment.findOne({where: {id: equipment_id}})
        
        if(!checkExists){
            return res.status(401).json({error: "Equipment not found"})
        }

        /* Verificando se a data atual é menor que a data que está tentando agendar */
        const checkHour = parseISO(date)
        
        if(isBefore(checkHour, new Date())){
            return res.status(401).json({error: "Past dates are not permited"})
        }

        /* Verificando se a data está livre para agendar equipamento */
        const checkRegister = await Register.findOne({
            where:{
                id: equipment_id,
                user_id: req.userId,
                date
            }
        })
        
        if(checkRegister){
            return res.status(401).json({error: "Equipment is not available"})
        }

        const register = await Register.create({
            user_id: req.userId,
            equipment_id,
            date
        })

        return res.json(register)
    }

    async delete(req, res){
        const register = await Register.findByPk(req.params.id)

        if(register.user_id != req.userId){
            return res.status(401)
            .json({error:"You don't have permission to cancel this registration"})
        }
        
        register.canceled_at = new Date()

        await register.save()

        return res.json(register)

    }
}

export default new RegisterController()