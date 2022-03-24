const express = require('express')
const dotenv = require('dotenv')
const app = express()
dotenv.config()

app.set('view engine', 'ejs')
app.use('/',express.static(__dirname + '/public'))

app.listen (process.env.PORT, ()=>{
    console.log(`listnening on port ${process.env.PORT}`);
})

