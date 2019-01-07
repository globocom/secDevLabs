#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

# a variável de ambiente COUPONS deve conter as informações no formato: coupon1:game1,coupon2:game2,...,couponN:gameN
def init_db(db):
    message, success = db.init_table_user()
    message, success = db.init_table_coupons()
    coupons = ["ah5s6:Bioshock", "9ac4d:FIFA 2019"]
    if len(coupons) > 0:
        for coupon in coupons:
            coupon_info = coupon.split(':')
            if len(coupon_info) == 2:
                message, success = db.insert_coupon(coupon_info[0], coupon_info[1])
