const { sendFriendReq, cancelFriendReq, acceptFriendReq } = require('./events')

module.exports = (io) => {
  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId
    socket.join(userId)
    socket.on('sendFriendReq', (data) => {
      sendFriendReq(io, data)
    })
    socket.on('cancelFriendReq', (data) => {
      cancelFriendReq(io, data)
    })
    socket.on('acceptFriendReq', (data) => {
      acceptFriendReq(io, data)
    })
    socket.on('disconnect', () => {
      console.log('disconected')
    })
  })
}
