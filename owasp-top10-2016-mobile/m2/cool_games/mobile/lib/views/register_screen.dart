import 'package:flutter/material.dart';
import '../widgets/alert_button.dart';
import 'package:http/http.dart';

class RegisterScreen extends StatelessWidget {
  final usernameController = TextEditingController();
  final passwordController = TextEditingController();
  int _statusCode;

  _register(BuildContext context, String username, String password) async {
    // set up POST request arguments
    String url = 'http://10.0.2.2:9051/register';
    Map<String, String> headers = {"Content-type": "application/json"};
    String json = '{"username": "$username", "password": "$password"}';
    // make POST request
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

    showAlertDialog(context, 'Register', 'User registered successfully!');
    return;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        image: DecorationImage(
          image: AssetImage('assets/images/bg.png'),
          fit: BoxFit.cover,
        ),
      ),
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: Color(0xffbbcbef),
          elevation: 20,
          iconTheme: IconThemeData(
            color: Colors.black,
          ),
        ),
        backgroundColor: Colors.transparent,
        body: Center(
          child: Container(
            height: 255,
            child: Card(
              shape: BeveledRectangleBorder(
                side: BorderSide(
                  color: Colors.black,
                  width: 2,
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Container(
                    height: 55,
                    width: 260,
                    child: Card(
                      elevation: 0,
                      color: Colors.white,
                      child: Text(
                        'Register Now!',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 40,
                        ),
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
                    padding: EdgeInsets.only(top: 30),
                    width: 300,
                    child: FlatButton(
                      onPressed: () {
                        String inputUsername = usernameController.text;
                        String inputPassword = passwordController.text;
                        _register(context, inputUsername, inputPassword);
                        print(
                            'User \"$inputUsername\" tried registering with password: \"$inputPassword\"');
                      },
                      color: Color(0xffbbcbef),
                      child: Text(
                        'Register',
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
    );
  }
}
