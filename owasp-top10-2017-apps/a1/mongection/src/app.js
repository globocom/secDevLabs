const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const db = require('./db');

const server = express();

const PORT = 9995;

server.use(bodyParser.json());

server.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "*");
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

        if(user == null) { response.send('Bad Credentials'); }

        response.send("<h1>Hello</h1><h3>" + user.email + "</h3>");
    }
   
    catch(error) { throw error; }


});

server.post("/register", async (request, response) => {
    try {
        const name = request.body.name;
        const email = request.body.email;
        const password = request.body.password;

        const user = await db.register({name, email, password});

        if(!user) { response.send('User Already Exists'); }

        response.send("<h1>Hello</h1><h3>" + user.email + "</h3>");
    }

    catch(error) { throw error; }
    
    

});

mongoose.connect("mongodb://mongo:27017/mongection", {useNewUrlParser: true})
    .then( () => {
        console.log('Server Running at port: ' + PORT);

        server.listen(PORT);
    })
    .catch( error => { throw error; });