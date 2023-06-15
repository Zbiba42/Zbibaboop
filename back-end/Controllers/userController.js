const User = require('../models/user')

const search = async (req, res) => {
  try {
    const query = req.query.search
    const page = parseInt(req.query.page) || 1 // Current page number (default: 1)
    const limit = parseInt(req.query.limit) || 10 // Results per page (default: 10)
    const skip = (page - 1) * limit // Number of results to skip
    const users = await User.find(
      {
        Fullname: { $regex: query, $options: 'i' },
      },
      { Verified: 0, Password: 0, friendRequests: 0 }
    )
      .skip(skip)
      .limit(limit)
    const totalUsers = await User.countDocuments({
      Fullname: { $regex: query, $options: 'i' },
    })

    const totalPages = Math.ceil(totalUsers / limit)
    res.status(200).json({
      success: true,
      data: users,
      currentPage: page,
      totalPages: totalPages,
    })
  } catch (error) {
    res.status(404).json({ succes: false, error: error.message })
  }
}

const getUser = async (req, res) => {
  if (req.payload.id == req.query.id) {
    try {
      const id = req.query.id
      const user = await User.findOne({ _id: id })
      res.status(200).json({ succes: true, data: user })
    } catch (error) {
      res.status(400).json({ succes: false, error: error.message })
    }
  } else {
    res.status(400).json({ succes: false, error: 'YOU ARE NOT AUTHORIZED !' })
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
