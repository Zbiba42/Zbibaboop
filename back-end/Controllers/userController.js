const multer = require('multer')
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const extension = file.originalname.split('.').pop()
    callback(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
  },
})

const upload = multer({ storage })

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

const updateUser = async (req, res) => {
  try {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        console.error(err)
        return res.status(400).send('Error uploading file')
      }

      const { file } = req
      if (file) {
        const path = file.destination + file.filename
        const { body } = req
        const data = { body, ImagePath: path }
        console.log(data)
        await User.updateOne({ _id: req.body.id }, { data })
        return res.status(200).send('User updated successfully')
      } else {
        const { body } = req
        const data = body
        console.log(data)
        try {
          await User.updateOne({ _id: req.body.id }, { data })
          return res.status(200).send('User updated successfully')
        } catch (error) {
          res.status(400).json({ succes: false, error: error.message })
        }
      }
    })
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message })
  }
}

module.exports = { getUser, updateUser }
