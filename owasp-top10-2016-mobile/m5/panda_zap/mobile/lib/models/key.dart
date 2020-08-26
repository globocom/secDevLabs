import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart';
import 'package:panda_zap/models/user.dart';

class Key {}

Future<int> getMessageKey() async {
  // set up GET request arguments
  int _statusCode;
  String host = Platform.isAndroid ? "10.0.2.2" : "localhost";
  String url = 'http://$host:11005/key';
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
    _statusCode = response.statusCode;
    if (_statusCode != 200) {
      return -1;
    }

    var newKeyJSON = json.decode(response.body);
    String newKey = newKeyJSON['key'];
    int newKeyInt = int.parse(newKey);

    me.key = newKeyInt;

    return newKeyInt;
  } on Exception {
    // Server not reachable
    return -1;
  }
}
