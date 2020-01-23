import User from "../models/User"

export default (...roles) => async (req, res, next) => {
    const user = await User.findOne({where:{id: req.userId}})
    const checkRole = roles.includes(user.role)
    
    if(!user){
        return res.status(401).json({error: "User not found"})
    }

    if(!checkRole){
        return res.status(401).json({error: "User not admin"})
    }

    return next()
}