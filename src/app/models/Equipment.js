import Sequelize, {Model} from "sequelize"

class Equipment extends Model {
    static init(sequelize){
        super.init(
            {
                name: Sequelize.STRING,
                owner: Sequelize.STRING,
                code: Sequelize.STRING,
                active: Sequelize.BOOLEAN
            },
            {
                sequelize
            }
        )

        return this
    }
}

export default Equipment