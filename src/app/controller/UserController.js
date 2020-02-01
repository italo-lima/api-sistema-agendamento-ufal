import User from "../models/User"
import * as Yup from "yup"

class UserController{

    async show(req, res){
        //listando tds os usuários
        const users = await User.findAll()

        const usersDestruct = []
        users.forEach(({id,first_name, last_name, email, role, registration, office}) => 
        usersDestruct.push({id,first_name, last_name, email, role, registration, office}))
        
        return res.json(usersDestruct)
    }

    async index(req, res){
        const {id} = req.params
        
        const user = await User.findByPk(id)

        if(!user){
            return res.status(401).json({error: "User Not Found"})
        }

        const {first_name, last_name, email, role, registration, office} = user

        console.log("result", first_name, last_name, email, role, registration, office)
        return res.json({first_name, last_name, email, role, registration, office})
    }

    async store(req, res){

        //validação dos campos necessários para cadastro
        const schema = Yup.object().shape({
            first_name: Yup.string().required(),
            last_name: Yup.string().required(),
            registration: Yup.string().required(),
            office: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        })

        if(!(await schema.isValid(req.body))){
            return res.status(401).json({error: "Validations Fail"})
        }
        
        //verificando se usuário já existe
        const userExists = await User.findOne({where: {email: req.body.email}})
        
        if(userExists){
           return res.status(401).json({error: "User already exists"})
        }

        const registrationExists = await User.findOne({where: {registration: req.body.registration}})
        
        if(registrationExists){
           return res.status(401).json({error: "Registration already exists"})
        }
        
        const {id, first_name, last_name, office, registration ,email, role} = await User.create(req.body)

        return res.json({id, first_name, last_name, office, registration ,email, role})
    }
    
    async update(req, res){
        const schema = Yup.object().shape({
            first_name: Yup.string(),
            last_name: Yup.string(),
            registration: Yup.string(),
            office: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            //field refere-se ao password
            password: Yup.string().min(6).when('oldPassword', (oldPassword, field) => 
                oldPassword ? field.required() : field
            ),
            //Yup.ref -> garante que confirmPassword sejá igual ao password
            confirmPassword: Yup.string().when('password', (password, field) => 
                password ? field.required().oneOf([Yup.ref('password')]) : field
            )
        })

        if(!(await schema.isValid(req.body))){
            return res.status(401).json({error: "Validations Fail"})
        }

        const {id} = req.params
        const {email, oldPassword} = req.body

        //buscando usuário
        const user = await User.findByPk(id)
        
        //se email cadastrado for diferente do digitado, então quer alterar email
        if(user.email !== email){
            const userExists = await User.findOne({where: {email}})

            if(userExists){
               return res.status(401).json({error: "User already exists"})
            }
        }

        //para atualizar senha, oldpassword deve ser igual ao password cadastrado
        if(oldPassword && !(await user.passwordValidate(oldPassword))){
            return res.status(401).json({error: "Password does not match"})
        }

        const {first_name, last_name, office, registration, role} = await user.update(req.body)


        return res.json({id, first_name, last_name, office, registration ,email, role})
    }

    async delete(req, res){

        const {id} = req.params
        await User.destroy({where: {id}})

        return res.send()
    }
}

export default new UserController()