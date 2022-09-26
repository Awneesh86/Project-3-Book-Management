const express = require('express');
const route = require('./routes/route.js');
const moment = require("moment")
const app = express();
const mongoose = require('mongoose')
require("dotenv").config()

app.use(express.json());

mongoose.connect(process.env.MONGO_URL , {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use(
    function (req, res, next) {
        let time = moment().format("DD/MM/YYYY hh:mm:ss a")
        console.log(`time : ${time} , url : ${req.url} `);
        next();
    }
);


app.use('/', route);

app.listen((process.env.PORT ), function () {
    console.log('Express app running on port ' + (process.env.PORT ))
});



app.use("/*", function (req, res) {
    return res.status(400).send({ status: false, message: "invalid request params (path not found)" })
});