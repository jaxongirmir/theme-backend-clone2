const userDB = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  }
  const expiresInSeconds = 240 * 60 * 60
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: expiresInSeconds,
  })
}
// create user

const signUp = async (req, res) => {
  try {
    let user = req.body
    let exactuser = await userDB.findOne({
      phoneNumber: user.phoneNumber,
    })

    if (exactuser) {
      return res.status(400).json({
        success: false,
        msg: `User with ${user.phoneNumber} phone number already exists`,
        innerData: null,
      })
    }
    let hashPassword = await bcrypt.hash(user.password, 10)
    user.password = hashPassword

    let newuser = await userDB.create(user)
    let saveduser = await newuser.save()

    res
      .status(201)
      .json({ success: true, msg: 'user created', innerData: saveduser })
  } catch (err) {
    res
      .status(500)
      .json({ status: 'error', msg: 'internal server error', innerData: null })
  }
}

// Login user

const logIn = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body
    const user = await userDB.findOne({ phoneNumber })
    if (!user) {
      return res
        .status(400)
        .json({ message: `User with username '${username}' not found` })
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({ message: 'Incorrect password' })
    }
    const token = generateAccessToken(user._id, user.role)
    return res.json({ token })
  } catch (error) {
    console.error('Login error:', error)
    res.status(400).json({ message: 'Login error' })
  }
}

// get one user

const getOneuser = async (req, res) => {
  const { id } = req.body
  try {
    let user = await userDB.findById(id)
    if (!user) {
      return res.status(404).json({
        status: 'warning',
        msg: 'user is not found',
        innerData: user,
      })
    }
    res.status(200).json({
      status: 'success',
      msg: 'user is found',
      innerData: user,
    })
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err, innerData: null })
  }
}

// get all user

const getAllusers = async (req, res) => {
  try {
    let Alluser = await userDB.find()
    if (!Alluser) {
      return res.status(404).json({
        status: 'warning',
        msg: 'users are not found',
        innerData: Alluser,
      })
    }
    res.status(200).json({
      status: 'success',
      msg: 'users are found',
      innerData: Alluser,
    })
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err, innerData: null })
  }
}

// Get Count All users

const getAllCountusers = async (req, res) => {
  try {
    const count = await userDB.countDocuments()
    res.status(200).json({
      status: 'success',
      msg: 'Total count of users',
      count: count,
    })
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message, count: null })
  }
}

// Delete One user

const deleteuser = async (req, res) => {
  try {
    const { id } = req.body
    let deleteduser = await userDB.findByIdAndDelete(id)
    if (!deleteduser) {
      return res
        .status(404)
        .json({ msg: 'user is not found', innerData: deleteduser })
    }
    res.send({ msg: 'user is deleted', innerData: deleteduser })
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message, innerData: null })
  }
}

// Delete all users

const deleteAllusers = async (req, res) => {
  try {
    const { deletedCount } = await userDB.deleteMany()
    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ msg: 'No users found to delete', deletedCount })
    }
    res.status(200).json({ msg: 'All users are deleted', deletedCount })
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message, innerData: null })
  }
}

module.exports = {
  getAllusers,
  getOneuser,
  deleteuser,
  deleteAllusers,
  signUp,
  logIn,
  getAllCountusers,
}
