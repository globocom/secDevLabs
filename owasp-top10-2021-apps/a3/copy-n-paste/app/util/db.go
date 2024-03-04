package util

import (
        "database/sql"
        "errors"
        "fmt"
        "os"


        "github.com/globocom/secDevLabs/owasp-top10-2021-apps/a3/copy-n-paste/app/hash"
        "github.com/globocom/secDevLabs/owasp-top10-2021-apps/a3/copy-n-paste/app/types"

        "github.com/spf13/viper"

        //setting mysql server for sql.Open function
      _ "github.com/go-sql-driver/mysql"
)


// OpenDBConnection establishes a connection with the MySQL DB.
func OpenDBConnection() (*sql.DB, error) {
    connstr := fmt.Sprintf(
        "%s:%s@tcp(%s:%s)/%s",
        os.Getenv("MYSQL_USER"),
        os.Getenv("MYSQL_PASSWORD"),
        viper.GetString("db.host"),
        viper.GetString("db.port"),
        os.Getenv("MYSQL_DATABASE"),
    )
    dbConn, err := sql.Open("mysql", connstr)
    if err != nil {
        return nil, err
    }
    dbConn.SetMaxIdleConns(0)
    dbConn.SetMaxOpenConns(40)
    return dbConn, nil
}

// AuthenticateUser checks if the given user and password are valid or not
func AuthenticateUser(user string, pass string) (bool, error) {
    if user == "" || pass == "" {
        return false, errors.New("All fields are required")
    }

    dbConn, err := OpenDBConnection()
    if err != nil {
        return false, err
    }
    defer dbConn.Close()

    query := "SELECT * FROM Users WHERE username = ?"
    row := dbConn.QueryRow(query, user)
    
    loginAttempt := types.LoginAttempt{}
    err = row.Scan(&loginAttempt.ID, &loginAttempt.User, &loginAttempt.Pass)
    if err == sql.ErrNoRows {
        return false, nil // user not found
    } else if err != nil {
        return false, err
    }

    if hash.CheckPasswordHash(pass, loginAttempt.Pass) {
        return true, nil
    }
    return false, nil
}

// NewUser registers a new user to the db
func NewUser(user string, pass string, passcheck string) (bool, error) {
    if user == "" || pass == "" || passcheck == "" {
        return false, errors.New("All fields are required")
    }
    userExists, err := CheckIfUserExists(user)
    if userExists {
        return false, errors.New("User already exists")
    }
    if pass != passcheck {
        return false, errors.New("Passwords are different")
    }
    passHash, err := hash.HashPassword(pass)
    if err != nil {
        return false, err
    }

    dbConn, err := OpenDBConnection()
    if err != nil {
        return false, err
    }
    defer dbConn.Close()

    query := "INSERT INTO Users (username, password) VALUES (?, ?)"
    _, err = dbConn.Exec(query, user, passHash)
    if err != nil {
        return false, err
    }

    fmt.Println("User created:", user)
    return true, nil // user created
}

// CheckIfUserExists checks if there is a user with the given username in the db
func CheckIfUserExists(username string) (bool, error) {
    dbConn, err := OpenDBConnection()
    if err != nil {
        return false, err
    }
    defer dbConn.Close()

    query := "SELECT COUNT(*) FROM Users WHERE username = ?"
    row := dbConn.QueryRow(query, username)

    var count int
    err = row.Scan(&count)
    if err != nil {
        return false, err
    }

    return count > 0, nil
}

// InitDatabase initiates API Database by creating Users table.
func InitDatabase() error {
    dbConn, err := OpenDBConnection()
    if err != nil {
        errOpenDBConnection := fmt.Sprintf("OpenDBConnection error: %s", err)
        return errors.New(errOpenDBConnection)
    }

    defer dbConn.Close()

    queryCreate := "CREATE TABLE IF NOT EXISTS Users (ID int NOT NULL AUTO_INCREMENT, Username varchar(20), Password varchar(80), PRIMARY KEY (ID))"
    _, err = dbConn.Exec(queryCreate)
    if err != nil {
        errInitDB := fmt.Sprintf("InitDatabase error: %s", err)
        return errors.New(errInitDB)
    }

    return nil
}
