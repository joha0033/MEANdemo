const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')

const app = express()

const users = require('./routes/users.js')

//port number
const port = 3000

//cors middleware
app.use(cors())

//bodyparser middleware
app.use(bodyParser.json())


app.use('/users', users)

//index route
app.get('/', (req, res, next) => {
  res.send('what up? who are you?')
})

//start server
app.listen(port, () => {
  console.log('serve me P3000');
})
