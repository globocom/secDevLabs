#!/bin/bash
mitmdump --mode reverse:http://127.0.0.1:8000 -p 10006 -s block.py --set block_global=false --no-http2 &
gunicorn --threads 8 --bind 127.0.0.1:8000 app:app