import 'package:flutter/material.dart';
import 'package:flutter_demo/home.dart';
import 'package:flutter_demo/provider/CompanyListProvider.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MultiProvider(
    providers: [
      ChangeNotifierProvider(
        create: (_) => CompanyListProvider(),
      )
    ],
    child: MyApp(),
  ));
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: FlowerApp(),
    );
  }
}
