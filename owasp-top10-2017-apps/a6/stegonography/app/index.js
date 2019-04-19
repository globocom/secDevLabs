// Stegonography steganography app
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const cookieParser = require('cookie-parser');
require("dotenv-safe").load();
const jwt = require('jsonwebtoken');

// Configures everything needed for the app
app.use(express.static('static'));
app.use('/css', express.static('./css'));
app.use('/js', express.static('./js'));
app.use('/images', express.static('./images'));
app.set('views', 'static/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser())

// User login route, get webpage
router.get("/login", function(req,res) {
    res.render("login.html");
})

// User login route, submit POST request to server
router.post("/login", function(req,res)  {
    var username = req.body.user.name;
    var password = req.body.user.password;
    
    // Verifies user credentials (totally safe)
    if (username == "admin" && password == "admin") {
        var token = jwt.sign({ username }, process.env.SECRET, {
            expiresIn: 300 // Token expires in 5 minutes
        });
        res.cookie('jwtSessionToken', token).redirect(301, "/admin");
    }
    
    res.status(500).send('Invalid username or password!').render("login.html");
})

// Logout route to deauthorize user session tokens
router.get("/logout", function(req, res) {
    res.status(200).cookie("jwtSessionToken", null).redirect(301, "/");
});

// Admin maintenance page
router.get("/admin", verifyJWT, (req, res, next) => {
    res.status(200).render("admin.html");
});

// Healthcheck route
router.get("/healthcheck", function(req,res) {
    res.send("WORKING");
})

// Main page
router.get("/", function(req,res) {
    res.render("index.html")
})

// Returns the error web-page if none other is found
app.use('/', router);
app.use(function(req, res, next) {
    res.status(404).render("error.html")
});
// Listen on port 10006
app.listen(10006, () => {
    console.log("Server running on port 10006!");
})

// Verifies the JWT token
function verifyJWT(req, res, next){
    var token = req.cookies.jwtSessionToken;
    if (!token) return res.status(401).send({auth: false, message: 'No token provided'});

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
        req.userId = decoded.id;
        next();
      });
}