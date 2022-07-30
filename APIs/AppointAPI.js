const AppointmentService = require('../Services/AppointmentService');

module.exports = class Authentication {
    static async BookAppointment(req, res, next) {
        try {
            const result = await AppointmentService.BookAppointment(req.body);
            if(result == -1) {
                res.status(200).send("User currently not available");
            }
            else if(result == 0) {
                res.status(400).send("Request Not Completed");
            }
            else if(result == 1){ 
                res.status(200).send(result);
            }
        } catch (error) {
            res.status(404).send("Bad Request");   
        }
    }
    
    static async MyAppointmentList(req, res, next) {
        try {
            const result = await AppointmentService.MyAppointments(req);
            if(!result) {
                res.status(400).send(result);
            }
            else {
                res.status(200).send(result);
            }
        } catch (error) {
            res.status(404).send("Bad Request");
        }
    }

    static async checkUserAvailibility(req, res, next) {
        try {
            const result = AppointmentService.checkUserAvailibility(req.body);
            if(result) {
                res.status(200).send("Available");
            }
            else {
                res.status(400).send("Not Available");
            }
        } catch (error) {
            res.status(404).send("Bad Request");
        }
    }
}