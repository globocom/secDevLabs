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

    def connect(self):
        self.db = MySQLdb.connect(host=self.host,
                                  user=self.user,
                                  passwd=self.password,
                                  db=self.database,
                                  charset='utf8')
        self.c = self.db.cursor()

    def insert_user(self, guid, user, password):
        try:
            self.c.execute(
                "INSERT INTO tb_users (Id, Login, Hash_Senha, Dt_Cookie, Permissao) VALUES (%s, %s, %s, %s, %s);",
                (guid, user, password, None, 0))
            self.db.commit()
        except (AttributeError, MySQLdb.OperationalError):
            self.connect()
            self.c.execute(
                "INSERT INTO tb_users (Id, Login, Hash_Senha, Dt_Cookie, Permissao) VALUES (%s, %s, %s, %s, %s);",
                (guid, user, password, None, 0))
            self.db.commit()
        except MySQLdb.Error as e:
            try:
                message = "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
                return message, 0
            except IndexError:
                message = "MySQL Error: %s" % str(e)
                return message, 0
        return "", 1

    def get_user(self, guid=None, username=None):
        if guid:
            query = "SELECT Hash_Senha, Permissao, Id FROM tb_users WHERE Id = %s"
            key = guid
        else:
            query = "SELECT Hash_Senha, Permissao, Id FROM tb_users WHERE Login = %s"
            key = username

        try:
            self.c.execute(query, [key])
            user_password = self.c.fetchone()

        except (AttributeError, MySQLdb.OperationalError):
            self.connect()
            self.c.execute(query, [key])
            user_password = self.c.fetchone()

        except MySQLdb.Error as e:
            try:
                message = "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
                return message, 0
            except IndexError:
                message = "MySQL Error: %s" % str(e)
                return message, 0

        return user_password, 1

    def init_table_user(self):
        try:
            self.c.execute(
                "CREATE TABLE users (user VARCHAR(100) NOT NULL, password VARCHAR(500) NOT NULL, PRIMARY KEY (user))")
            self.db.commit()
        except (AttributeError, MySQLdb.OperationalError, MySQLdb.Error) as e:
            self.connect()
            try:
                message = "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
                return message, 0
            except IndexError:
                message = "MySQL Error: %s" % str(e)
                return message, 0
        return "", 1

    def init_table_coupons(self):
        try:
            self.c.execute(
                "CREATE TABLE coupons (coupon VARCHAR(10) NOT NULL, game VARCHAR(100) NOT NULL, user VARCHAR(100), valid INT(1) NOT NULL, PRIMARY KEY (coupon))")
            self.db.commit()
        except (AttributeError, MySQLdb.OperationalError, MySQLdb.Error) as e:
            self.connect()
            try:
                message = "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
                return message, 0
            except IndexError:
                message = "MySQL Error: %s" % str(e)
                return message, 0
        return "", 1

    def insert_coupon(self, coupon, game):
        try:
            self.c.execute(
                "INSERT INTO coupons (coupon, game, valid) VALUES (%s, %s, %s);",
                (coupon, game, 1))
            self.db.commit()
        except (AttributeError, MySQLdb.OperationalError):
            self.connect()
            self.c.execute(
                "INSERT INTO coupons (coupon, game, valid) VALUES (%s, %s, %s);",
                (coupon, game, 1))
            self.db.commit()
        except MySQLdb.Error as e:
            try:
                message = "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
                return message, 0
            except IndexError:
                message = "MySQL Error: %s" % str(e)
                return message, 0
        return "", 1

    def insert_auth_token(self, token, user_id, created_date, created_time):
        try:
            self.c.execute(
                "INSERT INTO tb_auth_token (Token, Created_Date, Created_Time, User_ID) VALUES (%s, %s, %s, %s);",
                (token, created_date, created_time, user_id))
            self.db.commit()
        except (AttributeError, MySQLdb.OperationalError):
            self.connect()
            self.c.execute(
                "INSERT INTO tb_auth_token (Token, Created_Date, Created_Time, User_ID) VALUES (%s, %s, %s, %s);",
                (token, created_date, created_time, user_id))
            self.db.commit()
        except MySQLdb.Error as e:
            try:
                message = "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
                return message, 0
            except IndexError:
                message = "MySQL Error: %s" % str(e)
                return message, 0
        return "", 1

    def get_token(self, token):
        try:
            self.c.execute(
                "SELECT User_ID FROM tb_auth_token WHERE token = %s",
                [token])
            token_data = self.c.fetchone()

        except (AttributeError, MySQLdb.OperationalError):
            self.connect()
            self.c.execute(
                "SELECT User_ID FROM tb_auth_token WHERE token = %s",
                [token])
            token_data = self.c.fetchone()

        except MySQLdb.Error as e:
            try:
                message = "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
                return message, 0
            except IndexError:
                message = "MySQL Error: %s" % str(e)
                return message, 0

        return token_data if token_data else None

