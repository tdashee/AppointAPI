const _bcrypt = require('bcrypt');
const registerSchema = require('../Schema/AuthSchema');
// const validationSchema = require('../Schema/ValidationSchema');

module.exports = class AuthenticationService {

    static async ValidateUserEmail(params) {
        try {
            const result = await registerSchema.find({ "Email": params.params.Email });
            console.log(result);
            if (result.length != 0) {
                return true;
            }
            else {
                return false;
            }
        } catch (error) {

        }
    }

    static async ValidateAuthentication(params) {
        try {
            const result = await validationSchema.find({ "UserId": params.Email });
            if (result.length != 0) {
                if (result.SecurityKey == params.params.AuthKey) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
            else {
                return 0;
            }
        } catch (error) {
            throw error;
        }
    }

    static async LoginService(params) {
        try {
            const data = await registerSchema.findOne({ "Email": params.Email }).select(["Email", "Password", "_id"]);
            if (data) {
                if (await _bcrypt.compare(params.Password, data.Password)) {
                    return data;
                }
                else {
                    return -1;
                }
            }
            else {
                return -1;
            }
        } catch (error) {
            console.log("Error is : ", error);
        }
    }

    static async Register(params) {
        try {
            console.log(params);
            const PasswordSalt = await _bcrypt.genSalt(15);
            params.Password = await _bcrypt.hash(params.Password, PasswordSalt);
            const model = registerSchema;
            const login = new model({
                Name: params.Name,
                Email: params.Email,
                Password: params.Password,
                Createdate: new Date(),
                ContactNumber: params.ContactNumber
            });
            const result = await login.save();
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async UpdateProfilleSrevice(params) {
        try {
            const userdata = await registerSchema.findById(params.UserId);
            if (userdata) {
                const PasswordSalt = await _bcrypt.genSalt(15);
                params.Password = await _bcrypt.hash(params.Password, PasswordSalt);
                userdata.Name = params.Name;
                userdata.Password = params.Password;
                const status = await userdata.save();
                if (status) {
                    return status;
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    static async UpdateUserProfileStatus(params) {
        try {
            const data = await registerSchema.findOne({ "Email": params.UserId }).select(["Modifiedate", "UserStatus"]);
            
            data.Modifiedate = new Date();
            data.UserStatus = params.UserStatus;
            const response = await data.save();
            if (response) {
                return 1;
            }
            else {
                return 0;
            }
        } catch (error) {
            console.log("Error is : ", error);
        }
    }
}