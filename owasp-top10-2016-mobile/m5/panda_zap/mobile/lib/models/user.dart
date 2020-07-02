import 'package:panda_zap/models/message.dart';

class User {
  int id;
  String name;
  String key;
  List<Message> messages;

  User({
    this.id,
    this.name,
    this.key,
    this.messages,
  });
}

User me = User(
  id: 0,
  name: "Me",
  key: "key0",
);

User user1 = User(
  id: 1,
  name: "User 1",
  key: "key1",
  messages: user1Messages,
);

User user2 = User(
  id: 2,
  name: "User 2",
  key: "key2",
  messages: user2Messages,
);

User user3 = User(
  id: 3,
  name: "User 3",
  key: "key3",
  messages: user3Messages,
);

List<User> allUsers = [
  user1,
  user2,
  user3,
];

String getUserNameFromId(int id) {
  User foundUser = allUsers.singleWhere((element) => element.id == id);
  return foundUser.name;
}
