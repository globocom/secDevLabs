package db

import (
	"context"
	"log"
	"os"

	"github.com/globalsign/mgo/bson"
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m4/note-box/server/app/types"
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

// InsertOneNote inserts one note into the database.
func InsertOneNote(receivedNote *types.Note) error {
	noteToInsert := types.Note{receivedNote.OwnerUsername, receivedNote.Title, receivedNote.Content}

	_, err := noteBoxDB.Collection("notes").InsertOne(context.TODO(), noteToInsert)
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

// FindNotes retrieves existing notes from the database.
func FindNotes(username string) types.UserNotes {
	var results types.UserNotes

	filter := bson.M{"ownerusername": username}

	cur, err := noteBoxDB.Collection("notes").Find(context.TODO(), filter)
	if err != nil {
		log.Fatal(err)
	}

	for cur.Next(context.TODO()) {

		// create a value into which the single document can be decoded
		var elem types.Note
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}

		results = append(results, elem)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	// Close the cursor once finished
	cur.Close(context.TODO())

	return results
}

// UpdateUserLoggedIn returns an error if the user's status could not be updated or nil otherwise.
func UpdateUserLoggedIn(username string, status bool) error {
	filter := bson.M{"username": username}
	update := bson.M{"$set": bson.M{"isLoggedIn": status}}

	// update document
	_, err := noteBoxDB.Collection("users").UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}

	return nil
}
