import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import SignUp from './containers/SignUp/SignUp';
import SignIn from './containers/SignIn/SignIn';
import Logout from './containers/Logout/Logout';
import Projects from './containers/Projects/Projects';
import * as actions from './store/actions/index';
import { NavLink } from 'react-router-dom';
import './App.css';

class App extends Component {
  componentDidMount = () => {
    this.props.onTryAutoSignup();
  }

  render() {
    let spiner = null;
    if (this.props.loading) {
      spiner = <p>Loading...</p>
    }

    let routes = (
      <Switch>
        <Route path='/sign_up' component={SignUp} />
        <Route path='/sign_in' component={SignIn} />
        <Redirect to='/sign_in' />
      </Switch>
    );

    let logoutLink = null;
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path='/' component={Projects} />
          <Redirect to='/' />
        </Switch>
      );
      logoutLink = <div><NavLink to='/logout' className='glyphicon glyphicon-log-out'></NavLink></div>
    }

    


    return (
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>
        <div className='header'>
          <p>Simple ToDo List</p>
          {logoutLink}
        </div>
        {spiner}
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.success,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));