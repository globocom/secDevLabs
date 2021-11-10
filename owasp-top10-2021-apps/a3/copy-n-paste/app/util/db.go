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

//OpenDBConnection establish a connection with the MySQL DB.
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

//AuthenticateUser is the function that checks if the given user and password are valid or not
func AuthenticateUser(user string, pass string) (bool, error) {
	if user == "" || pass == "" {
		return false, errors.New("All fields are required")
	}

	dbConn, err := OpenDBConnection()
	if err != nil {
		return false, err
	}
	defer dbConn.Close()

	query := fmt.Sprint("select * from Users where username = '" + user + "'")
	rows, err := dbConn.Query(query)
	if err != nil {
		return false, err
	}
	defer rows.Close()
	loginAttempt := types.LoginAttempt{}
	for rows.Next() {
		err := rows.Scan(&loginAttempt.ID, &loginAttempt.User, &loginAttempt.Pass)
		if err != nil {
			return false, err
		}
	}
	if hash.CheckPasswordHash(pass, loginAttempt.Pass) {
		return true, nil
	}
	return false, nil
}

//NewUser registers a new user to the db
func NewUser(user string, pass string, passcheck string) (bool, error) {
	if user == "" || pass == "" || passcheck == "" {
		return false, errors.New("All fields are required")
	}
	userExists, err := CheckIfUserExists(user)
	if userExists {
		return false, err //user already exists
	}
	if pass != passcheck {
		return false, err //passwords different
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

	query := fmt.Sprint("insert into Users (username, password) values ('" + user + "', '" + passHash + "')")
	rows, err := dbConn.Query(query)
	if err != nil {
		return false, err
	}
	defer rows.Close()

	fmt.Println("User created: ", user)
	return true, nil //user created
}

//CheckIfUserExists checks if there is an user with the given username on db
func CheckIfUserExists(username string) (bool, error) {

	dbConn, err := OpenDBConnection()
	if err != nil {
		return false, err
	}
	defer dbConn.Close()

	query := fmt.Sprint("select username from Users where username = '" + username + "'")
	rows, err := dbConn.Query(query)
	if err != nil {
		return false, err
	}
	defer rows.Close()

	if !rows.Next() {
		return false, nil //invalid username
	}
	return true, nil
}

// InitDatabase initiates API Database by creating Users table.
func InitDatabase() error {

	dbConn, err := OpenDBConnection()
	if err != nil {
		errOpenDBConnection := fmt.Sprintf("OpenDBConnection error: %s", err)
		return errors.New(errOpenDBConnection)
	}

	defer dbConn.Close()

	queryCreate := fmt.Sprint("CREATE TABLE Users (ID int NOT NULL AUTO_INCREMENT, Username varchar(20), Password varchar(80), PRIMARY KEY (ID))")
	_, err = dbConn.Exec(queryCreate)
	if err != nil {
		errInitDB := fmt.Sprintf("InitDatabase error: %s", err)
		return errors.New(errInitDB)
	}

	return nil
}
