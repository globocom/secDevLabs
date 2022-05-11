import bcrypt


class Password:

    def __init__(self, password):
        self.password = password

    def get_hashed_password(self):
        return self._make_hash(self.password)

    def validate_password(self, hashed_password):
        return self._compare_password(hashed_password, self.password)

    def _make_hash(self, string):
        return bcrypt.hashpw(string, bcrypt.gensalt(14))

    def _compare_password(self, hashed_password, password):
        return bcrypt.checkpw(password, hashed_password.encode('utf-8'))