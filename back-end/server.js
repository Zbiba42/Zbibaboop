const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/zbibabook')

const Auth = require('./Routes/Auth')

app.use('/api/auth', Auth)

app.listen('5000', () => {
  console.log('server is listening on port 5000')
})
