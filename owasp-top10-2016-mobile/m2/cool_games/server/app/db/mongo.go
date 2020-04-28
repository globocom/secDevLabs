package db

import (
	"context"
	"os"

	"github.com/globalsign/mgo/bson"
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m2/cool_games/server/app/types"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Client holds a Mongo client.
var mongoClient *mongo.Client
var userCollection *mongo.Collection
var noteCollection *mongo.Collection
var mongoDbName string
var noteBoxDB *mongo.Database

// Connect tries to connect to the Mongo Database.
func Connect() error {
	mongoUsername := os.Getenv("MONGO_DATABASE_USERNAME")
	mongoPassword := os.Getenv("MONGO_DATABASE_PASSWORD")
	mongoDbName = os.Getenv("MONGO_DATABASE_NAME")

	// Set client options
	clientOptions := options.Client().ApplyURI("mongodb://db:27017").SetAuth(options.Credential{
		AuthSource: mongoDbName, Username: mongoUsername, Password: mongoPassword,
	})

	// Connect to MongoDB
	mongoClient, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		return err
	}

	// Check the connection
	err = mongoClient.Ping(context.TODO(), nil)

	if err != nil {
		return err
	}

	noteBoxDB = mongoClient.Database(mongoDbName)

	return nil
}

// Disconnect tries to disconnect from the Mongo database.
func Disconnect() error {
	err := mongoClient.Disconnect(context.TODO())

	if err != nil {
		return err
	}
	return nil
}

// InsertOneUser inserts one user into the database.
func InsertOneUser(user types.User) error {

	_, err := noteBoxDB.Collection("users").InsertOne(context.TODO(), user)
	if err != nil {
		return err
	}

	return nil
}

// FindOneUser returns an user if in the database or nill otherwise.
func FindOneUser(username string) (types.User, error) {

	filter := bson.M{"username": username}

	var result types.User

	if err := noteBoxDB.Collection("users").FindOne(context.TODO(), filter).Decode(&result); err != nil {
		return result, err
	}

	return result, nil
}
