DELETE FROM message;
DELETE FROM live;
DELETE FROM user;

INSERT INTO user (name, username) VALUES ('Matthew Dias', 'matthewpets');
INSERT INTO live (user_id, description) VALUES ((SELECT id from user where user.username = 'matthewpets'), 'Enjoy with your puppy in the quarantine.');

INSERT INTO user (name, username) VALUES ('MR. ROBOT', 'mr.robot');
INSERT INTO live (user_id, description) VALUES ((SELECT id from user where user.username = 'mr.robot'), 'Computer repair with a smile!');

INSERT INTO user (name, username) VALUES ('Chef Nicole', 'nicoli.chef');
INSERT INTO live (user_id, description) VALUES ((SELECT id from user where user.username = 'nicoli.chef'), 'See how to make wonderful recipes for your family!');
