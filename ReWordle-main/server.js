const express = require('express')
const dotenv = require('dotenv')
const knex = require('knex')
const cors = require('cors')
const app = express()
dotenv.config()

app.set('view engine', 'ejs')
app.use(cors())
app.use('/',express.static(__dirname + '/public'))


app.listen (process.env.PORT || 5000 , ()=>{
    console.log(`listnening on port ${process.env.PORT} (Backup Port-5000)`);
})

console.log(process.env.DB_HOST);

const db = knex({
    client:'pg',
    connection: {
      host : process.env.DB_HOST,     
      port: process.env.DB_PORT,              
      user : process.env.DB_USER,       
      password : process.env.DB_PASSWORD,          
      database : process.env.DB_DATABASE
        }
    })

db
.select('word_text')
.from('words')
.then(data => console.log(data))
.catch(err=>console.log('catch Err',err))
