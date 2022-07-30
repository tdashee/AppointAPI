const { validate } = require('../Schema/AuthSchema');
const authenticationservices = require('../Services/AuthService');
const validateEmail = require('../Services/ValidationService');

module.exports = class Authentication {
    static async Login(req, res, next) {
        console.log("New Request");
        console.log(req.body);
        try {
            const result = await authenticationservices.LoginService(req.body);
            if(result == -1) {
                res.status(404).send("UserId or Password is not correct");
            }
            else  {
                res.status(200).send(result);
            }
        } catch (error) {
            res.status(404).send("Error");
        }
    }

    static async Register(req, res, next) {
        try {
            const validate = await validateEmail.EmaliExintance(req.body);
            if (!validate) return res.status(400).send(validate);

            const login = await authenticationservices.Register(req.body);
            if (!login) return res.status(400).send(false);

            res.status(200).send(login);
        } catch (error) {
            res.status(400).send("Error in Response", { error: error });
        }
    }

    static async UpdateProfille(req, res, next) {
        try {
            const result = await authenticationservices.UpdateProfilleSrevice(req.body);
            if(result) {
                res.status(200).send(result);
            }
            else {
                res.status(400).send("No response");
            }
        } catch (error) {
            res.send(404).send("Bad Request");
        }
    }
    
    static async UpdateUserStatus(req, res, next) {
        console.log("Responsed");
        try {
            const result = await authenticationservices.UpdateUserProfileStatus(req.body);
            if(result) {
                res.status(200).send("Status Updated");
            }
            else {
                res.status(400).send("No response");
            }
        } catch (error) {
            res.send(404).send("Bad Request");
        }
    }
}