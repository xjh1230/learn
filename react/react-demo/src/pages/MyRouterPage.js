import React, { Component } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Switch,
//   useRouteMatch,
//   useHistory,
//   useLocation,
//   useParams,
//   withRouter,
//   Prompt,
// } from "react-router-dom";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  //   useRouteMatch,
  //   useHistory,
  //   useLocation,
  //   useParams,
  withRouter,
  RouterContext,
  Prompt,
} from "../kreact-router/";
export default class MyRouterPage extends Component {
  render() {
    return (
      <div className="router">
        <Router>
          <Link to="/">首页</Link>
          <Link to="/user">用户中心</Link>
          <Link to="/login">登录</Link>
          <Link to="/product/123">商品</Link>
          <Link to="/redirect">跳转</Link>
          <Link to="/other">其他</Link>

          <Switch>
            <Route
              exact
              path="/"
              //children={children}
              component={HomePage}
              //render={render}
            >
              {/* children 0000 */}
            </Route>
            <Route path="/user" component={UserPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/redirect" component={RedirectOther} />
            {/* <Route path="/product/:id" component={Product} /> */}
            <Route path="/product/:id" render={() => <Product />} />

            <Route component={_404Page} />
          </Switch>
        </Router>
      </div>
    );
  }
}

class UserPage extends Component {
  state = {};

  render() {
    return <div>UserPage</div>;
  }
}

class HomePage extends Component {
  render() {
    return <div>HomePage</div>;
  }
}

class LoginPage extends Component {
  render() {
    return <div>LoginPage</div>;
  }
}
class RedirectOther extends Component {
  state = {};
  render() {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }
}

@withRouter
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { confirm: true };
  }
  render() {
    console.log("props", this.props); //sy-log
    const { params, url } = this.props.match;
    const { id } = params;
    return (
      <div>
        <h1>Search-{id}</h1>
        <Prompt
          when={this.state.confirm}
          message="Are you sure you want to leave? 尼日尔  同学"
        />
        <Link to={url + "/detail"}>详情</Link>
        <Route path={url + "/detail"} component={Detail} />
      </div>
    );
  }
}

function Detail({ match }) {
  console.log("match", match); //sy-log
  return <div>DetailPage</div>;
}

class _404Page extends Component {
  state = {};
  render() {
    return <h1>_404</h1>;
  }
}
