const logger = require('morgan')
const express = require('express')
var bodyParser = require('body-parser')
const MovieModel = require('../models/Movies')
const {crawlMovies} = require('../controllers/crawl')
const {main} = require('../controllers/crawl')
const UserModel = require('../models/Users')
const bcrypt = require('bcrypt')
var session = require('express-session')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: 'hi',  
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60, 
        secure: false 
    }
}))

//crawl
app.post('/crawl', async (req, res, next) => {
    const url = req.body.url
    console.log(url)
    try {
        const movies = await main(url)
        for (const movie of movies) {
            const existingMovie = await MovieModel.findOne({ url: movie.url })
            
            if (!existingMovie) {
                await MovieModel.create({
                    title: movie.title,
                    url: movie.url,
                    relase: movie.relase,
                    thumb: movie.thumb,
                    url_play: movie.url_play,
                    m3u8Url: movie.m3u8Url,
                    episode: movie.episode,
                    rating: movie.rating
                })
            } else {
                console.log(`URL ${movie.url} exists, skip.`)
            }
        }

        res.json({ message: 'Done', movies })
    } catch (err) {
        res.status(500).json({ error: 'Error during crawling' })
        console.log(err)

    }
});

// watch
app.get('/movies/:id/xem-phim', async (req, res, next) =>{
    try {
        const movie = await MovieModel.findById(req.params.id)

        res.render('play', {title: "Watch", movie: movie})
    } catch (error) {
        res.status(500)
    }
})

// local/
app.get('/', async (req, res, next) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 30
    const searchTerm = '';

    try {
        const movies = await MovieModel.find({})
            .skip((page - 1) * limit)
            .limit(limit)

        const totalMovies = await MovieModel.countDocuments()
        const totalPages = Math.ceil(totalMovies / limit)

        res.render('index', {
            title: 'Film',
            movies: movies,
            currentPage: page,
            totalPages: totalPages,
            limit: limit,
            searchTerm: searchTerm
        })
    } catch (error) {
        res.status(500).send('Error')
    }
})


//local/movies/:id
app.get('/movies/:id', async (req, res, next) => {
    try {
        const movie = await MovieModel.findById(req.params.id)
        
        if (!movie) {
            return res.status(404).send('Movie not found')
        }
        
        res.render('detail', { title: 'Movie Detail', movie: movie })
    } catch (error) {
        res.status(500).send('Error')
    }
})

//local/search/:
app.get('/search', async (req, res, next) => {
    const searchTerm = req.query.q || ''; 

    try {
        const movies = await MovieModel.find({
            title: { $regex: searchTerm, $options: 'i' }
        });

        res.render('index', {
            title: 'Search Results',
            movies: movies,
            searchTerm: searchTerm,
            currentPage: 1, 
            totalPages: 1,
            limit: 1
        });
    } catch (error) {
        res.status(500).send('Error searching movies');
    }
})
//register
app.post('/register', async(req, res, next) => {
    const { username, password } = req.body
    try {
        const existingUser = await UserModel.findOne({username})
        if(existingUser){
            return res.status(400).json({
                massage:"User existed"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        await UserModel.create({
            username,
            password: hashedPassword
        })
        res.status(201).json('Done')
    } catch (err){
        res.status(500).json("ERROR")
    }
})
//login
app.post('/login', async (req, res, next) => {
    const {username, password} = req.body

    try {
        const user = await UserModel.findOne({username})
        console.log(user)
        if (!user) {
            return res.status(401).json({
                massage:'Invalid username'
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json('Invalid password')
        }
        req.session.userId = user._id
        res.json('Logged in succesfully')
    } catch (err) {
        res.status(500).json('Error')
    }
})
//logout
app.post('/logout',(req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json('Error')
        }
        res.clearCookie('connect.sid')
        res.status(200).json('Logout succesfully')
    })
})


app.use(express.static('public'))
app.use(express.static('files'))

// Configure the app port
const port = process.env.PORT || 3003
app.set('port', port)

// Load middlewares
app.use(logger('dev'))

// Start the server and listen on the preconfigured port
app.listen(port, () => console.log(`App started on port ${port}.`))

module.exports = app;

