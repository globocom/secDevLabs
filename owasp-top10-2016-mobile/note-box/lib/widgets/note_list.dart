import 'package:flutter/material.dart';

import '../models/note.dart';

class NoteList extends StatelessWidget {
  final List<Note> notes;

  NoteList(this.notes);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: notes.map((nt) {
        return Card(
          color: Colors.white24,
          child: Row(
            children: <Widget>[
              Card(
                color: Colors.green,
                elevation: 10,
                child: Container(
                  padding: EdgeInsets.all(10),
                  child: Text(
                    nt.title,
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 20,
                      color: Colors.black87,
                    ),
                  ),
                ),
              ),
              Container(
                padding: EdgeInsets.all(5),
                child: Text(
                  nt.content,
                  style: TextStyle(
                    color: Colors.white,
                  ),
                ),
              ),
            ],
          ),
        );
      }).toList(),
    );
  }
}
