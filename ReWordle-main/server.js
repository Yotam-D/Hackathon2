const express = require('express')
const dotenv = require('dotenv')
const knex = require('knex')
const cors = require('cors')
const login = require('./db.js')
const app = express()
dotenv.config()
let user = {};

app.set('view engine', 'ejs')
app.use(cors())
app.use('/',express.static(__dirname + '/public'))

app.listen (process.env.PORT || 5000 , ()=>{
    console.log(`listening on port ${process.env.PORT}`);
})

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

app.get('/play', (req,res) =>{
        res.render('playClassic')
    })
    
app.post('/login',(req,res) =>{
    console.log('user info', req.body);
    console.log(login.validate('yotam','123456',db));
    if(login.validate('yotam','123456',db)){
            res.send({status: 'valid user'})
        }
        else{
            res.send({status: 'invalid user'})
        }
    })



