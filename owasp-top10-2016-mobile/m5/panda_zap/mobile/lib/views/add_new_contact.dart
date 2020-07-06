import 'package:flutter/material.dart';
import 'package:panda_zap/models/user.dart';
import 'package:toast/toast.dart';

class AddNewContact extends StatelessWidget {
  _searchForUser(BuildContext context) {
    if (foundUser()) {
      Toast.show(
        "User added!",
        context,
        duration: Toast.LENGTH_LONG,
        gravity: Toast.BOTTOM,
        backgroundColor: Colors.grey,
      );
    }

    Toast.show(
      "Panda Zap was unable to find user",
      context,
      duration: Toast.LENGTH_LONG,
      gravity: Toast.BOTTOM,
      backgroundColor: Colors.grey,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).primaryColor,
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(70.0),
        child: AppBar(
          iconTheme: IconThemeData(color: Colors.white),
          elevation: 0.0,
          centerTitle: true,
          title: Text(
            'Add New User',
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
                        Text("Who do you wanna contact?",
                            style: TextStyle(
                              color: Colors.black54,
                              fontSize: 20.0,
                              fontWeight: FontWeight.w500,
                            )),
                        Text(
                          "(Please use username)",
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 14.0,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
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
                                    icon: Icon(Icons.search),
                                    iconSize: 25.0,
                                    color: Theme.of(context).primaryColor,
                                    onPressed: () {
                                      _searchForUser(context);
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
