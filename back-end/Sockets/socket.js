const { sendFriendReq, cancelFriendReq } = require('./events')

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
      // men b3d
    })
    socket.on('disconnect', () => {
      console.log('disconected')
    })
  })
}
