const { FriendRequests } = require('./friendRequests')
const { Messages } = require('./messages')
const { Posts } = require('./posts')
module.exports = (io) => {
  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId
    socket.join(userId)

    FriendRequests(io, socket)
    Messages(io, socket)
    Posts(io, socket)
    socket.on('disconnect', () => {
      console.log('disconected')
    })
  })
}
