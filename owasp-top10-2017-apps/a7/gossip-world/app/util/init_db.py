#!/usr/bin/env python
# -*- coding: utf-8 -*-


def init_db(db):
    message, success = db.init_table_user()
    message, success = db.init_table_gossips()
    message, success = db.init_table_comments()
