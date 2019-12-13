import User from "../models/User"

export default (...roles) => async (req, res, next) => {
        console.log("verificando check")
    try{

        const user = await User.findOne({where:{id: req.userId, admin:true}})

        if(!user){
            return res.status(401).json({error: "User not found or not admin"})
        }

        return next()
    }catch(err){
        return res.status(401).json({error: "User not found or not admin"})
    }
}