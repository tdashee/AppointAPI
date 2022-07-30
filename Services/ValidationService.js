const registerSchema = require('../Schema/AuthSchema');

module.exports = class validateEmail {
    static async EmaliExintance(params) {
        console.log("Control Reached", params.Email);
        try {
            const result = await registerSchema.findOne({Email : params.Email});
            if(!result) {
                console.log("responsed");
                return true;
            }             
            else {
                return false;
            }
        } catch (error) {
            console.log("Response not iNitiated");
        }
    }
}