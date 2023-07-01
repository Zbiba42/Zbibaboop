const { FriendRequests } = require('./friendRequests')
const { Messages } = require('./messages')
module.exports = (io) => {
  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId
    socket.join(userId)

    FriendRequests(io, socket)
    Messages(io, socket)
    socket.on('disconnect', () => {
      console.log('disconected')
    })
  })
}
