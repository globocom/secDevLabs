import 'package:flutter/foundation.dart';

class Note {
  String id;
  String title;
  String content;
  String username;

  Note({
    @required this.id,
    @required this.title,
    @required this.content,
    @required this.username,
  });

  Note.fromJson(Map<String, dynamic> json)
      : title = json['title'],
        content = json['content'],
        username = json['username'];

  Map<String, dynamic> toJson() => {
        'title': title,
        'content': content,
        'username': username,
      };
}
