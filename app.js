const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const config = require('./config/database')

//Connect to Database
mongoose.connect(config.database)


//On the connection
mongoose.connection.on('connected', ()=> {
  console.log('connected to', config.database, 'MF');
})
mongoose.connection.on('error', (err)=> {
  console.log('NOT connected to', config.database, ', motherfucker', err);
})


const app = express()

const users = require('./routes/users')
const posts = require('./routes/posts')

//port number

//prod
// const port = process.env.PORT || 8080
//dev
const port = 3000

//cors middleware
app.use(cors())

//bodyparser middleware
app.use(bodyParser.json())

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.use('/users', users)
app.use('/posts', posts)

//index route
app.get('/', (req, res, next) => {
  console.log('slash/');
  res.send('what up? who are you?')
})

app.get('*', (req, res) => {
  console.log('backup*');
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

//start server
app.listen(port, () => {
  console.log('serve me P3000');
})
