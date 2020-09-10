import 'dart:io';

import 'package:http/http.dart';
import 'package:panda_zap/models/caesar.dart';
import 'package:panda_zap/models/user.dart';

class Message {
  String id;
  bool sentByMe;
  String owner;
  String text;
  DateTime time;

  Message(
    this.id,
    this.sentByMe,
    this.owner,
    this.text,
    this.time,
  );

  factory Message.fromJson(dynamic json) {
    return Message(json['id'] as String, false, json['owner'] as String,
        json['text'] as String, DateTime.parse(json['date']));
  }
}

class TmpMessageResponse {
  List<Message> messages;

  TmpMessageResponse(
    this.messages,
  );

  factory TmpMessageResponse.fromJson(dynamic json) {
    if (json != null) {
      var msgObjsJson = json as List;
      List<Message> _msg =
          msgObjsJson.map((msgJson) => Message.fromJson(msgJson)).toList();

      return TmpMessageResponse(_msg);
    } else {
      return TmpMessageResponse(null);
    }
  }
}

String encryptMessage(String rawMessage) {
  CaesarCypher caesarCypher = CaesarCypher(key: me.key);

  return caesarCypher.encrypt(rawMessage);
}

String decryptMessage(String encryptedMessage) {
  CaesarCypher caesarCypher = CaesarCypher(
    key: me.key,
  );

  return caesarCypher.decrypt(encryptedMessage);
}

Future<void> sendMessage(Message rawMessage, User contactUser) async {
  int statusCode;
  var sessionToken = me.sessionToken;
  var contactUserID = contactUser.id;
  var contactUserName = contactUser.name;
  var myName = me.name;
  String encryptedMessage = encryptMessage(rawMessage.text);
  var messageID = rawMessage.id;
  var messageDate = rawMessage.time.toIso8601String();

  // set up PUT request arguments
  String host = Platform.isAndroid ? "10.0.2.2" : "localhost";
  String url = 'http://$host:11005/messages';
  var headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer $sessionToken',
  };

  String body =
      '{"id":"$contactUserID", "name": "$contactUserName","messages":[{"id":"$messageID", "owner":"$myName", "text":"$encryptedMessage", "date":"$messageDate"}]}';

  // make PUT request
  Response response = await put(url, headers: headers, body: body);

  // check the status code for the result
  statusCode = response.statusCode;

  return statusCode;
}
