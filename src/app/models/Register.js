import Sequelize, {Model} from "sequelize"

class Register extends Model {
    static init(sequelize){
        super.init({
            date_initial: Sequelize.DATE,
            date_final: Sequelize.DATE,
            canceled_at: Sequelize.DATE,
            checkin: Sequelize.BOOLEAN,
            checkout: Sequelize.BOOLEAN
        },
        {
            sequelize
        }
    )
        return this
    }

    static associate(models){
        this.belongsTo(models.User, {foreignKey: 'user_id', as:'user'})
        this.belongsTo(models.Equipment, {foreignKey: 'equipment_id', as:'equipment'})
    }
}

export default Register