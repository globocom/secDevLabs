import 'dart:async';

import 'package:flutter/material.dart';
import 'package:panda_zap/models/message.dart';
import 'package:panda_zap/models/user.dart';
import 'package:uuid/uuid.dart';

class WriteMessageView extends StatefulWidget {
  User contactUser;
  int userIndex;

  WriteMessageView(
    this.contactUser,
    this.userIndex,
  );

  @override
  _WriteMessageViewState createState() => _WriteMessageViewState();
}

Future<void> _sendMessageCaller(Message message, User contactUser) async {
  await sendMessage(message, contactUser);
}

Timer timer;

class _WriteMessageViewState extends State<WriteMessageView> {
  _buildMessage(Message message, bool myMessage) {
    return Container(
      margin: myMessage
          ? EdgeInsets.only(top: 8.0, bottom: 8.0, left: 80.0)
          : EdgeInsets.only(top: 8.0, bottom: 8.0, right: 80.0),
      padding: EdgeInsets.symmetric(horizontal: 20.0, vertical: 16.0),
      decoration: BoxDecoration(
        color: myMessage ? Color(0xffffedcc) : Color(0xffffd27f),
        borderRadius: myMessage
            ? BorderRadius.only(
                topLeft: Radius.circular(15.0),
                bottomLeft: Radius.circular(15.0),
              )
            : BorderRadius.only(
                topRight: Radius.circular(15.0),
                bottomRight: Radius.circular(15.0),
              ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
            TimeOfDay.fromDateTime(message.time).format(context),
            style: TextStyle(
              color: Colors.blueGrey,
              fontSize: 15.0,
              fontWeight: FontWeight.w500,
            ),
          ),
          SizedBox(height: 5.0),
          Text(
            message.text,
            style: TextStyle(
              color: Colors.black,
              fontSize: 18.0,
              fontWeight: FontWeight.normal,
            ),
          ),
        ],
      ),
    );
  }

  _buildMessageWriter() {
    var newMessageController = TextEditingController();
    String messageTextToBeSent;
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 8.0),
      color: Colors.white,
      height: 70.0,
      child: Row(
        children: <Widget>[
          Expanded(
            child: TextField(
              textCapitalization: TextCapitalization.sentences,
              controller: newMessageController,
              onChanged: (value) {
                messageTextToBeSent = value;
              },
              decoration: InputDecoration(hintText: "Type a message"),
            ),
          ),
          IconButton(
            icon: Icon(Icons.send),
            iconSize: 25.0,
            color: Theme.of(context).primaryColor,
            onPressed: () async {
              Message messageToBeSent = Message(Uuid().v4(), true, me.name,
                  messageTextToBeSent, DateTime.now());
              setState(
                () {
                  if (messageTextToBeSent.isNotEmpty) {
                    widget.contactUser.messages.insert(0, messageToBeSent);
                  }
                },
              );
              await _sendMessageCaller(messageToBeSent, widget.contactUser);
              newMessageController.clear();
            },
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    List<Message> messages = widget.contactUser.messages;
    int userIndex = widget.userIndex;
    return Scaffold(
      backgroundColor: Theme.of(context).primaryColor,
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(70.0),
        child: AppBar(
          iconTheme: IconThemeData(
            color: Colors.white,
          ),
          title: Text(
            allUsers[userIndex].name,
            style: TextStyle(
              color: Colors.white,
            ),
          ),
          centerTitle: true,
          elevation: 0.0,
        ),
      ),
      body: GestureDetector(
        onTap: () => FocusScope.of(context).unfocus(),
        child: Column(
          children: <Widget>[
            Expanded(
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(30.0),
                    topRight: Radius.circular(30.0),
                  ),
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(30.0),
                    topRight: Radius.circular(30.0),
                  ),
                  child: ListView.builder(
                    reverse: true,
                    padding: EdgeInsets.only(top: 15.0),
                    itemCount: messages.length,
                    itemBuilder: (BuildContext context, int index) {
                      // timer = Timer.periodic(
                      //     Duration(seconds: 10), (Timer t) => setState(() {}));
                      timer = Timer.periodic(Duration(seconds: 10),
                          (Timer t) => mounted ? setState(() {}) : null);
                      Message message = messages[index];
                      return _buildMessage(message, message.sentByMe);
                    },
                  ),
                ),
              ),
            ),
            _buildMessageWriter(),
          ],
        ),
      ),
    );
  }
}
