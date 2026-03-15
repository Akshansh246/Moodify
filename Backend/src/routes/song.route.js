const {Router} = require('express');
const songController = require('../controllers/song.controller');
const upload = require('../middlewares/upload.middleware');
const songRouter = Router()

/**
 * @route /api/songs/
 * @method POST
 * @description just to add songs to the server
 */
songRouter.post('/',upload.single('song'), songController.addSongController)

/**
 * @route /api/songs/
 * @method GET
 * @description returns the mood of a song
 */
songRouter.get('/', songController.getSongController)

module.exports = songRouter
