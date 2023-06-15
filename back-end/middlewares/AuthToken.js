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

module.exports = { authToken }
