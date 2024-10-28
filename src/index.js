const express = require("express");
const dotenv = require("dotenv");
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(port, () => {
    console.log('Máy chủ đang chạy trên cổng:', port);
})