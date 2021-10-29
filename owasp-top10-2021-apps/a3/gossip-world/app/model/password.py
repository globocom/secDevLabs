import hashlib


class Password:

    def __init__(self, password):
        self.password = password

    def get_hashed_password(self):
        return self._make_hash(self.password)

    def validate_password(self, hashed_password):
        return self._compare_password(hashed_password, self._make_hash(self.password))

    def _make_hash(self, string):
        return hashlib.sha256(string).hexdigest()

    def _compare_password(self, password_1, password_2):
        return password_1 == password_2
