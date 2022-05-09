CREATE TABLE user(
    is_admin VARCHAR(5) NOT NULL,
    username VARCHAR(100) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    PRIMARY KEY(username)
)