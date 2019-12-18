import Register from "../models/Register"
import Equipment from "../models/Equipment"
import User from "../models/User"

class DashboardController{
    async findRegisterIdUser(req, res){
        const checkUser = await User.findOne({
            where: {id: req.userId}
        })

        if (!checkUser){
            return res.status(401).json({error: "User not found"})
        }

        const {date} = req.query
        const parseDate = parseISO(date)

        return res.send()
        
    }
}