//dep
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan') //server logging...
const mongoose = require('mongoose')

//config 
const config = require('./config') //mongoDB, JTW key
const port = process.env.PORT || 3000

//ex config 
const app = express();

//JSON uri Encoding
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//log console print
app.use(morgan('dev'))

// set the secret key variaqble for jwt
app.set('jwt-secret', config.secret)

//index page, just for testing
app.get('/', (req,res)=>{
    res.send('hello jwt')
})

app.use('/api', require('./routes/api'))

app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})


//mongodb server connect 
mongoose.connect(config.mongodbUri,{useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
//console.log(db);

db.on('error', console.error)
db.once('open', ()=>{
    console.log('connected to mongodb server')
})



