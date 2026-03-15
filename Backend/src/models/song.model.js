const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    url:{
        type:String,
        reqired:[true,"Song URL is required"]
    },
    posterUrl:{
        type:String,
        required:[true,"Poster URL is required"]
    },
    title:{
        type:String,
        required:[true,"title is required"]
    },
    mood:{
        type:String,
        enum:{
            values:["sad", "happy", "surprised"],
            message:"This is enum"
        }
    }
})

const songModel = mongoose.model('songs', songSchema)

module.exports = songModel