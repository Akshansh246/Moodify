const songModel = require("../models/song.model")
const storageService = require('../services/storage.service')
const id3 = require('node-id3')

async function addSongController(req, res) {
    const songBuffer = req.file.buffer
    const {mood} = req.body

    const tags = id3.read(songBuffer)


    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            folder: '/moodify/songs'
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: '/moodify/covers'
        })
    ])

    const song = await songModel.create({
        url:songFile.url,
        posterUrl:posterFile.url,
        title:tags.title,
        mood
    })

    res.status(201).json({
        message:"Song uploaded successfully....",
        song
    });
}

async function getSongController(req, res) {
    const {mood} = req.query
    
    const [song] = await songModel.aggregate([
        { $match: { mood } },
        { $sample: { size: 1 } }
    ]);

    res.status(200).json({
        message:"Song fetched Successfully",
        song
    })
}

module.exports = {
    addSongController,
    getSongController
}