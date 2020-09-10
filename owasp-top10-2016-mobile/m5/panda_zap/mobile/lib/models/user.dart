import 'dart:convert';
import 'dart:io' show Platform;

import 'package:http/http.dart';
import 'package:panda_zap/models/message.dart';
import 'package:uuid/uuid.dart';

class User {
  String id;
  String name;
  int key;
  String sessionToken;
  List<Message> messages;

  User({
    this.id,
    this.name,
    this.key,
    this.sessionToken,
    this.messages,
  });
}

User me;
List<User> allUsers = [];

Future<int> register(String username) async {
  int statusCode;
  var sessionToken;
  var uuid = Uuid();
  var uuidString = uuid.v4();

  // set up POST request arguments
  String host = Platform.isAndroid ? "10.0.2.2" : "localhost";
  String url = 'http://$host:11005/user';
  Map<String, String> headers = {"Content-type": "application/json"};
  String json = '{"id":"$uuidString", "name": "$username"}';

  // make POST request
  Response response = await post(url, headers: headers, body: json);

  // check the status code for the result
  statusCode = response.statusCode;
  if (statusCode != 201) {
    return statusCode;
  }

  sessionToken = response.headers["set-cookie"].split("=")[1];

// Update local user "me" with username and ID
  me = User(
    id: uuid.v1().toString(),
    name: username,
    sessionToken: sessionToken,
  );

  return statusCode;
}

Future<bool> userIsAvailable(String username) async {
  // set up GET request arguments
  int _statusCode;
  String host = Platform.isAndroid ? "10.0.2.2" : "localhost";
  String url = 'http://$host:11005/user/$username';

  // make GET request
  try {
    Response response = await get(url);

    // check the status code for the result
    _statusCode = response.statusCode;
    if (_statusCode != 200) {
      return false;
    }
  } on Exception {
    // Server not reachable
    return false;
  }

  return true;
}

Future<void> updateAllUsersList() async {
  // set up GET request arguments
  int statusCode;
  String host = Platform.isAndroid ? "10.0.2.2" : "localhost";
  String url = 'http://$host:11005/messages';
  var sessionToken = me.sessionToken;
  var headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer $sessionToken',
  };

  // make GET request
  try {
    Response response = await get(url, headers: headers);

    // check the status code for the result
    statusCode = response.statusCode;
    if (statusCode != 200) {
      return;
    }

    TmpMessageResponse msgResponse =
        TmpMessageResponse.fromJson(json.decode(response.body));

    if (msgResponse.messages != null) {
      msgResponse.messages.forEach((message) {
        allUsers.forEach((user) {
          if (user.name == message.owner) {
            message.text = decryptMessage(message.text);
            user.messages.insert(0, message);
          }
        });
      });
    }
  } on Exception {
    // Server not reachable
    return;
  }
}

Future<bool> addContact(String contactName) async {
  // set up GET request arguments
  int _statusCode;
  String host = Platform.isAndroid ? "10.0.2.2" : "localhost";
  String url = 'http://$host:11005/user/$contactName';

  // make GET request
  try {
    Response response = await get(url);

    // check the status code for the result
    _statusCode = response.statusCode;
    if (_statusCode != 200) {
      return false;
    }

    allUsers.where((user) {
      if (user.name == contactName) {
        return false;
      }
    });

    List<Message> emptyMessages = [];

    var newUserJSON = json.decode(response.body);
    User newUser = User(
      id: newUserJSON['id'],
      name: newUserJSON['name'],
      messages: emptyMessages,
    );

    allUsers.add(newUser);

    return true;
  } on Exception {
    // Server not reachable
    return false;
  }
}
