const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const Appointment = Schema({
    title : {
        type: String,
        require : true
    },
    agenda : {
        type: String,
        require: true
    },
    AppountmentDate: {
        type: String,
        require : true
    },
    guest :{
        type : mongoose.Schema.Types.ObjectId,
        require: true,
        ref : "user"
    },
    creatorid : {
        type: mongoose.Schema.Types.ObjectId,
        require : true,
        ref : "user"
    }
});

module.exports = appointmentSchema = mongoose.model("appointment", Appointment);