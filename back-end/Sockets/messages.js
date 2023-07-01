const fs = require('fs')

const Message = require('../models/message.js')
const Conversation = require('../models/conversation.js')
const Messages = (io, socket) => {
  socket.on('sendMessage', async (data) => {
    let conversation = await Conversation.findOne({
      participants: { $all: [data.sender, data.recipient] },
    })

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [data.sender, data.recipient],
        messages: [],
      })
    }

    if (data.type === 'text') {
      const message = await Message.create(data)
      conversation.messages.push(message)
      await conversation.save()
      io.to(data.recipient).emit('receiveMessage', message)
    } else {
      const filePath = `/uploads/${data.sender}`
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)

      const messageData = {
        sender: data.sender,
        recipient: data.recipient,
        content: [],
        type: data.type,
        timestamp: new Date(),
      }

      for (const file of data.content) {
        const extension = file.originalname.split('.').pop()
        const fileName = `file-${uniqueSuffix}.${extension}`
        const fileDestination = path.join(filePath, fileName)

        await fs.writeFile(fileDestination, file)

        messageData.content.push(fileDestination)
      }

      const message = await Message.create(messageData)
      conversation.messages.push(message)
      await conversation.save()
      io.to(data.recipient).emit('receiveMessage', message)
    }
  })
}

module.exports = { Messages }
