const FriendReq = require('../models/friendRequest')
const User = require('../models/user')
const Notification = require('../models/notification')

const sendFriendReq = async (io, data) => {
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
}

const cancelFriendReq = async (io, data) => {
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
}

const acceptFriendReq = async (io, data) => {
  try {
    const friendRequest = await FriendReq.findOne(data.content)
    const notifquery = {
      type: 'friend request',
      sender: data.sender,
      receiver: data.receiver,
    }
    const notification = await Notification.findOne(notifquery)
    // add friend for both sender and receiver
    await User.updateOne(
      { _id: data.receiver },
      { $push: { friends: data.sender } }
    )
    await User.updateOne(
      { _id: data.sender },
      { $push: { friends: data.receiver } }
    )
    // remove the friend requsets for them both
    await User.updateOne(
      { _id: data.sender },
      {
        $pull: {
          friendRequestsSent: friendRequest.id,
        },
      }
    )
    // remove the notification as well for the recevier
    await User.updateOne(
      { _id: data.receiver },
      {
        $pull: {
          friendRequestsReceived: friendRequest.id,
          notifications: notification.id,
        },
      }
    )
    // delete the notif and friend request in the end
    await Notification.deleteOne(notifquery)
    await FriendReq.deleteOne(data.content)
    // create notif for the sender
    const SenderNotification = await Notification.create({
      sender: data.receiver,
      receiver: data.sender,
      type: 'friend request accepted',
      content: '',
    })
    await User.updateOne(
      { _id: data.sender },
      { $push: { notifications: SenderNotification } }
    )
    // send notifs for both
    io.to(data.sender).emit('friendReqAccepted', {
      succes: true,
      data: SenderNotification,
    })
    io.to(data.receiver).emit('friendReqAcceptedSuccess', {
      succes: true,
      data: 'you are now friends with ',
      id: data.sender,
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { sendFriendReq, cancelFriendReq, acceptFriendReq }
