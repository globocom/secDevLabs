const mysql = require('mysql');

function execQuery(query, fields){
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });

    return new Promise((resolve, reject) => {
        connection.query(query, fields, (err, results) => {
            connection.end();
            if (err){
                return reject(err);
            }else{
                console.log(results)
                return resolve(results);
            }
        }
    )});
}


function addUser(username, password, salt){
    const query = 'INSERT INTO User(username, password, salt) VALUES(?, ?, ?)'
    const parameters = [username, password, salt]

    execQuery(query, parameters)
}

function getPasswordSalt(username){
    const query = 'SELECT salt FROM User WHERE username=?'
    const parameters = [username]

    return execQuery(query, parameters)
        .then(result => {
            if (result !== undefined && result.length !== 0){
                return result[0].salt
            }
        })
        .catch(err => console.log(err))
}

function checkPassword(username, password){
    const query = 'SELECT COUNT(*) AS count FROM User WHERE username=? AND password=?'
    const parameters = [username, password]

    return execQuery(query, parameters)
        .then(result => {
            if (result[0].count !== 0){
                return true
            }
        })
        .catch(err => console.log(err))
}

function checkUser(username){
    const query = 'SELECT COUNT(*) AS count FROM User WHERE username=?'
    const parameters = [username]

    return execQuery(query, parameters)
        .then(result => {
            console.log("RESULT: ", result)
            console.log("RESULT: ", result, result.count)
            if (result[0].count !== 0){
                return true
            }
        })
        .catch(err => console.log(err))
}

function getStatisticsFromUser(username){
    const query = 'SELECT * FROM Statistics WHERE username=?'
    const parameters = [username]

    return execQuery(query, parameters)
        .then(result => {
            console.log("RESULT: ", result)
            if (result !== undefined && result.length !== 0){
                return result[0]
            }
        })
        .catch(err => {
            console.log(err)
            return null
        })
}

function updateUserStatistics(username, statistics){
    const query = `UPDATE Statistics
                   SET games = ?, wins = ?, ties = ?, loses = ?
                   WHERE username = ?`
    const parameters = [statistics.games, statistics.wins, statistics.ties, statistics.loses, username]
    execQuery(query, parameters)
}
function upsertUserStatistics(username, statistics){
    const query = `INSERT INTO Statistics(username, games, wins, ties, loses)
                   VALUES(?,?,?,?,?)
                   ON DUPLICATE KEY UPDATE games=?, wins=?, ties=?, loses=?`
    const parameters = [
        username, 
        statistics.games, 
        statistics.wins, 
        statistics.ties, 
        statistics.loses,
        statistics.games, 
        statistics.wins, 
        statistics.ties, 
        statistics.loses]
    execQuery(query, parameters)
}

function createTables(){
    const usersTableSQL = `CREATE TABLE IF NOT EXISTS User
    (username VARCHAR(20) NOT NULL, 
    password VARCHAR(100) NOT NULL, 
    salt BLOB NOT NULL,
    PRIMARY KEY(username));`

    execQuery(usersTableSQL)
        .catch(err => {
            console.log(err)
            process.exit(1)
        })

    const statsTableSQL = `CREATE TABLE IF NOT EXISTS Statistics
    (username VARCHAR(20) NOT NULL, 
    games INT,
    wins INT,
    loses INT,
    ties INT,
    UNIQUE KEY(username));`

    execQuery(statsTableSQL)
        .catch(err => {
            console.log(err)
            process.exit(1)
        })
}

module.exports = {
    updateUserStatistics,
    upsertUserStatistics,
    getPasswordSalt,
    addUser,
    checkPassword,
    getStatisticsFromUser,
    createTables,
    checkUser,
}