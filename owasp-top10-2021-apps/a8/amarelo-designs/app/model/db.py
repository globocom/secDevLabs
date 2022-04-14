#!/usr/bin/env python
# -*- coding: utf-8 -*-

import MySQLdb


class DataBase:
    def __init__(self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database
        self.connect()
        self.set_scheduler()

    def connect(self):
        self.db = MySQLdb.connect(host=self.host,
                                  user=self.user,
                                  passwd=self.password,
                                  db=self.database,
                                  charset='utf8')
        self.c = self.db.cursor()

    def set_scheduler(self):
        self.c.execute("SET GLOBAL event_scheduler=ON;")

    def insert_token(self, admin_token):
        try:
            self.c.execute(
                "INSERT INTO tb_token (admin_token) VALUES (%s);",
                [admin_token])
            self.db.commit()
        except (AttributeError, MySQLdb.OperationalError):
            self.connect()
            self.c.execute(
                "INSERT INTO tb_token (admin_token) VALUES (%s);",
                [admin_token])
            self.db.commit()
        except MySQLdb.Error as e:
            try:
                message = "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
                return message, 0
            except IndexError:  
                message = "MySQL Error: %s" % str(e)
                return message, 0
        return "", 1

    def get_token_id(self, admin_token):
        try:
            self.c.execute(
                "SELECT id FROM tb_token WHERE admin_token = %s",
                [admin_token])
            id = self.c.fetchone()
        except (AttributeError, MySQLdb.OperationalError):
            self.connect()
            self.c.execute(
                "SELECT id FROM tb_token WHERE admin_token = %s",
                [admin_token])
            id = self.c.fetchone()
        except MySQLdb.Error as e:
            try:
                message = "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
                return message, 0
            except IndexError:
                message = "MySQL Error: %s" % str(e)
                return message, 0
        return id, 1