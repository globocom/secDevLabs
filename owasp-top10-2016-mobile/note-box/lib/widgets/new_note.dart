import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart';

class NewNote extends StatelessWidget {
  final Function addNt;
  String loggedInUser;
  final titleControler = TextEditingController();
  final noteController = TextEditingController();
  final _storage = new FlutterSecureStorage();

  NewNote(this.addNt, this.loggedInUser);

  Future<void> _addNoteToDB(
      String username, String title, String content) async {
    String sessionToken = await _storage.read(key: username);

    // set up POST request arguments
    String url = 'http://10.0.2.2:9051/notes/addnote';
    Map<String, String> headers = {
      "Content-type": "application/json",
      "Authorization": "Bearer $sessionToken"
    };
    String body =
        '{"username": "$username", "title": "$title", "content": "$content"}';
    // make POST request
    await post(url, headers: headers, body: body);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(top: 21),
      child: Card(
        color: Colors.white30,
        child: Container(
          padding: EdgeInsets.all(10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: <Widget>[
              TextField(
                style: TextStyle(
                  color: Colors.white,
                ),
                decoration: InputDecoration(
                  labelText: 'Title',
                  labelStyle: TextStyle(
                    color: Colors.white,
                  ),
                ),
                controller: titleControler,
              ),
              TextField(
                style: TextStyle(
                  color: Colors.white,
                ),
                decoration: InputDecoration(
                  labelText: 'Content',
                  labelStyle: TextStyle(
                    color: Colors.white,
                  ),
                ),
                controller: noteController,
              ),
              FlatButton(
                onPressed: () {
                  addNt(
                    titleControler.text,
                    noteController.text,
                    loggedInUser,
                  );
                  _addNoteToDB(
                      loggedInUser, titleControler.text, noteController.text);
                },
                child: Text('Add Note'),
                color: Colors.green[200],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
