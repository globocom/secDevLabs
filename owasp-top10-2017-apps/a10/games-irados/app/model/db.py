#!/usr/bin/env python
# -*- coding: utf-8 -*-

import MySQLdb
import logging
import datetime

class DataBase:
    def __init__ (self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database
        self.db = MySQLdb.connect(host=self.host,user=self.user,passwd=self.password,db=self.database,charset='utf8')
        self.c = self.db.cursor()

    def connect(self):
        self.db = MySQLdb.connect(host=self.host,user=self.user,passwd=self.password,db=self.database)
        self.c = self.db.cursor()

    def get_game_coupon(self, coupon, user):
        try:
            self.c.execute('UPDATE coupons  SET valid = %s, user = %s WHERE coupon = %s AND valid = %s', [ 0,user, coupon, 1])
            rows = self.c.rowcount
            self.db.commit()
        except (AttributeError, MySQLdb.OperationalError) as err:
            msg = err.message if hasattr(err, 'message') else 'Error in Database'
            logging.error("Action: Get game coupon")
            logging.error("Datetime: %s", str(datetime.datetime.now())
            logging.error("errors: %s", msg)
            self.connect()
            self.c.execute('UPDATE coupons  SET valid = %s, user = %s WHERE coupon = %s AND valid = %s', [ 0, user, coupon, 1])
            rows = self.c.rowcount
            # self.c.execute('UPDATE coupons as t, (SELECT * FROM coupons WHERE coupon = %s AND valid = %s ) as temp SET t.valid = %s WHERE t.coupon = temp.coupon', [coupon, 1, 0])
            self.db.commit()

        except MySQLdb.Error as err:
            msg = err.message if hasattr(err, 'message') else 'Error in Database/MySQL'
            logging.error("Action: Get game coupon")
            logging.error("Datetime: %s", str(datetime.datetime.now())
            logging.error("errors: %s", msg)
            try:
                message = "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
                return message , 0
            except IndexError:
                message = "MySQL Error: %s" % str(e)
                return message , 0
        return rows, 1

    def get_game(self, coupon, user):
        try:
            self.c.execute('SELECT game FROM coupons WHERE coupon = %s AND user= %s', [coupon, user])
            game = self.c.fetchone()
        except (AttributeError, MySQLdb.OperationalError) as err:
            msg = err.message if hasattr(err, 'message') else 'Error in Database'
            logging.error("Action: Get game")
            logging.error("Datetime: %s", str(datetime.datetime.now())
            logging.error("errors: %s", msg)
            self.connect()
            self.c.execute('SELECT game FROM coupons WHERE coupon = %s AND user= %s', [coupon, user])
            game = self.c.fetchone()

        except MySQLdb.Error as err:
            msg = err.message if hasattr(err, 'message') else 'Error in Database/MySQL'
            logging.error("Action: Get game coupon")
            logging.error("Datetime: %s", str(datetime.datetime.now())
            logging.error("errors: %s", msg)
            try:
                message = "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
                return message , 0
            except IndexError:
                message = "MySQL Error: %s" % str(e)
                return message , 0
        return game, 1

    def insert_user(self, user, password):
        try:
            self.c.execute("INSERT INTO users (user, password) VALUES (%s, %s);",(user, password))
            self.db.commit()
        except (AttributeError, MySQLdb.OperationalError) as err:
            msg = err.message if hasattr(err, 'message') else 'Error inserting in Database'
            logging.error("Action: Insert user and password in database")
            logging.error("Datetime: %s", str(datetime.datetime.now())
            logging.error("errors: %s", msg)
            self.connect()
            self.c.execute("INSERT INTO users (user, pasword) VALUES (%s, %s);",(user, password))
            self.db.commit()
        except MySQLdb.Error as err:
            msg = err.message if hasattr(err, 'message') else 'Error inserting in Database'
            logging.error("Action: Insert user and password in database")
            logging.error("Datetime: %s", str(datetime.datetime.now())
            logging.error("errors: %s", msg)
            try:
                message = "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
                return message , 0
            except IndexError:
                message = "MySQL Error: %s" % str(e)
                return message , 0
        return "" , 1

    def get_user_password(self, username):
        try:
            self.c.execute("SELECT password FROM users WHERE user = %s", [username])
            user_password = self.c.fetchone()

        except (AttributeError, MySQLdb.OperationalError) as err:
            msg = err.message if hasattr(err, 'message') else 'Get user password'
            logging.error("Action: Retrieve user password from Database")
            logging.error("Datetime: %s", str(datetime.datetime.now())
            logging.error("errors: %s", msg)
            self.connect()
            self.c.execute("SELECT password FROM users WHERE username = %s", [username])
            user_password = self.c.fetchone()

        except MySQLdb.Error as err:
            msg = err.message if hasattr(err, 'message') else 'Get user password'
            logging.error("Action: Retrieve user password from Database")
            logging.error("Datetime: %s", str(datetime.datetime.now())
            logging.error("errors: %s", msg)
            try:
                message = "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
                return message , 0
            except IndexError:
                message = "MySQL Error: %s" % str(e)
                return message , 0

        return user_password, bool(user_password)

    def init_table_user(self):
        try:
            self.c.execute("CREATE TABLE users (user VARCHAR(100) NOT NULL, password VARCHAR(500) NOT NULL, PRIMARY KEY (user))")
            self.db.commit()
        except (AttributeError, MySQLdb.OperationalError, MySQLdb.Error) as err:
            msg = err.message if hasattr(err, 'message') else 'Init user table'
            logging.error("Action: Initiate user tabble")
            logging.error("Datetime: %s", str(datetime.datetime.now())
            logging.error("errors: %s", msg)
            self.connect()
            try:
                message = "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
                return message , 0
            except IndexError:
                message = "MySQL Error: %s" % str(e)
                return message , 0
        return "", 1

    def init_table_coupons(self):
        try:
            self.c.execute("CREATE TABLE coupons (coupon VARCHAR(10) NOT NULL, game VARCHAR(100) NOT NULL, user VARCHAR(100), valid INT(1) NOT NULL, PRIMARY KEY (coupon))")
            self.db.commit()
        except (AttributeError, MySQLdb.OperationalError, MySQLdb.Error) as err:
            msg = err.message if hasattr(err, 'message') else 'Init coupon table'
            logging.error("Action: Initiate coupon tabble")
            logging.error("Datetime: %s", str(datetime.datetime.now())
            logging.error("errors: %s", msg)
            self.connect()
            try:
                message = "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
                return message , 0
            except IndexError:
                message = "MySQL Error: %s" % str(e)
                return message , 0
        return "", 1

    def insert_coupon(self, coupon, game):
        try:
            self.c.execute("INSERT INTO coupons (coupon, game, valid) VALUES (%s, %s, %s);",(coupon, game, 1))
            self.db.commit()
        except (AttributeError, MySQLdb.OperationalError) as err:
            msg = err.message if hasattr(err, 'message') else 'Insert coupon error'
            logging.error("Action: Insert a coupon")
            logging.error("Datetime: %s", str(datetime.datetime.now())
            logging.error("errors: %s", msg)
            self.connect()
            self.c.execute("INSERT INTO coupons (coupon, game, valid) VALUES (%s, %s, %s);",(coupon, game, 1))
            self.db.commit()
        except MySQLdb.Error as err:
            msg = err.message if hasattr(err, 'message') else 'Insert coupon error'
            logging.error("Action: Insert a coupon")
            logging.error("Datetime: %s", str(datetime.datetime.now())
            logging.error("errors: %s", msg)
            try:
                message = "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
                return message , 0
            except IndexError:
                message = "MySQL Error: %s" % str(e)
                return message , 0
        return "" , 1
