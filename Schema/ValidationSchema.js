const {ObjectId} = require('mongodb');
const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const Validation = Schema({
    UserId: {
        type: String,
        require: true
    },
    SecurityKey: {
        type: String,
        require: true,
        default : new ObjectId()
    },
    CreatedTime : {
        type: Date,
        require : true
    },
    ValidationTill : {
        type: Date,
        require: true, 
    },
    isverfied : {
        type : Boolean,
        default: false
    }
});
module.exports = ValidationSchema = mongoose.model("Validation",Validation);