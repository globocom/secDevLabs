package database

import (
	"api/types"
	"api/utils"
	"database/sql"
	"errors"
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

var QUESTIONS = [4]string{
	"What is your favorite soccer team?",
	"What is the brand of your first car?",
	"What is your birthday?",
	"How old are you?",
}

func OpenDatabaseConnection() (*sql.DB, error) {

	databaseEndpoint := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s",
		os.Getenv("MYSQL_USER"),
		os.Getenv("MYSQL_PASSWORD"),
		os.Getenv("MYSQL_HOST"),
		os.Getenv("MYSQL_PORT"),
		os.Getenv("MYSQL_DATABASE"),
	)

	db, err := sql.Open("mysql", databaseEndpoint)
	if err != nil {
		return nil, err
	}

	db.SetMaxIdleConns(0)
	db.SetMaxOpenConns(40)
	return db, nil
}

func ChangePassword(login string, password string, repeatPassword string) error {
	db, err := OpenDatabaseConnection()
	if err != nil {
		return err
	}
	defer db.Close()

	userExists, err := CheckUserExists(login)
	if !userExists {
		return err
	}

	passwordHashed, err := utils.HashPassword(password)
	if err != nil {
		return err
	}

	_, err = db.Query("UPDATE Users SET Password = ? WHERE Login = ?", passwordHashed, login)
	if err != nil {
		return err
	}

	return nil
}

func RecoveryPassword(login string, firstAnswer string, secondAnswer string) (types.RecoveryPasswordAnswers, error) {
	db, err := OpenDatabaseConnection()
	if err != nil {
		return types.RecoveryPasswordAnswers{}, err
	}
	defer db.Close()

	userExists, err := CheckUserExists(login)
	if !userExists {
		return types.RecoveryPasswordAnswers{}, err
	}

	result, err := db.Query("SELECT Login, FirstAnswer, SecondAnswer FROM Users WHERE Login = ?", login)
	if err != nil {
		return types.RecoveryPasswordAnswers{}, err
	}

	recoveryPasswordAnswers := types.RecoveryPasswordAnswers{}

	for result.Next() {
		err := result.Scan(&recoveryPasswordAnswers.Login, &recoveryPasswordAnswers.FirstAnswer, &recoveryPasswordAnswers.SecondAnswer)
		if err != nil {
			return types.RecoveryPasswordAnswers{}, err
		}
	}

	return recoveryPasswordAnswers, nil
}

func invalidadQuestion(question string) bool {
	for _, b := range QUESTIONS {
		if b == question {
			return false
		}
	}
	return true
}
func RegisterUser(login string, password string, firstQuestion string, firstAnswer string, secondQuestion string, secondAnswer string) (bool, error) {

	if invalidadQuestion(firstQuestion) || invalidadQuestion(secondQuestion) {
		return false, nil
	}

	db, err := OpenDatabaseConnection()
	if err != nil {
		return false, err
	}
	defer db.Close()

	userExists, err := CheckUserExists(login)
	if userExists {
		return false, err
	}

	passwordHashed, err := utils.HashPassword(password)
	if err != nil {
		return false, err
	}

	result, err := db.Query("INSERT INTO Users (Login, Password, FirstQuestion, FirstAnswer, SecondQuestion, SecondAnswer) VALUES (?, ?, ?, ?, ?, ?)", login, passwordHashed, firstQuestion, firstAnswer, secondQuestion, secondAnswer)
	if err != nil {
		return false, err
	}
	defer result.Close()

	return true, nil
}

func LoginUser(login string, password string) (bool, error) {
	db, err := OpenDatabaseConnection()
	if err != nil {
		return false, err
	}
	defer db.Close()

	userExists, err := CheckUserExists(login)
	if !userExists {
		return false, err
	}

	result, err := db.Query("SELECT ID, Login, Password FROM Users WHERE Login = ?", login)
	if err != nil {
		return false, err
	}
	defer result.Close()

	loginUser := types.UserLogin{}

	for result.Next() {
		err := result.Scan(&loginUser.ID, &loginUser.Login, &loginUser.Password)
		if err != nil {
			return false, err
		}
	}

	err = CheckUserPassword(password, loginUser.Password)
	if err != nil {
		return false, err
	}

	return true, nil
}

func UserQuestions(login string) (types.RecoveryPasswordQuestions, error) {
	db, err := OpenDatabaseConnection()
	if err != nil {
		return types.RecoveryPasswordQuestions{}, err
	}
	defer db.Close()

	userExists, err := CheckUserExists(login)
	if !userExists {
		return types.RecoveryPasswordQuestions{}, err
	}

	result, err := db.Query("SELECT Login, FirstQuestion, SecondQuestion FROM Users WHERE Login = ?", login)
	if err != nil {
		return types.RecoveryPasswordQuestions{}, err
	}
	defer result.Close()

	recoveryPasswordQuestions := types.RecoveryPasswordQuestions{}

	for result.Next() {
		err := result.Scan(&recoveryPasswordQuestions.Login, &recoveryPasswordQuestions.FirstQuestion, &recoveryPasswordQuestions.SecondQuestion)
		if err != nil {
			return types.RecoveryPasswordQuestions{}, err
		}
	}

	return recoveryPasswordQuestions, nil
}

func CheckUserExists(login string) (bool, error) {
	db, err := OpenDatabaseConnection()
	if err != nil {
		return false, err
	}
	defer db.Close()

	result, err := db.Query("SELECT * FROM Users WHERE Login = ?", login)
	if err != nil {
		return false, err
	}
	defer result.Close()

	if !result.Next() {
		err = errors.New("Error: User not found!")
		return false, err
	}
	return true, nil
}

func CheckUserPassword(password string, hashedPassword string) error {
	hashedPass := []byte(hashedPassword)

	err := utils.ComparePassword(password, hashedPass)
	if err != nil {
		return err
	}

	return nil
}

func initUsers(db *sql.DB) error {
	users := [9]string{
		"admin",
		"thiago",
		"teste",
		"joana",
		"roberto",
		"estag",
		"marleda",
		"junior",
		"maria",
	}
	for _, u := range users {
		hashPassword, err := utils.HashPassword(u)
		_, err = db.Query("INSERT INTO Users (Login, Password, FirstQuestion, FirstAnswer, SecondQuestion, SecondAnswer) VALUES (?, ?, ?, ?, ?, ?)", u, hashPassword, QUESTIONS[0], "a", QUESTIONS[1], "a")
		if err != nil {
			return err
		}
	}
	return nil
}

func InitDatabase() error {

	dbConn, err := OpenDatabaseConnection()
	if err != nil {
		errOpenDBConnection := fmt.Sprintf("OpenDBConnection error: %s", err)
		return errors.New(errOpenDBConnection)
	}

	defer dbConn.Close()

	_, err = dbConn.Query("SELECT * FROM Users")

	if err != nil {
		queryCreate := fmt.Sprint(`
		CREATE TABLE Users (
			ID int NOT NULL AUTO_INCREMENT, 
			Login varchar(20), 
			Password varchar(80), 
			FirstQuestion varchar(80), 
			FirstAnswer varchar(80), 
			SecondQuestion varchar(80), 
			SecondAnswer varchar(80), 
			RecoveryToken varchar(200),
			PRIMARY KEY (ID)
		);`)
		_, err = dbConn.Exec(queryCreate)
	}

	if err != nil {
		errInitDB := fmt.Sprintf("InitDatabase error: %s", err)
		return errors.New(errInitDB)
	}

	err = initUsers(dbConn)
	if err != nil {
		return err
	}

	return nil
}
