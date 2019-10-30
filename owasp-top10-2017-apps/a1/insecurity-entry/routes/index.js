var express = require('express');
var router = express.Router();

var mysql = require('mysql');

const mysql_import = require('mysql-import');
 
const mydb_importer = mysql_import.config({
    host: 'mysqldb',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'cadastro',
    onerror: err=>console.log(err.message)
});

async function myImport() {
  await mydb_importer.import('./database.sql');
}

myImport().then(result => {
  console.log(result); //
})

var con = mysql.createConnection({
  host: 'mysqldb',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'cadastro'
});

/* GET home page. */
router.get('/nome/:name', function(req, res, next) {
  let users = null
  con.query('SELECT * FROM usuarios where nome_usuario = "' + req.params.name + '"', (err,rows) => {
    if(err) throw err;
    res.render('index', { title: 'Untreated data entry', users: rows });
  });
  
});

module.exports = router;
