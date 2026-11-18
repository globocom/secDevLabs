// Stegonography steganography app
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const cookieParser = require('cookie-parser');
require("dotenv-safe").load();
const jwt = require('jsonwebtoken');
var mongo = require('mongodb');
const bcrypt = require("bcrypt");

// Configures everything needed for the app
app.disable("x-powered-by");
app.use(express.static('static'));
app.use('/css', express.static('./css'));
app.use('/js', express.static('./js'));
app.use('/images', express.static('./images'));
app.set('views', 'static/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());


// Creates a connection to the database
var port = process.env.MONGO_PORT;
var MongoClient = require('mongodb').MongoClient;
var url = `mongodb://${encodeURIComponent(process.env.MONGO_USER)}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@db:27017/${process.env.MONGO_DATABASE}?authSource=admin`;

// Cookie configuration
var cookieName = 'sessionToken';
var cookieOptions = {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
};

// Connect to the database
MongoClient.connect(url, function(err, db) {
    if (err) {
        console.error("Database connection failed");
        return;
    }

    console.log("Database connected!");
    db.close();
});

// Create "users" collection
MongoClient.connect(url, function(err, db) {
    if (err) {
        console.error("Users collection setup failed");
        return;
    }

    var dbo = db.db(process.env.MONGO_DATABASE);

    dbo.createCollection("users", function(err, ress) {
        if (err && err.code !== 48) {
            console.error("Users collection creation failed");
            db.close();
            return;
        }

        db.close();
    });
});

// Add administrator only when a password is configured
MongoClient.connect(url, function(err, db) {
    if (err) {
        console.error("Default user setup failed");
        return;
    }

    var dbo = db.db(process.env.MONGO_DATABASE);
    var users = dbo.collection("users");
    var adminPassword = process.env.ADMIN_PASSWORD;

    users.findOne({ username: "admin" }, function(err, user) {
        if (err) {
            console.error("Default user lookup failed");
            db.close();
            return;
        }

        if (user) {
            // Migrate an existing plaintext password to bcrypt
            if (user.password && !user.password.startsWith("$2")) {
                bcrypt.hash(user.password, 12, function(err, hashedPassword) {
                    if (err) {
                        console.error("Password hashing failed");
                        db.close();
                        return;
                    }

                    users.updateOne(
                        { _id: user._id },
                        { $set: { password: hashedPassword } },
                        function(err) {
                            if (err) {
                                console.error("Password migration failed");
                            }

                            db.close();
                        }
                    );
                });
            } else {
                db.close();
            }

            return;
        }

        // Do not create an administrator with a hardcoded password
        if (!adminPassword) {
            console.error("Administrator password is not configured");
            db.close();
            return;
        }

        bcrypt.hash(adminPassword, 12, function(err, hashedPassword) {
            if (err) {
                console.error("Default password hashing failed");
                db.close();
                return;
            }

            users.insertOne(
                { username: "admin", password: hashedPassword },
                function(err) {
                    if (err) {
                        console.error("Default user insertion failed");
                    } else {
                        console.log("Admin user added to the database");
                    }

                    db.close();
                }
            );
        });
    });
});

// User login route, get webpage
router.get("/login", function(req,res) {
    res.render("login.html");
});

// User login route, submit POST request to server
router.post("/login", function(req,res) {
    var username = req.body.user && req.body.user.name;
    var password = req.body.user && req.body.user.password;

    if (!username || !password) {
        return res.status(400).send('Invalid request');
    }

    // Verifies user credentials
    function VerifiesUser(callback) {
        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.error("Login database connection failed");
                return callback(err);
            }

            var dbo = db.db(process.env.MONGO_DATABASE);

            dbo.collection("users").findOne(
                { username: username },
                function(err, user) {
                    if (err) {
                        console.error("Login database query failed");
                        db.close();
                        return callback(err);
                    }

                    if (!user || !user.password) {
                        db.close();
                        return callback(null, null);
                    }

                    bcrypt.compare(password, user.password, function(err, isMatch) {
                        db.close();

                        if (err) {
                            console.error("Password verification failed");
                            return callback(err);
                        }

                        if (!isMatch) {
                            return callback(null, null);
                        }

                        callback(null, user.username);
                    });
                }
            );
        });
    }

    VerifiesUser(function(err, authenticatedUsername) {
        if (err) {
            return res.status(500).send('An internal error occurred');
        }

        if (authenticatedUsername === "admin") {
            var token = jwt.sign(
                { username: authenticatedUsername },
                process.env.SECRET,
                { expiresIn: 300 }
            );

            return res.cookie(cookieName, token, cookieOptions)
                .redirect(302, "/admin");
        }

        return res.status(401).send('Invalid username or password');
    });
});

// Logout route to deauthorize user session tokens
router.get("/logout", function(req, res) {
    res.status(200)
        .clearCookie(cookieName, cookieOptions)
        .redirect(302, "/");
});

// Admin maintenance page
router.get("/admin", verifyJWT, (req, res, next) => {
    res.status(200).render("admin.html");
});

// Change password route
router.get("/changepassword", verifyJWT, function(req, res, next) {
    // Code to change user password in the database
});

// Healthcheck route
router.get("/healthcheck", function(req,res) {
    res.send("WORKING");
});

// Main page
router.get("/", function(req,res) {
    res.render("index.html");
});

// Returns the error web-page if none other is found
app.use('/', router);

app.use(function(req, res, next) {
    res.status(404).render("error.html");
});

// Centralized error handler
app.use(function(err, req, res, next) {
    console.error("Internal application error");

    if (res.headersSent) {
        return next(err);
    }

    return res.status(500).send('An internal error occurred');
});

// Listen on port 10006
app.listen(10006, () => {
    console.log("Server running on port 10006!");
});

// Verifies the JWT token
function verifyJWT(req, res, next) {
    var token = req.cookies[cookieName];

    if (!token) {
        return res.status(401).send({
            auth: false,
            message: 'Authentication required'
        });
    }

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) {
            return res.status(401).send({
                auth: false,
                message: 'Invalid authentication'
            });
        }

        req.userId = decoded.username;
        next();
    });
}
