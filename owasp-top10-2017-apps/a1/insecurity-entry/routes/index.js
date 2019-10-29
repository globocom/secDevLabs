var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "user",
  password: "pass",
  database: "cadastro"
});

router.get('/', function(req, res, next) {l
  con.query('CREATE TABLE `cadastro`.`usuarios` (`id_usuario` INT NOT NULL,`nome_usuario` VARCHAR(45) NULL, PRIMARY KEY (`id_usuario`));', (err,rows) => {
    if(err) throw err;
    res.render('index', { title: 'Untreated data entry', users: [] });
  });
  
});

/* GET home page. */
router.get('/nome/:name', function(req, res, next) {
  // usar parametros das rotas para fazer consultas no banco de dados sem fazer tratamento
  // destes dados é perigoso.
  // exemplo de entrada que muda resposta do banco nome/matheus" or nome_usuario = "valter
  let users = null
  con.query('SELECT * FROM usuarios where nome_usuario = "' + req.params.name + '"', (err,rows) => {
    if(err) throw err;
    res.render('index', { title: 'Untreated data entry', users: rows });
  });
  
});

module.exports = router;
