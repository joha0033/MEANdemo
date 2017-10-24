const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
var passport = require('passport')
const mongoose = require('mongoose')
const config = require('./config/database')

//Connect to Database
mongoose.connect(config.database)


//On the connection
mongoose.connection.on('connected', ()=> {
  console.log('connected to', config.database, 'motherfucker');
})
mongoose.connection.on('error', (err)=> {
  console.log('NOT connected to', config.database, ', motherfucker', err);
})


const app = express()

const users = require('./routes/users')

//port number
const port = 3000

//cors middleware
app.use(cors())

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

//bodyparser middleware
app.use(bodyParser.json())

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)


app.use('/users', users)

//index route
app.get('/', (req, res, next) => {
  res.send('what up? who are you?')
})

//start server
app.listen(port, () => {
  console.log('serve me P3000');
})
