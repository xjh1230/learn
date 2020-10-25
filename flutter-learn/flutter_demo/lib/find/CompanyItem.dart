import 'package:flutter/material.dart';
import 'package:flutter_demo/find/Company.dart';

class CompanyItem extends StatelessWidget {
  final Company model;

  CompanyItem(this.model);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 140,
      padding: EdgeInsets.all(5),
      child: Card(
        elevation: 5, //不用背，学规律
        child: Padding(
          padding: EdgeInsets.all(5),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              new Row(mainAxisAlignment: MainAxisAlignment.start, children: [
                Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      image: DecorationImage(
                          image: NetworkImage(model.logo), fit: BoxFit.cover)),
                ),
                Padding(
                    padding: EdgeInsets.only(left: 10),
                    child: Container(
                      width: 100,
                      child: new Text(
                        model.location,
                        overflow: TextOverflow.ellipsis,
                      ),
                    )),
                Padding(
                    padding: EdgeInsets.only(left: 10),
                    child: new Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        new Text(
                          '|' + model.type,
                          style: TextStyle(fontSize: 14, color: Colors.grey),
                        ),
                        new Text(
                          '|' + model.size,
                          style: TextStyle(fontSize: 14, color: Colors.grey),
                        ),
                        new Text(
                          '|' + model.employee,
                          style: TextStyle(fontSize: 14, color: Colors.grey),
                        ),
                      ],
                    )),
              ]),
              new Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  new Text(
                    '热招:' + model.hot + '等' + model.count + '个岗位',
                    style: TextStyle(fontSize: 16, color: Colors.grey),
                  ),
                  new Text(
                    '>',
                    style: TextStyle(fontSize: 16, color: Colors.grey),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
