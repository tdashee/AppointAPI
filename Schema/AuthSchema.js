const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const Register = Schema({
    Name : String,
    Email: String,
    Password: String,
    Createdate: {
        type: Date,
        default: new Date()
    },
    Modifiedate: {
        type: Date,
        default: null
    },
    UserStatus :{
        type: Boolean,
        default: false
    },
    ContactNumber: Number
});

module.exports = registerSchema = mongoose.model("user", Register);