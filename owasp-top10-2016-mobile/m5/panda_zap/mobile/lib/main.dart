import 'package:flutter/material.dart';
import 'package:panda_zap/views/add_new_user.dart';

class PandaZap extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Panda Zap',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: Colors.orange,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: AddNewUser(),
    );
  }
}

void main() {
  runApp(PandaZap());
}
