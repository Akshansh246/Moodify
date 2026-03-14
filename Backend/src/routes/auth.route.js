const express = require('express');
const authRouter = express.Router()
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware')

/**
 * @route /api/auth/register
 * @description used for registration
 */
authRouter.post('/register', authController.registerController)


/**
 * @route /api/auth/login
 * @description used for login
 */
authRouter.post('/login', authController.loginController)


/**
 * @route /api/auth/get-me
 * @description returns the data of logged-in user
 * @access protected
 */
authRouter.get('/get-me', authMiddleware.authUser, authController.getMeController)

/**
 * @route /api/auth/logout
 * @description token blacklisting and user will be logged-out
 * @access protected
 */
authRouter.get('/logout', authController.logoutController)



module.exports = authRouter