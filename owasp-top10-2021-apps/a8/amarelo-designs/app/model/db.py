#!/usr/bin/env python
# -*- coding: utf-8 -*-

import MySQLdb
from argon2 import PasswordHasher, Type
 
argon2id_config = PasswordHasher(
    memory_cost=65536,
    time_cost=4,
    parallelism=2,
    hash_len=32,
    type=Type.ID
)

class DataBase:
    def __init__(self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database
        self.connect()

    def connect(self):
        self.db = MySQLdb.connect(host=self.host,
                                  user=self.user,
                                  passwd=self.password,
                                  db=self.database,
                                  charset='utf8')
        self.c = self.db.cursor()

    def validate(self, username, password):
        try:
            self.c.execute(
                "SELECT pass FROM user WHERE username = %s",
                (username,))
            validate = argon2id_config.verify(self.c.fetchone()[0], password)

        except (AttributeError, MySQLdb.OperationalError):
            self.connect()
            self.c.execute(
                "SELECT pass FROM user WHERE username = %s",
                (username,))
            validate = argon2id_config.verify(self.c.fetchone()[0], password)
        except:
            return False
        return validate

    def is_admin(self, username):
        try:
            self.c.execute(
                "SELECT username FROM user WHERE username = %s and is_admin = 'True'",
                (username,))
            is_admin = bool(self.c.fetchone()[0])
        except (AttributeError, MySQLdb.OperationalError):
            self.connect()
            self.c.execute(
                "SELECT username FROM user WHERE username = %s and is_admin = 'True'",
                (username,))
            is_admin = bool(self.c.fetchone()[0])
        except:
            return False
        return bool(is_admin)

    def insert_user(self, username, password, is_admin):
        password = argon2id_config.hash(password)
        try:
            number_of_rows_changed = self.c.execute(
                "INSERT INTO user (is_admin, username, pass) VALUES (%s, %s, %s)",
                [is_admin, username, password])
            self.db.commit()
        except (AttributeError, MySQLdb.OperationalError):
            self.connect()
            number_of_rows_changed = self.c.execute(
                "INSERT INTO user (is_admin, username, pass) VALUES (%s, %s, %s)",
                [is_admin, username, password])
            self.db.commit()
        except:
            return False
        return bool(number_of_rows_changed)