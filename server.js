require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')



const app =  express()

mongoose
    .connect(process.env.DB_URL,{
        useNewUrlParser: true ,
        useCreateIndex: true
    },(err)=>{
    if (err) {
        console.log(`Mcod:.......................v1.0 ${err}`);
    } else {
        console.log(`mlab DB is ruining.......`);
    }
})


const whitelist = [
    'https://client-viva.herokuapp.com',
    'http://localhost:3000',
    'https://function-fire-3f8d0.firebaseapp.com'
]

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use( morgan('dev'))
app.use(cors({
    origin: whitelist,
    credentials: true
}));




app.use('/api/accounts', require('./routes/user.routes'))


  




app.listen(process.env.PORT || 5000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});