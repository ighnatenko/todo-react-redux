import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import SignUp from './containers/SignUp/SignUp';
import SignIn from './containers/SignIn/SignIn';
import Projects from './containers/Projects/Projects';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    let spiner = null;
    if (this.props.loading) {
      spiner = <p>Loading...</p>
    }

    let routes = null;
    if (this.props.isAuthenticated) {
      routes = (
        <Route path='/' component={Projects} />
      );
    } else {
      routes = (
        <Switch>
          <Route path='/sign_up' component={SignUp} />
          <Route path='/sign_in' component={SignIn} />
        </Switch>
      );
    }
  
    return (
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>
        {spiner}
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));