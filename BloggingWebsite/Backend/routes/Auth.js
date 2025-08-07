import express from 'express'
import { login, Logout, register } from '../controllers/Auth.js'
const AuthRoutes = express.Router()

AuthRoutes.post('/register',register)
AuthRoutes.post('/login',login)
AuthRoutes.post('/logout',Logout)

 export default AuthRoutes