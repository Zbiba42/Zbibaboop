const FriendReq = require('../models/friendRequest')
module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('sendFriendReq', async (data) => {
      try {
        await FriendReq.create(data)
      } catch (error) {}
    })
  })
}
