var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "09192939",
  database: "cadastro"
});

/* GET home page. */
router.get('/nome/:name', function(req, res, next) {
  // usar parametros das rotas para fazer consultas no banco de dados sem fazer tratamento
  // destes dados é perigoso.
  // exemplo de entrada que muda resposta do banco nome/matheus" or nome_usuario = "valter

  con.query('SELECT * FROM usuarios where nome_usuario = "' + req.params.name + '"', (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Db:\n');
    console.log(rows);
  });

  res.render('index', { title: 'Untreated data entry' });
});

module.exports = router;
