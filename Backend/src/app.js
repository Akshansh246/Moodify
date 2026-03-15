require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')


const app = express()


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())
/**
 * Routes
 */

const authRouter = require('./routes/auth.route');
const songRouter = require('./routes/song.route');


app.use('/api/auth', authRouter)
app.use('/api/songs', songRouter)

module.exports = app