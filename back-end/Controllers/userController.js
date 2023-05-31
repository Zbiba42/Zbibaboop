const User = require('../models/user')

const getUser = async (req, res) => {
  try {
    const id = req.body.id
    const user = await User.findOne({ _id: id })
    res.status(200).json({ succes: true, data: user })
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message })
  }
}

module.exports = { getUser }
