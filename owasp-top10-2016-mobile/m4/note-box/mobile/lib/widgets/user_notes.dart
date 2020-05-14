import 'dart:convert';
import 'dart:io' show Platform;

import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart';

import './new_note.dart';
import './note_list.dart';
import '../models/note.dart';

class UserNotes extends StatefulWidget {
  String _loggedInUser;

  UserNotes(this._loggedInUser);

  @override
  _UserNotesState createState() => _UserNotesState(_loggedInUser);
}

class _UserNotesState extends State<UserNotes> {
  String _loggedInUser;
  final _storage = new FlutterSecureStorage();
  List<Note> _userNotes = [];

  _UserNotesState(this._loggedInUser);

  @override
  void initState() {
    // This is the proper place to make the async calls
    // This way they only get called once

    // During development, if you change this code,
    // you will need to do a full restart instead of just a hot reload

    // You can't use async/await here,
    // We can't mark this method as async because of the @override
    getNotesFromDB().then((result) {
      // If we need to rebuild the widget with the resulting data,
      // make sure to use `setState`
      setState(() {
        _userNotes = result;
      });
    });
  }

  Future<List<Note>> getNotesFromDB() async {
    String sessionToken = await _storage.read(key: _loggedInUser);
    // set up GET request arguments
    String host = Platform.isAndroid ? "10.0.2.2" : "localhost";
    String url = 'http://$host:9051/notes/mynotes';
    Map<String, String> headers = {
      "Content-type": "application/json",
      "Authorization": "Bearer $sessionToken"
    };
    // make GET request
    Response response = await get(url, headers: headers);
    List<Note> userNotes;
    userNotes = (json.decode(response.body) as List)
        .map((i) => Note.fromJson(i))
        .toList();

    return userNotes;
  }

  void _addNewNote(String ntTitle, String ntContent, String username) {
    final newNt = Note(
      title: ntTitle,
      content: ntContent,
      id: DateTime.now().toString(),
      username: username,
    );

    setState(() {
      _userNotes.add(newNt);
    });
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: <Widget>[
          NewNote(_addNewNote, _loggedInUser),
          NoteList(_userNotes),
        ],
      ),
    );
  }
}
