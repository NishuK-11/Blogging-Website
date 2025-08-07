import express from 'express'
import AdminController from '../controllers/Admin.js'

import deleteuser from '../controllers/Admin.js'
import isAdmin from '../middlewares/verifyToken.js'

const AdminRoutes = express.Router()
AdminRoutes.get('/getuser',isAdmin,AdminController.GetUser)

AdminRoutes.post('/delete/:id',isAdmin,AdminController.deleteUser);

export default AdminRoutes