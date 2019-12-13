import Equipment from "../models/Equipment"
import * as Yup from "yup"

class EquipmentController{
    async store(req, res){

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            owner: Yup.string().required(),
            code: Yup.string().required()
        })

        if(!(await schema.isValid(req.body))){
            return res.status(401).json({error: "Validations Fail"})
        }

        const {name, code} = req.body
        const checkExists = await Equipment.findOne({where: {name, code}})

        if(checkExists){
            return res.status(401).json({error: "Equipment Already Exists"})
        }

        const {id, name, owner, code} = await Equipment.create(req.body)

        return res.json({id, name, owner, code})
    }
}

export default new EquipmentController()