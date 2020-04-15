package db

import (
	"os"
	"time"

	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// Collections names used in MongoDB.
var (
	UserCollection = "users"
)

// DB is the struct that represents mongo session.
type DB struct {
	Session *mgo.Session
}

// mongoConfig is the struct that represents mongo configuration.
type mongoConfig struct {
	Address      string
	DatabaseName string
	UserName     string
	Password     string
}

// Database is the interface's database.
type Database interface {
	Insert(obj interface{}, collection string) error
	Search(query bson.M, selectors []string, collection string, obj interface{}) error
	Update(query bson.M, updateQuery interface{}, collection string) error
	UpdateAll(query, updateQuery bson.M, collection string) error
	Upsert(query bson.M, obj interface{}, collection string) (*mgo.ChangeInfo, error)
	SearchOne(query bson.M, selectors []string, collection string, obj interface{}) error
}

var config = &mongoConfig{
	Address:      os.Getenv("MONGO_HOST"),
	DatabaseName: os.Getenv("MONGO_DATABASE_NAME"),
	UserName:     os.Getenv("MONGO_DATABASE_USERNAME"),
	Password:     os.Getenv("MONGO_DATABASE_PASSWORD"),
}

// Connect connects to mongo and returns the session.
func Connect() (*DB, error) {

	// fmt.Printf("config:%#v", config)
	dialInfo := &mgo.DialInfo{
		Addrs:    []string{config.Address},
		Timeout:  time.Second * 60,
		Database: config.DatabaseName,
		Username: config.UserName,
		Password: config.Password,
	}
	session, err := mgo.DialWithInfo(dialInfo)
	if err != nil {
		return nil, err
	}
	session.SetSafe(&mgo.Safe{WMode: "majority"})

	if err := session.Ping(); err != nil {
		return nil, err
	}

	//go autoReconnect(session)

	return &DB{Session: session}, nil
}

// autoReconnect checks mongo's connection each second and, if an error is found, reconnect to it.
func autoReconnect(session *mgo.Session) {
	var err error
	for {
		err = session.Ping()
		if err != nil {
			session.Refresh()
			err = session.Ping()
			if err == nil {
			} else {
			}
		}
		time.Sleep(time.Second * 1)
	}
}

// Insert inserts a new document.
func (db *DB) Insert(obj interface{}, collection string) error {
	session := db.Session.Clone()
	c := session.DB("").C(collection)
	defer session.Close()
	return c.Insert(obj)
}

// Update updates a single document.
func (db *DB) Update(query, updateQuery interface{}, collection string) error {
	session := db.Session.Clone()
	c := session.DB("").C(collection)
	defer session.Close()
	err := c.Update(query, updateQuery)
	return err
}

// UpdateAll updates all documents that match the query.
func (db *DB) UpdateAll(query, updateQuery interface{}, collection string) error {
	session := db.Session.Clone()
	c := session.DB("").C(collection)
	defer session.Close()
	_, err := c.UpdateAll(query, updateQuery)
	return err
}

// Search searchs all documents that match the query. If selectors are present, the return will be only the chosen fields.
func (db *DB) Search(query bson.M, selectors []string, collection string, obj interface{}) error {
	session := db.Session.Clone()
	defer session.Close()
	c := session.DB("").C(collection)

	var err error
	if selectors != nil {
		selector := bson.M{}
		for _, v := range selectors {
			selector[v] = 1
		}
		err = c.Find(query).Select(selector).All(obj)
	} else {
		err = c.Find(query).All(obj)
	}
	if err == nil && obj == nil {
		err = mgo.ErrNotFound
	}
	return err
}

// SearchOne searchs for the first element that matchs with the given query.
func (db *DB) SearchOne(query bson.M, selectors []string, collection string, obj interface{}) error {
	session := db.Session.Clone()
	defer session.Close()
	c := session.DB("").C(collection)

	var err error
	if selectors != nil {
		selector := bson.M{}
		for _, v := range selectors {
			selector[v] = 1
		}
		err = c.Find(query).Select(selector).One(obj)
	} else {
		err = c.Find(query).One(obj)
	}
	if err == nil && obj == nil {
		err = mgo.ErrNotFound
	}
	return err
}

// Upsert inserts a document or update it if it already exists.
func (db *DB) Upsert(query bson.M, obj interface{}, collection string) (*mgo.ChangeInfo, error) {
	session := db.Session.Clone()
	c := session.DB("").C(collection)
	defer session.Close()
	return c.Upsert(query, obj)
}
