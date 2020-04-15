import 'package:flutter/material.dart';

class Games extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Novos games IRADOS!'),
        backgroundColor: Colors.black,
      ),
      body: SingleChildScrollView(
        child: Center(
          child: Column(
            children: <Widget>[
              Card(
                shape: BeveledRectangleBorder(
                  side: BorderSide(
                    color: Colors.black,
                    width: 1,
                  ),
                ),
                child: Column(
                  children: <Widget>[
                    Card(
                      shape: BeveledRectangleBorder(
                        side: BorderSide(
                          color: Colors.black,
                          width: 1,
                        ),
                      ),
                      elevation: 10,
                      child: Container(
                        height: 300,
                        width: MediaQuery.of(context).size.width - 10,
                        decoration: new BoxDecoration(
                          shape: BoxShape.rectangle,
                          image: DecorationImage(
                            image: new AssetImage('assets/images/skyrim.jpg'),
                            fit: BoxFit.fill,
                          ),
                        ),
                      ),
                    ),
                    Container(
                      padding: EdgeInsets.only(top: 10),
                      child: Text(
                        'The Elder Scrolls V - Skyrim',
                        style: TextStyle(
                          color: Color(0xff047cf4),
                          fontWeight: FontWeight.w900,
                          fontSize: 20,
                        ),
                      ),
                    ),
                    Container(
                      width: MediaQuery.of(context).size.width - 10,
                      padding: EdgeInsets.all(10),
                      child: Text(
                        'The Elder Scrolls V: Skyrim, the 2011 Game of the Year, is the next chapter in the highly anticipated Elder Scrolls saga. Developed by Bethesda Game Studios, the 2011 Studio of the Year, that brought you Oblivion and Fallout 3. Skyrim reimagines and revolutionizes the open-world fantasy epic, bringing to life a complete virtual world open for you to explore any way you choose.',
                        textAlign: TextAlign.justify,
                        style: TextStyle(
                          fontSize: 18,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Card(
                shape: BeveledRectangleBorder(
                  side: BorderSide(
                    color: Colors.black,
                    width: 1,
                  ),
                ),
                child: Column(
                  children: <Widget>[
                    Card(
                      shape: BeveledRectangleBorder(
                        side: BorderSide(
                          color: Colors.black,
                          width: 1,
                        ),
                      ),
                      elevation: 10,
                      child: Container(
                        height: 300,
                        width: MediaQuery.of(context).size.width - 10,
                        decoration: new BoxDecoration(
                          shape: BoxShape.rectangle,
                          image: DecorationImage(
                            image: new AssetImage('assets/images/fifa.jpg'),
                            fit: BoxFit.fill,
                          ),
                        ),
                      ),
                    ),
                    Container(
                      padding: EdgeInsets.only(top: 10),
                      child: Text(
                        'FIFA 2019',
                        style: TextStyle(
                          color: Color(0xff047cf4),
                          fontWeight: FontWeight.w900,
                          fontSize: 20,
                        ),
                      ),
                    ),
                    Container(
                      width: MediaQuery.of(context).size.width - 10,
                      padding: EdgeInsets.all(10),
                      child: Text(
                        'Become a Champion through the stories of Alex Hunter, Danny Williams, and Kim Hunter. Each hero will face career-defining choices and football challenges on their Journey, as you guide these three stars to glory in either the UEFA Champions League or on the international stage.',
                        textAlign: TextAlign.justify,
                        style: TextStyle(
                          fontSize: 18,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Card(
                shape: BeveledRectangleBorder(
                  side: BorderSide(
                    color: Colors.black,
                    width: 1,
                  ),
                ),
                child: Column(
                  children: <Widget>[
                    Card(
                      shape: BeveledRectangleBorder(
                        side: BorderSide(
                          color: Colors.black,
                          width: 1,
                        ),
                      ),
                      elevation: 10,
                      child: Container(
                        height: 300,
                        width: MediaQuery.of(context).size.width - 10,
                        decoration: new BoxDecoration(
                          shape: BoxShape.rectangle,
                          image: DecorationImage(
                            image: new AssetImage('assets/images/gta.jpg'),
                            fit: BoxFit.fill,
                          ),
                        ),
                      ),
                    ),
                    Container(
                      padding: EdgeInsets.only(top: 10),
                      child: Text(
                        'GTA V',
                        style: TextStyle(
                          color: Color(0xff047cf4),
                          fontWeight: FontWeight.w900,
                          fontSize: 20,
                        ),
                      ),
                    ),
                    Container(
                      width: MediaQuery.of(context).size.width - 10,
                      padding: EdgeInsets.all(10),
                      child: Text(
                        'The biggest, most dynamic and most diverse open world ever created, Grand Theft Auto V blends storytelling and gameplay in new ways as players repeatedly jump in and out of the lives of the game’s three lead characters, playing all sides of the game’s interwoven story.',
                        textAlign: TextAlign.justify,
                        style: TextStyle(
                          fontSize: 18,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
