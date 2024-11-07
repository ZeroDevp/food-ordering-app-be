const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser())

routes(app)

mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log('Kết nối cơ sở dữ liệu thành công!');
    })
    .catch((err) => {
        console.log(err);
    })
app.listen(port, () => {
    console.log('Máy chủ đang chạy trên cổng:', port);
})

//cach ket noi vs MonGoDb
// const express = require('express');
// const dotenv = require('dotenv');
// const db = require('./config/database');
// const cors = require('cors');
// dotenv.config()
// const app = express();
// const routes = require('./routes');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const port = process.env.PORT || 3001;
// db.connect();

// app.use(cors())
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.use(cookieParser());
// routes(app);


// app.get('/', (req, res) => {
//     res.send('HELLO IN BACKEND');
// });

// app.listen(port, () => {
//     console.log('Máy chủ đang chạy trên cổng', port);
// });