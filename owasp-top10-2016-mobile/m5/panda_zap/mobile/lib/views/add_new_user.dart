import 'package:flutter/material.dart';
import 'package:panda_zap/models/key.dart';
import 'package:panda_zap/models/user.dart';
import 'package:panda_zap/views/home.dart';
import 'package:toast/toast.dart';

class AddNewUser extends StatelessWidget {
  _createNewUser(BuildContext context, String username) {
    register(username).then(
      (statusCode) {
        if (statusCode == 409) {
          Toast.show("Register Error! User already exists!", context,
              duration: 5, gravity: Toast.BOTTOM, backgroundColor: Colors.grey);
        } else if (statusCode == 500) {
          Toast.show("Register Error! Please try again later.", context,
              duration: 5, gravity: Toast.BOTTOM, backgroundColor: Colors.grey);
        } else if (statusCode != 201) {
          Toast.show(
              "Register Error! Please check API for more details", context,
              duration: 5, gravity: Toast.BOTTOM, backgroundColor: Colors.grey);
        } else {
          getMessageKey().then(
            (key) {
              if (key == -1) {
                Toast.show("Error getting key for messages!", context,
                    duration: 5,
                    gravity: Toast.BOTTOM,
                    backgroundColor: Colors.grey);
              } else {
                Toast.show("User created!", context,
                    duration: 5,
                    gravity: Toast.BOTTOM,
                    backgroundColor: Colors.grey);
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                    builder: (_) => Home(),
                  ),
                );
              }
            },
          );
        }
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    var newUsernameController = TextEditingController();

    return Scaffold(
      backgroundColor: Theme.of(context).primaryColor,
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(70.0),
        child: AppBar(
          iconTheme: IconThemeData(color: Colors.white),
          elevation: 0.0,
          centerTitle: true,
          title: Text(
            'Create New User',
            style: TextStyle(
              fontSize: 25.0,
              color: Colors.white,
            ),
          ),
        ),
      ),
      body: GestureDetector(
        onTap: () => FocusScope.of(context).unfocus(),
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
            child: Column(
              children: <Widget>[
                Expanded(
                  child: Container(
                    alignment: Alignment(0.0, 0.0),
                    color: Colors.white,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: <Widget>[
                        Text("Please enter your username",
                            style: TextStyle(
                              color: Colors.black54,
                              fontSize: 20.0,
                              fontWeight: FontWeight.w500,
                            )),
                        SizedBox(height: 10.0),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            SizedBox(width: 40.0),
                            Container(
                              decoration: BoxDecoration(
                                color: Color(0xffffedcc),
                                borderRadius: BorderRadius.all(
                                  Radius.circular(40.0),
                                ),
                                boxShadow: [
                                  BoxShadow(
                                      color: Colors.black45,
                                      blurRadius: 1.0,
                                      spreadRadius: 0.0,
                                      offset: Offset(1.0, 1.0))
                                ],
                              ),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: <Widget>[
                                  Container(
                                    width: 200.0,
                                    child: TextField(
                                      controller: newUsernameController,
                                      decoration: new InputDecoration(
                                        border: InputBorder.none,
                                        focusedBorder: InputBorder.none,
                                        enabledBorder: InputBorder.none,
                                        errorBorder: InputBorder.none,
                                        disabledBorder: InputBorder.none,
                                        contentPadding: EdgeInsets.only(
                                            left: 20,
                                            bottom: 11,
                                            top: 11,
                                            right: 15),
                                      ),
                                    ),
                                  ),
                                  IconButton(
                                    icon: Icon(Icons.send),
                                    iconSize: 25.0,
                                    color: Theme.of(context).primaryColor,
                                    onPressed: () {
                                      if (newUsernameController
                                          .text.isNotEmpty) {
                                        FocusScope.of(context).unfocus();
                                        _createNewUser(context,
                                            newUsernameController.text);
                                        newUsernameController.clear();
                                      } else {
                                        Toast.show(
                                          "Your username can't be empty!",
                                          context,
                                          duration: Toast.LENGTH_LONG,
                                          gravity: Toast.CENTER,
                                          backgroundColor: Colors.grey,
                                        );
                                      }
                                    },
                                  ),
                                ],
                              ),
                            ),
                            SizedBox(width: 40.0),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
