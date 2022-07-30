const appointmentSchema = require('../Schema/AppointmentSchema');
const registerSchema = require('../Schema/AuthSchema');

module.exports = class AppointmentService {
    static async BookAppointment(params) {
        try {
            const result = await registerSchema.findOne({ "Email": params.guest }).select(["UserStatus"]);
            if (result == false) { return -1; }

            const schema = appointmentSchema;
            const model = new schema({
                title: params.title,
                agenda: params.agenda,
                AppountmentDate: params.AppountmentDate,
                guest: params.guest,
                creatorid: params.creatorid
            });

            const response = await model.save();
            console.log(response);
            if (response) return 1;
            else return 0;
        } catch (error) {
            throw error;
        }
    }

    static async MyAppointments(params) {
        try {
            console.log(params.params.Email);
            const result = await appointmentSchema.find({"Email" : params.params.Email}).populate('guest').populate('creatorid');
            return result;
        } catch (error) {

        }
    }
}