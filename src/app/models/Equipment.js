import Sequelize, {Model} from "sequelize"

class Equipment extends Model {
    static init(sequelize){
        super.init(
            {
                owner: Sequelize.STRING,
                name: Sequelize.STRING,
                code: Sequelize.STRING
            },
            {
                sequelize
            }
        )

        return this
    }
}

export default Equipment