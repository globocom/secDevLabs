import 'dart:convert';

import 'package:flutter/material.dart';
import './register_screen.dart';
import './games.dart';
import '../models/session_token.dart';
import '../widgets/alert_button.dart';
import 'package:http/http.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'dart:io' show Platform;

class AuthScreen extends StatefulWidget {
  @override
  _AuthScreenState createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  final usernameController = TextEditingController();
  final passwordController = TextEditingController();
  final _storage = new FlutterSecureStorage();

  void _login(BuildContext context, String username, String password) async {
    // set up POST request arguments
    String host = Platform.isAndroid ? "10.0.2.2" : "localhost";
    String url = 'http://$host:9051/login';
    Map<String, String> headers = {"Content-type": "application/json"};
    String json = '{"username": "$username", "password": "$password"}';
    // make POST request
    Response response = await post(url, headers: headers, body: json);
    // check the status code for the result
    int statusCode = response.statusCode;
    if (statusCode == 409) {
      showAlertDialog(context, 'Login Error', 'User already logged in!');
      return;
    }
    if (statusCode == 404) {
      showAlertDialog(context, 'Login Error',
          'Wrong username or password or user does not exist.');
      return;
    }

    Map sessionTokenMap = jsonDecode(response.body);
    var sessionToken = SessionToken.fromJson(sessionTokenMap);
    await _storage.write(key: username, value: sessionToken.Value);

    print(
        'Successfull login - username: \"$username\" password: \"$password\"');

    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => Games()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      resizeToAvoidBottomPadding: true,
      body: SingleChildScrollView(
        child: Center(
          child: Container(
            padding:
                EdgeInsets.only(top: 180, left: 55, bottom: 240, right: 55),
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/images/bg.png'),
                fit: BoxFit.cover,
              ),
            ),
            child: Card(
              shape: BeveledRectangleBorder(
                side: BorderSide(
                  color: Colors.black,
                  width: 2,
                ),
              ),
              child: Container(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Container(
                      height: 55,
                      padding: EdgeInsets.only(top: 20),
                      child: Text(
                        'GamesIRADOS App',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    Container(
                      width: 280,
                      padding: EdgeInsets.only(
                        left: 20,
                        right: 20,
                      ),
                      child: TextField(
                        decoration: InputDecoration(
                          labelText: 'Username',
                          contentPadding: EdgeInsets.all(10),
                          labelStyle: TextStyle(
                            color: Colors.black,
                          ),
                        ),
                        controller: usernameController,
                      ),
                    ),
                    Container(
                      width: 280,
                      padding: EdgeInsets.only(
                        left: 20,
                        right: 20,
                      ),
                      child: TextField(
                        decoration: InputDecoration(
                          labelText: 'Password',
                          contentPadding: EdgeInsets.all(10),
                          labelStyle: TextStyle(
                            color: Colors.black,
                          ),
                        ),
                        controller: passwordController,
                      ),
                    ),
                    Container(
                      padding: EdgeInsets.only(top: 10),
                      child: InkWell(
                        child: Text(
                          'First time? Click here to register now!',
                          style: TextStyle(
                            color: Color(0xff0a8def),
                            fontSize: 15,
                          ),
                        ),
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => RegisterScreen()),
                          );
                        },
                      ),
                    ),
                    Container(
                      padding: EdgeInsets.only(top: 10),
                      width: 400,
                      child: FlatButton(
                        onPressed: () {
                          _login(context, usernameController.text,
                              passwordController.text);
                        },
                        color: Color(0xffbbcbef),
                        child: Text(
                          'GO!',
                          style: TextStyle(
                            color: Colors.black,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
