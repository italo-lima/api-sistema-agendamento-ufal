import Equipment from "../models/Equipment"
import * as Yup from "yup"

class EquipmentController{

    async show(req, res){
        const equipments = await Equipment.findAll()
        
        const allEquipments = []
        equipments.forEach(e => allEquipments.push(e.dataValues))
        
        return res.json(allEquipments)
    }

    async index(req, res){
        const {id} = req.params

        const equipment = await Equipment.findByPk(id)

        if(!equipment){
            return res.status(401).json({error: "Equipment not found"})
        }

        return res.json(equipment)
    }

    async store(req, res){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            owner: Yup.string().required(),
            code: Yup.string().required(),
            color: Yup.string().required(),
        })

        if(!(await schema.isValid(req.body))){
            return res.status(401).json({error: "Validations Fail"})
        }

        const {name, code} = req.body
        
        const checkExists = await Equipment.findOne({where: {name, code}})
        
        if(checkExists){
            return res.status(401).json({error: "Equipment Already Exists"})
        }

        const {id, owner, active} = await Equipment.create(req.body)

        return res.json({id, name, owner, code, active})
    }

    async update(req, res){
        const schema = Yup.object().shape({
            name: Yup.string(),
            owner: Yup.string(),
            code: Yup.string(),
            color: Yup.string(),
            active: Yup.boolean(),
        })

        if(! (await schema.isValid(req.body))){
            return res.status(401).json({error: "Validations Fail"})
        }

        const {id} = req.params
        const {code} = req.body

        //buscando equipamento
        const equipment = await Equipment.findByPk(id)

        if(!equipment){
            return res.status(401).json({error: "Equipment not found"})
        }
        
        const {owner, active, name} = await equipment.update(req.body)

        return res.json({id, code, owner, active, name})
    }

    async destroy(req, res){
        const {id} = req.params

        await Equipment.destroy({where: {id}})

        return res.send()
    }
}

export default new EquipmentController()