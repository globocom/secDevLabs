const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const db = require('./db');

const server = express();

const PORT = 10001;

var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

server.use(bodyParser.json());

server.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "http://localhost:10001");
    response.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

server.use(express.static(__dirname + '/public'));

server.get("/", (request, response) => {
    response.sendFile(path.join(__dirname+'/public/view/index.html'));
});

server.get("/login.html", (request, response) => {
    response.sendFile(path.join(__dirname+'/public/view/login.html'));
});

server.get("/register.html", (request, response) => {
    response.sendFile(path.join(__dirname+'/public/view/register.html'));
});

server.post("/login", async (request, response) => {

    try {

        const email = request.body.email;
        const password = request.body.password;

        const user = await db.login({email, password});

        console.log(user.length)

        if(user.length == 0) { response.send('Bad Credentials'); }

        response.send("<h1>Hello, Welcome Again!</h1><h3>" + user + "</h3>");
    }
   
    catch(error) { throw error; }


});

server.post("/register", async (request, response) => {
    try {
        const name = request.body.name;
        const email = request.body.email;
        const password = request.body.password;

        const validEmail = emailRegex.test(email);
        if(!validEmail) { response.send('Bad Email'); }

        else {
            const user = await db.register({name, email, password});

            if(!user) { response.send('User Already Exists'); }

            response.send("<h1>Welcome to Mongection System</h1><h3>" + user.email + "</h3>");
        }
        
    }

    catch(error) { throw error; }

});

mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPASS}@mongo:27017/mongection`, {useNewUrlParser: true})
    .then( () => {
        console.log('Server Running at port: ' + PORT);

        server.listen(PORT);
    })
    .catch( error => { throw error; });