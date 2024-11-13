const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/dbhi')

const Schema = mongoose.Schema

const MovieSchema = new Schema({
    title: {
        type: String,
    },
    url: {
        type: String,
        unique: true
    },
    relase: String,
    episode: String,
    rating: String,
    description: String,
    thumb: String,
    url_play: String,
    m3u8Url: String

})


const MovieModel = mongoose.model('movie', MovieSchema)

module.exports = MovieModel