import Register from "../models/Register"

import {addMinutes, isAfter} from "date-fns"

class CancellationRegister{
    
    async verify() {
        let registers = await Register.findAll({where: {canceled_at: null}})

        registers.forEach(register => {
            console.log("antes", register.date)
            const maxHourRegister = addMinutes(register.date, 5)
            console.log("depois", maxHourRegister)
            console.log("comparação -> " + new Date() + " -> "+ maxHourRegister)
            console.log("registro",isAfter(new Date(), maxHourRegister))
            /* if(isAfter(new Date(), maxHourRegister)){
                register.canceled_at = new Date()
                await register.save()
            } */
        })
    }
}

export default new CancellationRegister()