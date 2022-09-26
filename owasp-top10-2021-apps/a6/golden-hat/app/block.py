from mitmproxy import http
import re

def request(flow):
    if 'golden.secret' in flow.request.url or re.match(r'^http://127.0.0.1:8000/[a-z._/]*$', flow.request.url) is None:
        flow.response = http.Response.make(401, b"Haha! Only allowed hats can see this page!")

def response(flow):
    flow.response.headers["Via"] = "mitmproxy"
