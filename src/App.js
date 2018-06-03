import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Router, Redirect } from 'react-router-dom';
import SignUp from './containers/SignUp/SignUp';
import SignIn from './containers/SignIn/SignIn';
import Todos from './containers/Todos/Todos';
import * as actions from './store/actions/index';

class App extends Component {
  render() {
    this.props.onTryAutoSignup();

    let routes = (
      <Switch>
        <Route path='/sign_up' component={SignUp} />
        <Route path='/sign_in' component={SignIn} />
        <Route path='/' component={Todos} />
        <Redirect to="/sign_up" />
      </Switch>
    );

    return (
      <div>
        {routes}
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.auth.token !== null
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));