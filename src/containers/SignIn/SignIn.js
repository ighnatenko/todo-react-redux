import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import classes from './SignIn.css';
import { Link, Redirect } from 'react-router-dom';

class SignIn extends Component {
  state = {
    email: 'qq@q.ua',
    password: 'qqqqqqqq'
  }

  componentDidMount() {
    if (this.props.token !== null) {
      this.props.onSetAuthRedirectPath();
    }
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.signIn(this.state.email, this.state.password);
  }

  inputChangedHandler = (event, inputType) => {
    switch(inputType) {
      case 'email':
        this.setState({ email: event.target.value });
        break;
      case 'password':
        this.setState({ password: event.target.value });
        break;
      default:
        break;
    }
  }

  render() {
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }

    let errorMessage = null;
    if (this.props.error !== null) {
      errorMessage = (
        <p>{this.props.error}</p>
      );
    }

    let spinner = null; 
    if (this.props.loading) {
      spinner = <p>Loading...</p>;
    }

    return(
      <div>
        {spinner}
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          <input value={this.state.email} onChange={(event) => this.inputChangedHandler(event, 'email')} />
          <input value={this.state.password} onChange={(event) => this.inputChangedHandler(event, 'password')} />
          <Button btnType="Success">SUBMIT</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.signin.loading,
    error: state.signin.error,
    isAuthenticated: state.signin.token !== null,
    authRedirectPath: state.signin.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: (email, password) => dispatch(actions.signIn(email, password)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);