const express = require('express');
const authRouter = express.Router()
const authController = require('../controllers/auth.controller');

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




module.exports = authRouter