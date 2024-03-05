const { Router } = require('express')
const {
  getAllusers,
  getOneuser,
  deleteuser,
  deleteAllusers,
  signUp,
  logIn,
  getAllCountusers,
} = require('../controller/userController')
const userValidation = require('../validation/userValidation')
const roleMiddleware = require('../middleware/roleMiddleware')

const user = Router()

user.post('/sign-up', [userValidation.validateuser], signUp)
user.post('/login', logIn)
user.get('/all-users-count', roleMiddleware(['TEACHER']), getAllCountusers)
user.get('/allusers', 
roleMiddleware(['TEACHER']),
 getAllusers)
user.get('/get-one-user', roleMiddleware(['TEACHER']), getOneuser)
user.delete('/delete-one-user', roleMiddleware(['TEACHER']), deleteuser)
user.delete('/delete-all-users', roleMiddleware(['TEACHER']), deleteAllusers)

module.exports = user
