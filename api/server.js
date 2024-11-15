const express = require('express')
const { connectDB } = require("./src/database/connect")
const { appRouter } = require('./src/Router/router')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

connectDB()
const app = express()

// bodyni pars qilish
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Cookie parserni o'rnatig
app.use(cookieParser())

// routerni o'rnatish
appRouter(app)

app.listen(3000, () => {
    console.log(`Server is running on Port: 3000... `);
})