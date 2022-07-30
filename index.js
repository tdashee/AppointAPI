const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const appRouter = require('./Routes/App_routes');

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api",appRouter);
  

mongoose.connect("mongodb://localhost:27017/AssesmentDb")
    .then(() => console.log("Database Connected.."))
    .catch(() => console.log("Connection not initiated"));
const port = process.env.PORT || 9000;
app.listen(port , () => {
    console.log(`Server Listen on port : ${port}`)
});