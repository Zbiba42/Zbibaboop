const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const app = express()
const cors = require('cors')
const server = http.createServer(app)

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/zbibabook')
const { authToken } = require('./middlewares/AuthToken')

const Auth = require('./Routes/Auth')
const User = require('./Routes/user')
const Search = require('./Routes/search')
const Conversation = require('./Routes/conversation')
const Posts = require('./Routes/post')

app.use('/api/auth', Auth)

app.use('/api/search', authToken, Search)

app.use('/api/user', authToken, User)

app.use('/api/Conversation', authToken, Conversation)

app.use('/api/Posts', authToken, Posts)

const io = socketIO(server, {
  cors: {
    origin: '*',
  },
  maxHttpBufferSize: 1e8,
})

require('./Sockets/socket')(io)

server.listen('5000', () => {
  console.log('server is listening on port 5000')
})
