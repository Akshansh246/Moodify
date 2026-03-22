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

/**
 * @route /api/songs/all
 * @method GET
 * @description returns all the songs
 */
songRouter.get('/all', songController.getAllSongController)

/**
 * @route /api/songs/get-song/:id
 * @method GET
 * @description returns song associated with the id
 */
songRouter.get('/get-song/:id', songController.getSongByIdController)


module.exports = songRouter
