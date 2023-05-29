const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const User = require('../models/user')
const RefreshToken = require('../models/refreshToken')
const refreshToken = require('../models/refreshToken')

const signUp = async (req, res) => {
  try {
    const HashedPass = await bcrypt.hash(req.body.Password, 10)
    const user = {
      Fullname: req.body.Fullname,
      Email: req.body.Email,
      Verified: false,
      Password: HashedPass,
    }
    await User.create(user)
    res.status(200).json({ succes: true, data: user })
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message })
  }
}

const logIn = async (req, res) => {
  try {
    const user = await User.findOne({ Email: req.body.Email })
    if (bcrypt.compare(req.body.Password, user.Password)) {
      const data = {
        id: user.id,
        Fullname: user.Fullname,
        Email: user.Email,
        Verified: user.Verified,
      }

      const accesToken = jwt.sign(data, process.env.ACCES_TOKEN_SECRET, {
        expiresIn: '15m',
      })
      const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET)
      try {
        await RefreshToken.create({ Token: refreshToken })
      } catch (error) {
        console.log(error)
      }
      res.status(200).json({
        succes: true,
        data: {
          accesToken: accesToken,
          refreshToken: refreshToken,
        },
      })
    } else {
      res.status(400).json({ succes: false, error: 'uncorrect password' })
    }
  } catch (error) {
    res.send(error)
  }
}

const LogOut = async (req, res) => {
  try {
    await refreshToken.deleteOne({ Token: req.body.refreshToken })
    res
      .status(200)
      .json({ succes: true, data: 'you logged out succesfully!  ' })
  } catch (error) {
    res.send(error)
  }
}

const RefreshTokens = async (req, res) => {
  const refToken = req.body.refreshToken

  if (!refreshToken)
    return res
      .status(401)
      .json({ succes: false, error: 'you are not authenticated !' })

  const refreshtoken = await refreshToken.findOne({ Token: refToken })
  if (refreshtoken == null) {
    return res
      .status(403)
      .json({ succes: false, error: 'refreshToken is invalid !' })
  }
  const Token = refreshtoken.Token

  jwt.verify(Token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
    err &&
      res.status(400).json({
        succes: false,
        data: err,
      })
    console.log(user)
    try {
      await refreshToken.deleteOne({ Token: req.body.refreshToken })
    } catch (error) {
      res.send(error)
    }

    const newAccesToken = jwt.sign(
      {
        id: user.id,
        Fullname: user.Fullname,
        Email: user.Email,
        Verified: user.Verified,
      },
      process.env.ACCES_TOKEN_SECRET,
      {
        expiresIn: '15m',
      }
    )
    const newRefreshToken = jwt.sign(
      {
        id: user.id,
        Fullname: user.Fullname,
        Email: user.Email,
        Verified: user.Verified,
      },
      process.env.REFRESH_TOKEN_SECRET
    )

    try {
      await RefreshToken.create({ Token: refreshToken })
    } catch (error) {
      res.send(error)
    }

    res.status(200).json({
      succes: true,
      data: {
        accessToken: newAccesToken,
        refreshToken: newRefreshToken,
      },
    })
  })
}

const authToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null)
    return res.status(400).json({ succes: false, error: 'token is null' })

  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, payload) => {
    if (err) return res.status(401).json({ succes: false, error: err })

    req.payload = payload
    next()
  })
}

module.exports = { signUp, logIn, LogOut, RefreshTokens }
