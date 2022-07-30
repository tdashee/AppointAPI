const express = require('express');
const authcontrol = require('../APIs/AuthAPI');
const appointmentControl = require('../APIs/AppointAPI');

const routess = express.Router();

routess.get("/listAppointments/:Email", appointmentControl.MyAppointmentList);
routess.post("/login", authcontrol.Login);
routess.post("/register", authcontrol.Register);
routess.post("/BookAppointment", appointmentControl.BookAppointment);
routess.post("/UpdateStatus", authcontrol.UpdateUserStatus);

routess.put("/updateprofile", authcontrol.UpdateProfille);

module.exports = routess;