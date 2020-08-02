import React, { Component } from "react";

import { bindActionCreators } from "redux";
import { connect } from "../kreact-redux/";
// import { connect } from "react-redux";

@connect(
  //mapStateToProps
  ({ count }) => ({ count }),
  //mapDispatchToProps
  //   {
  //     add: () => ({ type: "ADD" }),
  //   }
  (dispatch) => {
    let creators = {
      add: () => ({ type: "ADD" }),
      minus: () => ({ type: "MINUS" }),
    };
    creators = bindActionCreators(creators, dispatch);

    return {
      dispatch,
      ...creators,
    };
  }
)
class MyReactRedux extends Component {
  render() {
    const { count, dispatch, add } = this.props;
    console.log("dispatch", this.props); //sy-log
    return (
      <div>
        <h3>MyReactRedux</h3>
        <p>{count}</p>
        <button onClick={add}>Add</button>
        <button onClick={() => dispatch({ type: "ADD" })}>Dispatch Add</button>
      </div>
    );
  }
}

export default MyReactRedux;
