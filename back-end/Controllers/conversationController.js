const Conversation = require('../models/conversation')

const getConvos = async (req, res) => {
  const pageSize = 10
  const pageNumber = req.query.page
  try {
    const id = req.payload.id
    const Conversations = await Conversation.find(
      {
        participants: { $all: [id] },
      },
      { participants: 1, messages: { $slice: -1 } },
      {
        options: {
          limit: pageSize,
          skip: (pageNumber - 1) * pageSize,
          sort: { 'messages.timestamp': -1 },
        },
      }
    ).populate('messages')
    res.status(200).json({ succes: true, data: Conversations })
  } catch (error) {
    res.status(200).json({ succes: true, error: error.message })
  }
}

const getMessages = async (req, res) => {
  const participants = [req.payload.id, req.query.recipient]
  const pageSize = 40
  const pageNumber = req.query.page
  try {
    const messages = await Conversation.findOne({
      participants: { $all: participants },
    }).populate({
      path: 'messages',
      options: {
        limit: pageSize,
        skip: (pageNumber - 1) * pageSize,
        sort: { timestamp: -1 },
      },
    })
    res.status(200).json({ succes: true, data: messages })
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message })
  }
}

module.exports = { getConvos, getMessages }
