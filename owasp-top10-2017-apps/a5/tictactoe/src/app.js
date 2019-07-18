const express = require('express')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const path = require('path');
const db = require('./db')
const crypto = require('./crypto')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

db.createTables()

const port = 10005
const app = express()

app.use(logger('common'));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})) 
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost.:10005");
    next();
  });

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/login.html'))
});

app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/register.html'))
});

app.get('/game', verifyJWT, (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/game.html'))
});

app.get('/statistics', verifyJWT, (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/statistics.html'))
});

app.get('/home', verifyJWT, (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/home.html'))
});

app.get('/', (req, res) => {
    res.redirect('/login')
})

app.get('/healthcheck', (req, res) => {
    res.sendStatus(200)
})

app.post('/game', verifyJWT, async (req, res) => {
    const user = req.body.user
    const result = req.body.result
    let statistics = await db.getStatisticsFromUser(user)
    if (statistics === null){
        return res.sendStatus(400)
    }
    if (statistics === undefined){
        statistics = {
            games: 0,
            wins: 0,
            ties: 0,
            loses: 0
        }
    }
    statistics.games++
    switch(result){
        case 'win':
            statistics.wins++
            break
        case 'lose':
            statistics.loses++
            break
        default:
            statistics.ties++
    }
    db.upsertUserStatistics(user, statistics)
    return res.sendStatus(200)
});

app.post('/create', async (req, res) => {

    const username = req.body.username
    const password = req.body.password
    if (username.length < 5 || password.length < 5){
        res
            .status(400)
            .json({msg: "Usernames and passwords must be at least 5 characters"})
    }
    const ok = await db.checkUser(username)
    if (ok){
        res
            .status(400)
            .json({"msg":"Username isn't available"})
    }
    const passwordConf = req.body.passwordconf
    if (password !== passwordConf){
        res
            .status(400)
            .json({msg: "Password and confirmation don't match"})
    }

    const salt = crypto.generateSalt()
    const hashedPassword = crypto.hash(password, salt)
    try{
        db.addUser(username, hashedPassword, salt)
    } catch (e){
        res
            .status(400)
            .json({msg: "Couldn't add user. Try again"})
    }
    res.sendStatus(200)

});

app.get('/statistics/data', verifyJWT, async (req, res) => {
    const user = req.query.user

    let statistics = await db.getStatisticsFromUser(user)
    if (statistics === undefined){
        statistics = {
            games: 0,
            wins: 0,
            loses: 0,
            ties: 0
        }
    }
    chartData = [
        {y: statistics.wins*100/statistics.games,  label: 'Wins'},
        {y: statistics.ties*100/statistics.games,  label: 'Ties'},
        {y: statistics.loses*100/statistics.games,  label: 'Loses'}
    ]
    const response = {
        chartData,
        numbers: {
            games: statistics.games,
            wins: statistics.wins,
            ties: statistics.ties,
            loses: statistics.loses,
        }
    }
    res
        .status(200)
        .json(response)
});

app.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const salt = await db.getPasswordSalt(username)
    if (salt === undefined){
        res
            .status(400)
            .json({msg:"User doesn't exist or wrong password"})
    }
    const bufferSalt = new Buffer(salt)
    const hashedPassword = crypto.hash(password, bufferSalt)
    const ok = await db.checkPassword(username, hashedPassword)
    if (!ok){
        res
            .status(400)
            .json({msg:"User doesn't exist or wrong password"})
    }

    const token = jwt.sign({ username }, process.env.SECRET, {
        expiresIn: 3600
    });
    
    res
        .cookie('tictacsession', token)
        .redirect('/game')
});

function verifyJWT(req, res, next){
    var token = req.cookies.tictacsession
    if (!token){
        return res
            .sendFile(path.join(__dirname+'/public/views/error.html'))
    }

    jwt.verify(token, process.env.SECRET, function(err, decoded){
        if (err){
            return res
                .sendFile(path.join(__dirname+'/public/views/error.html'))
        }
        next();
    });
}

app.listen(port);