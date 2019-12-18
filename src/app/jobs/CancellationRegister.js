import {scheduleJob} from "node-schedule"
import Register from "../models/Register"

class CancellationRegister{
    async cancel(req, res){
        const registers = await Register.findAll()

        await scheduleJob('* * * * * *', function(){
            console.log("executando.....")
            /*
        register.canceled_at = new Date()

        await register.save()

        return res.json(register) */
        })
        
        return;
    }
}

module.exports = new CancellationRegister()