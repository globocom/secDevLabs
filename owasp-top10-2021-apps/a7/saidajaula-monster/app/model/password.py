import hashlib
import binascii


class Password:
    def __init__(self, password, username, guid):
        self.password = password
        self.username = username
        self.guid = guid

    def get_hashed_password(self):
        return self._make_hash(self.password)

    def validate_password(self, hashed_password):
        return self._compare_password(
            hashed_password, self._make_hash(self.password))

    def _make_hash(self, password):
        salt = self.guid + str(self.username)
        dk = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000, 32)
        return str(binascii.hexlify(dk))

    def _compare_password(self, password_1, password_2):
        return password_1 == password_2
