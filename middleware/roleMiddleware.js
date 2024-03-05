const jwt = require('jsonwebtoken')

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next()
    }
    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(403).json({ message: 'User not autorithate' })
      }
      const { roles: userRoles } = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      )
      let hashRole = false
      userRoles.forEach(role => {
        if (roles.includes(role)) {
          hashRole = true
        }
      })
      if (!hashRole) {
        return res.status(403).json({ message: "You don't have access" })
      }
      next()
    } catch (err) {
      return res.status(403).json({ msg: 'you are not authorized' })
    }
  }
}
