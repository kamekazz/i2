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


app.use(
    bodyParser.json(),
    bodyParser.urlencoded({extended:false}),
    morgan('dev'),
    cors()
)




app.use('/api/accounts', require('./routes/user.routes'))

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    // app.get('*', (req, res) => {
    //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    // });
}
  




app.listen(process.env.PORT ,()=>{
    console.log('node.js server is ruining........');
})