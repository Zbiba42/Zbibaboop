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
          sender: data.sender,
          receiver: data.Receiver,
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
        io.to(data.Receiver).emit('notification', notification)
        io.to(data.sender).emit('FriendReqSent', {
          succes: true,
          data: 'friend request was sent !',
        })
      } catch (error) {}
    })
    socket.on('cancelFriendReq', async (data) => {
      try {
        const friendRequest = await FriendReq.findOne(data)
        const notifquery = {
          type: 'friend request',
          sender: data.sender,
          receiver: data.Receiver,
        }
        const notification = await Notification.findOne(notifquery)
        await Notification.deleteOne(notifquery)
        await FriendReq.deleteOne(data)
        await User.updateOne(
          { _id: data.sender },
          {
            $pull: {
              friendRequestsSent: friendRequest.id,
            },
          }
        )
        await User.updateOne(
          { _id: data.Receiver },
          {
            $pull: {
              friendRequestsReceived: friendRequest.id,
              notifications: notification.id,
            },
          }
        )
        io.to(data.sender).emit('FriendReqCanceled', {
          succes: true,
          data: 'friend request was canceled',
        })
        io.to(data.Receiver).emit('cancelNotif', notification)
      } catch (error) {}
    })
    socket.on('disconnect', () => {
      console.log('disconected')
    })
  })
}
