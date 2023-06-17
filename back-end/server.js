const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/zbibabook')
const { authToken } = require('./middlewares/AuthToken')

const Auth = require('./Routes/Auth')
const User = require('./Routes/user')
const Search = require('./Routes/search')

app.use('/api/auth', Auth)

app.use('/api/search', authToken, Search)

app.use('/api/user', authToken, User)

app.listen('5000', () => {
  console.log('server is listening on port 5000')
})
