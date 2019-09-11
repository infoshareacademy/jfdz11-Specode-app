import React from "react";
import * as firebase from "firebase";

class Auth extends React.Component {
  state = {
    user: null,
    ref: null
  };

  componentDidMount() {
    const ref = firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user
      });
    });

    this.setState({
      ref
    });
  }

  componentWillUnmount() {
    if (this.state.ref) {
      this.state.ref();
    }
  }

  render() {
    return this.state.user ? this.props.children : "Zaloguj się!";
  }
}

export default Auth;
