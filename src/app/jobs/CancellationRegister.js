import Register from "../models/Register"

import {addMinutes, isAfter} from "date-fns"

class CancellationRegister{
    
    async verify() {
        let registers = await Register.findAll({where: {canceled_at: null}})

        registers.forEach(register => {
            const maxHourRegister = addMinutes(register.date, 5)
                /* if(isAfter(new Date(), maxHourRegister)){
                register.canceled_at = new Date()
                await register.save()
            } */
        })
    }
}

export default new CancellationRegister()