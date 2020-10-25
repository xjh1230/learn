import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class MineScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: new Text('我的'),
      ),
      body: Center(
        child: Container(
          width: 100,
          height: 100,
          color: Colors.red,
          child: Text(
            '我的士大夫精神的快捷方式发生的镂空设计风格的方式 时代开始看了个上的各个地方山豆根豆腐干地方感到翻跟斗如果换货的',
            overflow: TextOverflow.ellipsis,
            maxLines: 3,
          ),
        ),
      ),
    );
  }
}
