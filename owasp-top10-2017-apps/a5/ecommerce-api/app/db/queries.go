package db

import (
	"errors"

	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a5/ecommerce-api/app/pass"
	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a5/ecommerce-api/app/types"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// GetUserData queries MongoDB and returns user's data based on its username.
func GetUserData(mapParams map[string]interface{}) (types.UserData, error) {
	userDataResponse := types.UserData{}
	session, err := Connect()
	if err != nil {
		return userDataResponse, err
	}
	userDataQuery := []bson.M{}
	for k, v := range mapParams {
		userDataQuery = append(userDataQuery, bson.M{k: v})
	}
	userDataFinalQuery := bson.M{"$and": userDataQuery}
	err = session.SearchOne(userDataFinalQuery, nil, UserCollection, &userDataResponse)
	return userDataResponse, err
}

// RegisterUser register into MongoDB a new user and returns an error.
func RegisterUser(userData types.UserData) error {

	userDataQuery := map[string]interface{}{"username": userData.Username}
	_, err := GetUserData(userDataQuery)
	if err != nil {
		if err == mgo.ErrNotFound {
			// could not find this user in MongoDB (or MongoDB err connection)
			session, err := Connect()
			if err != nil {
				return err
			}

			userData.HashedPassword, err = pass.BcryptPassword(userData.RawPassword)
			if err != nil {
				return err
			}

			newUserData := bson.M{
				"username":       userData.Username,
				"hashedPassword": userData.HashedPassword,
				"userID":         userData.UserID,
				"ticket":         userData.Ticket,
			}
			err = session.Insert(newUserData, UserCollection)
			return err

		}
		return err
	}
	return errors.New("User already registered")

}
