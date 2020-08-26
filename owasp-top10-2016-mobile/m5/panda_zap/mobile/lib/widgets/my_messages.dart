import 'dart:async';

import 'package:flutter/material.dart';
import 'package:panda_zap/models/user.dart';
import 'package:panda_zap/views/write_message.dart';

class MyMessages extends StatefulWidget {
  @override
  _MyMessagesState createState() => _MyMessagesState();
}

class _MyMessagesState extends State<MyMessages> {
  Future<void> _updateMyMessagesList() async {
    await updateAllUsersList();
  }

  Timer timer;

  @override
  void initState() {
    super.initState();
    // Update message list to get new messages
    timer = Timer.periodic(
        Duration(seconds: 15),
        (Timer t) => setState(() {
              _updateMyMessagesList();
            }));
  }

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(40.0),
            topRight: Radius.circular(40.0),
          ),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(40.0),
            topRight: Radius.circular(40.0),
          ),
          child: ListView.builder(
            itemCount: allUsers.length,
            itemBuilder: (BuildContext context, int index) {
              return GestureDetector(
                onTap: () async {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) => WriteMessageView(allUsers[index], index),
                    ),
                  ).then((value) {
                    setState(() {});
                  });
                  await _updateMyMessagesList()
                      .then((value) => setState(() {}));
                },
                child: Container(
                  margin: EdgeInsets.only(
                      top: 5.0, bottom: 5.0, right: 20.0, left: 20.0),
                  padding:
                      EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
                  decoration: BoxDecoration(
                    color: Color(0xFFFAE8CF),
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(20.0),
                      topRight: Radius.circular(20.0),
                      bottomRight: Radius.circular(20.0),
                      bottomLeft: Radius.circular(20.0),
                    ),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(
                            allUsers[index].name,
                            style: TextStyle(
                              color: Colors.black54,
                              fontSize: 18.0,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          SizedBox(height: 5.0),
                          Container(
                            width: MediaQuery.of(context).size.width * 0.5,
                            child: allUsers[index].messages.isNotEmpty
                                ? Text(
                                    allUsers[index].messages.first.text,
                                    style: TextStyle(
                                      color: Colors.blueGrey,
                                      fontSize: 20.0,
                                      fontWeight: FontWeight.w600,
                                    ),
                                    overflow: TextOverflow.ellipsis,
                                  )
                                : Text(
                                    "No messages yet!",
                                    style: TextStyle(
                                      color: Colors.blueGrey,
                                      fontSize: 20.0,
                                      fontWeight: FontWeight.w600,
                                    ),
                                    overflow: TextOverflow.ellipsis,
                                  ),
                          ),
                        ],
                      ),
                      Column(
                        children: <Widget>[
                          allUsers[index].messages.isNotEmpty
                              ? Text(
                                  TimeOfDay.fromDateTime(
                                          allUsers[index].messages.last.time)
                                      .format(context),
                                  style: TextStyle(
                                    color: Colors.black54,
                                    fontSize: 15.0,
                                    fontWeight: FontWeight.bold,
                                  ),
                                )
                              : Text(
                                  "",
                                  style: TextStyle(
                                    color: Colors.black54,
                                    fontSize: 15.0,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                        ],
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      ),
    );
  }
}
