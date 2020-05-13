import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart';
import 'package:note_box/views/auth_screen.dart';

import './new_note.dart';
import './note_list.dart';
import '../models/note.dart';
import 'alert_button.dart';

class UserNotes extends StatefulWidget {
  UserNotes();

  @override
  _UserNotesState createState() => _UserNotesState();
}

class _UserNotesState extends State<UserNotes> {
  final _storage = new FlutterSecureStorage();
  List<Note> _userNotes = [];

  _UserNotesState();

  @override
  void initState() {
    _storage.read(key: "username").then((username) {
      if (username == null) {
        Navigator.pushAndRemoveUntil(
            context,
            MaterialPageRoute(builder: (context) => AuthScreen()),
            (Route<dynamic> _) => false);
      }
    });

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
    String sessionToken = await _storage.read(key: "sessionToken");

    // set up GET request arguments
    String url = 'http://10.0.2.2:9051/notes/mynotes';
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

  void _addNewNote(String ntTitle, String ntContent) async {
    String username = await _storage.read(key: "username");

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

  void _logout() async {
    String sessionToken = await _storage.read(key: "sessionToken");

    String url = 'http://10.0.2.2:9051/logout';
    Map<String, String> headers = {
      "Content-type": "application/json",
      "Authorization": "Bearer $sessionToken"
    };

    Response response = await post(url, headers: headers);
    int statusCode = response.statusCode;
    if (statusCode != 200) {
      showAlertDialog(context, 'Logout Error',
          'Unknown error occured. Please try again later.');
      return;
    }

    _storage.deleteAll();

    Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(builder: (context) => AuthScreen()),
        (Route<dynamic> _) => false);
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: <Widget>[
          NewNote(_addNewNote),
          NoteList(_userNotes),
          Container(
            padding: EdgeInsets.only(top: 15),
            child: FlatButton(
              onPressed: () {
                _logout();
              },
              color: Colors.green[700],
              child: Text(
                'Logout',
                style: TextStyle(
                  color: Colors.white,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
