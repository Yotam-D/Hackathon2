const express = require('express')
const dotenv = require('dotenv')
const knex = require('knex')
const cors = require('cors')
const login = require('./db.js')
const bodyParser = require('body-parser')
const app = express()
dotenv.config()
let userInfo = {};

app.set('view engine', 'ejs')
app.use(cors())
app.use('/',express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
    
    
app.post('/login',(req,res) =>{
    login.validate(req.body.username,req.body.password,db)
    .then(validateRes => {
        if(validateRes){
                login.getUserInfo(req.body.username,req.body.password,db)
                    .then(info => setUserInfo(info))
                    .catch(err => console.log("unable to get info :", err))
                res.send({status: 'valid user'})
            }
            else{res.send({status: 'invalid user'})}
        })
    });
app.get('/play', (req,res) =>{
        res.render('playClassic')
    })

app.get('/getWord', (req,res) =>{
    console.log('user word: ', userInfo.word_text);
    res.send({userWord: userInfo.word_text})
    })



function setUserInfo(Info) {
    userInfo = Info;
    console.log("changed user info:", userInfo);
    }