import User from "../models/User"

export default (...roles) => async (req, res, next) => {
    
    try{
        const user = await User.findOne({where:{id: req.userId}})
        const checkRole = roles.includes(user.role)
        
        if(!checkRole){
            return res.status(401).json({error: "User not found or not admin"})
        }

        return next()
        
    }catch(err){
        return res.status(401).json({error: "User not found or not admin"})
    }
}