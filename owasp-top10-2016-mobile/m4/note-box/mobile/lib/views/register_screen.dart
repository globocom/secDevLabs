import 'dart:io' show Platform;

import 'package:flutter/material.dart';
import 'package:http/http.dart';

import '../widgets/alert_button.dart';

class RegisterScreen extends StatelessWidget {
  final usernameController = TextEditingController();
  final passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  int _statusCode;

  _register(BuildContext context, String username, String password) async {
    // set up POST request arguments
    String host = Platform.isAndroid ? "10.0.2.2" : "localhost";
    String url = 'http://$host:9051/register';
    Map<String, String> headers = {"Content-type": "application/json"};
    String json = '{"username": "$username", "password": "$password"}';
    // make POST request
    try {
      Response response = await post(url, headers: headers, body: json);

      // check the status code for the result
      _statusCode = response.statusCode;
      if (_statusCode == 409) {
        showAlertDialog(context, 'Register Error', 'User already exists!');
        return;
      }
      if (_statusCode == 500) {
        showAlertDialog(context, 'Register Error', 'Please try again later.');
        return;
      }
      if (_statusCode != 200) {
        showAlertDialog(context, 'Register Error',
            'Unknown error occured. Please try again later.');
        return;
      }
    } on Exception {
      showAlertDialog(context, 'Server not reachable',
          'Is the backend server up and running?');
      return;
    }

    showAlertDialog(context, 'Register', 'User registered successfully!');
    return;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: IconThemeData(
          color: Colors.green[700],
        ),
      ),
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Container(
                  height: 55,
                  width: 200,
                  child: Card(
                    elevation: 0,
                    color: Colors.white,
                    child: Text(
                      'Register Now!',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Colors.green[700],
                        fontSize: 30,
                      ),
                    ),
                  ),
                ),
                Container(
                  width: 280,
                  child: TextFormField(
                    validator: (value) {
                      value = value.trim();
                      if (value.isEmpty) {
                        return 'Usernames can\'t be blank';
                      }
                      return null;
                    },
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
                  child: TextFormField(
                    obscureText: true,
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
                  padding: EdgeInsets.only(top: 15),
                  child: FlatButton(
                    onPressed: () {
                      if (_formKey.currentState.validate()) {
                        print(usernameController.text);
                        print(passwordController.text);
                        _register(context, usernameController.text,
                            passwordController.text);
                      }
                    },
                    color: Colors.green[700],
                    child: Text(
                      'Register',
                      style: TextStyle(
                        color: Colors.white,
                      ),
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
