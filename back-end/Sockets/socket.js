const FriendReq = require('../models/friendRequest')
const User = require('../models/user')
const Notification = require('../models/notification')
module.exports = (io) => {
  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId
    socket.join(userId)
    socket.on('sendFriendReq', async (data) => {
      try {
        const friendRequest = await FriendReq.create(data)
        const notification = await Notification.create({
          type: 'friend request',
          content: friendRequest,
        })
        await User.updateOne(
          { _id: data.sender },
          { $push: { friendRequestsSent: friendRequest } }
        )
        await User.updateOne(
          { _id: data.Receiver },
          {
            $push: {
              friendRequestsReceived: friendRequest,
              notifications: notification,
            },
          }
        )
        io.to(data.Receiver).emit('friend Request', friendRequest)
        io.to(data.sender).emit('FriendReqSent', {
          succes: true,
          data: 'friend request was sent !',
        })
      } catch (error) {}
    })
    socket.on('disconnect', () => {
      console.log('disconected')
    })
  })
}