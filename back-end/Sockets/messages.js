const fs = require('fs')
const path = require('path')

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
    const messageData = {
      sender: data.sender,
      recipient: data.recipient,
      content: '',
      files: [],
      timestamp: new Date(),
    }
    if (data.content) {
      messageData.content = data.content
    }
    if (data.files) {
      const filePath = `./uploads/${data.sender}`
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)

      for (const file of data.files) {
        const extension = file.fileName.split('.').pop()
        const fileName = `file-${uniqueSuffix}.${extension}`
        const fileDestination = path.join(filePath, fileName)

        try {
          const fileData = Buffer.from(file.file)
          if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true })
          }
          fs.writeFile(
            fileDestination,
            fileData,
            {
              encoding: 'binary',
            },
            (err) => {
              if (err) {
                io.to(data.sender).emit('messageSentResponse', {
                  succes: false,
                })
                return
              }
            }
          )
          messageData.files.push({ name: file.fileName, path: fileDestination })
          const message = await Message.create(messageData)
          conversation.messages.push(message)
          await conversation.save()
          io.to(data.recipient).emit('receiveMessage', message)
        } catch (error) {
          io.to(data.sender).emit('messageSentResponse', { succes: false })
        }
      }
    }
    try {
      const message = await Message.create(messageData)
      conversation.messages.push(message)
      await conversation.save()
      io.to(data.recipient).emit('receiveMessage', message)
      io.to(data.sender).emit('messageSentResponse', {
        succes: true,
        message: message,
      })
    } catch (error) {
      io.to(data.sender).emit('messageSentResponse', { succes: false })
    }
  })
}

module.exports = { Messages }
