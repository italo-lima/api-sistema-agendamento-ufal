import Sequelize, {Model} from "sequelize"
import bcrypt from "bcryptjs"

class User extends Model{
    static init(sequelize){
        super.init(
            {
                first_name: Sequelize.STRING,
                last_name: Sequelize.STRING,
                registration: Sequelize.STRING,
                office: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,  
                password_hash: Sequelize.STRING,
                role: Sequelize.STRING,
                cpf: Sequelize.STRING
            },
            {
                sequelize
            }
        )

        this.addHook('beforeSave', async (user) => {
            //password_hash só será gerado quando password for informado
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password, 8)
            }
        })
        return this
        }

        passwordValidate(password){
            return bcrypt.compare(password, this.password_hash)
        }
    }

export default User