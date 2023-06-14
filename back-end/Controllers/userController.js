const User = require('../models/user')

const search = async (req, res) => {
  try {
    const query = req.query.search
    const users = await User.find({
      Fullname: { $regex: query, $options: 'i' },
    })
    res.status(200).json({ succes: true, data: users })
  } catch (error) {
    res.status(404).json({ succes: false, error: error.message })
  }
}

const getUser = async (req, res) => {
  try {
    const id = req.query.id
    const user = await User.findOne({ _id: id })
    res.status(200).json({ succes: true, data: user })
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const userId = req.body.id
    const data = req.body

    delete data.id
    if (req.files && req.files['ProfilePath']) {
      data.ProfilePath = '/' + req.files['ProfilePath'][0].path
    }
    if (req.files && req.files['CoverPath']) {
      data.CoverPath = '/' + req.files['CoverPath'][0].path
    }
    await User.updateOne({ _id: userId }, data)
    res.status(200).json({ message: 'User updated successfully' })
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message })
  }
}

module.exports = { search, getUser, updateUser }
